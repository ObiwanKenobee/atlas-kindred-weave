import { useEffect, useState, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { Bell } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/lib/auth";
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

export type Notification = {
  id: string;
  user_id: string;
  kind: string;
  title: string;
  body: string | null;
  link: string | null;
  read_at: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
};

export function useNotifications() {
  const { user } = useAuth();
  const [items, setItems] = useState<Notification[]>([]);

  const refresh = useCallback(async () => {
    if (!user) return;
    const { data } = await supabase
      .from("notifications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(50);
    setItems((data as unknown as Notification[]) ?? []);
  }, [user]);

  useEffect(() => {
    refresh();
    if (!user) return;
    const ch = supabase
      .channel(`notif-${user.id}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "notifications", filter: `user_id=eq.${user.id}` },
        () => refresh(),
      )
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [user, refresh]);

  async function markRead(id: string) {
    await supabase.from("notifications").update({ read_at: new Date().toISOString() }).eq("id", id);
    setItems((xs) => xs.map((x) => (x.id === id ? { ...x, read_at: new Date().toISOString() } : x)));
  }
  async function markAllRead() {
    if (!user) return;
    const now = new Date().toISOString();
    await supabase.from("notifications").update({ read_at: now }).eq("user_id", user.id).is("read_at", null);
    setItems((xs) => xs.map((x) => (x.read_at ? x : { ...x, read_at: now })));
  }

  const unread = items.filter((n) => !n.read_at).length;
  return { items, unread, refresh, markRead, markAllRead };
}

export function NotificationBell() {
  const { user } = useAuth();
  const { items, unread, markRead, markAllRead } = useNotifications();
  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label="Notifications"
          className="relative inline-flex h-9 w-9 items-center justify-center rounded-md border border-border/60 bg-card hover:border-gold/60 hover:text-gold"
        >
          <Bell className="h-4 w-4" />
          {unread > 0 && (
            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-gradient-gold px-1 text-[10px] font-bold text-gold-foreground shadow-glow">
              {unread > 9 ? "9+" : unread}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between border-b border-border/60 px-3 py-2">
          <div className="text-xs uppercase tracking-widest text-gold">Notifications</div>
          <button onClick={markAllRead} className="text-[10px] uppercase tracking-widest text-muted-foreground hover:text-foreground">
            Mark all read
          </button>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {items.length === 0 && (
            <div className="px-3 py-6 text-center text-xs text-muted-foreground">All quiet in the Sanctum.</div>
          )}
          {items.map((n) => (
            <Link
              key={n.id}
              to={n.link ?? "/notifications"}
              onClick={() => markRead(n.id)}
              className={`block border-b border-border/40 px-3 py-2 transition hover:bg-secondary/40 ${
                n.read_at ? "opacity-70" : "bg-secondary/20"
              }`}
            >
              <div className="flex items-start gap-2">
                {!n.read_at && <span className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-gold" />}
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{n.title}</div>
                  {n.body && <div className="line-clamp-2 text-xs text-muted-foreground">{n.body}</div>}
                  <div className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                    {new Date(n.created_at).toLocaleString()}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <Link to="/notifications" className="block border-t border-border/60 px-3 py-2 text-center text-xs text-gold hover:bg-secondary/40">
          Open inbox
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function useIsReviewer() {
  const { user } = useAuth();
  const [isReviewer, setIsReviewer] = useState(false);
  useEffect(() => {
    if (!user) { setIsReviewer(false); return; }
    supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .then(({ data }) => {
        setIsReviewer((data ?? []).some((r) => r.role === "reviewer" || r.role === "admin"));
      });
  }, [user]);
  return isReviewer;
}
