import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import { useIsAdmin } from "@/lib/notifications";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ShieldCheck, UserPlus, Trash2, Search, Loader2 } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/roles")({
  head: () => ({ meta: [{ title: "Admin · Roles — Atlas Sanctum" }] }),
  component: AdminRolesPage,
});

type Role = "admin" | "reviewer" | "member";

type Profile = {
  user_id: string;
  display_name: string | null;
  region: string | null;
  trust_score: number;
};

type RoleRow = { id: string; user_id: string; role: Role };

function AdminRolesPage() {
  const { user } = useAuth();
  const isAdmin = useIsAdmin();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [roles, setRoles] = useState<RoleRow[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [pending, setPending] = useState<string | null>(null);
  const [roleToGrant, setRoleToGrant] = useState<Record<string, Role>>({});

  const refresh = useCallback(async () => {
    setLoading(true);
    const [{ data: profs }, { data: roleRows }] = await Promise.all([
      supabase.from("profiles").select("user_id, display_name, region, trust_score").order("display_name"),
      supabase.from("user_roles").select("id, user_id, role"),
    ]);
    setProfiles((profs as Profile[]) ?? []);
    setRoles((roleRows as RoleRow[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { if (isAdmin) refresh(); }, [isAdmin, refresh]);

  if (!user) {
    return <Gate title="Admin · Roles" body="Sign in with an admin account to manage permissions." />;
  }
  if (!isAdmin) {
    return <Gate title="Admin only" body="This sanctum is reserved for stewards bearing the admin glyph." />;
  }

  const filtered = profiles.filter((p) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (p.display_name ?? "").toLowerCase().includes(q) || p.user_id.toLowerCase().includes(q);
  });

  async function grant(userId: string) {
    const role = roleToGrant[userId] ?? "reviewer";
    setPending(userId + ":" + role);
    const { error } = await supabase.from("user_roles").insert({ user_id: userId, role });
    setPending(null);
    if (error) {
      if (error.code === "23505") toast.error("User already has that role");
      else toast.error(error.message);
      return;
    }
    toast.success(`Granted ${role}`);
    refresh();
  }

  async function revoke(rowId: string, role: Role) {
    setPending(rowId);
    const { error } = await supabase.from("user_roles").delete().eq("id", rowId);
    setPending(null);
    if (error) toast.error(error.message);
    else { toast.success(`Revoked ${role}`); refresh(); }
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <div className="border-b border-border/60 pb-6">
        <div className="text-xs uppercase tracking-[0.3em] text-gold/80">Stewardship</div>
        <h1 className="mt-3 flex items-center gap-3 font-display text-4xl">
          <ShieldCheck className="h-7 w-7 text-gold" /> Role administration
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Grant or revoke <code>reviewer</code> and <code>admin</code> roles. All actions are
          recorded in the audit ledger and the subject is notified.
        </p>
      </div>

      <div className="mt-6 relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by display name or user id…"
          className="pl-9"
        />
      </div>

      {loading && (
        <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" /> Loading members…
        </p>
      )}

      <div className="mt-4 space-y-2">
        {!loading && filtered.length === 0 && (
          <p className="text-sm text-muted-foreground">No members match your search.</p>
        )}
        {filtered.map((p) => {
          const userRoles = roles.filter((r) => r.user_id === p.user_id);
          const next = roleToGrant[p.user_id] ?? "reviewer";
          return (
            <Card key={p.user_id} className="glyph-border p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="min-w-0">
                  <div className="font-display text-base truncate">
                    {p.display_name ?? "Unnamed Sanctum member"}
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {p.user_id.slice(0, 8)}… · trust {Math.round(p.trust_score)}
                    {p.region ? ` · ${p.region}` : ""}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {userRoles.length === 0 && (
                      <Badge variant="outline">member</Badge>
                    )}
                    {userRoles.map((r) => (
                      <Badge key={r.id} variant="outline" className="border-gold/40 text-gold inline-flex items-center gap-1">
                        {r.role}
                        <button
                          aria-label={`Revoke ${r.role}`}
                          onClick={() => revoke(r.id, r.role)}
                          disabled={pending === r.id}
                          className="ml-1 hover:text-destructive"
                        >
                          {pending === r.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Trash2 className="h-3 w-3" />}
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Select
                    value={next}
                    onValueChange={(v) => setRoleToGrant((m) => ({ ...m, [p.user_id]: v as Role }))}
                  >
                    <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="reviewer">reviewer</SelectItem>
                      <SelectItem value="admin">admin</SelectItem>
                      <SelectItem value="member">member</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    size="sm"
                    onClick={() => grant(p.user_id)}
                    disabled={pending === p.user_id + ":" + next}
                  >
                    {pending === p.user_id + ":" + next
                      ? <Loader2 className="h-4 w-4 animate-spin" />
                      : <><UserPlus className="mr-2 h-4 w-4" /> Grant</>}
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function Gate({ title, body }: { title: string; body: string }) {
  return (
    <div className="mx-auto max-w-xl px-6 py-16 text-center">
      <h1 className="font-display text-3xl">{title}</h1>
      <p className="mt-3 text-muted-foreground">{body}</p>
      <Link to="/" className="mt-6 inline-block rounded-md border border-border/60 px-5 py-2.5 text-sm hover:border-gold/60 hover:text-gold">
        Return to the Sanctum
      </Link>
    </div>
  );
}
