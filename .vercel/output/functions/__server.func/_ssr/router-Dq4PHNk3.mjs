import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider, u as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent, d as useRouterState, L as Link } from "../_libs/tanstack__react-router.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { R as Root$1 } from "../_libs/radix-ui__react-separator.mjs";
import { R as Root, P as Portal, C as Content, a as Close, T as Title, D as Description, O as Overlay } from "../_libs/radix-ui__react-dialog.mjs";
import { P as Provider, R as Root3, T as Trigger, a as Portal$1, C as Content2 } from "../_libs/radix-ui__react-tooltip.mjs";
import { s as supabase } from "./client-ChmNSUU0.mjs";
import { S as SubTrigger2, a as SubContent2, P as Portal2, C as Content2$1, I as Item2, b as CheckboxItem2, c as ItemIndicator2, R as RadioItem2, L as Label2, d as Separator2, e as Root2, T as Trigger$1 } from "../_libs/radix-ui__react-dropdown-menu.mjs";
import { a as PLAN_LABELS, P as PLAN_RANK, m as minPlanFor, p as planAllows, l as limitsFor } from "./entitlements-DDmJ5IMx.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
import { a as recordInteractionStep, r as recordAgentEvent, c as createSsrRpc } from "./observability.server-CSo3iCeb.mjs";
import { g as getRequest, c as createServerFn } from "./server-D6kup5O1.mjs";
import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
import { supabaseAdmin } from "./client.server-D5ro3rAQ.mjs";
import { v as verifyEphemeralToken } from "./ephemeral-session.server-DRewInbI.mjs";
import { s as streamText, c as convertToModelMessages, g as generateObject, b as stepCountIs } from "../_libs/ai.mjs";
import { c as createLovableAiGatewayProvider } from "./ai-gateway.server-C06lV5S3.mjs";
import { v as verifyPaystackSignature, B as BILLING_CURRENCY } from "./paystack.server-Bs-IoxkW.mjs";
import { P as tool } from "../_libs/ai-sdk__provider-utils.mjs";
import { H as House, S as Search, L as Lock, P as PhoneCall, B as BookOpen, T as TrendingUp, D as DollarSign, a as BadgeCheck, b as Sparkles, A as Activity, C as ChartColumn, G as Gavel, c as ScrollText, d as Crown, e as Gift, U as Users, f as Building2, g as CircleUser, h as Settings, i as ShieldCheck, j as Shield, k as Coins, V as Vault, l as TriangleAlert, m as Sprout, n as Leaf, o as Brain, N as Network, R as Recycle, p as PanelLeft, q as Bell, X, r as ChevronRight, s as Check, t as Circle } from "../_libs/lucide-react.mjs";
import { g as objectType, i as stringType, h as numberType, j as arrayType } from "../_libs/zod.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "./auth-middleware-D86cXXU7.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/ai-sdk__gateway.mjs";
import "../_libs/ai-sdk__provider.mjs";
import "../_libs/@vercel/oidc.mjs";
import "path";
import "fs";
import "os";
import "../_libs/opentelemetry__api.mjs";
import "../_libs/ai-sdk__openai-compatible.mjs";
import "../_libs/eventsource-parser.mjs";
const appCss = "/assets/styles-B1APf_Ex.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const MOBILE_BREAKPOINT = 768;
function useIsMobile() {
  const [isMobile, setIsMobile] = reactExports.useState(void 0);
  reactExports.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return !!isMobile;
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = reactExports.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const Input = reactExports.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const Separator = reactExports.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Root$1,
  {
    ref,
    decorative,
    orientation,
    className: cn(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className
    ),
    ...props
  }
));
Separator.displayName = Root$1.displayName;
const Sheet = Root;
const SheetPortal = Portal;
const SheetOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
SheetOverlay.displayName = Overlay.displayName;
const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=closed]:duration-300 data-[state=open]:duration-500 data-[state=open]:animate-in data-[state=closed]:animate-out",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom: "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
);
const SheetContent = reactExports.forwardRef(({ side = "right", className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(SheetOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsxs(Content, { ref, className: cn(sheetVariants({ side }), className), ...props, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
    ] }),
    children
  ] })
] }));
SheetContent.displayName = Content.displayName;
const SheetHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
SheetHeader.displayName = "SheetHeader";
const SheetTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title,
  {
    ref,
    className: cn("text-lg font-semibold text-foreground", className),
    ...props
  }
));
SheetTitle.displayName = Title.displayName;
const SheetDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
SheetDescription.displayName = Description.displayName;
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("animate-pulse rounded-md bg-primary/10", className), ...props });
}
const TooltipProvider = Provider;
const Tooltip = Root3;
const TooltipTrigger = Trigger;
const TooltipContent = reactExports.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Portal$1, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 overflow-hidden rounded-md bg-primary px-3 py-1.5 text-xs text-primary-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-tooltip-content-transform-origin)",
      className
    ),
    ...props
  }
) }));
TooltipContent.displayName = Content2.displayName;
const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";
const SidebarContext = reactExports.createContext(null);
function useSidebar() {
  const context = reactExports.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}
const SidebarProvider = reactExports.forwardRef(
  ({
    defaultOpen = true,
    open: openProp,
    onOpenChange: setOpenProp,
    className,
    style,
    children,
    ...props
  }, ref) => {
    const isMobile = useIsMobile();
    const [openMobile, setOpenMobile] = reactExports.useState(false);
    const [_open, _setOpen] = reactExports.useState(defaultOpen);
    const open = openProp ?? _open;
    const setOpen = reactExports.useCallback(
      (value) => {
        const openState = typeof value === "function" ? value(open) : value;
        if (setOpenProp) {
          setOpenProp(openState);
        } else {
          _setOpen(openState);
        }
        document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
      },
      [setOpenProp, open]
    );
    const toggleSidebar = reactExports.useCallback(() => {
      return isMobile ? setOpenMobile((open2) => !open2) : setOpen((open2) => !open2);
    }, [isMobile, setOpen, setOpenMobile]);
    reactExports.useEffect(() => {
      const handleKeyDown = (event) => {
        if (event.key === SIDEBAR_KEYBOARD_SHORTCUT && (event.metaKey || event.ctrlKey)) {
          event.preventDefault();
          toggleSidebar();
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }, [toggleSidebar]);
    const state = open ? "expanded" : "collapsed";
    const contextValue = reactExports.useMemo(
      () => ({
        state,
        open,
        setOpen,
        isMobile,
        openMobile,
        setOpenMobile,
        toggleSidebar
      }),
      [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleSidebar]
    );
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarContext.Provider, { value: contextValue, children: /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipProvider, { delayDuration: 0, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        style: {
          "--sidebar-width": SIDEBAR_WIDTH,
          "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
          ...style
        },
        className: cn(
          "group/sidebar-wrapper flex min-h-svh w-full has-[[data-variant=inset]]:bg-sidebar",
          className
        ),
        ref,
        ...props,
        children
      }
    ) }) });
  }
);
SidebarProvider.displayName = "SidebarProvider";
const Sidebar = reactExports.forwardRef(
  ({
    side = "left",
    variant = "sidebar",
    collapsible = "offcanvas",
    className,
    children,
    ...props
  }, ref) => {
    const { isMobile, state, openMobile, setOpenMobile } = useSidebar();
    if (collapsible === "none") {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: cn(
            "flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground",
            className
          ),
          ref,
          ...props,
          children
        }
      );
    }
    if (isMobile) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Sheet, { open: openMobile, onOpenChange: setOpenMobile, ...props, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        SheetContent,
        {
          "data-sidebar": "sidebar",
          "data-mobile": "true",
          className: "w-(--sidebar-width) bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden",
          style: {
            "--sidebar-width": SIDEBAR_WIDTH_MOBILE
          },
          side,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetHeader, { className: "sr-only", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { children: "Sidebar" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SheetDescription, { children: "Displays the mobile sidebar." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full flex-col", children })
          ]
        }
      ) });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        ref,
        className: "group peer hidden text-sidebar-foreground md:block",
        "data-state": state,
        "data-collapsible": state === "collapsed" ? collapsible : "",
        "data-variant": variant,
        "data-side": side,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn(
                "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
                "group-data-[collapsible=offcanvas]:w-0",
                "group-data-[side=right]:rotate-180",
                variant === "floating" || variant === "inset" ? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon)"
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn(
                "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
                side === "left" ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]" : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
                // Adjust the padding for floating and inset variants.
                variant === "floating" || variant === "inset" ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]" : "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
                className
              ),
              ...props,
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  "data-sidebar": "sidebar",
                  className: "flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-lg group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow",
                  children
                }
              )
            }
          )
        ]
      }
    );
  }
);
Sidebar.displayName = "Sidebar";
const SidebarTrigger = reactExports.forwardRef(({ className, onClick, ...props }, ref) => {
  const { toggleSidebar } = useSidebar();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Button,
    {
      ref,
      "data-sidebar": "trigger",
      variant: "ghost",
      size: "icon",
      className: cn("h-7 w-7", className),
      onClick: (event) => {
        onClick?.(event);
        toggleSidebar();
      },
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(PanelLeft, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
});
SidebarTrigger.displayName = "SidebarTrigger";
const SidebarRail = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    const { toggleSidebar } = useSidebar();
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        ref,
        "data-sidebar": "rail",
        "aria-label": "Toggle Sidebar",
        tabIndex: -1,
        onClick: toggleSidebar,
        title: "Toggle Sidebar",
        className: cn(
          "absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] hover:after:bg-sidebar-border group-data-[side=left]:-right-4 group-data-[side=right]:left-0 sm:flex",
          "[[data-side=left]_&]:cursor-w-resize [[data-side=right]_&]:cursor-e-resize",
          "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
          "group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full group-data-[collapsible=offcanvas]:hover:bg-sidebar",
          "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
          "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
          className
        ),
        ...props
      }
    );
  }
);
SidebarRail.displayName = "SidebarRail";
const SidebarInset = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "main",
      {
        ref,
        className: cn(
          "relative flex w-full flex-1 flex-col bg-background",
          "md:peer-data-[variant=inset]:m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:ml-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-xl md:peer-data-[variant=inset]:shadow",
          className
        ),
        ...props
      }
    );
  }
);
SidebarInset.displayName = "SidebarInset";
const SidebarInput = reactExports.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Input,
    {
      ref,
      "data-sidebar": "input",
      className: cn(
        "h-8 w-full bg-background shadow-none focus-visible:ring-2 focus-visible:ring-sidebar-ring",
        className
      ),
      ...props
    }
  );
});
SidebarInput.displayName = "SidebarInput";
const SidebarHeader = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref,
        "data-sidebar": "header",
        className: cn("flex flex-col gap-2 p-2", className),
        ...props
      }
    );
  }
);
SidebarHeader.displayName = "SidebarHeader";
const SidebarFooter = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref,
        "data-sidebar": "footer",
        className: cn("flex flex-col gap-2 p-2", className),
        ...props
      }
    );
  }
);
SidebarFooter.displayName = "SidebarFooter";
const SidebarSeparator = reactExports.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Separator,
    {
      ref,
      "data-sidebar": "separator",
      className: cn("mx-2 w-auto bg-sidebar-border", className),
      ...props
    }
  );
});
SidebarSeparator.displayName = "SidebarSeparator";
const SidebarContent = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref,
        "data-sidebar": "content",
        className: cn(
          "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
          className
        ),
        ...props
      }
    );
  }
);
SidebarContent.displayName = "SidebarContent";
const SidebarGroup = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref,
        "data-sidebar": "group",
        className: cn("relative flex w-full min-w-0 flex-col p-2", className),
        ...props
      }
    );
  }
);
SidebarGroup.displayName = "SidebarGroup";
const SidebarGroupLabel = reactExports.forwardRef(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "div";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      ref,
      "data-sidebar": "group-label",
      className: cn(
        "flex h-8 shrink-0 items-center rounded-md px-2 text-xs font-medium text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className
      ),
      ...props
    }
  );
});
SidebarGroupLabel.displayName = "SidebarGroupLabel";
const SidebarGroupAction = reactExports.forwardRef(({ className, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      ref,
      "data-sidebar": "group-action",
      className: cn(
        "absolute right-3 top-3.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring cursor-pointer transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "group-data-[collapsible=icon]:hidden",
        className
      ),
      ...props
    }
  );
});
SidebarGroupAction.displayName = "SidebarGroupAction";
const SidebarGroupContent = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      "data-sidebar": "group-content",
      className: cn("w-full text-sm", className),
      ...props
    }
  )
);
SidebarGroupContent.displayName = "SidebarGroupContent";
const SidebarMenu = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "ul",
    {
      ref,
      "data-sidebar": "menu",
      className: cn("flex w-full min-w-0 flex-col gap-1", className),
      ...props
    }
  )
);
SidebarMenu.displayName = "SidebarMenu";
const SidebarMenuItem = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "li",
    {
      ref,
      "data-sidebar": "menu-item",
      className: cn("group/menu-item relative", className),
      ...props
    }
  )
);
SidebarMenuItem.displayName = "SidebarMenuItem";
const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-none ring-sidebar-ring cursor-pointer transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-2 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline: "bg-background shadow-[0_0_0_1px_var(--sidebar-border)] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_var(--sidebar-accent)]"
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:!p-0"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const SidebarMenuButton = reactExports.forwardRef(
  ({
    asChild = false,
    isActive = false,
    variant = "default",
    size = "default",
    tooltip,
    className,
    ...props
  }, ref) => {
    const Comp = asChild ? Slot : "button";
    const { isMobile, state } = useSidebar();
    const button = /* @__PURE__ */ jsxRuntimeExports.jsx(
      Comp,
      {
        ref,
        "data-sidebar": "menu-button",
        "data-size": size,
        "data-active": isActive,
        className: cn(sidebarMenuButtonVariants({ variant, size }), className),
        ...props
      }
    );
    if (!tooltip) {
      return button;
    }
    if (typeof tooltip === "string") {
      tooltip = {
        children: tooltip
      };
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { asChild: true, children: button }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        TooltipContent,
        {
          side: "right",
          align: "center",
          hidden: state !== "collapsed" || isMobile,
          ...tooltip
        }
      )
    ] });
  }
);
SidebarMenuButton.displayName = "SidebarMenuButton";
const SidebarMenuAction = reactExports.forwardRef(({ className, asChild = false, showOnHover = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      ref,
      "data-sidebar": "menu-action",
      className: cn(
        "absolute right-1 top-1.5 flex aspect-square w-5 items-center justify-center rounded-md p-0 text-sidebar-foreground outline-none ring-sidebar-ring cursor-pointer transition-transform hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 peer-hover/menu-button:text-sidebar-accent-foreground [&>svg]:size-4 [&>svg]:shrink-0",
        // Increases the hit area of the button on mobile.
        "after:absolute after:-inset-2 after:md:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover && "group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity-100 data-[state=open]:opacity-100 peer-data-[active=true]/menu-button:text-sidebar-accent-foreground md:opacity-0",
        className
      ),
      ...props
    }
  );
});
SidebarMenuAction.displayName = "SidebarMenuAction";
const SidebarMenuBadge = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      "data-sidebar": "menu-badge",
      className: cn(
        "pointer-events-none absolute right-1 flex h-5 min-w-5 select-none items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums text-sidebar-foreground",
        "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        className
      ),
      ...props
    }
  )
);
SidebarMenuBadge.displayName = "SidebarMenuBadge";
const SidebarMenuSkeleton = reactExports.forwardRef(({ className, showIcon = false, ...props }, ref) => {
  const width = reactExports.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`;
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref,
      "data-sidebar": "menu-skeleton",
      className: cn("flex h-8 items-center gap-2 rounded-md px-2", className),
      ...props,
      children: [
        showIcon && /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "size-4 rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Skeleton,
          {
            className: "h-4 max-w-(--skeleton-width) flex-1",
            "data-sidebar": "menu-skeleton-text",
            style: {
              "--skeleton-width": width
            }
          }
        )
      ]
    }
  );
});
SidebarMenuSkeleton.displayName = "SidebarMenuSkeleton";
const SidebarMenuSub = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "ul",
    {
      ref,
      "data-sidebar": "menu-sub",
      className: cn(
        "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        className
      ),
      ...props
    }
  )
);
SidebarMenuSub.displayName = "SidebarMenuSub";
const SidebarMenuSubItem = reactExports.forwardRef(
  ({ ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { ref, ...props })
);
SidebarMenuSubItem.displayName = "SidebarMenuSubItem";
const SidebarMenuSubButton = reactExports.forwardRef(({ asChild = false, size = "md", isActive, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      ref,
      "data-sidebar": "menu-sub-button",
      "data-size": size,
      "data-active": isActive,
      className: cn(
        "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sidebar-foreground outline-none ring-sidebar-ring cursor-pointer hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:text-sidebar-accent-foreground",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className
      ),
      ...props
    }
  );
});
SidebarMenuSubButton.displayName = "SidebarMenuSubButton";
const SANCTUM_MODULES = [
  {
    slug: "identity",
    path: "/identity",
    name: "Identity & Trust",
    glyph: "I",
    tagline: "Economic identity earned through verified action.",
    purpose: "Establish economic identity and a living reputation across users, businesses, and communities.",
    icon: Shield,
    agents: ["Verification Agent", "Governance Agent"],
    outputs: ["Atlas Reputation Rating (ARR)", "Reliability Index", "Anomaly Alerts"],
    metrics: [
      { label: "Verified Identities", value: "248,910", delta: "+2.4%" },
      { label: "Avg ARR", value: "732 / 1000", delta: "+18" },
      { label: "Anomalies Today", value: "37", delta: "-12%" }
    ]
  },
  {
    slug: "funding",
    path: "/funding",
    name: "Funding Engine",
    glyph: "II",
    tagline: "Capital flows to measurable opportunity.",
    purpose: "Match capital to entrepreneurs through grants, revenue-based finance, and milestone funding.",
    icon: Coins,
    agents: ["Deal Agent", "Risk Agent", "Treasury Agent"],
    outputs: ["Funding Decision Reports", "Repayment Schedules", "Term Sheets"],
    metrics: [
      { label: "Capital Deployed", value: "$48.2M", delta: "+9.1%" },
      { label: "Active Deals", value: "1,284" },
      { label: "Default Rate", value: "1.8%", delta: "-0.3pp" }
    ]
  },
  {
    slug: "verification",
    path: "/verification",
    name: "Verification Engine",
    glyph: "III",
    tagline: "Proof without bureaucracy.",
    purpose: "Validate receipts, inventory, identity, location, and milestones using AI evidence analysis.",
    icon: BadgeCheck,
    agents: ["Verification Agent", "Research Agent"],
    outputs: ["Verification Confidence Score", "Evidence Trail", "Milestone Receipts"],
    metrics: [
      { label: "Proofs Processed", value: "92,418" },
      { label: "Avg Confidence", value: "94.6%", delta: "+1.2pp" },
      { label: "Fraud Caught", value: "412" }
    ]
  },
  {
    slug: "treasury",
    path: "/treasury",
    name: "Treasury Engine",
    glyph: "IV",
    tagline: "Financial intelligence, continuously.",
    purpose: "Track revenue, expenses, cash flow, and allocate capital across the Sanctum.",
    icon: Vault,
    agents: ["Treasury Agent", "Risk Agent"],
    outputs: ["Daily P&L", "Cash Flow Forecast", "Treasury Health Score"],
    metrics: [
      { label: "Reserves", value: "$112.7M" },
      { label: "Runway", value: "38 mo", delta: "+2 mo" },
      { label: "Health Score", value: "A+" }
    ]
  },
  {
    slug: "risk",
    path: "/risk",
    name: "Risk Engine",
    glyph: "V",
    tagline: "Protect the ecosystem.",
    purpose: "Detect fraud, AML risk, and abusive behavior; recommend protective actions.",
    icon: TriangleAlert,
    agents: ["Risk Agent", "Verification Agent"],
    outputs: ["Risk Score", "Fraud Probability", "Recommended Action"],
    metrics: [
      { label: "Open Alerts", value: "84" },
      { label: "Avg Risk Score", value: "0.21", delta: "-0.04" },
      { label: "Auto-resolved", value: "76%" }
    ]
  },
  {
    slug: "growth",
    path: "/growth",
    name: "Growth Engine",
    glyph: "VI",
    tagline: "Acquisition that respects the human.",
    purpose: "Run email, SMS, WhatsApp, referral, and community growth campaigns autonomously.",
    icon: Sprout,
    agents: ["Growth Agent", "Community Agent"],
    outputs: ["Lead Lists", "Campaign Plans", "Conversion Forecasts"],
    metrics: [
      { label: "Active Campaigns", value: "27" },
      { label: "MQL → SQL", value: "31%", delta: "+4pp" },
      { label: "Avg CAC", value: "$11.40" }
    ]
  },
  {
    slug: "impact",
    path: "/impact",
    name: "Impact Engine",
    glyph: "VII",
    tagline: "Measure what actually matters.",
    purpose: "Convert activity into verified outcomes: jobs, businesses, households, education, environment.",
    icon: Leaf,
    agents: ["Impact Agent", "Verification Agent"],
    outputs: ["Impact Score", "Prosperity Index", "Community Growth Index"],
    metrics: [
      { label: "Jobs Created", value: "12,847" },
      { label: "Businesses Funded", value: "3,294" },
      { label: "Trees Planted", value: "1.2M" }
    ]
  },
  {
    slug: "business-os",
    path: "/business-os",
    name: "Atlas Business OS",
    glyph: "VIII",
    tagline: "An AI executive team for every SME.",
    purpose: "AI CEO, CFO, COO, Sales, Growth, and Risk officers operating each business in the Sanctum.",
    icon: Brain,
    agents: ["AI CEO", "AI CFO", "AI COO", "AI Sales Director", "AI Growth Director", "AI Risk Officer"],
    outputs: ["Business Growth Dashboard", "Weekly Operating Plan", "Board Brief"],
    metrics: [
      { label: "Businesses Operated", value: "2,108" },
      { label: "Avg MoM Growth", value: "+7.3%" },
      { label: "AI Decisions / day", value: "184,000" }
    ]
  },
  {
    slug: "opportunities",
    path: "/opportunities",
    name: "Opportunity Hub",
    glyph: "✦",
    tagline: "AI-matched grants, investors, and programs.",
    purpose: "Research Agent finds grants, loans, accelerators, and government programs matched to your region, sector, and trust score.",
    icon: Search,
    agents: ["Research Agent", "Treasury Agent"],
    outputs: ["Opportunity Matches", "Fit Scores", "Treasury Report"],
    metrics: [
      { label: "Opportunities Found", value: "—" },
      { label: "Avg Fit Score", value: "—" },
      { label: "Reports Generated", value: "—" }
    ]
  },
  {
    slug: "cfo",
    path: "/cfo",
    name: "Atlas CFO",
    glyph: "✦",
    tagline: "Talk to your AI Chief Financial Officer.",
    purpose: "Voice-first AI CFO that retrieves your business records, calculates funding readiness, and submits applications via conversation.",
    icon: PhoneCall,
    agents: ["CFO Agent", "Deal Agent", "Risk Agent", "Treasury Agent"],
    outputs: ["Funding Applications", "Trust Score Retrieval", "Treasury Insights", "Business Coaching"],
    metrics: [
      { label: "Conversations", value: "—" },
      { label: "Actions Taken", value: "—" },
      { label: "Requests Filed", value: "—" }
    ]
  },
  {
    slug: "vault",
    path: "/vault",
    name: "Knowledge Vault",
    glyph: "✦",
    tagline: "Every document. One intelligence layer.",
    purpose: "Upload business documents, receipts, and transcripts. Atlas Memory indexes everything and answers funding questions grounded in your evidence.",
    icon: BookOpen,
    agents: ["Knowledge Agent", "Research Agent", "Verification Agent"],
    outputs: ["Grounded Q&A", "Evidence Citations", "Semantic Search"],
    metrics: [
      { label: "Documents Indexed", value: "—" },
      { label: "Queries Answered", value: "—" },
      { label: "Avg Confidence", value: "—" }
    ]
  },
  {
    slug: "economic-graph",
    path: "/economic-graph",
    name: "Economic Graph",
    glyph: "IX",
    tagline: "Map the geometry of opportunity.",
    purpose: "Discover relationships between businesses, investors, suppliers, customers, and communities.",
    icon: Network,
    agents: ["Research Agent", "Deal Agent"],
    outputs: ["Economic Opportunity Map", "Partnership Recommendations"],
    metrics: [
      { label: "Nodes", value: "1.8M" },
      { label: "Edges", value: "14.6M" },
      { label: "Matches / week", value: "9,210" }
    ]
  },
  {
    slug: "regenerative",
    path: "/regenerative",
    name: "Regenerative Value Exchange",
    glyph: "X",
    tagline: "A marketplace for verified outcomes.",
    purpose: "Tradeable impact: jobs created, trees planted, businesses funded, students educated.",
    icon: Recycle,
    agents: ["Impact Agent", "Treasury Agent"],
    outputs: ["Impact Asset Certificates", "Impact Valuation Reports"],
    metrics: [
      { label: "Outcomes Listed", value: "8,430" },
      { label: "Volume (30d)", value: "$6.1M" },
      { label: "Avg Verification", value: "96%" }
    ]
  }
];
const ORCHESTRATOR = {
  path: "/orchestrator",
  icon: Sparkles
};
const HOME = { path: "/", icon: House };
const Ctx = reactExports.createContext(null);
function AuthProvider({ children }) {
  const [user, setUser] = reactExports.useState(null);
  const [session, setSession] = reactExports.useState(null);
  const [profile, setProfile] = reactExports.useState(null);
  const [loading, setLoading] = reactExports.useState(true);
  const router2 = useRouter();
  const qc = useQueryClient();
  async function loadProfile(uid) {
    const { data } = await supabase.from("profiles").select("*").eq("user_id", uid).maybeSingle();
    setProfile(data ?? null);
  }
  async function tryAttachReferral() {
    try {
      if (typeof window === "undefined") return;
      const urlCode = new URL(window.location.href).searchParams.get("ref");
      if (urlCode) localStorage.setItem("atlas.ref", urlCode.toUpperCase());
      const code = localStorage.getItem("atlas.ref");
      if (!code) return;
      const { attachReferralCode } = await import("./referrals.functions-BJpvHj3w.mjs");
      const res = await attachReferralCode({ data: { code } });
      if (res.ok || res.reason === "self_referral") {
        localStorage.removeItem("atlas.ref");
      }
    } catch {
    }
  }
  reactExports.useEffect(() => {
    if (typeof window !== "undefined") {
      const urlCode = new URL(window.location.href).searchParams.get("ref");
      if (urlCode) localStorage.setItem("atlas.ref", urlCode.toUpperCase());
    }
    const { data: sub } = supabase.auth.onAuthStateChange((_event, sess) => {
      setSession(sess);
      setUser(sess?.user ?? null);
      if (sess?.user) {
        setTimeout(() => {
          loadProfile(sess.user.id);
          tryAttachReferral();
        }, 0);
      } else {
        setProfile(null);
      }
      router2.invalidate();
      qc.invalidateQueries();
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      if (data.session?.user) {
        loadProfile(data.session.user.id);
        tryAttachReferral();
      }
      setLoading(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Ctx.Provider,
    {
      value: {
        user,
        session,
        profile,
        loading,
        signOut: async () => {
          await supabase.auth.signOut();
        },
        refreshProfile: async () => {
          if (user) await loadProfile(user.id);
        }
      },
      children
    }
  );
}
function useAuth() {
  const ctx = reactExports.useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
const DropdownMenu = Root2;
const DropdownMenuTrigger = Trigger$1;
const DropdownMenuSubTrigger = reactExports.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  SubTrigger2,
  {
    ref,
    className: cn(
      "flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props,
    children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "ml-auto" })
    ]
  }
));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
const DropdownMenuSubContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  SubContent2,
  {
    ref,
    className: cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className
    ),
    ...props
  }
));
DropdownMenuSubContent.displayName = SubContent2.displayName;
const DropdownMenuContent = reactExports.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Portal2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
  Content2$1,
  {
    ref,
    sideOffset,
    className: cn(
      "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)",
      className
    ),
    ...props
  }
) }));
DropdownMenuContent.displayName = Content2$1.displayName;
const DropdownMenuItem = reactExports.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Item2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0",
      inset && "pl-8",
      className
    ),
    ...props
  }
));
DropdownMenuItem.displayName = Item2.displayName;
const DropdownMenuCheckboxItem = reactExports.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  CheckboxItem2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    checked,
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-4 w-4" }) }) }),
      children
    ]
  }
));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
const DropdownMenuRadioItem = reactExports.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
  RadioItem2,
  {
    ref,
    className: cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    ),
    ...props,
    children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ItemIndicator2, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-2 w-2 fill-current" }) }) }),
      children
    ]
  }
));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
const DropdownMenuLabel = reactExports.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Label2,
  {
    ref,
    className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
    ...props
  }
));
DropdownMenuLabel.displayName = Label2.displayName;
const DropdownMenuSeparator = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Separator2,
  {
    ref,
    className: cn("-mx-1 my-1 h-px bg-muted", className),
    ...props
  }
));
DropdownMenuSeparator.displayName = Separator2.displayName;
function useNotifications() {
  const { user } = useAuth();
  const [items, setItems] = reactExports.useState([]);
  const refresh = reactExports.useCallback(async () => {
    if (!user) return;
    const { data } = await supabase.from("notifications").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(50);
    setItems(data ?? []);
  }, [user]);
  reactExports.useEffect(() => {
    refresh();
    if (!user) return;
    const ch = supabase.channel(`notif-${user.id}`).on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "notifications", filter: `user_id=eq.${user.id}` },
      () => refresh()
    ).subscribe();
    return () => {
      supabase.removeChannel(ch);
    };
  }, [user, refresh]);
  async function markRead(id) {
    await supabase.from("notifications").update({ read_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("id", id);
    setItems((xs) => xs.map((x) => x.id === id ? { ...x, read_at: (/* @__PURE__ */ new Date()).toISOString() } : x));
  }
  async function markAllRead() {
    if (!user) return;
    const now = (/* @__PURE__ */ new Date()).toISOString();
    await supabase.from("notifications").update({ read_at: now }).eq("user_id", user.id).is("read_at", null);
    setItems((xs) => xs.map((x) => x.read_at ? x : { ...x, read_at: now }));
  }
  const unread = items.filter((n) => !n.read_at).length;
  return { items, unread, refresh, markRead, markAllRead };
}
function useIsReviewer() {
  const { user } = useAuth();
  const [isReviewer, setIsReviewer] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!user) {
      setIsReviewer(false);
      return;
    }
    supabase.from("user_roles").select("role").eq("user_id", user.id).then(({ data }) => {
      setIsReviewer((data ?? []).some((r) => r.role === "reviewer" || r.role === "admin"));
    });
  }, [user]);
  return isReviewer;
}
function useIsAdmin() {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      return;
    }
    supabase.from("user_roles").select("role").eq("user_id", user.id).then(({ data }) => {
      setIsAdmin((data ?? []).some((r) => r.role === "admin"));
    });
  }, [user]);
  return isAdmin;
}
function useEntitlements() {
  const { profile, loading } = useAuth();
  const plan = profile?.subscription_plan ?? "free";
  const status = profile?.subscription_status ?? "active";
  const billingOk = status === "active" || status === "trialing";
  return {
    loading,
    plan,
    planLabel: PLAN_LABELS[plan] ?? PLAN_LABELS.free,
    status,
    billingOk,
    rank: PLAN_RANK[plan] ?? 0,
    limits: limitsFor(plan),
    can: (feature) => billingOk && planAllows(plan, feature),
    requiredPlan: (feature) => minPlanFor(feature),
    requiredPlanLabel: (feature) => PLAN_LABELS[minPlanFor(feature)]
  };
}
const ENGINE_FEATURE = {
  cfo: "cfo",
  vault: "vault",
  orchestrator: "orchestrator",
  "business-os": "business_os",
  growth: "growth_campaigns",
  impact: "impact_reporting",
  regenerative: "rve_mint",
  treasury: "treasury_reports",
  "economic-graph": "advanced_analytics",
  opportunities: "funding_match"
};
function AtlasSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const isActive = (p) => pathname === p;
  const isAdmin = useIsAdmin();
  const ent = useEntitlements();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Sidebar, { collapsible: "icon", className: "border-r border-sidebar-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarHeader, { className: "border-b border-sidebar-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-3 px-2 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-9 w-9 items-center justify-center rounded-md bg-gradient-gold text-gold-foreground font-display font-bold shadow-glow", children: "A" }),
      !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "leading-tight", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display text-sm tracking-widest text-gold", children: "ATLAS" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] uppercase tracking-[0.25em] text-muted-foreground", children: "Sanctum" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarGroup, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarGroupLabel, { children: "Sanctum" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarGroupContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarMenu, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuButton, { asChild: true, isActive: isActive(HOME.path), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: HOME.path, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(HOME.icon, { className: "h-4 w-4" }),
            !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Overview" })
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuButton, { asChild: true, isActive: isActive("/opportunities"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/opportunities", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: `h-4 w-4 ${!ent.can("funding_match") ? "text-muted-foreground" : "text-gold"}` }),
            !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: !ent.can("funding_match") ? "text-muted-foreground" : "", children: "Opportunity Hub" }),
              !ent.can("funding_match") && /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "ml-auto h-3 w-3 text-gold/50 shrink-0" })
            ] })
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuButton, { asChild: true, isActive: isActive("/cfo"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/cfo", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(PhoneCall, { className: `h-4 w-4 ${!ent.can("cfo") ? "text-muted-foreground" : "text-gold"}` }),
            !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: !ent.can("cfo") ? "text-muted-foreground" : "", children: "Atlas CFO" }),
              !ent.can("cfo") && /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "ml-auto h-3 w-3 text-gold/50 shrink-0" })
            ] })
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuButton, { asChild: true, isActive: isActive("/vault"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/vault", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { className: `h-4 w-4 ${!ent.can("vault") ? "text-muted-foreground" : "text-gold"}` }),
            !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Knowledge Vault" }),
              !ent.can("vault") && /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "ml-auto h-3 w-3 text-gold/50 shrink-0" })
            ] })
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuButton, { asChild: true, isActive: isActive("/cashflow"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/cashflow", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: `h-4 w-4 ${!ent.can("cashflow_insights") ? "text-muted-foreground" : "text-gold"}` }),
            !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: !ent.can("cashflow_insights") ? "text-muted-foreground" : "", children: "Cashflow Insights" }),
              !ent.can("cashflow_insights") && /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "ml-auto h-3 w-3 text-gold/50 shrink-0" })
            ] })
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuButton, { asChild: true, isActive: isActive("/revenue"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/revenue", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DollarSign, { className: `h-4 w-4 ${!ent.can("revenue_tracking") ? "text-muted-foreground" : "text-gold"}` }),
            !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: !ent.can("revenue_tracking") ? "text-muted-foreground" : "", children: "Revenue Tracking" }),
              !ent.can("revenue_tracking") && /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "ml-auto h-3 w-3 text-gold/50 shrink-0" })
            ] })
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuButton, { asChild: true, isActive: isActive("/eligibility"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/eligibility", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: `h-4 w-4 ${!ent.can("funding_eligibility") ? "text-muted-foreground" : "text-gold"}` }),
            !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: !ent.can("funding_eligibility") ? "text-muted-foreground" : "", children: "Funding Eligibility" }),
              !ent.can("funding_eligibility") && /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "ml-auto h-3 w-3 text-gold/50 shrink-0" })
            ] })
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuButton, { asChild: true, isActive: isActive(ORCHESTRATOR.path), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: ORCHESTRATOR.path, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ORCHESTRATOR.icon, { className: "h-4 w-4 text-gold" }),
            !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Orchestrator" })
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(NotificationsMenuItem, { collapsed, isActive: isActive("/notifications") }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuButton, { asChild: true, isActive: isActive("/observability"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/observability", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "h-4 w-4 text-gold" }),
            !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Observability" })
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuButton, { asChild: true, isActive: isActive("/analytics/funding"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/analytics/funding", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "h-4 w-4 text-gold" }),
            !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Funding analytics" })
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuButton, { asChild: true, isActive: isActive("/approvals"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/approvals", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Gavel, { className: "h-4 w-4 text-gold" }),
            !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Approval queue" })
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuButton, { asChild: true, isActive: isActive("/audit"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/audit", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollText, { className: "h-4 w-4" }),
            !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Audit trail" })
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuButton, { asChild: true, isActive: isActive("/subscription"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/subscription", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "h-4 w-4 text-gold" }),
            !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Subscription" })
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuButton, { asChild: true, isActive: isActive("/pricing"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/pricing", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "h-4 w-4 text-gold" }),
            !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Pricing" })
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuButton, { asChild: true, isActive: isActive("/referrals"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/referrals", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Gift, { className: "h-4 w-4 text-gold" }),
            !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Referrals" })
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuButton, { asChild: true, isActive: isActive("/community"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/community", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-4 w-4 text-gold" }),
            !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Community" })
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuButton, { asChild: true, isActive: isActive("/business"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/business", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "h-4 w-4" }),
            !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "My Business" })
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuButton, { asChild: true, isActive: isActive("/profile"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/profile", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleUser, { className: "h-4 w-4" }),
            !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Profile" })
          ] }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuButton, { asChild: true, isActive: isActive("/settings/notifications"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/settings/notifications", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { className: "h-4 w-4" }),
            !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Notification settings" })
          ] }) }) }),
          isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuButton, { asChild: true, isActive: isActive("/admin/roles"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/roles", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4 text-gold" }),
            !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Roles (admin)" })
          ] }) }) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarGroup, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarGroupLabel, { children: "Engines" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarGroupContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenu, { children: SANCTUM_MODULES.map((m2) => {
          const featureKey = ENGINE_FEATURE[m2.slug];
          const locked = featureKey ? !ent.can(featureKey) : false;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuButton, { asChild: true, isActive: isActive(m2.path), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: m2.path, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(m2.icon, { className: `h-4 w-4 ${locked ? "text-muted-foreground" : ""}` }),
            !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-[10px] text-gold/70 w-6", children: m2.glyph }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: locked ? "text-muted-foreground" : "", children: m2.name }),
              locked && /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "ml-auto h-3 w-3 text-gold/50 shrink-0" })
            ] })
          ] }) }) }, m2.slug);
        }) }) })
      ] })
    ] })
  ] });
}
function NotificationsMenuItem({ collapsed, isActive }) {
  const { unread } = useNotifications();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuButton, { asChild: true, isActive, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/notifications", className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { className: "h-4 w-4" }),
    !collapsed && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Notifications" }),
    unread > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-gradient-gold px-1 text-[10px] font-bold text-gold-foreground shadow-glow", children: unread > 9 ? "9+" : unread })
  ] }) }) });
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-7xl text-gold", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 font-display text-xl", children: "Glyph not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "This path is not inscribed in the Sanctum." })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-xl", children: "The Sanctum stuttered" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something unexpected occurred." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => {
          router2.invalidate();
          reset();
        },
        className: "mt-6 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground",
        children: "Try again"
      }
    )
  ] }) });
}
const Route$F = createRootRouteWithContext()({
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
      { name: "google-site-verification", content: "vT6mxJ_Ko8YZYEYimh8u30st6TcAQQ4LTB80cDqbJAE" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700&family=Inter:wght@400;500;600&display=swap" }
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
              description: "An AI-operated regenerative finance operating system that grounds funding decisions in multimodal evidence."
            },
            {
              "@type": "WebSite",
              name: "Atlas Sanctum",
              url: "https://atlas-kindred-weave.lovable.app"
            }
          ]
        })
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", className: "dark", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function HeaderAuth() {
  const { user, profile, loading } = useAuth();
  if (loading) return null;
  if (!user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", className: "rounded-md border border-gold/40 px-3 py-1 text-xs uppercase tracking-widest text-gold hover:bg-secondary/40", children: "Sign in" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/profile", className: "flex items-center gap-2 text-xs text-muted-foreground hover:text-gold", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-6 rounded-full bg-gradient-gold text-[10px] font-bold text-gold-foreground grid place-items-center", children: (profile?.display_name ?? user.email ?? "?").charAt(0).toUpperCase() }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: profile?.display_name ?? user.email })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$F.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(AuthProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AtlasSidebar, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border/50 bg-background/70 px-4 backdrop-blur", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarTrigger, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 items-baseline gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-sm tracking-[0.3em] text-gold", children: "ATLAS SANCTUM" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden text-xs text-muted-foreground md:inline", children: "Regenerative Finance Operating System" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(HeaderAuth, {})
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, {})
  ] }) }) });
}
const m$9 = SANCTUM_MODULES.find((x) => x.slug === "verification");
const $$splitComponentImporter$w = () => import("./verification-CEvV0G7_.mjs");
const Route$E = createFileRoute("/verification")({
  head: () => ({
    meta: [{
      title: `${m$9.name} — Atlas Sanctum`
    }, {
      name: "description",
      content: m$9.purpose
    }, {
      property: "og:title",
      content: `${m$9.name} — Atlas Sanctum`
    }, {
      property: "og:description",
      content: m$9.purpose
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$w, "component")
});
const $$splitComponentImporter$v = () => import("./vault-Mzjq7P70.mjs");
const Route$D = createFileRoute("/vault")({
  head: () => ({
    meta: [{
      title: "Knowledge Vault — Atlas Sanctum"
    }, {
      name: "description",
      content: "Your business intelligence vault. Upload documents, images, and transcripts. Ask questions grounded in your evidence."
    }, {
      property: "og:title",
      content: "Knowledge Vault — Atlas Sanctum"
    }, {
      property: "og:description",
      content: "Your business intelligence vault. Upload documents, images, and transcripts. Ask questions grounded in your evidence."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$v, "component")
});
const m$8 = SANCTUM_MODULES.find((x) => x.slug === "treasury");
const $$splitComponentImporter$u = () => import("./treasury-B-6athrs.mjs");
createServerFn({
  method: "GET"
}).handler(createSsrRpc("d34f10a19cad5e5fcf13cadda22a994445f52e5985ae995e17be642e77e8db0d"));
const Route$C = createFileRoute("/treasury")({
  head: () => ({
    meta: [{
      title: `${m$8.name} — Atlas Sanctum`
    }, {
      name: "description",
      content: m$8.purpose
    }, {
      property: "og:title",
      content: `${m$8.name} — Atlas Sanctum`
    }, {
      property: "og:description",
      content: m$8.purpose
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$u, "component")
});
const $$splitComponentImporter$t = () => import("./subscription-oRhEnEs7.mjs");
const Route$B = createFileRoute("/subscription")({
  head: () => ({
    meta: [{
      title: "Subscription — Atlas Sanctum"
    }, {
      name: "description",
      content: "Manage your Sanctum plan, billing status, and renewal."
    }, {
      property: "og:title",
      content: "Subscription — Atlas Sanctum"
    }, {
      property: "og:description",
      content: "Manage your Sanctum plan, billing status, and renewal."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$t, "component")
});
const BASE_URL = "https://atlas-kindred-weave.lovable.app";
const entries = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/pricing", changefreq: "weekly", priority: "0.9" },
  { path: "/business", changefreq: "monthly", priority: "0.7" },
  { path: "/orchestrator", changefreq: "monthly", priority: "0.8" },
  { path: "/funding", changefreq: "monthly", priority: "0.8" },
  { path: "/cfo", changefreq: "monthly", priority: "0.8" },
  { path: "/vault", changefreq: "monthly", priority: "0.7" },
  { path: "/opportunities", changefreq: "monthly", priority: "0.7" },
  { path: "/economic-graph", changefreq: "monthly", priority: "0.7" },
  { path: "/regenerative", changefreq: "monthly", priority: "0.7" },
  { path: "/identity", changefreq: "monthly", priority: "0.6" },
  { path: "/verification", changefreq: "monthly", priority: "0.6" },
  { path: "/treasury", changefreq: "monthly", priority: "0.6" },
  { path: "/risk", changefreq: "monthly", priority: "0.6" },
  { path: "/growth", changefreq: "monthly", priority: "0.6" },
  { path: "/impact", changefreq: "monthly", priority: "0.6" },
  { path: "/business-os", changefreq: "monthly", priority: "0.6" },
  { path: "/community", changefreq: "monthly", priority: "0.6" },
  { path: "/login", changefreq: "yearly", priority: "0.3" }
];
const Route$A = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = entries.map(
          (e) => [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`
          ].filter(Boolean).join("\n")
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`
        ].join("\n");
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600"
          }
        });
      }
    }
  }
});
const m$7 = SANCTUM_MODULES.find((x) => x.slug === "risk");
const $$splitComponentImporter$s = () => import("./risk-xk4Y3gKi.mjs");
const Route$z = createFileRoute("/risk")({
  head: () => ({
    meta: [{
      title: `${m$7.name} — Atlas Sanctum`
    }, {
      name: "description",
      content: m$7.purpose
    }, {
      property: "og:title",
      content: `${m$7.name} — Atlas Sanctum`
    }, {
      property: "og:description",
      content: m$7.purpose
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$s, "component")
});
const $$splitComponentImporter$r = () => import("./revenue-DjhDzykn.mjs");
const Route$y = createFileRoute("/revenue")({
  head: () => ({
    meta: [{
      title: "Revenue Tracking — Atlas Sanctum"
    }, {
      name: "description",
      content: "Track and forecast your business revenue with AI."
    }, {
      property: "og:title",
      content: "Revenue Tracking — Atlas Sanctum"
    }, {
      property: "og:description",
      content: "Track and forecast your business revenue with AI."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$r, "component")
});
const m$6 = SANCTUM_MODULES.find((x) => x.slug === "regenerative");
const $$splitComponentImporter$q = () => import("./regenerative-B4ua8jVf.mjs");
const Route$x = createFileRoute("/regenerative")({
  head: () => ({
    meta: [{
      title: `${m$6.name} — Atlas Sanctum`
    }, {
      name: "description",
      content: m$6.purpose
    }, {
      property: "og:title",
      content: `${m$6.name} — Atlas Sanctum`
    }, {
      property: "og:description",
      content: m$6.purpose
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$q, "component")
});
const $$splitComponentImporter$p = () => import("./referrals-B_2sMlCb.mjs");
const Route$w = createFileRoute("/referrals")({
  head: () => ({
    meta: [{
      title: "Referrals — Atlas Sanctum"
    }, {
      name: "description",
      content: "Invite entrepreneurs to Atlas Sanctum and earn rewards for every signup."
    }, {
      property: "og:title",
      content: "Referrals — Atlas Sanctum"
    }, {
      property: "og:description",
      content: "Invite entrepreneurs to Atlas Sanctum and earn rewards for every signup."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$p, "component")
});
const $$splitComponentImporter$o = () => import("./profile-TyGOKrYe.mjs");
const Route$v = createFileRoute("/profile")({
  head: () => ({
    meta: [{
      title: "Your Identity — Atlas Sanctum"
    }, {
      name: "description",
      content: "Your Atlas reputation, trust score, and verification history."
    }, {
      property: "og:title",
      content: "Your Identity — Atlas Sanctum"
    }, {
      property: "og:description",
      content: "Your Atlas reputation, trust score, and verification history."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$o, "component")
});
const $$splitComponentImporter$n = () => import("./pricing-C58aFInL.mjs");
const Route$u = createFileRoute("/pricing")({
  head: () => ({
    meta: [{
      title: "Pricing — Atlas Sanctum"
    }, {
      name: "description",
      content: "Transparent pricing for Atlas Sanctum. Pay in KES, NGN, GHS, UGX, ZAR or USD via M-Pesa, Flutterwave, MTN MoMo, Airtel, card, or bank transfer."
    }, {
      property: "og:title",
      content: "Pricing — Atlas Sanctum"
    }, {
      property: "og:description",
      content: "Transparent pricing for Atlas Sanctum. Pay in KES, NGN, GHS, UGX, ZAR or USD via M-Pesa, Flutterwave, MTN MoMo, Airtel, card, or bank transfer."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$n, "component")
});
const $$splitComponentImporter$m = () => import("./orchestrator-JSQTi1K5.mjs");
const Route$t = createFileRoute("/orchestrator")({
  head: () => ({
    meta: [{
      title: "Atlas Orchestrator — Atlas Sanctum"
    }, {
      name: "description",
      content: "Coordinate every engine and agent. Audit every decision."
    }, {
      property: "og:title",
      content: "Atlas Orchestrator — Atlas Sanctum"
    }, {
      property: "og:description",
      content: "Coordinate every engine and agent. Audit every decision."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$m, "component")
});
const $$splitComponentImporter$l = () => import("./opportunities-D98cBeEl.mjs");
const Route$s = createFileRoute("/opportunities")({
  head: () => ({
    meta: [{
      title: "Opportunity Hub — Atlas Sanctum"
    }, {
      name: "description",
      content: "AI-matched grants, investors, accelerators, and funding programs for your business."
    }, {
      property: "og:title",
      content: "Opportunity Hub — Atlas Sanctum"
    }, {
      property: "og:description",
      content: "AI-matched grants, investors, accelerators, and funding programs for your business."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$l, "component")
});
const $$splitComponentImporter$k = () => import("./observability-DO0TseEy.mjs");
const Route$r = createFileRoute("/observability")({
  head: () => ({
    meta: [{
      title: "Observability — Atlas Sanctum"
    }, {
      name: "description",
      content: "Production metrics: AI latency, token usage, funding funnel, session activity."
    }, {
      property: "og:title",
      content: "Observability — Atlas Sanctum"
    }, {
      property: "og:description",
      content: "Production metrics: AI latency, token usage, funding funnel, session activity."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$k, "component")
});
const $$splitComponentImporter$j = () => import("./notifications-CVlVQS1r.mjs");
const Route$q = createFileRoute("/notifications")({
  head: () => ({
    meta: [{
      title: "Notifications — Atlas Sanctum"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$j, "component")
});
const $$splitComponentImporter$i = () => import("./login-DELKCg-1.mjs");
const Route$p = createFileRoute("/login")({
  head: () => ({
    meta: [{
      title: "Enter the Sanctum — Atlas Sanctum"
    }, {
      name: "description",
      content: "Sign in to your Atlas Sanctum identity to access your AI-powered financial intelligence dashboard, trust score, and verification history."
    }, {
      property: "og:title",
      content: "Enter the Sanctum — Atlas Sanctum"
    }, {
      property: "og:description",
      content: "Sign in to your Atlas Sanctum identity to access your AI-powered financial intelligence dashboard, trust score, and verification history."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
});
const m$5 = SANCTUM_MODULES.find((x) => x.slug === "impact");
const $$splitComponentImporter$h = () => import("./impact-Kp1iMtMQ.mjs");
const Route$o = createFileRoute("/impact")({
  head: () => ({
    meta: [{
      title: `${m$5.name} — Atlas Sanctum`
    }, {
      name: "description",
      content: m$5.purpose
    }, {
      property: "og:title",
      content: `${m$5.name} — Atlas Sanctum`
    }, {
      property: "og:description",
      content: m$5.purpose
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
createServerFn({
  method: "GET"
}).handler(createSsrRpc("3feabf02468349556e0da7080d34df8ef89466386569f5373a3671ffc8e4b149"));
const m$4 = SANCTUM_MODULES.find((x) => x.slug === "identity");
const $$splitComponentImporter$g = () => import("./identity-Bbt0xFHz.mjs");
const Route$n = createFileRoute("/identity")({
  head: () => ({
    meta: [{
      title: `${m$4.name} — Atlas Sanctum`
    }, {
      name: "description",
      content: m$4.purpose
    }, {
      property: "og:title",
      content: `${m$4.name} — Atlas Sanctum`
    }, {
      property: "og:description",
      content: m$4.purpose
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const m$3 = SANCTUM_MODULES.find((x) => x.slug === "growth");
const $$splitComponentImporter$f = () => import("./growth-BPQTXjF0.mjs");
const Route$m = createFileRoute("/growth")({
  head: () => ({
    meta: [{
      title: `${m$3.name} — Atlas Sanctum`
    }, {
      name: "description",
      content: m$3.purpose
    }, {
      property: "og:title",
      content: `${m$3.name} — Atlas Sanctum`
    }, {
      property: "og:description",
      content: m$3.purpose
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const m$2 = SANCTUM_MODULES.find((x) => x.slug === "funding");
const $$splitComponentImporter$e = () => import("./funding-DFoPraQK.mjs");
const Route$l = createFileRoute("/funding")({
  head: () => ({
    meta: [{
      title: `${m$2.name} — Atlas Sanctum`
    }, {
      name: "description",
      content: m$2.purpose
    }, {
      property: "og:title",
      content: `${m$2.name} — Atlas Sanctum`
    }, {
      property: "og:description",
      content: m$2.purpose
    }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Atlas Funding Engine",
        description: "AI-generated Funding Decision Reports with recommended terms, evidence grounding, and human review.",
        provider: {
          "@type": "Organization",
          name: "Atlas Sanctum"
        }
      })
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./eligibility-dfXjuvrk.mjs");
const Route$k = createFileRoute("/eligibility")({
  head: () => ({
    meta: [{
      title: "Funding Eligibility — Atlas Sanctum"
    }, {
      name: "description",
      content: "Check your funding eligibility and readiness score."
    }, {
      property: "og:title",
      content: "Funding Eligibility — Atlas Sanctum"
    }, {
      property: "og:description",
      content: "Check your funding eligibility and readiness score."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./economic-graph-DRe9-sfk.mjs");
const m$1 = SANCTUM_MODULES.find((x) => x.slug === "economic-graph");
const Route$j = createFileRoute("/economic-graph")({
  head: () => ({
    meta: [{
      title: `${m$1.name} — Atlas Sanctum`
    }, {
      name: "description",
      content: m$1.purpose
    }, {
      property: "og:title",
      content: `${m$1.name} — Atlas Sanctum`
    }, {
      property: "og:description",
      content: m$1.purpose
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./community-DzBI8jDO.mjs");
const Route$i = createFileRoute("/community")({
  head: () => ({
    meta: [{
      title: "Community — Atlas Sanctum"
    }, {
      name: "description",
      content: "Connect with entrepreneurs, share milestones, ask questions, and discover opportunities across the Sanctum community."
    }, {
      property: "og:title",
      content: "Community — Atlas Sanctum"
    }, {
      property: "og:description",
      content: "Connect with entrepreneurs, share milestones, ask questions, and discover opportunities across the Sanctum community."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./cfo-VQttFGK6.mjs");
const Route$h = createFileRoute("/cfo")({
  head: () => ({
    meta: [{
      title: "Atlas CFO — Atlas Sanctum"
    }, {
      name: "description",
      content: "Your AI Chief Financial Officer. Talk to Atlas CFO to get funding guidance, business coaching, and treasury insights."
    }, {
      property: "og:title",
      content: "Atlas CFO — Atlas Sanctum"
    }, {
      property: "og:description",
      content: "Your AI Chief Financial Officer. Talk to Atlas CFO to get funding guidance, business coaching, and treasury insights."
    }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        name: "Atlas CFO",
        description: "A conversational AI CFO that analyses your business evidence and advises on cash flow, funding readiness, and growth.",
        provider: {
          "@type": "Organization",
          name: "Atlas Sanctum"
        }
      })
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./cashflow-zHVKKFJb.mjs");
const Route$g = createFileRoute("/cashflow")({
  head: () => ({
    meta: [{
      title: "Cashflow Insights — Atlas Sanctum"
    }, {
      name: "description",
      content: "AI-powered cashflow analysis for your business."
    }, {
      property: "og:title",
      content: "Cashflow Insights — Atlas Sanctum"
    }, {
      property: "og:description",
      content: "AI-powered cashflow analysis for your business."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const m = SANCTUM_MODULES.find((x) => x.slug === "business-os");
const $$splitComponentImporter$8 = () => import("./business-os-DjxGxPSg.mjs");
const Route$f = createFileRoute("/business-os")({
  head: () => ({
    meta: [{
      title: `${m.name} — Atlas Sanctum`
    }, {
      name: "description",
      content: m.purpose
    }, {
      property: "og:title",
      content: `${m.name} — Atlas Sanctum`
    }, {
      property: "og:description",
      content: m.purpose
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./business-DD8Q2rJN.mjs");
const Route$e = createFileRoute("/business")({
  head: () => ({
    meta: [{
      title: "Your Business Profile — Atlas Sanctum"
    }, {
      name: "description",
      content: "Create your business profile so Atlas CFO, the Funding Engine, and the Opportunity Hub can reason about your real operations, evidence, and funding needs."
    }, {
      property: "og:title",
      content: "Your Business Profile — Atlas Sanctum"
    }, {
      property: "og:description",
      content: "Create your business profile so Atlas CFO, the Funding Engine, and the Opportunity Hub can reason about your real operations and funding needs."
    }, {
      property: "og:type",
      content: "website"
    }, {
      name: "twitter:card",
      content: "summary_large_image"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./audit-C6lW9BFx.mjs");
const Route$d = createFileRoute("/audit")({
  head: () => ({
    meta: [{
      title: "Audit Trail — Atlas Sanctum"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./approvals-C5O6MObn.mjs");
const Route$c = createFileRoute("/approvals")({
  head: () => ({
    meta: [{
      title: "Approval Queue — Atlas Sanctum"
    }, {
      name: "description",
      content: "Human-in-the-loop reviews for risk overrides and vault releases."
    }, {
      property: "og:title",
      content: "Approval Queue — Atlas Sanctum"
    }, {
      property: "og:description",
      content: "Human-in-the-loop reviews for risk overrides and vault releases."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./index-BjWwIXRS.mjs");
const Route$b = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Atlas Sanctum — AI-Operated Regenerative Finance"
    }, {
      name: "description",
      content: "An AI-operated financial intelligence system that grounds every funding decision in multimodal evidence."
    }, {
      property: "og:title",
      content: "Atlas Sanctum — AI-Operated Regenerative Finance"
    }, {
      property: "og:description",
      content: "An AI-operated financial intelligence system that grounds every funding decision in multimodal evidence."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./settings.notifications-CVxVSHlq.mjs");
const Route$a = createFileRoute("/settings/notifications")({
  head: () => ({
    meta: [{
      title: "Notification settings — Atlas Sanctum"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./billing.callback-D8M0szm5.mjs");
const Route$9 = createFileRoute("/billing/callback")({
  validateSearch: objectType({
    reference: stringType().optional(),
    trxref: stringType().optional()
  }),
  head: () => ({
    meta: [{
      title: "Confirming payment — Atlas Sanctum"
    }, {
      name: "description",
      content: "Confirming your Atlas Sanctum subscription payment with Paystack."
    }, {
      property: "og:title",
      content: "Confirming payment — Atlas Sanctum"
    }, {
      property: "og:description",
      content: "Confirming your Atlas Sanctum subscription payment."
    }, {
      property: "og:type",
      content: "website"
    }, {
      name: "twitter:card",
      content: "summary"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
async function resolveUserId(request) {
  const ephemeralHeader = request.headers.get("x-ephemeral-token");
  if (ephemeralHeader) {
    const session = await verifyEphemeralToken(ephemeralHeader, "vault_query");
    return session?.userId ?? null;
  }
  const authHeader = request.headers.get("authorization") ?? "";
  if (!authHeader.startsWith("Bearer ")) return null;
  const token = authHeader.slice(7);
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!supabaseUrl || !supabaseAnonKey) return null;
  const userClient = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: `Bearer ${token}` } },
    auth: { storage: void 0, persistSession: false, autoRefreshToken: false }
  });
  const { data, error } = await userClient.auth.getClaims(token);
  if (error || !data?.claims?.sub) return null;
  return data.claims.sub;
}
const Route$8 = createFileRoute("/api/vault-file")({
  server: {
    handlers: {
      GET: async () => {
        const request = getRequest();
        const url = new URL(request.url);
        const path = url.searchParams.get("path");
        if (!path) return Response.json({ error: "path required" }, { status: 400 });
        const userId = await resolveUserId(request);
        if (!userId) return Response.json({ error: "Unauthorized" }, { status: 401 });
        if (!path.startsWith(`${userId}/`)) {
          return Response.json({ error: "Forbidden" }, { status: 403 });
        }
        const { data: doc } = await supabaseAdmin.from("knowledge_documents").select("id").eq("user_id", userId).eq("storage_path", path).limit(1).maybeSingle();
        if (!doc) return Response.json({ error: "Document not found" }, { status: 404 });
        const { data: signed, error: signErr } = await supabaseAdmin.storage.from("knowledge-vault").createSignedUrl(path, 120);
        if (signErr || !signed?.signedUrl) {
          return Response.json({ error: "Could not generate signed URL" }, { status: 500 });
        }
        return Response.redirect(signed.signedUrl, 302);
      }
    }
  }
});
const Route$7 = createFileRoute("/api/session")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const authHeader = request.headers.get("authorization") ?? "";
        if (!authHeader.startsWith("Bearer ")) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }
        const token = authHeader.slice(7);
        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseAnonKey = process.env.SUPABASE_PUBLISHABLE_KEY;
        if (!supabaseUrl || !supabaseAnonKey) {
          return Response.json({ error: "Supabase not configured" }, { status: 500 });
        }
        const userClient = createClient(supabaseUrl, supabaseAnonKey, {
          global: { headers: { Authorization: `Bearer ${token}` } },
          auth: { storage: void 0, persistSession: false, autoRefreshToken: false }
        });
        const { data, error } = await userClient.auth.getClaims(token);
        if (error || !data?.claims?.sub) {
          return Response.json({ error: "Invalid token" }, { status: 401 });
        }
        const userId = data.claims.sub;
        let purpose = "cfo_voice";
        try {
          const body = await request.json();
          if (body.purpose) purpose = body.purpose;
        } catch {
        }
        await supabaseAdmin.rpc("expire_sessions");
        const randomBytes = crypto.getRandomValues(new Uint8Array(32));
        const sessionToken = Array.from(randomBytes).map((b) => b.toString(16).padStart(2, "0")).join("");
        const expiresAt = new Date(Date.now() + 5 * 60 * 1e3).toISOString();
        const { data: session, error: insertErr } = await supabaseAdmin.from("ephemeral_sessions").insert({
          user_id: userId,
          token: sessionToken,
          purpose,
          expires_at: expiresAt
        }).select("id, expires_at").single();
        if (insertErr || !session) {
          return Response.json({ error: "Failed to create session" }, { status: 500 });
        }
        await supabaseAdmin.from("agent_events").insert({
          user_id: userId,
          agent: "Session Service",
          action: "session.mint",
          latency_ms: 0,
          outcome: "answered",
          metadata: { purpose, session_id: session.id }
        });
        return Response.json({
          token: sessionToken,
          sessionId: session.id,
          expiresAt: session.expires_at,
          purpose
        });
      }
    }
  }
});
const Route$6 = createFileRoute("/api/embed")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { text } = await request.json();
        if (!text?.trim()) return new Response("text required", { status: 400 });
        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("LOVABLE_API_KEY not configured", { status: 500 });
        const res = await fetch("https://ai.gateway.lovable.dev/v1/embeddings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Lovable-API-Key": key,
            "X-Lovable-AIG-SDK": "vercel-ai-sdk"
          },
          body: JSON.stringify({
            model: "google/text-embedding-004",
            input: text.slice(0, 8e3)
            // stay within token budget
          })
        });
        if (!res.ok) {
          const err = await res.text();
          return new Response(`Embedding failed: ${err}`, { status: 502 });
        }
        const json = await res.json();
        return Response.json({ embedding: json.data[0].embedding });
      }
    }
  }
});
const LIMITS = {
  "/api/chat": 20,
  "/api/cfo-tools": 30,
  orchestrator: 5,
  vault_query: 15
};
class RateLimitError extends Error {
  status = 429;
  constructor(endpoint, limit) {
    super(`Rate limit exceeded for ${endpoint}: max ${limit} calls/minute.`);
  }
}
async function enforceRateLimit(userId, endpoint) {
  const limit = LIMITS[endpoint] ?? 20;
  const { data, error } = await supabaseAdmin.rpc("increment_rate_limit", {
    _user_id: userId,
    _endpoint: endpoint,
    _limit: limit
  });
  if (error) {
    console.error("[rate-limit] RPC error:", error.message);
    return;
  }
  if (data > limit) {
    throw new RateLimitError(endpoint, limit);
  }
}
async function buildBusinessContext(userId) {
  const { data } = await supabaseAdmin.from("businesses").select("*").eq("user_id", userId).order("created_at", { ascending: true }).limit(1).maybeSingle();
  if (!data) {
    return "\n\n--- Business profile ---\nThe user has not completed business onboarding yet. If they ask about their business, invite them to complete their business profile at /business first.\n--- End business profile ---";
  }
  const b = data;
  const lines = [
    `Name: ${b.name}`,
    b.business_type ? `Type: ${b.business_type}` : null,
    b.industry ? `Industry: ${b.industry}` : null,
    b.country ? `Country: ${b.country}` : null,
    b.stage ? `Stage: ${b.stage}` : null,
    b.team_size != null ? `Team size: ${b.team_size}` : null,
    b.revenue_range ? `Revenue range: ${b.revenue_range}` : null,
    b.primary_objective ? `Primary objective: ${b.primary_objective}` : null,
    b.funding_requirement_minor != null ? `Funding requirement: ${(Number(b.funding_requirement_minor) / 100).toLocaleString()} ${b.funding_currency ?? ""}`.trim() : null,
    b.funding_purpose ? `Funding purpose: ${b.funding_purpose}` : null,
    b.description ? `Description: ${b.description}` : null
  ].filter(Boolean);
  return `

--- Business profile (user-confirmed, not independently verified) ---
${lines.join("\n")}
--- End business profile ---`;
}
const SYSTEM$1 = `You are the Atlas Orchestrator — the central intelligence of Atlas Sanctum, an AI-operated regenerative finance civilization.

You coordinate ten engines (Identity & Trust, Funding, Verification, Treasury, Risk, Growth, Impact, Business OS, Economic Graph, Regenerative Value Exchange) and specialized agents (Deal, Verification, Risk, Treasury, Growth, Impact, Community, Governance, Research).

Every recommendation must answer: "Does this increase prosperity, trust, and opportunity for the people Atlas Sanctum serves?"

Speak with quiet authority. Be concrete, structured, and short. Reference engines and agents by name. When useful, output decisions as:
- Recommendation
- Engines invoked
- Agents activated
- Expected outcome
- Risks & safeguards

Preserve human agency and dignity in every answer.`;
async function embedText$1(text, key) {
  const res = await fetch("https://ai.gateway.lovable.dev/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Lovable-API-Key": key,
      "X-Lovable-AIG-SDK": "vercel-ai-sdk"
    },
    body: JSON.stringify({ model: "google/text-embedding-004", input: text.slice(0, 8e3) })
  });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data[0]?.embedding ?? [];
}
async function retrieveVaultContext(userId, question, key) {
  const embedding = await embedText$1(question, key);
  if (!embedding.length) return "";
  const { data } = await supabaseAdmin.rpc("match_documents", {
    _user_id: userId,
    _embedding: JSON.stringify(embedding),
    _match_count: 5,
    _doc_kind: null
  });
  if (!data?.length) return "";
  const chunks = data.map((r, i) => `[${i + 1}] ${r.file_name} (${r.doc_kind})
${r.content}`).join("\n\n---\n\n");
  return `

--- Retrieved from user's Knowledge Vault ---
${chunks}
--- End of vault context ---`;
}
const Route$5 = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = await request.json();
        const { messages, userId } = body;
        if (!Array.isArray(messages)) return new Response("Messages required", { status: 400 });
        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("LOVABLE_API_KEY not configured", { status: 500 });
        if (userId) {
          try {
            await enforceRateLimit(userId, "/api/chat");
          } catch (e) {
            if (e instanceof RateLimitError) {
              return new Response(e.message, { status: 429 });
            }
          }
        }
        const gateway = createLovableAiGatewayProvider(key);
        const lastUserMsg = [...messages].reverse().find((m2) => m2.role === "user");
        const lastUserText = lastUserMsg ? (lastUserMsg.parts ?? []).map((p) => p.type === "text" ? p.text : "").join("") : "";
        const vaultContext = userId && lastUserText ? await retrieveVaultContext(userId, lastUserText, key) : "";
        const businessContext = userId ? await buildBusinessContext(userId) : "";
        const system = SYSTEM$1 + businessContext + vaultContext;
        const result = streamText({
          model: gateway("google/gemini-3-flash-preview"),
          system,
          messages: await convertToModelMessages(messages)
        });
        return result.toUIMessageStreamResponse({ originalMessages: messages });
      }
    }
  }
});
async function embedText(text) {
  const key = process.env.LOVABLE_API_KEY;
  if (!key) return [];
  const res = await fetch("https://ai.gateway.lovable.dev/v1/embeddings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Lovable-API-Key": key,
      "X-Lovable-AIG-SDK": "vercel-ai-sdk"
    },
    body: JSON.stringify({ model: "google/text-embedding-004", input: text.slice(0, 8e3) })
  });
  if (!res.ok) return [];
  const json = await res.json();
  return json.data[0]?.embedding ?? [];
}
async function loadBusiness(userId) {
  const { data } = await supabaseAdmin.from("businesses").select("*").eq("user_id", userId).order("created_at", { ascending: true }).limit(1).maybeSingle();
  return data;
}
async function businessProfileImpl(ctx) {
  const b = await loadBusiness(ctx.userId);
  if (!b) {
    return {
      found: false,
      provenance: "USER_CONFIRMED",
      message: "No business profile yet. Ask the user to complete onboarding at /business."
    };
  }
  return {
    found: true,
    provenance: "USER_CONFIRMED",
    business: {
      id: b.id,
      name: b.name,
      industry: b.industry,
      country: b.country,
      stage: b.stage,
      team_size: b.team_size,
      revenue_range: b.revenue_range,
      primary_objective: b.primary_objective,
      funding_requirement: b.funding_requirement_minor != null ? Number(b.funding_requirement_minor) / 100 : null,
      funding_currency: b.funding_currency,
      funding_purpose: b.funding_purpose,
      onboarding_complete: b.onboarding_complete
    }
  };
}
async function financialSummaryImpl(ctx) {
  const [{ data: funding }, { data: docs }, { data: payments }] = await Promise.all([
    supabaseAdmin.from("funding_requests").select("id, title, amount_requested, currency, status, human_approval, created_at").eq("user_id", ctx.userId).order("created_at", { ascending: false }).limit(10),
    supabaseAdmin.from("knowledge_documents").select("doc_kind, file_name, created_at").eq("user_id", ctx.userId).eq("chunk_index", 0),
    supabaseAdmin.from("payment_transactions").select("amount_minor, currency, status, plan, created_at").eq("user_id", ctx.userId).order("created_at", { ascending: false }).limit(5)
  ]);
  const requests = funding ?? [];
  const approved = requests.filter((r) => r.human_approval === "approved");
  const evidence = (docs ?? []).reduce((acc, d) => {
    acc[d.doc_kind] = (acc[d.doc_kind] ?? 0) + 1;
    return acc;
  }, {});
  return {
    provenance: "EXTRACTED",
    funding_requests: requests.length,
    pending_review: requests.filter((r) => r.human_approval === "pending").length,
    approved_requests: approved.length,
    approved_capital: approved.reduce((s, r) => s + Number(r.amount_requested), 0),
    evidence_documents: (docs ?? []).length,
    evidence_by_kind: evidence,
    recent_payments: (payments ?? []).map((p) => ({
      amount: p.amount_minor / 100,
      currency: p.currency,
      status: p.status,
      plan: p.plan
    }))
  };
}
async function trustProfileImpl(ctx) {
  const [{ data: profile }, { data: events }] = await Promise.all([
    supabaseAdmin.from("profiles").select("trust_score, verified, region, display_name").eq("user_id", ctx.userId).maybeSingle(),
    supabaseAdmin.from("verification_events").select("status, kind").eq("user_id", ctx.userId)
  ]);
  const list = events ?? [];
  return {
    provenance: "VERIFIED",
    trust_score: profile?.trust_score ?? 50,
    verified: profile?.verified ?? false,
    region: profile?.region ?? null,
    display_name: profile?.display_name ?? "Entrepreneur",
    verifications: {
      verified: list.filter((e) => e.status === "verified").length,
      pending: list.filter((e) => e.status === "pending").length,
      rejected: list.filter((e) => e.status === "rejected").length
    }
  };
}
async function knowledgeImpl(ctx, query, topK) {
  const embedding = await embedText(query);
  const { data } = await supabaseAdmin.rpc("match_documents", {
    _user_id: ctx.userId,
    _embedding: JSON.stringify(embedding),
    _match_count: topK,
    _doc_kind: null
  });
  const rows = data ?? [];
  return {
    provenance: "EXTRACTED",
    source_count: rows.length,
    sources: rows.map((r) => ({ file_name: r.file_name, doc_kind: r.doc_kind })),
    passages: rows.map((r) => ({ file_name: r.file_name, excerpt: r.content.slice(0, 1200) }))
  };
}
const Empty = objectType({});
const ATLAS_TOOLS = {
  getBusinessProfile: {
    description: "Retrieve the entrepreneur's confirmed business profile (name, industry, country, stage, team size, revenue range, objective, funding requirement).",
    input: Empty,
    run: (_a, ctx) => businessProfileImpl(ctx)
  },
  getFinancialSummary: {
    description: "Summarise the business's recorded financial activity: funding requests, approved capital, payments, and the evidence held in the Knowledge Vault.",
    input: Empty,
    run: (_a, ctx) => financialSummaryImpl(ctx)
  },
  getTrustProfile: {
    description: "Retrieve the Atlas trust score, verification status and verification history counts.",
    input: Empty,
    run: (_a, ctx) => trustProfileImpl(ctx)
  },
  searchBusinessKnowledge: {
    description: "Retrieve passages from the entrepreneur's uploaded evidence (receipts, statements, plans) in the Knowledge Vault. Always cite the returned sources; never invent one.",
    input: objectType({
      query: stringType().min(3).max(500),
      topK: numberType().int().min(1).max(8).default(5)
    }),
    run: (args, ctx) => knowledgeImpl(ctx, args.query, args.topK)
  },
  generateTreasurySummary: {
    description: "Produce a short treasury health summary grounded in recorded capital and evidence.",
    input: Empty,
    run: async (_a, ctx) => {
      const [financial, trust] = await Promise.all([financialSummaryImpl(ctx), trustProfileImpl(ctx)]);
      const capital = Number(financial.approved_capital ?? 0);
      const docs = Number(financial.evidence_documents ?? 0);
      const score = Number(trust.trust_score ?? 50);
      const grade = capital > 0 && docs >= 3 && score >= 70 ? "A" : docs >= 1 && score >= 50 ? "B" : "C";
      return {
        provenance: "ESTIMATED",
        health_grade: grade,
        approved_capital: capital,
        evidence_documents: docs,
        trust_score: score,
        recommendations: [
          docs < 3 ? "Upload at least three financial documents to strengthen evidence." : "Evidence base is adequate; keep it current.",
          score < 70 ? "Complete verifications to lift your trust score above 70." : "Maintain your verification cadence.",
          capital === 0 ? "No approved capital recorded yet — generate a funding readiness recommendation." : "Track deployment of approved capital."
        ]
      };
    }
  },
  generateFundingReadiness: {
    description: "Generate a Funding Readiness Recommendation from the business profile, financial summary, trust profile and vault evidence. This is NOT a loan approval.",
    input: objectType({
      requestedAmount: numberType().positive().max(1e7).optional(),
      purpose: stringType().max(500).optional()
    }),
    run: async (args, ctx) => {
      const [profile, financial, trust, knowledge] = await Promise.all([
        businessProfileImpl(ctx),
        financialSummaryImpl(ctx),
        trustProfileImpl(ctx),
        knowledgeImpl(ctx, args.purpose ?? "revenue, expenses, inventory, cash flow", 5)
      ]);
      const key = process.env.LOVABLE_API_KEY;
      if (!key) return { error: "AI gateway not configured." };
      const gateway = createLovableAiGatewayProvider(key);
      const schema = objectType({
        readiness_score: numberType().min(0).max(100),
        recommended_range: objectType({ min: numberType(), max: numberType(), currency: stringType() }),
        evidence: arrayType(stringType()).min(1).max(6),
        missing_information: arrayType(stringType()).max(6),
        risk_factors: arrayType(stringType()).max(6),
        next_steps: arrayType(stringType()).min(1).max(5),
        rationale: stringType().max(1200)
      });
      const t0 = Date.now();
      const { object } = await generateObject({
        model: gateway("google/gemini-2.5-flash"),
        schema,
        prompt: `Produce a FUNDING READINESS RECOMMENDATION (never a loan approval) for this entrepreneur.

BUSINESS PROFILE (user-confirmed): ${JSON.stringify(profile)}
FINANCIAL SUMMARY (extracted from records): ${JSON.stringify(financial)}
TRUST PROFILE (verified events): ${JSON.stringify(trust)}
VAULT EVIDENCE (retrieved passages): ${JSON.stringify(knowledge)}
REQUESTED: ${args.requestedAmount ?? "not stated"} for ${args.purpose ?? "unstated purpose"}

Rules: cite only evidence actually present above. If evidence is thin, say so in missing_information and keep the recommended range conservative.`
      });
      void recordAgentEvent({
        userId: ctx.userId,
        agent: "Atlas CFO",
        action: "funding_readiness",
        latencyMs: Date.now() - t0,
        confidence: object.readiness_score / 100,
        outcome: "generated",
        sourcesRetrieved: Number(knowledge.source_count ?? 0),
        metadata: { sessionId: ctx.sessionId, channel: ctx.channel }
      });
      return { provenance: "ESTIMATED", label: "Funding Readiness Recommendation", ...object };
    }
  },
  requestHumanReview: {
    description: "Escalate to a human reviewer. Creates a funding request in `submitted` state (awaiting human review) and notifies reviewers. Only call after the user explicitly confirms the amount and purpose.",
    input: objectType({
      title: stringType().min(3).max(160),
      amount: numberType().positive().max(1e7),
      currency: stringType().min(3).max(3).default("USD"),
      purpose: stringType().min(10).max(2e3)
    }),
    mutating: true,
    run: async (args, ctx) => {
      const business = await loadBusiness(ctx.userId);
      const { data, error } = await supabaseAdmin.from("funding_requests").insert({
        user_id: ctx.userId,
        business_id: business?.id ?? null,
        title: args.title,
        pitch: args.purpose,
        amount_requested: args.amount,
        currency: args.currency.toUpperCase(),
        sector: business?.industry ?? null,
        region: business?.country ?? null,
        attachments: [],
        status: "submitted",
        human_approval: "pending"
      }).select("id, title, amount_requested, currency, status, human_approval").single();
      if (error) return { created: false, error: error.message };
      return {
        created: true,
        awaiting: "human_review",
        request_id: data.id,
        title: data.title,
        amount: data.amount_requested,
        currency: data.currency,
        status: data.status
      };
    }
  }
};
function isAtlasTool(name) {
  return Object.prototype.hasOwnProperty.call(ATLAS_TOOLS, name);
}
async function runAtlasTool(name, rawArgs, ctx) {
  if (!isAtlasTool(name)) return { error: `Unknown tool: ${name}` };
  const def = ATLAS_TOOLS[name];
  const startedAt = Date.now();
  const parsed = def.input.safeParse(rawArgs ?? {});
  if (!parsed.success) {
    void recordInteractionStep({
      userId: ctx.userId,
      workflowId: ctx.sessionId,
      step: `tool:${name}`,
      status: "error",
      metadata: { channel: ctx.channel, error: "invalid_input", issues: parsed.error.issues.slice(0, 4) }
    });
    return { error: "Invalid tool input", issues: parsed.error.issues.map((i) => i.message) };
  }
  try {
    const output = await def.run(parsed.data, ctx);
    void recordInteractionStep({
      userId: ctx.userId,
      workflowId: ctx.sessionId,
      step: `tool:${name}`,
      status: "complete",
      metadata: {
        channel: ctx.channel,
        agent: "Atlas CFO",
        durationMs: Date.now() - startedAt,
        mutating: def.mutating ?? false,
        outputKeys: Object.keys(output).slice(0, 12)
      }
    });
    if (def.mutating) {
      await supabaseAdmin.rpc("log_audit", {
        _actor: ctx.userId,
        _action: `agent.tool.${name}`,
        _entity_type: "agent_tool",
        _entity_id: null,
        _subject: ctx.userId,
        _summary: `Atlas CFO executed ${name} (${ctx.channel})`,
        _details: { sessionId: ctx.sessionId, output }
      });
    }
    return output;
  } catch (e) {
    const message = e instanceof Error ? e.message : "Tool execution failed";
    void recordInteractionStep({
      userId: ctx.userId,
      workflowId: ctx.sessionId,
      step: `tool:${name}`,
      status: "error",
      metadata: { channel: ctx.channel, error: message }
    });
    return { error: message };
  }
}
const OpportunityQuickSchema = objectType({
  opportunities: arrayType(objectType({
    title: stringType(),
    type: stringType(),
    fit_score: numberType(),
    next_step: stringType()
  })).min(1).max(5),
  summary: stringType()
});
const TreasuryQuickSchema = objectType({
  health_score: stringType(),
  headline: stringType(),
  cashflow_assessment: stringType(),
  recommendations: arrayType(stringType()).min(1).max(4)
});
function normalizeToolName(name) {
  const map = {
    createFundingRequest: "create_funding_request",
    updateTrustScore: "update_trust_score",
    generateTreasuryReport: "generate_treasury_report",
    createVerificationRecord: "create_verification_record",
    findFundingOpportunities: "find_funding_opportunities",
    sendNotification: "send_notification",
    getTrustScore: "get_trust_score",
    getFundingStatus: "get_funding_status",
    getTreasuryMetrics: "get_treasury_metrics"
  };
  return map[name] ?? name;
}
async function dispatch(toolName, params, userId) {
  switch (toolName) {
    case "get_trust_score": {
      const { data } = await supabaseAdmin.from("profiles").select("trust_score, verified, display_name, region").eq("user_id", userId).single();
      const { data: verEvents } = await supabaseAdmin.from("verification_events").select("status, kind").eq("user_id", userId);
      const verified = (verEvents ?? []).filter((e) => e.status === "verified").length;
      return {
        atlasScore: data?.trust_score ?? 50,
        trust_score: data?.trust_score ?? 50,
        verified: data?.verified ?? false,
        verified_proofs: verified,
        region: data?.region ?? "unknown",
        display_name: data?.display_name ?? "Entrepreneur"
      };
    }
    case "get_funding_status": {
      const { data } = await supabaseAdmin.from("funding_requests").select("id, title, amount_requested, currency, status, human_approval, decision_report, created_at").eq("user_id", userId).order("created_at", { ascending: false }).limit(5);
      const requests = (data ?? []).map((r) => ({
        id: r.id,
        title: r.title,
        amount: r.amount_requested,
        currency: r.currency,
        status: r.status,
        human_approval: r.human_approval,
        funding_readiness: r.decision_report ? r.decision_report?.trust_assessment?.score ?? null : null
      }));
      return { recent_requests: requests, total: requests.length };
    }
    case "create_funding_request": {
      const title = String(params.title ?? "Voice Funding Request");
      const amount = Number(params.amount ?? 0);
      const currency = String(params.currency ?? "USD");
      const pitch = String(params.pitch ?? "Submitted via Atlas CFO voice conversation.");
      const sector = params.sector ? String(params.sector) : null;
      const region = params.region ? String(params.region) : null;
      if (amount <= 0) return { error: "Amount must be greater than zero." };
      const { data, error } = await supabaseAdmin.from("funding_requests").insert({
        user_id: userId,
        title,
        pitch,
        amount_requested: amount,
        currency,
        sector,
        region,
        attachments: [],
        status: "submitted"
      }).select("id, title, amount_requested, currency, status").single();
      if (error) return { error: error.message };
      return { created: true, request_id: data.id, title: data.title, amount: data.amount_requested, currency: data.currency, status: data.status };
    }
    case "get_treasury_metrics": {
      const { data: approved } = await supabaseAdmin.from("funding_requests").select("amount_requested, currency, created_at").eq("user_id", userId).eq("human_approval", "approved");
      const totalCapital = (approved ?? []).reduce((s, r) => s + Number(r.amount_requested), 0);
      const { data: docs } = await supabaseAdmin.from("knowledge_documents").select("doc_kind, created_at").eq("user_id", userId).eq("chunk_index", 0);
      const docKinds = (docs ?? []).reduce((acc, d) => {
        acc[d.doc_kind] = (acc[d.doc_kind] ?? 0) + 1;
        return acc;
      }, {});
      return {
        total_capital_approved: totalCapital,
        approved_requests: (approved ?? []).length,
        document_summary: docKinds,
        currency: "USD"
      };
    }
    case "update_trust_score": {
      const delta = Number(params.delta ?? 0);
      const reason = String(params.reason ?? "Adjusted via Atlas CFO");
      const { data: profile } = await supabaseAdmin.from("profiles").select("trust_score").eq("user_id", userId).single();
      const current = profile?.trust_score ?? 50;
      const next = Math.max(0, Math.min(100, Math.round(current + delta)));
      await supabaseAdmin.from("profiles").update({ trust_score: next, updated_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("user_id", userId);
      await supabaseAdmin.from("risk_scores").insert({
        user_id: userId,
        trust_score: next,
        risk_level: next >= 70 ? "low" : next >= 40 ? "medium" : "high",
        recommendation: "manual_adjustment",
        rationale: reason,
        flags: [],
        signals: { delta, source: "cfo_voice" }
      });
      return { atlasScore: next, previous: current, delta, reason };
    }
    case "create_verification_record": {
      const kind = String(params.kind ?? "other");
      const claim = String(params.claim ?? "Submitted via Atlas CFO voice session.");
      const rawStatus = String(params.status ?? "pending");
      const status = rawStatus === "verified" || rawStatus === "rejected" ? rawStatus : "pending";
      const { data, error } = await supabaseAdmin.from("verification_events").insert({
        user_id: userId,
        kind,
        status,
        evidence_url: params.evidence_url ? String(params.evidence_url) : null,
        notes: JSON.stringify({ claim, source: "cfo_voice", confidence: params.confidence ?? null })
      }).select("id, kind, status").single();
      if (error) return { error: error.message };
      return {
        verificationStatus: data.status,
        confidence: Number(params.confidence ?? 0.8),
        event_id: data.id
      };
    }
    case "find_funding_opportunities": {
      const [{ data: profile }, { data: funding }] = await Promise.all([
        supabaseAdmin.from("profiles").select("trust_score, region, display_name").eq("user_id", userId).single(),
        supabaseAdmin.from("funding_requests").select("sector, human_approval").eq("user_id", userId).limit(5)
      ]);
      const key = process.env.LOVABLE_API_KEY;
      if (!key) return { error: "AI not configured" };
      const gateway = createLovableAiGatewayProvider(key);
      const sectors = [...new Set((funding ?? []).map((r) => r.sector).filter(Boolean))].join(", ") || "general";
      const { object } = await generateObject({
        model: gateway("google/gemini-2.5-flash"),
        schema: OpportunityQuickSchema,
        prompt: `Find 3-5 funding opportunities for ${profile?.display_name ?? "entrepreneur"} in ${profile?.region ?? "Africa"}. Trust score: ${profile?.trust_score ?? 50}/100. Sector: ${sectors}. Be concise and actionable.`
      });
      return {
        fundingReadiness: profile?.trust_score ?? 50,
        recommendedAmount: Number(params.target_amount ?? 1500),
        confidence: 0.85,
        opportunities: object.opportunities,
        summary: object.summary
      };
    }
    case "generate_treasury_report": {
      const [{ data: profile }, { data: funding }] = await Promise.all([
        supabaseAdmin.from("profiles").select("trust_score, display_name, region").eq("user_id", userId).single(),
        supabaseAdmin.from("funding_requests").select("title, amount_requested, human_approval").eq("user_id", userId).limit(10)
      ]);
      const approved = (funding ?? []).filter((r) => r.human_approval === "approved");
      const total = approved.reduce((s, r) => s + Number(r.amount_requested), 0);
      const key = process.env.LOVABLE_API_KEY;
      if (!key) {
        return {
          health_score: total > 0 ? "B" : "C",
          headline: `${approved.length} approved requests totaling $${total.toLocaleString()}`,
          cashflow_assessment: "Limited data — upload vault documents for richer analysis.",
          recommendations: ["Upload receipts and invoices to the Knowledge Vault", "Submit a funding request if you need capital"]
        };
      }
      const gateway = createLovableAiGatewayProvider(key);
      const { object } = await generateObject({
        model: gateway("google/gemini-2.5-flash"),
        schema: TreasuryQuickSchema,
        prompt: `Generate a brief treasury report for ${profile?.display_name}. Trust: ${profile?.trust_score}/100. Approved capital: $${total}. Region: ${profile?.region ?? "unknown"}.`
      });
      return object;
    }
    case "send_notification": {
      const title = String(params.title ?? "Message from Atlas CFO");
      const body = String(params.body ?? "Your AI financial officer has an update for you.");
      const link = params.link ? String(params.link) : "/notifications";
      await supabaseAdmin.rpc("notify_user", {
        _user: userId,
        _kind: "cfo_message",
        _title: title,
        _body: body.slice(0, 500),
        _link: link,
        _metadata: { source: "cfo_voice" }
      });
      return { sent: true, title, link };
    }
    default:
      if (isAtlasTool(toolName)) {
        return runAtlasTool(toolName, params, {
          userId,
          sessionId: `cfo-voice-${userId}`,
          channel: "voice"
        });
      }
      return { error: `Unknown tool: ${toolName}` };
  }
}
const Route$4 = createFileRoute("/api/cfo-tools")({
  server: {
    handlers: {
      POST: async () => {
        const request = getRequest();
        const t0 = Date.now();
        const body = await request.json();
        if (body.type !== "tool_call" || !body.tool_call) {
          return Response.json({ error: "Not a tool_call event" }, { status: 400 });
        }
        const userId = body.dynamic_variables?.user_id;
        if (!userId) {
          return Response.json({
            type: "tool_result",
            tool_call_id: body.tool_call.tool_call_id,
            result: JSON.stringify({ error: "user_id not provided in dynamic_variables" })
          });
        }
        const ephemeralToken = body.dynamic_variables?.ephemeral_token ?? request.headers.get("x-ephemeral-token") ?? "";
        if (ephemeralToken) {
          const session = await verifyEphemeralToken(ephemeralToken, "cfo_voice");
          if (!session || session.userId !== userId) {
            return Response.json({
              type: "tool_result",
              tool_call_id: body.tool_call.tool_call_id,
              result: JSON.stringify({ error: "Invalid or expired session token" })
            });
          }
        } else if (process.env.CFO_TOOLS_REQUIRE_EPHEMERAL === "true") {
          return Response.json({
            type: "tool_result",
            tool_call_id: body.tool_call.tool_call_id,
            result: JSON.stringify({ error: "Ephemeral token required" })
          });
        }
        try {
          await enforceRateLimit(userId, "/api/cfo-tools");
        } catch (e) {
          if (e instanceof RateLimitError) {
            return Response.json({
              type: "tool_result",
              tool_call_id: body.tool_call.tool_call_id,
              result: JSON.stringify({ error: e.message })
            }, { status: 429 });
          }
        }
        const toolName = normalizeToolName(body.tool_call.tool_name);
        const result = await dispatch(toolName, body.tool_call.parameters ?? {}, userId);
        void recordAgentEvent({
          userId,
          agent: "CFO Agent",
          action: `tool.${toolName}`,
          latencyMs: Date.now() - t0,
          outcome: "error" in result && result.error ? "error" : "answered",
          metadata: {
            tool: toolName,
            conversation_id: body.conversation_id ?? null,
            result_preview: JSON.stringify(result).slice(0, 200)
          }
        });
        return Response.json({
          type: "tool_result",
          tool_call_id: body.tool_call.tool_call_id,
          result: JSON.stringify(result)
        });
      }
    }
  }
});
const $$splitComponentImporter$1 = () => import("./analytics.funding-CyBg_QBf.mjs");
const Route$3 = createFileRoute("/analytics/funding")({
  head: () => ({
    meta: [{
      title: "Funding analytics — Atlas Sanctum"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./admin.roles-D6lfNQsC.mjs");
const Route$2 = createFileRoute("/admin/roles")({
  head: () => ({
    meta: [{
      title: "Admin · Roles — Atlas Sanctum"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const Route$1 = createFileRoute("/api/public/paystack-webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const raw = await request.text();
        const signature = request.headers.get("x-paystack-signature");
        if (!await verifyPaystackSignature(raw, signature)) {
          return new Response("Invalid signature", { status: 401 });
        }
        let payload;
        try {
          payload = JSON.parse(raw);
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }
        const event = payload?.event ?? "";
        const d = payload?.data ?? {};
        const customerCode = d?.customer?.customer_code;
        const metaUserId = d?.metadata?.user_id;
        const { supabaseAdmin: supabaseAdmin2 } = await import("./client.server-D5ro3rAQ.mjs");
        let userId = metaUserId ?? null;
        if (!userId && customerCode) {
          const { data: p } = await supabaseAdmin2.from("profiles").select("user_id").eq("paystack_customer_code", customerCode).maybeSingle();
          userId = p?.user_id ?? null;
        }
        if (!userId) return new Response("ok");
        const planFromCode = (code) => {
          if (!code) return null;
          if (code === "PLN_uyp6ozxms5p8arf") return "launch";
          if (code === "PLN_8wbpj7a1hbt2zqz") return "growth";
          if (code === "PLN_uvbpj21sxef67dv") return "scale";
          return null;
        };
        if (event === "charge.success") {
          const reference = d?.reference;
          const plan = d?.metadata?.plan ?? planFromCode(d?.plan?.plan_code ?? d?.plan_object?.plan_code) ?? null;
          if (reference) {
            await supabaseAdmin2.from("payment_transactions").update({
              status: "success",
              channel: d?.channel ?? null,
              amount_minor: d?.amount ?? 0,
              currency: d?.currency ?? BILLING_CURRENCY,
              raw: d
            }).eq("reference", reference);
          }
          if (plan) {
            await supabaseAdmin2.from("profiles").update({
              subscription_plan: plan,
              subscription_status: "active",
              subscription_currency: d?.currency ?? BILLING_CURRENCY,
              subscription_amount_minor: d?.amount ?? 0,
              subscription_current_period_end: new Date(Date.now() + 30 * 864e5).toISOString(),
              updated_at: (/* @__PURE__ */ new Date()).toISOString()
            }).eq("user_id", userId);
          }
          await supabaseAdmin2.from("subscription_events").insert({
            user_id: userId,
            plan: plan ?? "free",
            event_type: "payment_succeeded",
            amount_cents: d?.amount ?? 0,
            currency: d?.currency ?? BILLING_CURRENCY,
            metadata: { provider: "paystack", reference: d?.reference ?? null, channel: d?.channel ?? null }
          });
        }
        if (event === "subscription.create" || event === "subscription.enable") {
          const plan = planFromCode(d?.plan?.plan_code);
          await supabaseAdmin2.from("profiles").update({
            paystack_subscription_code: d?.subscription_code ?? null,
            paystack_email_token: d?.email_token ?? null,
            paystack_plan_code: d?.plan?.plan_code ?? null,
            subscription_status: "active",
            ...plan ? { subscription_plan: plan } : {},
            subscription_current_period_end: d?.next_payment_date ?? null,
            updated_at: (/* @__PURE__ */ new Date()).toISOString()
          }).eq("user_id", userId);
        }
        if (event === "subscription.not_renew" || event === "subscription.disable") {
          await supabaseAdmin2.from("profiles").update({ subscription_status: "cancelled", updated_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("user_id", userId);
          await supabaseAdmin2.from("subscription_events").insert({
            user_id: userId,
            plan: planFromCode(d?.plan?.plan_code) ?? "free",
            event_type: "subscription_cancelled",
            amount_cents: 0,
            currency: BILLING_CURRENCY,
            metadata: { provider: "paystack", event }
          });
        }
        if (event === "invoice.payment_failed") {
          await supabaseAdmin2.from("profiles").update({ subscription_status: "past_due", updated_at: (/* @__PURE__ */ new Date()).toISOString() }).eq("user_id", userId);
          await supabaseAdmin2.from("subscription_events").insert({
            user_id: userId,
            plan: planFromCode(d?.subscription?.plan?.plan_code) ?? "free",
            event_type: "payment_failed",
            amount_cents: d?.amount ?? 0,
            currency: d?.currency ?? BILLING_CURRENCY,
            metadata: { provider: "paystack", event }
          });
        }
        return new Response("ok");
      }
    }
  }
});
const SYSTEM = `You are Atlas CFO — the AI Chief Financial Officer of Atlas Sanctum.

You advise entrepreneurs in Africa and emerging markets on business health, evidence, and funding readiness.

Operating rules:
- Ground every factual claim in a tool result. If you do not have data, call a tool. Never invent figures or sources.
- When you cite evidence, name the document the passage came from.
- Label numbers as extracted, estimated, verified, or user-confirmed.
- Funding output is a "Funding Readiness Recommendation", never a loan approval or guarantee.
- Before calling requestHumanReview, restate the amount, currency and purpose and get an explicit "yes".
- Be concise and warm. End with a clear next step or a question.`;
async function resolveUser(authHeader) {
  if (!authHeader?.startsWith("Bearer ")) return null;
  const token = authHeader.slice(7);
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  if (!token || !url || !key) return null;
  const client = createClient(url, key, {
    auth: { storage: void 0, persistSession: false, autoRefreshToken: false }
  });
  const { data, error } = await client.auth.getClaims(token);
  if (error || !data?.claims?.sub) return null;
  return String(data.claims.sub);
}
const Route = createFileRoute("/api/cfo/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const userId = await resolveUser(request.headers.get("authorization"));
        if (!userId) return new Response("Unauthorized", { status: 401 });
        const body = await request.json();
        if (!Array.isArray(body.messages)) return new Response("Messages required", { status: 400 });
        const apiKey = process.env.LOVABLE_API_KEY;
        if (!apiKey) return new Response("AI gateway not configured", { status: 500 });
        try {
          await enforceRateLimit(userId, "/api/chat");
        } catch (e) {
          if (e instanceof RateLimitError) return new Response(e.message, { status: 429 });
        }
        const sessionId = `cfo-text-${crypto.randomUUID()}`;
        const ctx = { userId, sessionId, channel: "text" };
        void recordInteractionStep({
          userId,
          workflowId: sessionId,
          step: "understand_request",
          status: "complete",
          metadata: { agent: "Atlas CFO", channel: "text" }
        });
        const tools = Object.fromEntries(
          Object.entries(ATLAS_TOOLS).map(([name, def]) => [
            name,
            tool({
              description: def.description,
              inputSchema: def.input,
              execute: async (args) => runAtlasTool(name, args, ctx)
            })
          ])
        );
        const gateway = createLovableAiGatewayProvider(apiKey);
        const t0 = Date.now();
        const result = streamText({
          model: gateway("google/gemini-2.5-flash"),
          system: SYSTEM,
          messages: await convertToModelMessages(body.messages),
          tools,
          stopWhen: stepCountIs(6),
          onFinish: ({ usage }) => {
            void recordInteractionStep({
              userId,
              workflowId: sessionId,
              step: "respond",
              status: "complete",
              metadata: { agent: "Atlas CFO", channel: "text", durationMs: Date.now() - t0 }
            });
            void recordAgentEvent({
              userId,
              agent: "Atlas CFO",
              action: "chat.text",
              latencyMs: Date.now() - t0,
              inputTokens: usage?.inputTokens,
              outputTokens: usage?.outputTokens,
              outcome: "answered",
              metadata: { sessionId }
            });
          }
        });
        return result.toUIMessageStreamResponse({ originalMessages: body.messages });
      }
    }
  }
});
const VerificationRoute = Route$E.update({
  id: "/verification",
  path: "/verification",
  getParentRoute: () => Route$F
});
const VaultRoute = Route$D.update({
  id: "/vault",
  path: "/vault",
  getParentRoute: () => Route$F
});
const TreasuryRoute = Route$C.update({
  id: "/treasury",
  path: "/treasury",
  getParentRoute: () => Route$F
});
const SubscriptionRoute = Route$B.update({
  id: "/subscription",
  path: "/subscription",
  getParentRoute: () => Route$F
});
const SitemapDotxmlRoute = Route$A.update({
  id: "/sitemap.xml",
  path: "/sitemap.xml",
  getParentRoute: () => Route$F
});
const RiskRoute = Route$z.update({
  id: "/risk",
  path: "/risk",
  getParentRoute: () => Route$F
});
const RevenueRoute = Route$y.update({
  id: "/revenue",
  path: "/revenue",
  getParentRoute: () => Route$F
});
const RegenerativeRoute = Route$x.update({
  id: "/regenerative",
  path: "/regenerative",
  getParentRoute: () => Route$F
});
const ReferralsRoute = Route$w.update({
  id: "/referrals",
  path: "/referrals",
  getParentRoute: () => Route$F
});
const ProfileRoute = Route$v.update({
  id: "/profile",
  path: "/profile",
  getParentRoute: () => Route$F
});
const PricingRoute = Route$u.update({
  id: "/pricing",
  path: "/pricing",
  getParentRoute: () => Route$F
});
const OrchestratorRoute = Route$t.update({
  id: "/orchestrator",
  path: "/orchestrator",
  getParentRoute: () => Route$F
});
const OpportunitiesRoute = Route$s.update({
  id: "/opportunities",
  path: "/opportunities",
  getParentRoute: () => Route$F
});
const ObservabilityRoute = Route$r.update({
  id: "/observability",
  path: "/observability",
  getParentRoute: () => Route$F
});
const NotificationsRoute = Route$q.update({
  id: "/notifications",
  path: "/notifications",
  getParentRoute: () => Route$F
});
const LoginRoute = Route$p.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$F
});
const ImpactRoute = Route$o.update({
  id: "/impact",
  path: "/impact",
  getParentRoute: () => Route$F
});
const IdentityRoute = Route$n.update({
  id: "/identity",
  path: "/identity",
  getParentRoute: () => Route$F
});
const GrowthRoute = Route$m.update({
  id: "/growth",
  path: "/growth",
  getParentRoute: () => Route$F
});
const FundingRoute = Route$l.update({
  id: "/funding",
  path: "/funding",
  getParentRoute: () => Route$F
});
const EligibilityRoute = Route$k.update({
  id: "/eligibility",
  path: "/eligibility",
  getParentRoute: () => Route$F
});
const EconomicGraphRoute = Route$j.update({
  id: "/economic-graph",
  path: "/economic-graph",
  getParentRoute: () => Route$F
});
const CommunityRoute = Route$i.update({
  id: "/community",
  path: "/community",
  getParentRoute: () => Route$F
});
const CfoRoute = Route$h.update({
  id: "/cfo",
  path: "/cfo",
  getParentRoute: () => Route$F
});
const CashflowRoute = Route$g.update({
  id: "/cashflow",
  path: "/cashflow",
  getParentRoute: () => Route$F
});
const BusinessOsRoute = Route$f.update({
  id: "/business-os",
  path: "/business-os",
  getParentRoute: () => Route$F
});
const BusinessRoute = Route$e.update({
  id: "/business",
  path: "/business",
  getParentRoute: () => Route$F
});
const AuditRoute = Route$d.update({
  id: "/audit",
  path: "/audit",
  getParentRoute: () => Route$F
});
const ApprovalsRoute = Route$c.update({
  id: "/approvals",
  path: "/approvals",
  getParentRoute: () => Route$F
});
const IndexRoute = Route$b.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$F
});
const SettingsNotificationsRoute = Route$a.update({
  id: "/settings/notifications",
  path: "/settings/notifications",
  getParentRoute: () => Route$F
});
const BillingCallbackRoute = Route$9.update({
  id: "/billing/callback",
  path: "/billing/callback",
  getParentRoute: () => Route$F
});
const ApiVaultFileRoute = Route$8.update({
  id: "/api/vault-file",
  path: "/api/vault-file",
  getParentRoute: () => Route$F
});
const ApiSessionRoute = Route$7.update({
  id: "/api/session",
  path: "/api/session",
  getParentRoute: () => Route$F
});
const ApiEmbedRoute = Route$6.update({
  id: "/api/embed",
  path: "/api/embed",
  getParentRoute: () => Route$F
});
const ApiChatRoute = Route$5.update({
  id: "/api/chat",
  path: "/api/chat",
  getParentRoute: () => Route$F
});
const ApiCfoToolsRoute = Route$4.update({
  id: "/api/cfo-tools",
  path: "/api/cfo-tools",
  getParentRoute: () => Route$F
});
const AnalyticsFundingRoute = Route$3.update({
  id: "/analytics/funding",
  path: "/analytics/funding",
  getParentRoute: () => Route$F
});
const AdminRolesRoute = Route$2.update({
  id: "/admin/roles",
  path: "/admin/roles",
  getParentRoute: () => Route$F
});
const ApiPublicPaystackWebhookRoute = Route$1.update({
  id: "/api/public/paystack-webhook",
  path: "/api/public/paystack-webhook",
  getParentRoute: () => Route$F
});
const ApiCfoChatRoute = Route.update({
  id: "/api/cfo/chat",
  path: "/api/cfo/chat",
  getParentRoute: () => Route$F
});
const rootRouteChildren = {
  IndexRoute,
  ApprovalsRoute,
  AuditRoute,
  BusinessRoute,
  BusinessOsRoute,
  CashflowRoute,
  CfoRoute,
  CommunityRoute,
  EconomicGraphRoute,
  EligibilityRoute,
  FundingRoute,
  GrowthRoute,
  IdentityRoute,
  ImpactRoute,
  LoginRoute,
  NotificationsRoute,
  ObservabilityRoute,
  OpportunitiesRoute,
  OrchestratorRoute,
  PricingRoute,
  ProfileRoute,
  ReferralsRoute,
  RegenerativeRoute,
  RevenueRoute,
  RiskRoute,
  SitemapDotxmlRoute,
  SubscriptionRoute,
  TreasuryRoute,
  VaultRoute,
  VerificationRoute,
  AdminRolesRoute,
  AnalyticsFundingRoute,
  ApiCfoToolsRoute,
  ApiChatRoute,
  ApiEmbedRoute,
  ApiSessionRoute,
  ApiVaultFileRoute,
  BillingCallbackRoute,
  SettingsNotificationsRoute,
  ApiCfoChatRoute,
  ApiPublicPaystackWebhookRoute
};
const routeTree = Route$F._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Button as B,
  DropdownMenu as D,
  Input as I,
  ORCHESTRATOR as O,
  Route$9 as R,
  SANCTUM_MODULES as S,
  m$8 as a,
  useEntitlements as b,
  m$7 as c,
  cn as d,
  m$6 as e,
  useNotifications as f,
  m$5 as g,
  m$4 as h,
  m$3 as i,
  useIsReviewer as j,
  m$2 as k,
  m as l,
  m$9 as m,
  DropdownMenuTrigger as n,
  DropdownMenuContent as o,
  DropdownMenuLabel as p,
  DropdownMenuItem as q,
  DropdownMenuSeparator as r,
  useIsAdmin as s,
  router as t,
  useAuth as u
};
