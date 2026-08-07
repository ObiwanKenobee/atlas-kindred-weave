import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet, createRootRouteWithContext, useRouter, Link,
  HeadContent, Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AtlasSidebar } from "@/components/AtlasSidebar";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider, useAuth } from "@/lib/auth";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl text-gold">404</h1>
        <h2 className="mt-4 font-display text-xl">Glyph not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">This path is not inscribed in the Sanctum.</p>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-xl">The Sanctum stuttered</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something unexpected occurred.</p>
        <button onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Atlas Sanctum — Regenerative Finance OS" },
      { name: "description", content: "An AI-operated economic civilization expanding prosperity, trust, and opportunity." },
      { name: "author", content: "Atlas Sanctum" },
      { property: "og:title", content: "Atlas Sanctum — AI-Operated Regenerative Finance OS" },
      { property: "og:description", content: "An AI-operated economic civilization expanding prosperity, trust, and opportunity through evidence-grounded finance." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Atlas Sanctum" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "google-site-verification", content: "vT6mxJ_Ko8YZYEYimh8u30st6TcAQQ4LTB80cDqbJAE" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Inter:wght@400;500;600&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              name: "Atlas Sanctum",
              url: "https://atlas-kindred-weave.lovable.app",
              description:
                "An AI-operated regenerative finance operating system that grounds funding decisions in multimodal evidence.",
            },
            {
              "@type": "WebSite",
              name: "Atlas Sanctum",
              url: "https://atlas-kindred-weave.lovable.app",
            },
          ],
        }),
      },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function HeaderAuth() {
  const { user, profile, loading } = useAuth();
  if (loading) return null;
  if (!user) {
    return (
      <Link to="/login" className="rounded-md border border-gold/40 px-3 py-1 text-xs uppercase tracking-widest text-gold hover:bg-secondary/40">
        Sign in
      </Link>
    );
  }
  return (
    <Link to="/profile" className="flex items-center gap-2 text-xs text-muted-foreground hover:text-gold">
      <div className="h-6 w-6 rounded-full bg-gradient-gold text-[10px] font-bold text-gold-foreground grid place-items-center">
        {(profile?.display_name ?? user.email ?? "?").charAt(0).toUpperCase()}
      </div>
      <span className="hidden sm:inline">{profile?.display_name ?? user.email}</span>
    </Link>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SidebarProvider>
          <div className="flex min-h-screen w-full">
            <AtlasSidebar />
            <div className="flex flex-1 flex-col">
              <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border/50 bg-background/70 px-4 backdrop-blur">
                <SidebarTrigger />
                <div className="flex flex-1 items-baseline gap-3">
                  <span className="font-display text-sm tracking-[0.3em] text-gold">ATLAS SANCTUM</span>
                  <span className="hidden text-xs text-muted-foreground md:inline">Regenerative Finance Operating System</span>
                </div>
                <HeaderAuth />
              </header>
              <main className="flex-1"><Outlet /></main>
            </div>
          </div>
          <Toaster />
        </SidebarProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
