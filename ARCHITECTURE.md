# Architecture — Atlas Sanctum

## Stack (actual, not aspirational)

| Layer | Technology |
|---|---|
| Frontend | React 19 + TanStack Start (SSR) + Tailwind v4 |
| Routing | TanStack Router file routes (`src/routes`) |
| Backend | TanStack `createServerFn` RPC (`src/lib/*.functions.ts`) + server routes (`src/routes/api/*`) |
| Database | Postgres (Supabase / Lovable Cloud) with Row Level Security |
| Auth | Supabase Auth — email/password + Google OAuth |
| Storage | Supabase Storage (`funding-attachments`, `knowledge-vault`) |
| AI | Lovable AI Gateway (Gemini family) via the Vercel AI SDK |
| Voice | ElevenLabs Conversational AI (credential-gated) |
| Payments | Paystack (card, M-Pesa, bank) in KES |
| Hosting | Lovable (Cloudflare Workers runtime) |

> The master prompt named Firebase / Firestore / Cloud Run / Vertex AI / React Native.
> This repository runs on the Lovable stack above; those services are not available here.
> Every capability requested has an equivalent implemented on this stack (Supabase Auth for
> Firebase Auth, Postgres+RLS for Firestore tenancy rules, Lovable AI Gateway for Vertex AI,
> Workers for Cloud Run). Migration to GCP would require replacing `src/integrations/supabase/*`
> and `src/lib/ai-gateway.server.ts` only — the rest of the code is provider-agnostic.

## Request flow

```
Browser (route component)
  └─ useServerFn(fn)  ──►  createServerFn handler (server only)
                             ├─ requireSupabaseAuth middleware → userId, RLS-scoped client
                             ├─ enforceRateLimit(userId, route)
                             ├─ requireFeature(userId, featureKey)   [entitlements]
                             ├─ AI Gateway call (Gemini) / DB read/write
                             ├─ recordInteractionStep(...)           [observable trace]
                             └─ recordAgentEvent(...)                [audit]
```

Streaming chat uses a raw server route (`src/routes/api/chat.ts`) because the AI SDK
transport needs a streaming `Response`.

## Context assembly for Atlas CFO / Orchestrator

1. **Long-term** — `buildBusinessContext(userId)` (`src/lib/business.server.ts`) loads the
   user-confirmed business profile.
2. **Medium-term** — Knowledge Vault RAG: the last user message is embedded and matched
   against `knowledge_documents` chunks via the `match_documents` RPC, scoped by `user_id`.
3. **Short-term** — the conversation messages sent by the client.

Only relevant retrieved chunks enter the prompt; the database is never dumped into context.

## Modules

Ten engines under `src/routes`: Identity & Trust, Funding, Verification, Treasury, Risk,
Growth, Impact, Business OS, Economic Graph, Regenerative Value Exchange — plus Atlas CFO,
Knowledge Vault, Opportunity Hub, Approvals, Audit, Observability, Subscription.

## Human-in-the-loop

`approval_requests` + `decision_report_versions` implement risk-tiered autonomy:
low-risk actions execute, medium-risk actions produce a draft awaiting confirmation,
high-risk actions (disbursement, binding terms) require a `reviewer`/`admin` role verified
server-side, not in the UI.
