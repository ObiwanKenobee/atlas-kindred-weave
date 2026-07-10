import { Link, useRouterState } from "@tanstack/react-router";
import { Bell, ScrollText, Settings, ShieldCheck, BarChart3, Sparkles, PhoneCall, BookOpen, Activity, Search, Users, UserCircle, Gavel, Crown, Gift } from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton,
  SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";
import { SANCTUM_MODULES, ORCHESTRATOR, HOME } from "@/lib/modules";
import { useNotifications, useIsAdmin } from "@/lib/notifications";

export function AtlasSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const isActive = (p: string) => pathname === p;
  const isAdmin = useIsAdmin();

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-3 px-2 py-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gradient-gold text-gold-foreground font-display font-bold shadow-glow">
            A
          </div>
          {!collapsed && (
            <div className="leading-tight">
              <div className="font-display text-sm tracking-widest text-gold">ATLAS</div>
              <div className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Sanctum
              </div>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Sanctum</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive(HOME.path)}>
                  <Link to={HOME.path}><HOME.icon className="h-4 w-4" />{!collapsed && <span>Overview</span>}</Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/opportunities")}>
                  <Link to="/opportunities">
                    <Search className="h-4 w-4 text-gold" />
                    {!collapsed && <span>Opportunity Hub</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/cfo")}>
                  <Link to="/cfo">
                    <PhoneCall className="h-4 w-4 text-gold" />
                    {!collapsed && <span>Atlas CFO</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/vault")}>
                  <Link to="/vault">
                    <BookOpen className="h-4 w-4 text-gold" />
                    {!collapsed && <span>Knowledge Vault</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive(ORCHESTRATOR.path)}>
                  <Link to={ORCHESTRATOR.path}>
                    <ORCHESTRATOR.icon className="h-4 w-4 text-gold" />
                    {!collapsed && <span>Orchestrator</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <NotificationsMenuItem collapsed={collapsed} isActive={isActive("/notifications")} />
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/observability")}>
                  <Link to="/observability">
                    <Activity className="h-4 w-4 text-gold" />
                    {!collapsed && <span>Observability</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/analytics/funding")}>
                  <Link to="/analytics/funding">
                    <BarChart3 className="h-4 w-4 text-gold" />
                    {!collapsed && <span>Funding analytics</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/approvals")}>
                  <Link to="/approvals">
                    <Gavel className="h-4 w-4 text-gold" />
                    {!collapsed && <span>Approval queue</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/audit")}>
                  <Link to="/audit">
                    <ScrollText className="h-4 w-4" />
                    {!collapsed && <span>Audit trail</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/subscription")}>
                  <Link to="/subscription">
                    <Crown className="h-4 w-4 text-gold" />
                    {!collapsed && <span>Subscription</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/pricing")}>
                  <Link to="/pricing">
                    <Sparkles className="h-4 w-4 text-gold" />
                    {!collapsed && <span>Pricing</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/referrals")}>
                  <Link to="/referrals">
                    <Gift className="h-4 w-4 text-gold" />
                    {!collapsed && <span>Referrals</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/community")}>
                  <Link to="/community">
                    <Users className="h-4 w-4 text-gold" />
                    {!collapsed && <span>Community</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/profile")}>
                  <Link to="/profile">
                    <UserCircle className="h-4 w-4" />
                    {!collapsed && <span>Profile</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/settings/notifications")}>
                  <Link to="/settings/notifications">
                    <Settings className="h-4 w-4" />
                    {!collapsed && <span>Notification settings</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {isAdmin && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={isActive("/admin/roles")}>
                    <Link to="/admin/roles">
                      <ShieldCheck className="h-4 w-4 text-gold" />
                      {!collapsed && <span>Roles (admin)</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Engines</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {SANCTUM_MODULES.map((m) => (
                <SidebarMenuItem key={m.slug}>
                  <SidebarMenuButton asChild isActive={isActive(m.path)}>
                    <Link to={m.path}>
                      <m.icon className="h-4 w-4" />
                      {!collapsed && (
                        <span className="flex items-center gap-2">
                          <span className="font-display text-[10px] text-gold/70 w-6">{m.glyph}</span>
                          <span>{m.name}</span>
                        </span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

function NotificationsMenuItem({ collapsed, isActive }: { collapsed: boolean; isActive: boolean }) {
  const { unread } = useNotifications();
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={isActive}>
        <Link to="/notifications" className="relative">
          <Bell className="h-4 w-4" />
          {!collapsed && <span>Notifications</span>}
          {unread > 0 && (
            <span className="ml-auto inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-gradient-gold px-1 text-[10px] font-bold text-gold-foreground shadow-glow">
              {unread > 9 ? "9+" : unread}
            </span>
          )}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
