import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export type CommunityPost = {
  id: string;
  user_id: string;
  author_name: string | null;
  author_trust: number;
  author_verified: boolean;
  author_region: string | null;
  content: string;
  category: "milestone" | "question" | "opportunity" | "update" | "success";
  likes: number;
  replies: number;
  created_at: string;
};

export type CommunityMember = {
  user_id: string;
  display_name: string | null;
  region: string | null;
  trust_score: number;
  verified: boolean;
  bio: string | null;
  business_count: number;
  capital_accessed: number;
};

export const getCommunityFeed = createServerFn({ method: "GET" })
  .inputValidator((d: { category?: string; limit?: number }) => d)
  .handler(async ({ data }) => {
    const limit = data.limit ?? 20;

    // Fetch posts, then profiles separately (no FK between the two tables)
    const query = supabaseAdmin
      .from("community_posts")
      .select("id, user_id, content, category, likes, replies, created_at")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (data.category && data.category !== "all") {
      query.eq("category", data.category);
    }

    const { data: rows, error } = await query;
    if (error) throw new Error(error.message);

    const userIds = [...new Set((rows ?? []).map((r) => r.user_id))];
    const profileMap = new Map<
      string,
      { display_name: string | null; trust_score: number; verified: boolean; region: string | null }
    >();

    if (userIds.length > 0) {
      const { data: profiles } = await supabaseAdmin
        .from("profiles")
        .select("user_id, display_name, trust_score, verified, region")
        .in("user_id", userIds);
      for (const p of profiles ?? []) {
        profileMap.set(p.user_id, {
          display_name: p.display_name,
          trust_score: Number(p.trust_score ?? 0),
          verified: Boolean(p.verified),
          region: p.region,
        });
      }
    }

    return (rows ?? []).map((r) => {
      const p = profileMap.get(r.user_id);
      return {
        id: r.id,
        user_id: r.user_id,
        author_name: p?.display_name ?? null,
        author_trust: p?.trust_score ?? 0,
        author_verified: p?.verified ?? false,
        author_region: p?.region ?? null,
        content: r.content,
        category: r.category as CommunityPost["category"],
        likes: r.likes ?? 0,
        replies: r.replies ?? 0,
        created_at: r.created_at,
      } satisfies CommunityPost;
    });
  });


export const createCommunityPost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { content: string; category: CommunityPost["category"] }) => d)
  .handler(async ({ data, context }) => {
    const userId = context.userId;

    const { data: post, error } = await supabaseAdmin
      .from("community_posts")
      .insert({
        user_id: userId,
        content: data.content,
        category: data.category,
        likes: 0,
        replies: 0,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return post;
  });

export const likeCommunityPost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: { postId: string }) => d)
  .handler(async ({ data }) => {

    // Use rpc to atomically increment
    const { error } = await supabaseAdmin.rpc("increment_post_likes", {
      post_id: data.postId,
    });

    // Fallback: manual increment if rpc doesn't exist yet
    if (error) {
      const { data: current } = await supabaseAdmin
        .from("community_posts")
        .select("likes")
        .eq("id", data.postId)
        .single();
      await supabaseAdmin
        .from("community_posts")
        .update({ likes: (current?.likes ?? 0) + 1 })
        .eq("id", data.postId);
    }

    return { success: true };
  });

export const getCommunityMembers = createServerFn({ method: "GET" })
  .inputValidator((d: { limit?: number; region?: string }) => d)
  .handler(async ({ data }) => {
    const limit = data.limit ?? 12;

    const query = supabaseAdmin
      .from("profiles")
      .select("user_id, display_name, region, trust_score, verified, bio")
      .order("trust_score", { ascending: false })
      .limit(limit);

    if (data.region) query.eq("region", data.region);

    const { data: members, error } = await query;
    if (error) throw new Error(error.message);

    // Enrich with funding stats
    const userIds = (members ?? []).map((m) => m.user_id);
    const { data: funding } = await supabaseAdmin
      .from("funding_requests")
      .select("user_id, amount_requested")
      .in("user_id", userIds)
      .eq("human_approval", "approved");

    const capitalByUser: Record<string, number> = {};
    const countByUser: Record<string, number> = {};
    for (const f of funding ?? []) {
      capitalByUser[f.user_id] = (capitalByUser[f.user_id] ?? 0) + Number(f.amount_requested);
      countByUser[f.user_id] = (countByUser[f.user_id] ?? 0) + 1;
    }

    return (members ?? []).map((m) => ({
      user_id: m.user_id,
      display_name: m.display_name,
      region: m.region,
      trust_score: m.trust_score,
      verified: m.verified,
      bio: m.bio,
      business_count: countByUser[m.user_id] ?? 0,
      capital_accessed: capitalByUser[m.user_id] ?? 0,
    } satisfies CommunityMember));
  });
