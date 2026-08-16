import { c as createServerRpc } from "./createServerRpc-OUntGHR3.mjs";
import { c as createServerFn } from "./server-D6kup5O1.mjs";
import { r as requireSupabaseAuth } from "./auth-middleware-D86cXXU7.mjs";
import { supabaseAdmin } from "./client.server-D5ro3rAQ.mjs";
import { r as recordAgentEvent } from "./observability.server-CSo3iCeb.mjs";
import { r as requireFeature } from "./entitlements.server-Dp7K62E0.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { g as objectType, h as numberType, i as stringType, j as arrayType, k as enumType } from "../_libs/zod.mjs";
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
import "./entitlements-DDmJ5IMx.mjs";
const ListInput = objectType({
  kind: stringType().optional(),
  status: stringType().optional(),
  limit: numberType().int().min(1).max(50).default(24),
  offset: numberType().int().min(0).default(0)
});
const listAssets_createServerFn_handler = createServerRpc({
  id: "6f447bce8f185537ca3de1b8c6d1914fb2ff8edaae8cd36a3db6070bef9ee3ab",
  name: "listAssets",
  filename: "src/lib/regenerative.functions.ts"
}, (opts) => listAssets.__executeServer(opts));
const listAssets = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => ListInput.parse(d)).handler(listAssets_createServerFn_handler, async ({
  data
}) => {
  let q = supabaseAdmin.from("impact_assets").select(`
        id, owner_user_id, kind, title, description, quantity, unit,
        verification_score, status, ask_price_usd, currency,
        region, sector, sdg_tags, minted_at
      `).order("minted_at", {
    ascending: false
  }).range(data.offset, data.offset + data.limit - 1);
  if (data.kind) q = q.eq("kind", data.kind);
  if (data.status) q = q.eq("status", data.status);
  else q = q.eq("status", "listed");
  const {
    data: rows,
    error
  } = await q;
  if (error) throw new Error(error.message);
  const ids = (rows ?? []).map((r) => r.id);
  const {
    data: bids
  } = ids.length ? await supabaseAdmin.from("asset_bids").select("asset_id, bid_amount").in("asset_id", ids).eq("status", "open") : {
    data: []
  };
  const ownerIds = Array.from(new Set((rows ?? []).map((r) => r.owner_user_id)));
  const {
    data: profileRows
  } = ownerIds.length ? await supabaseAdmin.from("profiles").select("user_id, display_name").in("user_id", ownerIds) : {
    data: []
  };
  const nameMap = new Map((profileRows ?? []).map((p) => [p.user_id, p.display_name]));
  const bidMap = /* @__PURE__ */ new Map();
  for (const b of bids ?? []) {
    const cur = bidMap.get(b.asset_id) ?? {
      count: 0,
      top: 0
    };
    cur.count++;
    if (b.bid_amount > cur.top) cur.top = b.bid_amount;
    bidMap.set(b.asset_id, cur);
  }
  const assets = (rows ?? []).map((r) => {
    const bd = bidMap.get(r.id);
    return {
      id: r.id,
      owner_user_id: r.owner_user_id,
      owner_name: nameMap.get(r.owner_user_id) ?? null,
      kind: r.kind,
      title: r.title,
      description: r.description,
      quantity: r.quantity,
      unit: r.unit,
      verification_score: Number(r.verification_score),
      status: r.status,
      ask_price_usd: r.ask_price_usd ? Number(r.ask_price_usd) : null,
      currency: r.currency,
      region: r.region,
      sector: r.sector,
      sdg_tags: r.sdg_tags ?? [],
      minted_at: r.minted_at,
      bid_count: bd?.count ?? 0,
      top_bid: bd?.top ?? null
    };
  });
  return assets;
});
const MintInput = objectType({
  kind: enumType(["job", "business_funded", "tree_planted", "household_reached", "student_educated", "co2_offset", "water_access", "loan_repaid"]),
  title: stringType().min(5).max(120),
  description: stringType().max(1e3).optional(),
  quantity: numberType().int().min(1).max(1e5),
  unit: stringType().min(1).max(30),
  ask_price_usd: numberType().min(0).optional(),
  region: stringType().max(80).optional(),
  sector: stringType().max(80).optional(),
  sdg_tags: arrayType(stringType()).max(6).default([]),
  verification_event_id: stringType().uuid().optional(),
  funding_request_id: stringType().uuid().optional()
});
const mintAsset_createServerFn_handler = createServerRpc({
  id: "8db62e34345bda55f585a5eb74903b1e6e8394314a653c5332caa71b8af371ef",
  name: "mintAsset",
  filename: "src/lib/regenerative.functions.ts"
}, (opts) => mintAsset.__executeServer(opts));
const mintAsset = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => MintInput.parse(d)).handler(mintAsset_createServerFn_handler, async ({
  data,
  context
}) => {
  await requireFeature(context.userId, "rve_mint");
  const {
    userId
  } = context;
  const {
    data: asset,
    error
  } = await supabaseAdmin.from("impact_assets").insert({
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
    verification_score: 0.8
  }).select("id, kind, title, quantity, status").single();
  if (error) throw new Error(error.message);
  void recordAgentEvent({
    userId,
    agent: "Impact Agent",
    action: "asset.mint",
    outcome: "answered",
    metadata: {
      assetId: asset.id,
      kind: data.kind,
      quantity: data.quantity
    }
  });
  return asset;
});
const BidInput = objectType({
  asset_id: stringType().uuid(),
  bid_amount: numberType().positive(),
  message: stringType().max(500).optional()
});
const placeBid_createServerFn_handler = createServerRpc({
  id: "287be1ea4ad886603b2408b364e09e026bd8ee0aab6326277ea46c0418e53f43",
  name: "placeBid",
  filename: "src/lib/regenerative.functions.ts"
}, (opts) => placeBid.__executeServer(opts));
const placeBid = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => BidInput.parse(d)).handler(placeBid_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    userId
  } = context;
  const {
    data: asset
  } = await supabaseAdmin.from("impact_assets").select("owner_user_id, status, title").eq("id", data.asset_id).single();
  if (!asset) throw new Error("Asset not found.");
  if (asset.status !== "listed") throw new Error("Asset is no longer available.");
  if (asset.owner_user_id === userId) throw new Error("You cannot bid on your own asset.");
  const {
    data: bid,
    error
  } = await supabaseAdmin.from("asset_bids").insert({
    asset_id: data.asset_id,
    bidder_id: userId,
    bid_amount: data.bid_amount,
    message: data.message ?? null,
    status: "open"
  }).select("id, bid_amount, status").single();
  if (error) throw new Error(error.message);
  await supabaseAdmin.rpc("notify_user", {
    _user: asset.owner_user_id,
    _kind: "new_bid",
    _title: `New bid on "${asset.title}"`,
    _body: `$${data.bid_amount.toLocaleString()} offer received.`,
    _link: "/regenerative",
    _metadata: {
      bid_id: bid.id,
      asset_id: data.asset_id
    }
  });
  return bid;
});
const acceptBid_createServerFn_handler = createServerRpc({
  id: "7e029e74da617aaea18a9a215343a7fd5f262f3cb87fd445347e545360a815ae",
  name: "acceptBid",
  filename: "src/lib/regenerative.functions.ts"
}, (opts) => acceptBid.__executeServer(opts));
const acceptBid = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  bid_id: stringType().uuid()
}).parse(d)).handler(acceptBid_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    userId
  } = context;
  const {
    data: result,
    error
  } = await supabaseAdmin.rpc("accept_asset_bid", {
    _bid_id: data.bid_id,
    _actor_id: userId
  });
  if (error) throw new Error(error.message);
  void recordAgentEvent({
    userId,
    agent: "Impact Agent",
    action: "asset.sale",
    outcome: "answered",
    metadata: result
  });
  return result;
});
const withdrawAsset_createServerFn_handler = createServerRpc({
  id: "191e3fd948f808983676d96e059e913f25568771489aa8c209ba3f0e336a66a4",
  name: "withdrawAsset",
  filename: "src/lib/regenerative.functions.ts"
}, (opts) => withdrawAsset.__executeServer(opts));
const withdrawAsset = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  asset_id: stringType().uuid()
}).parse(d)).handler(withdrawAsset_createServerFn_handler, async ({
  data,
  context
}) => {
  const {
    userId
  } = context;
  const {
    error
  } = await supabaseAdmin.from("impact_assets").update({
    status: "withdrawn"
  }).eq("id", data.asset_id).eq("owner_user_id", userId).eq("status", "listed");
  if (error) throw new Error(error.message);
  return {
    ok: true
  };
});
const getAssetBids_createServerFn_handler = createServerRpc({
  id: "0f4a61137b9972f1d7402eb0fa37fbc3e4f7f6cbd3a44d033af336ce770fd4cd",
  name: "getAssetBids",
  filename: "src/lib/regenerative.functions.ts"
}, (opts) => getAssetBids.__executeServer(opts));
const getAssetBids = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({
  asset_id: stringType().uuid()
}).parse(d)).handler(getAssetBids_createServerFn_handler, async ({
  data
}) => {
  const {
    data: bids,
    error
  } = await supabaseAdmin.from("asset_bids").select("id, asset_id, bidder_id, bid_amount, currency, message, status, created_at").eq("asset_id", data.asset_id).order("bid_amount", {
    ascending: false
  });
  if (error) throw new Error(error.message);
  const bidderIds = Array.from(new Set((bids ?? []).map((b) => b.bidder_id)));
  const {
    data: profileRows
  } = bidderIds.length ? await supabaseAdmin.from("profiles").select("user_id, display_name").in("user_id", bidderIds) : {
    data: []
  };
  const nameMap = new Map((profileRows ?? []).map((p) => [p.user_id, p.display_name]));
  return (bids ?? []).map((b) => {
    return {
      id: b.id,
      asset_id: b.asset_id,
      bidder_id: b.bidder_id,
      bidder_name: nameMap.get(b.bidder_id) ?? null,
      bid_amount: Number(b.bid_amount),
      currency: b.currency,
      message: b.message,
      status: b.status,
      created_at: b.created_at
    };
  });
});
const getMarketplaceStats_createServerFn_handler = createServerRpc({
  id: "67fb8654b8f24dc447935c2cd56e509a5f30fd76ddafea06255ec20302daf5bf",
  name: "getMarketplaceStats",
  filename: "src/lib/regenerative.functions.ts"
}, (opts) => getMarketplaceStats.__executeServer(opts));
const getMarketplaceStats = createServerFn({
  method: "POST"
}).inputValidator((d) => objectType({}).parse(d ?? {})).handler(getMarketplaceStats_createServerFn_handler, async () => {
  const [{
    data: statsRow
  }, {
    data: txRows
  }] = await Promise.all([supabaseAdmin.from("rve_marketplace_stats").select("*").single(), supabaseAdmin.from("asset_transactions").select("amount_usd, settled_at").gte("settled_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1e3).toISOString())]);
  const volume30d = (txRows ?? []).reduce((s, r) => s + Number(r.amount_usd), 0);
  const row = statsRow ?? {};
  return {
    total_assets: Number(row.total_assets ?? 0),
    listed: Number(row.listed ?? 0),
    sold: Number(row.sold ?? 0),
    total_listed_value: Number(row.total_listed_value ?? 0),
    asset_types: Number(row.asset_types ?? 0),
    unique_sellers: Number(row.unique_sellers ?? 0),
    volume_30d: volume30d
  };
});
const getMyAssets_createServerFn_handler = createServerRpc({
  id: "7d6a0139a87b66aa9c42a0d115a7ca01419029c3faa4027cbcfa398ddfe9d49c",
  name: "getMyAssets",
  filename: "src/lib/regenerative.functions.ts"
}, (opts) => getMyAssets.__executeServer(opts));
const getMyAssets = createServerFn({
  method: "POST"
}).middleware([requireSupabaseAuth]).inputValidator((d) => objectType({}).parse(d ?? {})).handler(getMyAssets_createServerFn_handler, async ({
  context
}) => {
  const {
    userId
  } = context;
  const {
    data: rows,
    error
  } = await supabaseAdmin.from("impact_assets").select("id, kind, title, quantity, unit, status, ask_price_usd, minted_at, verification_score").eq("owner_user_id", userId).order("minted_at", {
    ascending: false
  });
  if (error) throw new Error(error.message);
  return rows ?? [];
});
export {
  acceptBid_createServerFn_handler,
  getAssetBids_createServerFn_handler,
  getMarketplaceStats_createServerFn_handler,
  getMyAssets_createServerFn_handler,
  listAssets_createServerFn_handler,
  mintAsset_createServerFn_handler,
  placeBid_createServerFn_handler,
  withdrawAsset_createServerFn_handler
};
