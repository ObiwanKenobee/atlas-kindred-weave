import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { recordAgentEvent } from "@/lib/observability.server";
import { requireFeature } from "@/lib/entitlements.server";

// ── Types ─────────────────────────────────────────────────────────────────────

export type AssetKind =
  | "job" | "business_funded" | "tree_planted" | "household_reached"
  | "student_educated" | "co2_offset" | "water_access" | "loan_repaid";

export type AssetStatus = "listed" | "sold" | "withdrawn" | "pending_verification";

export type ImpactAsset = {
  id: string;
  owner_user_id: string;
  owner_name: string | null;
  kind: AssetKind;
  title: string;
  description: string | null;
  quantity: number;
  unit: string;
  verification_score: number;
  status: AssetStatus;
  ask_price_usd: number | null;
  currency: string;
  region: string | null;
  sector: string | null;
  sdg_tags: string[];
  minted_at: string;
  bid_count: number;
  top_bid: number | null;
};

export type AssetBid = {
  id: string;
  asset_id: string;
  bidder_id: string;
  bidder_name: string | null;
  bid_amount: number;
  currency: string;
  message: string | null;
  status: string;
  created_at: string;
};

export type MarketplaceStats = {
  total_assets: number;
  listed: number;
  sold: number;
  total_listed_value: number;
  asset_types: number;
  unique_sellers: number;
  volume_30d: number;
};

// ── List marketplace assets ───────────────────────────────────────────────────

const ListInput = z.object({
  kind: z.string().optional(),
  status: z.string().optional(),
  limit: z.number().int().min(1).max(50).default(24),
  offset: z.number().int().min(0).default(0),
});

export const listAssets = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => ListInput.parse(d))
  .handler(async ({ data }) => {
    let q = supabaseAdmin
      .from("impact_assets")
      .select(`
        id, owner_user_id, kind, title, description, quantity, unit,
        verification_score, status, ask_price_usd, currency,
        region, sector, sdg_tags, minted_at,
        profiles!impact_assets_owner_user_id_fkey(display_name)
      `)
      .order("minted_at", { ascending: false })
      .range(data.offset, data.offset + data.limit - 1);

    if (data.kind) q = q.eq("kind", data.kind);
    if (data.status) q = q.eq("status", data.status);
    else q = q.eq("status", "listed");

    const { data: rows, error } = await q;
    if (error) throw new Error(error.message);

    // Fetch bid counts + top bids in one query
    const ids = (rows ?? []).map((r) => r.id);
    const { data: bids } = ids.length
      ? await supabaseAdmin
          .from("asset_bids")
          .select("asset_id, bid_amount")
          .in("asset_id", ids)
          .eq("status", "open")
      : { data: [] };

    const bidMap = new Map<string, { count: number; top: number }>();
    for (const b of bids ?? []) {
      const cur = bidMap.get(b.asset_id) ?? { count: 0, top: 0 };
      cur.count++;
      if (b.bid_amount > cur.top) cur.top = b.bid_amount;
      bidMap.set(b.asset_id, cur);
    }

    const assets: ImpactAsset[] = (rows ?? []).map((r) => {
      const profile = Array.isArray(r.profiles) ? r.profiles[0] : r.profiles;
      const bd = bidMap.get(r.id);
      return {
        id: r.id,
        owner_user_id: r.owner_user_id,
        owner_name: (profile as { display_name: string | null } | null)?.display_name ?? null,
        kind: r.kind as AssetKind,
        title: r.title,
        description: r.description,
        quantity: r.quantity,
        unit: r.unit,
        verification_score: Number(r.verification_score),
        status: r.status as AssetStatus,
        ask_price_usd: r.ask_price_usd ? Number(r.ask_price_usd) : null,
        currency: r.currency,
        region: r.region,
        sector: r.sector,
        sdg_tags: r.sdg_tags ?? [],
        minted_at: r.minted_at,
        bid_count: bd?.count ?? 0,
        top_bid: bd?.top ?? null,
      };
    });

    return assets;
  });

// ── Mint a new asset ──────────────────────────────────────────────────────────

const MintInput = z.object({
  kind: z.enum(["job","business_funded","tree_planted","household_reached","student_educated","co2_offset","water_access","loan_repaid"]),
  title: z.string().min(5).max(120),
  description: z.string().max(1000).optional(),
  quantity: z.number().int().min(1).max(100_000),
  unit: z.string().min(1).max(30),
  ask_price_usd: z.number().min(0).optional(),
  region: z.string().max(80).optional(),
  sector: z.string().max(80).optional(),
  sdg_tags: z.array(z.string()).max(6).default([]),
  verification_event_id: z.string().uuid().optional(),
  funding_request_id: z.string().uuid().optional(),
});

export const mintAsset = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => MintInput.parse(d))
  .handler(async ({ data, context }) => {
    await requireFeature(context.userId, "rve_mint");
    const { userId } = context;

    const { data: asset, error } = await supabaseAdmin
      .from("impact_assets")
      .insert({
        owner_user_id: userId,
        kind: data.kind,
        title: data.title,
        description: data.description ?? null,
        quantity: data.quantity,
        unit: data.unit,
        ask_price_usd: data.ask_price_usd ?? null,
        region: data.region ?? null,
        sector: data.sector ?? null,
        sdg_tags: data.sdg_tags,
        verification_event_id: data.verification_event_id ?? null,
        funding_request_id: data.funding_request_id ?? null,
        status: "listed",
        verification_score: 0.8,
      })
      .select("id, kind, title, quantity, status")
      .single();

    if (error) throw new Error(error.message);

    void recordAgentEvent({
      userId,
      agent: "Impact Agent",
      action: "asset.mint",
      outcome: "answered",
      metadata: { assetId: asset.id, kind: data.kind, quantity: data.quantity },
    });

    return asset;
  });

// ── Place a bid ───────────────────────────────────────────────────────────────

const BidInput = z.object({
  asset_id: z.string().uuid(),
  bid_amount: z.number().positive(),
  message: z.string().max(500).optional(),
});

export const placeBid = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => BidInput.parse(d))
  .handler(async ({ data, context }) => {
    const { userId } = context;

    // Can't bid on own asset
    const { data: asset } = await supabaseAdmin
      .from("impact_assets")
      .select("owner_user_id, status, title")
      .eq("id", data.asset_id)
      .single();

    if (!asset) throw new Error("Asset not found.");
    if (asset.status !== "listed") throw new Error("Asset is no longer available.");
    if (asset.owner_user_id === userId) throw new Error("You cannot bid on your own asset.");

    const { data: bid, error } = await supabaseAdmin
      .from("asset_bids")
      .insert({
        asset_id: data.asset_id,
        bidder_id: userId,
        bid_amount: data.bid_amount,
        message: data.message ?? null,
        status: "open",
      })
      .select("id, bid_amount, status")
      .single();

    if (error) throw new Error(error.message);

    // Notify asset owner
    await supabaseAdmin.rpc("notify_user", {
      _user: asset.owner_user_id,
      _kind: "new_bid",
      _title: `New bid on "${asset.title}"`,
      _body: `$${data.bid_amount.toLocaleString()} offer received.`,
      _link: "/regenerative",
      _metadata: { bid_id: bid.id, asset_id: data.asset_id },
    });

    return bid;
  });

// ── Accept a bid ──────────────────────────────────────────────────────────────

export const acceptBid = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ bid_id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { userId } = context;

    const { data: result, error } = await supabaseAdmin.rpc("accept_asset_bid", {
      _bid_id: data.bid_id,
      _actor_id: userId,
    });

    if (error) throw new Error(error.message);

    void recordAgentEvent({
      userId,
      agent: "Impact Agent",
      action: "asset.sale",
      outcome: "answered",
      metadata: result as Record<string, unknown>,
    });

    return result as { tx_id: string; amount: number; fee: number; net: number };
  });

// ── Withdraw a listing ────────────────────────────────────────────────────────

export const withdrawAsset = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ asset_id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    const { userId } = context;

    const { error } = await supabaseAdmin
      .from("impact_assets")
      .update({ status: "withdrawn" })
      .eq("id", data.asset_id)
      .eq("owner_user_id", userId)
      .eq("status", "listed");

    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ── Bids on a specific asset ──────────────────────────────────────────────────

export const getAssetBids = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({ asset_id: z.string().uuid() }).parse(d))
  .handler(async ({ data }) => {
    const { data: bids, error } = await supabaseAdmin
      .from("asset_bids")
      .select(`
        id, asset_id, bidder_id, bid_amount, currency, message, status, created_at,
        profiles!asset_bids_bidder_id_fkey(display_name)
      `)
      .eq("asset_id", data.asset_id)
      .order("bid_amount", { ascending: false });

    if (error) throw new Error(error.message);

    return (bids ?? []).map((b) => {
      const profile = Array.isArray(b.profiles) ? b.profiles[0] : b.profiles;
      return {
        id: b.id,
        asset_id: b.asset_id,
        bidder_id: b.bidder_id,
        bidder_name: (profile as { display_name: string | null } | null)?.display_name ?? null,
        bid_amount: Number(b.bid_amount),
        currency: b.currency,
        message: b.message,
        status: b.status,
        created_at: b.created_at,
      } as AssetBid;
    });
  });

// ── Marketplace stats ─────────────────────────────────────────────────────────

export const getMarketplaceStats = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({}).parse(d ?? {}))
  .handler(async () => {
    const [{ data: statsRow }, { data: txRows }] = await Promise.all([
      supabaseAdmin.from("rve_marketplace_stats" as never).select("*").single(),
      supabaseAdmin
        .from("asset_transactions")
        .select("amount_usd, settled_at")
        .gte("settled_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()),
    ]);

    const volume30d = (txRows ?? []).reduce((s, r) => s + Number(r.amount_usd), 0);
    const row = (statsRow as Record<string, number> | null) ?? {};

    return {
      total_assets: Number(row.total_assets ?? 0),
      listed: Number(row.listed ?? 0),
      sold: Number(row.sold ?? 0),
      total_listed_value: Number(row.total_listed_value ?? 0),
      asset_types: Number(row.asset_types ?? 0),
      unique_sellers: Number(row.unique_sellers ?? 0),
      volume_30d: volume30d,
    } as MarketplaceStats;
  });

// ── My assets ─────────────────────────────────────────────────────────────────

export const getMyAssets = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => z.object({}).parse(d ?? {}))
  .handler(async ({ context }) => {
    const { userId } = context;

    const { data: rows, error } = await supabaseAdmin
      .from("impact_assets")
      .select("id, kind, title, quantity, unit, status, ask_price_usd, minted_at, verification_score")
      .eq("owner_user_id", userId)
      .order("minted_at", { ascending: false });

    if (error) throw new Error(error.message);
    return rows ?? [];
  });
