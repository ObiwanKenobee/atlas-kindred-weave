import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://atlas-kindred-weave.lovable.app";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const entries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/pricing", changefreq: "weekly", priority: "0.9" },
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
  { path: "/login", changefreq: "yearly", priority: "0.3" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
