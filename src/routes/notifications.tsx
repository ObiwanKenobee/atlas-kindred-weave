import { createFileRoute, Link } from "@tanstack/react-router";
import { useNotifications } from "@/lib/notifications";
import { useAuth } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [{ title: "Notifications — Atlas Sanctum" }],
  }),
  component: NotificationsPage,
});

function NotificationsPage() {
  const { user } = useAuth();
  const { items, unread, markAllRead, markRead } = useNotifications();

  if (!user) {
    return (
      <div className="mx-auto max-w-xl px-6 py-16 text-center">
        <h1 className="font-display text-3xl">Notifications</h1>
        <p className="mt-3 text-muted-foreground">Sign in to view your Sanctum inbox.</p>
        <Link to="/login" className="mt-6 inline-block rounded-md bg-gradient-gold px-5 py-2.5 text-sm font-medium text-gold-foreground shadow-glow">
          Enter the Sanctum
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <div className="flex items-end justify-between border-b border-border/60 pb-6">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-gold/80">Inbox</div>
          <h1 className="mt-3 font-display text-4xl">Notifications</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {unread > 0 ? `${unread} unread` : "All caught up."}
          </p>
        </div>
        {unread > 0 && (
          <Button variant="outline" onClick={markAllRead}>Mark all as read</Button>
        )}
      </div>
      <div className="mt-6 space-y-3">
        {items.length === 0 && (
          <p className="text-sm text-muted-foreground">No notifications yet.</p>
        )}
        {items.map((n) => (
          <Card key={n.id} className={`glyph-border p-4 ${n.read_at ? "opacity-70" : ""}`}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-gold/80">{n.kind.replace(/[._]/g, " ")}</div>
                <div className="mt-1 font-display text-lg">{n.title}</div>
                {n.body && <p className="mt-1 text-sm text-muted-foreground">{n.body}</p>}
                <div className="mt-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                  {new Date(n.created_at).toLocaleString()}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {n.link && (
                  <Link to={n.link} onClick={() => markRead(n.id)} className="text-xs text-gold hover:underline">
                    Open →
                  </Link>
                )}
                {!n.read_at && (
                  <button onClick={() => markRead(n.id)} className="text-xs text-muted-foreground hover:text-foreground">
                    Mark read
                  </button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
