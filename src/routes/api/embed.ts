import { createFileRoute } from "@tanstack/react-router";

// Thin wrapper: POST { text: string } → { embedding: number[] }
// Uses Gemini text-embedding-004 via the Lovable AI Gateway.
export const Route = createFileRoute("/api/embed")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { text } = (await request.json()) as { text?: string };
        if (!text?.trim()) return new Response("text required", { status: 400 });

        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("LOVABLE_API_KEY not configured", { status: 500 });

        const res = await fetch("https://ai.gateway.lovable.dev/v1/embeddings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Lovable-API-Key": key,
            "X-Lovable-AIG-SDK": "vercel-ai-sdk",
          },
          body: JSON.stringify({
            model: "google/text-embedding-004",
            input: text.slice(0, 8000), // stay within token budget
          }),
        });

        if (!res.ok) {
          const err = await res.text();
          return new Response(`Embedding failed: ${err}`, { status: 502 });
        }

        const json = (await res.json()) as { data: { embedding: number[] }[] };
        return Response.json({ embedding: json.data[0].embedding });
      },
    },
  },
});
