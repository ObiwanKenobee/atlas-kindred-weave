import { Link, useRouterState } from "@tanstack/react-router";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton,
  SidebarMenuItem, useSidebar,
} from "@/components/ui/sidebar";
import { SANCTUM_MODULES, ORCHESTRATOR, HOME } from "@/lib/modules";

export function AtlasSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const isActive = (p: string) => pathname === p;

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
                <SidebarMenuButton asChild isActive={isActive(ORCHESTRATOR.path)}>
                  <Link to={ORCHESTRATOR.path}>
                    <ORCHESTRATOR.icon className="h-4 w-4 text-gold" />
                    {!collapsed && <span>Orchestrator</span>}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
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
