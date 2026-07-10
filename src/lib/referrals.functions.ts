import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const SIGNUP_REWARD_CENTS = 500; // $5 credit per successful referral signup

function makeCode(len = 8) {
  const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < len; i++) s += alphabet[Math.floor(Math.random() * alphabet.length)];
  return s;
}

async function ensureCode(userId: string, displayName: string | null): Promise<string> {
  const admin = supabaseAdmin as unknown as {
    from: (t: string) => any;
  };
  const { data: existing } = await admin
    .from("referral_codes")
    .select("code")
    .eq("user_id", userId)
    .maybeSingle();
  if (existing?.code) return existing.code as string;

  const base =
    (displayName ?? "")
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 4) || "ATLAS";

  for (let attempt = 0; attempt < 6; attempt++) {
    const code = attempt === 0 ? `${base}${makeCode(4)}` : makeCode(8);
    const { error } = await admin
      .from("referral_codes")
      .insert({ user_id: userId, code });
    if (!error) return code;
  }
  throw new Error("Could not generate a unique referral code");
}

export const getMyReferralOverview = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({}).parse(d))
  .handler(async ({ context }) => {
    const { userId } = context;
    const admin = supabaseAdmin as unknown as { from: (t: string) => any };

    const { data: profile } = await admin
      .from("profiles")
      .select("display_name")
      .eq("user_id", userId)
      .maybeSingle();

    const code = await ensureCode(userId, profile?.display_name ?? null);

    const { data: referrals } = await admin
      .from("referrals")
      .select("id, referred_user_id, status, reward_cents, created_at")
      .eq("referrer_user_id", userId)
      .order("created_at", { ascending: false });

    const referredIds = (referrals ?? []).map((r: any) => r.referred_user_id);
    let namesById: Record<string, string> = {};
    if (referredIds.length > 0) {
      const { data: names } = await admin
        .from("profiles")
        .select("user_id, display_name")
        .in("user_id", referredIds);
      namesById = Object.fromEntries(
        (names ?? []).map((p: any) => [p.user_id, p.display_name ?? "Sanctum member"]),
      );
    }

    const { data: rewards } = await admin
      .from("referral_rewards")
      .select("id, amount_cents, currency, kind, note, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(50);

    const totalCents = (rewards ?? []).reduce(
      (sum: number, r: any) => sum + (r.amount_cents ?? 0),
      0,
    );

    return {
      code,
      totals: {
        invitedCount: referrals?.length ?? 0,
        signedUpCount: (referrals ?? []).filter((r: any) => r.status === "signed_up").length,
        rewardCents: totalCents,
      },
      recentReferrals: (referrals ?? []).slice(0, 20).map((r: any) => ({
        id: r.id as string,
        name: namesById[r.referred_user_id] ?? "Sanctum member",
        status: r.status as string,
        rewardCents: r.reward_cents as number,
        createdAt: r.created_at as string,
      })),
      recentRewards: (rewards ?? []).map((r: any) => ({
        id: r.id as string,
        amountCents: r.amount_cents as number,
        currency: r.currency as string,
        kind: r.kind as string,
        note: (r.note as string | null) ?? null,
        createdAt: r.created_at as string,
      })),
    };
  });

export const getReferralLeaderboard = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ limit: z.number().min(1).max(50).optional() }).parse(d))
  .handler(async ({ data }) => {
    const admin = supabaseAdmin as unknown as { from: (t: string) => any };
    const { data: rows } = await admin
      .from("referrals")
      .select("referrer_user_id, reward_cents")
      .order("created_at", { ascending: false })
      .limit(1000);

    const agg = new Map<string, { count: number; cents: number }>();
    for (const r of (rows ?? []) as any[]) {
      const cur = agg.get(r.referrer_user_id) ?? { count: 0, cents: 0 };
      cur.count += 1;
      cur.cents += r.reward_cents ?? 0;
      agg.set(r.referrer_user_id, cur);
    }
    const top = [...agg.entries()]
      .sort((a, b) => b[1].count - a[1].count)
      .slice(0, data.limit ?? 10);

    if (top.length === 0) return [];

    const ids = top.map(([id]) => id);
    const { data: profs } = await admin
      .from("profiles")
      .select("user_id, display_name, region, trust_score")
      .in("user_id", ids);
    const byId = new Map((profs ?? []).map((p: any) => [p.user_id, p]));

    return top.map(([id, v], i) => {
      const p: any = byId.get(id);
      return {
        rank: i + 1,
        userId: id,
        displayName: (p?.display_name as string | null) ?? "Sanctum member",
        region: (p?.region as string | null) ?? null,
        trustScore: (p?.trust_score as number | null) ?? null,
        referrals: v.count,
        rewardCents: v.cents,
      };
    });
  });

export const attachReferralCode = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z.object({ code: z.string().min(4).max(24) }).parse(d),
  )
  .handler(async ({ data, context }) => {
    const { userId } = context;
    const admin = supabaseAdmin as unknown as { from: (t: string) => any };

    const normalized = data.code.trim().toUpperCase();

    // Already attributed?
    const { data: existingRef } = await admin
      .from("referrals")
      .select("id")
      .eq("referred_user_id", userId)
      .maybeSingle();
    if (existingRef?.id) return { ok: true, alreadyAttributed: true };

    const { data: owner } = await admin
      .from("referral_codes")
      .select("user_id, code")
      .eq("code", normalized)
      .maybeSingle();
    if (!owner?.user_id) return { ok: false, reason: "unknown_code" };
    if (owner.user_id === userId) return { ok: false, reason: "self_referral" };

    const { data: inserted, error: insErr } = await admin
      .from("referrals")
      .insert({
        referrer_user_id: owner.user_id,
        referred_user_id: userId,
        code: normalized,
        status: "signed_up",
        reward_cents: SIGNUP_REWARD_CENTS,
      })
      .select("id")
      .single();
    if (insErr || !inserted) return { ok: false, reason: "insert_failed" };

    await admin.from("referral_rewards").insert({
      user_id: owner.user_id,
      referral_id: inserted.id,
      amount_cents: SIGNUP_REWARD_CENTS,
      currency: "USD",
      kind: "referral_signup",
      note: `Referral signup credit (code ${normalized})`,
    });

    return { ok: true, alreadyAttributed: false };
  });

export function buildInviteMessage(params: {
  channel: "email" | "whatsapp" | "sms";
  referrerName: string;
  shareUrl: string;
}) {
  const { channel, referrerName, shareUrl } = params;
  if (channel === "sms") {
    return `${referrerName} invited you to Atlas Sanctum — an AI-run regenerative finance OS. Join: ${shareUrl}`;
  }
  if (channel === "whatsapp") {
    return (
      `Hey — ${referrerName} here 👋\n\n` +
      `I'm using Atlas Sanctum, an AI-run operating system for entrepreneurs building trust, funding, and impact. ` +
      `Signing up with my link gives you an instant Trust Score and credits me too.\n\n` +
      `Join here: ${shareUrl}`
    );
  }
  // email
  return (
    `Subject: You'd love Atlas Sanctum\n\n` +
    `Hi,\n\n` +
    `I've been using Atlas Sanctum — an AI-operated economic OS that helps entrepreneurs get funding, ` +
    `verify identity, and prove impact. It's changed how I think about capital.\n\n` +
    `Sign up with my link and you'll get onboarded with a Trust Score and free access to the Atlas CFO:\n${shareUrl}\n\n` +
    `— ${referrerName}`
  );
}

export const generateInviteMessage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) =>
    z
      .object({
        channel: z.enum(["email", "whatsapp", "sms"]),
        shareUrl: z.string().url(),
      })
      .parse(d),
  )
  .handler(async ({ data, context }) => {
    const admin = supabaseAdmin as unknown as { from: (t: string) => any };
    const { data: profile } = await admin
      .from("profiles")
      .select("display_name")
      .eq("user_id", context.userId)
      .maybeSingle();
    const referrerName = (profile?.display_name as string | null) ?? "A Sanctum member";
    return {
      channel: data.channel,
      message: buildInviteMessage({
        channel: data.channel,
        referrerName,
        shareUrl: data.shareUrl,
      }),
    };
  });
