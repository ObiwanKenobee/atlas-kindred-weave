import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useMemo, useState } from "react";
import { SANCTUM_MODULES } from "@/lib/modules";
import {
  listAssets,
  mintAsset,
  placeBid,
  acceptBid,
  withdrawAsset,
  getAssetBids,
  getMarketplaceStats,
  getMyAssets,
  type ImpactAsset,
  type AssetBid,
  type AssetKind,
  type MarketplaceStats,
} from "@/lib/regenerative.functions";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Recycle, Loader2, RefreshCw, Sparkles, Leaf, Briefcase, TreePine,
  Home, GraduationCap, Cloud, Droplets, HandCoins, Gavel, ShieldCheck,
  TrendingUp, PlusCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/lib/auth";
import { useEntitlements } from "@/lib/use-entitlements";
import { Link } from "@tanstack/react-router";

const m = SANCTUM_MODULES.find((x) => x.slug === "regenerative")!;

export const Route = createFileRoute("/regenerative")({
  head: () => ({
    meta: [
      { title: `${m.name} — Atlas Sanctum` },
      { name: "description", content: m.purpose },
    ],
  }),
  component: RegenerativePage,
});

const KIND_META: Record<AssetKind, { label: string; icon: typeof Leaf; unit: string }> = {
  job:                { label: "Jobs created",       icon: Briefcase,     unit: "jobs" },
  business_funded:    { label: "Businesses funded",  icon: HandCoins,     unit: "businesses" },
  tree_planted:       { label: "Trees planted",      icon: TreePine,      unit: "trees" },
  household_reached:  { label: "Households reached", icon: Home,          unit: "households" },
  student_educated:   { label: "Students educated",  icon: GraduationCap, unit: "students" },
  co2_offset:         { label: "CO₂ offset",         icon: Cloud,         unit: "tons CO₂e" },
  water_access:       { label: "Water access",       icon: Droplets,      unit: "people" },
  loan_repaid:        { label: "Loans repaid",       icon: ShieldCheck,   unit: "loans" },
};

const KIND_KEYS = Object.keys(KIND_META) as AssetKind[];

const fmtUSD = (n: number | null | undefined) =>
  n == null ? "—" : `$${Number(n).toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
const fmtNum = (n: number) => n.toLocaleString();

function RegenerativePage() {
  const { user } = useAuth();
  const [stats, setStats] = useState<MarketplaceStats | null>(null);
  const [assets, setAssets] = useState<ImpactAsset[]>([]);
  const [mine, setMine] = useState<Awaited<ReturnType<typeof getMyAssets>>>([]);
  const [loading, setLoading] = useState(true);
  const [kindFilter, setKindFilter] = useState<string>("all");
  const [refreshing, setRefreshing] = useState(false);

  const runList = useServerFn(listAssets);
  const runStats = useServerFn(getMarketplaceStats);
  const runMine = useServerFn(getMyAssets);

  const load = async () => {
    setRefreshing(true);
    try {
      const [a, s, mm] = await Promise.all([
        runList({ data: { kind: kindFilter === "all" ? undefined : kindFilter, limit: 24, offset: 0 } }),
        runStats({ data: {} }),
        user ? runMine({ data: {} }) : Promise.resolve([]),
      ]);
      setAssets(a);
      setStats(s);
      setMine(mm as typeof mine);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to load marketplace");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => { void load(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [kindFilter, user?.id]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <header className="flex flex-wrap items-start justify-between gap-6 border-b border-border/60 pb-8">
        <div>
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-gold/80">
            <span className="font-display">{m.glyph}</span>
            <span>Engine — Regenerative Value Exchange</span>
          </div>
          <h1 className="mt-3 font-display text-4xl">{m.name}</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">{m.tagline} — {m.purpose}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={load} disabled={refreshing}>
            <RefreshCw className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`} /> Refresh
          </Button>
          {user && <MintGate onCreated={load} />}
        </div>
      </header>

      <div className="mt-8 grid gap-4 md:grid-cols-4">
        <StatCard label="Outcomes listed" value={stats ? fmtNum(stats.listed) : "—"} icon={Recycle} />
        <StatCard label="Volume (30d)"   value={stats ? fmtUSD(stats.volume_30d) : "—"}    icon={TrendingUp} />
        <StatCard label="Listed value"   value={stats ? fmtUSD(stats.total_listed_value) : "—"} icon={HandCoins} />
        <StatCard label="Unique sellers" value={stats ? fmtNum(stats.unique_sellers) : "—"} icon={Sparkles} />
      </div>

      <Tabs defaultValue="market" className="mt-10">
        <TabsList>
          <TabsTrigger value="market">Marketplace</TabsTrigger>
          <TabsTrigger value="mine" disabled={!user}>My listings</TabsTrigger>
        </TabsList>

        <TabsContent value="market" className="mt-6">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <Label className="text-xs uppercase tracking-widest text-muted-foreground">Filter by outcome</Label>
            <Select value={kindFilter} onValueChange={setKindFilter}>
              <SelectTrigger className="w-64"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All outcomes</SelectItem>
                {KIND_KEYS.map((k) => (
                  <SelectItem key={k} value={k}>{KIND_META[k].label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-24 text-muted-foreground">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading marketplace…
            </div>
          ) : assets.length === 0 ? (
            <EmptyState
              title="No outcomes listed yet"
              body="Verified impact — jobs, trees, kilowatts, businesses funded — becomes tradeable here. Mint the first one."
            />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {assets.map((a) => (
                <AssetCard key={a.id} asset={a} onChanged={load} viewerId={user?.id} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="mine" className="mt-6">
          {mine.length === 0 ? (
            <EmptyState title="You haven't minted any impact assets yet" body="Convert your verified outcomes into tradeable certificates from the Mint button above." />
          ) : (
            <div className="grid gap-3">
              {mine.map((a) => {
                const meta = KIND_META[a.kind as AssetKind];
                const Icon = meta.icon;
                return (
                  <Card key={a.id} className="glyph-border flex flex-wrap items-center justify-between gap-4 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary/60">
                        <Icon className="h-5 w-5 text-gold" />
                      </div>
                      <div>
                        <div className="font-display text-lg">{a.title}</div>
                        <div className="text-xs text-muted-foreground">
                          {fmtNum(a.quantity)} {a.unit} · minted {new Date(a.minted_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="border-gold/40 uppercase tracking-widest">{a.status}</Badge>
                      <span className="font-display text-lg text-gold">{fmtUSD(a.ask_price_usd)}</span>
                      {a.status === "listed" && (
                        <WithdrawButton assetId={a.id} onDone={load} />
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function StatCard({ label, value, icon: Icon }: { label: string; value: string; icon: typeof Leaf }) {
  return (
    <Card className="glyph-border p-5">
      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
        <Icon className="h-4 w-4 text-gold" />
      </div>
      <div className="mt-2 font-display text-3xl">{value}</div>
    </Card>
  );
}

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <Card className="glyph-border p-12 text-center">
      <Recycle className="mx-auto h-8 w-8 text-gold" />
      <div className="mt-4 font-display text-xl">{title}</div>
      <p className="mt-2 text-sm text-muted-foreground">{body}</p>
    </Card>
  );
}

function AssetCard({ asset, onChanged, viewerId }: { asset: ImpactAsset; onChanged: () => void; viewerId?: string }) {
  const meta = KIND_META[asset.kind];
  const Icon = meta.icon;
  const isOwner = viewerId === asset.owner_user_id;

  return (
    <Card className="glyph-border flex flex-col p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-gradient-moss">
            <Icon className="h-5 w-5 text-gold" />
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-widest text-gold/80">{meta.label}</div>
            <div className="font-display text-lg leading-tight">{asset.title}</div>
          </div>
        </div>
        <Badge variant="outline" className="border-gold/40 text-[10px] uppercase tracking-widest">
          {Math.round(asset.verification_score * 100)}% verified
        </Badge>
      </div>

      {asset.description && (
        <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{asset.description}</p>
      )}

      <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
        <div>
          <div className="uppercase tracking-widest text-muted-foreground">Quantity</div>
          <div className="mt-1 font-display text-base">{fmtNum(asset.quantity)} {asset.unit}</div>
        </div>
        <div>
          <div className="uppercase tracking-widest text-muted-foreground">Ask</div>
          <div className="mt-1 font-display text-base text-gold">{fmtUSD(asset.ask_price_usd)}</div>
        </div>
        <div>
          <div className="uppercase tracking-widest text-muted-foreground">Seller</div>
          <div className="mt-1">{asset.owner_name ?? "Sanctum member"}</div>
        </div>
        <div>
          <div className="uppercase tracking-widest text-muted-foreground">Region</div>
          <div className="mt-1">{asset.region ?? "Global"}</div>
        </div>
      </div>

      {asset.sdg_tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {asset.sdg_tags.map((t) => (
            <Badge key={t} variant="secondary" className="text-[10px]">{t}</Badge>
          ))}
        </div>
      )}

      <div className="mt-4 flex items-center justify-between border-t border-border/40 pt-3 text-xs text-muted-foreground">
        <span>{asset.bid_count} bid{asset.bid_count === 1 ? "" : "s"}{asset.top_bid ? ` · top ${fmtUSD(asset.top_bid)}` : ""}</span>
        {isOwner ? (
          <BidsDialog asset={asset} onChanged={onChanged} isOwner />
        ) : viewerId ? (
          <BidDialog asset={asset} onPlaced={onChanged} />
        ) : (
          <span className="text-xs italic">Sign in to bid</span>
        )}
      </div>
    </Card>
  );
}

function MintGate({ onCreated }: { onCreated: () => void }) {
  const ent = useEntitlements();
  if (ent.can("rve_mint")) return <MintDialog onCreated={onCreated} />;
  return (
    <Button variant="outline" asChild className="border-gold/40 text-gold">
      <Link to="/pricing">
        <PlusCircle className="h-4 w-4 mr-1.5" /> Mint outcome — {ent.requiredPlanLabel("rve_mint")}+
      </Link>
    </Button>
  );
}

function MintDialog({ onCreated }: { onCreated: () => void }) {
  const runMint = useServerFn(mintAsset);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    kind: "tree_planted" as AssetKind,
    title: "",
    description: "",
    quantity: 100,
    ask_price_usd: 500,
    region: "",
    sector: "",
    sdg_tags: "",
  });
  const unit = useMemo(() => KIND_META[form.kind].unit, [form.kind]);

  const submit = async () => {
    setBusy(true);
    try {
      await runMint({
        data: {
          kind: form.kind,
          title: form.title,
          description: form.description || undefined,
          quantity: Number(form.quantity),
          unit,
          ask_price_usd: form.ask_price_usd ? Number(form.ask_price_usd) : undefined,
          region: form.region || undefined,
          sector: form.sector || undefined,
          sdg_tags: form.sdg_tags.split(",").map((s) => s.trim()).filter(Boolean).slice(0, 6),
        },
      });
      toast.success("Impact asset minted and listed");
      setOpen(false);
      onCreated();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Mint failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-gold text-gold-foreground shadow-glow hover:opacity-90">
          <PlusCircle className="h-4 w-4" /> Mint outcome
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display">Mint an impact asset</DialogTitle>
          <DialogDescription>Convert a verified outcome into a tradeable certificate.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <div className="grid gap-1.5">
            <Label>Outcome type</Label>
            <Select value={form.kind} onValueChange={(v) => setForm((f) => ({ ...f, kind: v as AssetKind }))}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {KIND_KEYS.map((k) => (
                  <SelectItem key={k} value={k}>{KIND_META[k].label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1.5">
            <Label>Title</Label>
            <Input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} placeholder="e.g. 500 trees planted, Kilifi county" />
          </div>
          <div className="grid gap-1.5">
            <Label>Description</Label>
            <Textarea value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} rows={3} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1.5">
              <Label>Quantity ({unit})</Label>
              <Input type="number" value={form.quantity} onChange={(e) => setForm((f) => ({ ...f, quantity: Number(e.target.value) }))} />
            </div>
            <div className="grid gap-1.5">
              <Label>Ask price (USD)</Label>
              <Input type="number" value={form.ask_price_usd} onChange={(e) => setForm((f) => ({ ...f, ask_price_usd: Number(e.target.value) }))} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1.5">
              <Label>Region</Label>
              <Input value={form.region} onChange={(e) => setForm((f) => ({ ...f, region: e.target.value }))} placeholder="East Africa" />
            </div>
            <div className="grid gap-1.5">
              <Label>Sector</Label>
              <Input value={form.sector} onChange={(e) => setForm((f) => ({ ...f, sector: e.target.value }))} placeholder="Agroforestry" />
            </div>
          </div>
          <div className="grid gap-1.5">
            <Label>SDG tags (comma-separated)</Label>
            <Input value={form.sdg_tags} onChange={(e) => setForm((f) => ({ ...f, sdg_tags: e.target.value }))} placeholder="SDG-13, SDG-15" />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={submit} disabled={busy || form.title.length < 5 || form.quantity < 1}>
            {busy && <Loader2 className="h-4 w-4 animate-spin" />} Mint & list
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function BidDialog({ asset, onPlaced }: { asset: ImpactAsset; onPlaced: () => void }) {
  const runBid = useServerFn(placeBid);
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [amount, setAmount] = useState<number>(asset.ask_price_usd ?? Math.max((asset.top_bid ?? 0) + 50, 100));
  const [message, setMessage] = useState("");

  const submit = async () => {
    setBusy(true);
    try {
      await runBid({ data: { asset_id: asset.id, bid_amount: Number(amount), message: message || undefined } });
      toast.success("Bid placed");
      setOpen(false);
      onPlaced();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Bid failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline"><Gavel className="h-3.5 w-3.5" /> Bid</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-display">Bid on "{asset.title}"</DialogTitle>
          <DialogDescription>Seller's ask is {fmtUSD(asset.ask_price_usd)}. Bids are non-binding until accepted.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <div className="grid gap-1.5">
            <Label>Amount (USD)</Label>
            <Input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
          </div>
          <div className="grid gap-1.5">
            <Label>Message to seller (optional)</Label>
            <Textarea rows={3} value={message} onChange={(e) => setMessage(e.target.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={submit} disabled={busy || amount <= 0}>
            {busy && <Loader2 className="h-4 w-4 animate-spin" />} Place bid
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function BidsDialog({ asset, onChanged }: { asset: ImpactAsset; onChanged: () => void; isOwner: boolean }) {
  const runList = useServerFn(getAssetBids);
  const runAccept = useServerFn(acceptBid);
  const [open, setOpen] = useState(false);
  const [bids, setBids] = useState<AssetBid[]>([]);
  const [loading, setLoading] = useState(false);
  const [acceptingId, setAcceptingId] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    runList({ data: { asset_id: asset.id } })
      .then(setBids)
      .catch((e) => toast.error(e instanceof Error ? e.message : "Failed to load bids"))
      .finally(() => setLoading(false));
  }, [open, asset.id, runList]);

  const accept = async (bid: AssetBid) => {
    setAcceptingId(bid.id);
    try {
      const res = await runAccept({ data: { bid_id: bid.id } });
      toast.success(`Sold — you receive ${fmtUSD(res.net)} (fee ${fmtUSD(res.fee)})`);
      setOpen(false);
      onChanged();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Accept failed");
    } finally {
      setAcceptingId(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline"><Gavel className="h-3.5 w-3.5" /> {asset.bid_count} bids</Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-display">Bids on "{asset.title}"</DialogTitle>
        </DialogHeader>
        {loading ? (
          <div className="flex items-center justify-center py-6 text-muted-foreground">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading…
          </div>
        ) : bids.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">No bids yet.</p>
        ) : (
          <div className="space-y-2">
            {bids.map((b) => (
              <div key={b.id} className="flex items-start justify-between gap-3 rounded-md border border-border/50 p-3">
                <div>
                  <div className="font-display text-lg text-gold">{fmtUSD(b.bid_amount)}</div>
                  <div className="text-xs text-muted-foreground">
                    {b.bidder_name ?? "Anonymous"} · {new Date(b.created_at).toLocaleDateString()}
                  </div>
                  {b.message && <p className="mt-1 text-sm">{b.message}</p>}
                </div>
                {b.status === "open" && (
                  <Button size="sm" onClick={() => accept(b)} disabled={acceptingId === b.id}>
                    {acceptingId === b.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Accept"}
                  </Button>
                )}
                {b.status !== "open" && (
                  <Badge variant="outline" className="uppercase">{b.status}</Badge>
                )}
              </div>
            ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function WithdrawButton({ assetId, onDone }: { assetId: string; onDone: () => void }) {
  const runWithdraw = useServerFn(withdrawAsset);
  const [busy, setBusy] = useState(false);
  return (
    <Button size="sm" variant="ghost" disabled={busy} onClick={async () => {
      setBusy(true);
      try {
        await runWithdraw({ data: { asset_id: assetId } });
        toast.success("Listing withdrawn");
        onDone();
      } catch (e) {
        toast.error(e instanceof Error ? e.message : "Withdraw failed");
      } finally {
        setBusy(false);
      }
    }}>
      {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Withdraw"}
    </Button>
  );
}
