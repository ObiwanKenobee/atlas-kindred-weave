import { createFileRoute } from "@tanstack/react-router";
import { EnginePage } from "@/components/EnginePage";
import { SANCTUM_MODULES } from "@/lib/modules";
const m = SANCTUM_MODULES.find((x) => x.slug === "economic-graph")!;
export const Route = createFileRoute("/economic-graph")({
  head: () => ({ meta: [{ title: `${m.name} — Atlas Sanctum` }, { name: "description", content: m.purpose }] }),
  component: () => <EnginePage module={m} />,
});
