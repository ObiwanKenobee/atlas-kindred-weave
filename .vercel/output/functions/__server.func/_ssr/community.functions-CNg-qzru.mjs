import { c as createServerRpc } from "./createServerRpc-OUntGHR3.mjs";
import { c as createServerFn } from "./server-D6kup5O1.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-D86cXXU7.mjs";
import { supabaseAdmin } from "./client.server-D5ro3rAQ.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const getCommunityFeed_createServerFn_handler = createServerRpc({
  id: "4b664f35cb234d9bf31df7814f41597079a0cd5070a34c813d6bd032861a1fcd",
  name: "getCommunityFeed",
  filename: "src/lib/community.functions.ts"
}, (opts) => getCommunityFeed.__executeServer(opts));
const getCommunityFeed = createServerFn({
  method: "GET"
}).inputValidator((d) => d).handler(getCommunityFeed_createServerFn_handler, async ({
  data
}) => {
  const limit = data.limit ?? 20;
  const query = supabaseAdmin.from("community_posts").select("id, user_id, content, category, likes, replies, created_at").order("created_at", {
    ascending: false
  }).limit(limit);
  if (data.category && data.category !== "all") {
    query.eq("category", data.category);
  }
  const {
    data: rows,
    error
  } = await query;
  if (error) throw new Error(error.message);
  const userIds = [...new Set((rows ?? []).map((r) => r.user_id))];
  const profileMap = /* @__PURE__ */ new Map();
  if (userIds.length > 0) {
    const {
      data: profiles
    } = await supabaseAdmin.from("profiles").select("user_id, display_name, trust_score, verified, region").in("user_id", userIds);
    for (const p of profiles ?? []) {
      profileMap.set(p.user_id, {
        display_name: p.display_name,
        trust_score: Number(p.trust_score ?? 0),
        verified: Boolean(p.verified),
        region: p.region
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
      category: r.category,
      likes: r.likes ?? 0,
      replies: r.replies ?? 0,
      created_at: r.created_at
    };
  });
});
const createCommunityPost_createServerFn_handler = createServerRpc({
  id: "6142a0706f7116286937c964079522c3e9b06a18f8d353be57cba5fe165ed4a2",
  name: "createCommunityPost",
  filename: "src/lib/community.functions.ts"
}, (opts) => createCommunityPost.__executeServer(opts));
const createCommunityPost = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(createCommunityPost_createServerFn_handler, async ({
  data,
  context
}) => {
  const userId = context.userId;
  const {
    data: post,
    error
  } = await supabaseAdmin.from("community_posts").insert({
    user_id: userId,
    content: data.content,
    category: data.category,
    likes: 0,
    replies: 0
  }).select().single();
  if (error) throw new Error(error.message);
  return post;
});
const likeCommunityPost_createServerFn_handler = createServerRpc({
  id: "6866875bd38c2a0b4abd2b1d12bbd6901138376265e10c8c77f43a511c9619fb",
  name: "likeCommunityPost",
  filename: "src/lib/community.functions.ts"
}, (opts) => likeCommunityPost.__executeServer(opts));
const likeCommunityPost = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => d).handler(likeCommunityPost_createServerFn_handler, async ({
  data
}) => {
  const {
    error
  } = await supabaseAdmin.rpc("increment_post_likes", {
    post_id: data.postId
  });
  if (error) {
    const {
      data: current
    } = await supabaseAdmin.from("community_posts").select("likes").eq("id", data.postId).single();
    await supabaseAdmin.from("community_posts").update({
      likes: (current?.likes ?? 0) + 1
    }).eq("id", data.postId);
  }
  return {
    success: true
  };
});
const getCommunityMembers_createServerFn_handler = createServerRpc({
  id: "d14ea0ab5270d89c28f65310cc04d093fb5189b1a84003cc41ce42b91c774045",
  name: "getCommunityMembers",
  filename: "src/lib/community.functions.ts"
}, (opts) => getCommunityMembers.__executeServer(opts));
const getCommunityMembers = createServerFn({
  method: "GET"
}).inputValidator((d) => d).handler(getCommunityMembers_createServerFn_handler, async ({
  data
}) => {
  const limit = data.limit ?? 12;
  const query = supabaseAdmin.from("profiles").select("user_id, display_name, region, trust_score, verified, bio").order("trust_score", {
    ascending: false
  }).limit(limit);
  if (data.region) query.eq("region", data.region);
  const {
    data: members,
    error
  } = await query;
  if (error) throw new Error(error.message);
  const userIds = (members ?? []).map((m) => m.user_id);
  const {
    data: funding
  } = await supabaseAdmin.from("funding_requests").select("user_id, amount_requested").in("user_id", userIds).eq("human_approval", "approved");
  const capitalByUser = {};
  const countByUser = {};
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
    capital_accessed: capitalByUser[m.user_id] ?? 0
  }));
});
export {
  createCommunityPost_createServerFn_handler,
  getCommunityFeed_createServerFn_handler,
  getCommunityMembers_createServerFn_handler,
  likeCommunityPost_createServerFn_handler
};
