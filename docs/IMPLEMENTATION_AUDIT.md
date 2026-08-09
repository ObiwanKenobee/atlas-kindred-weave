# Atlas Sanctum — Implementation Audit

_Generated during Phase 1 execution. Reflects the repository as inspected, not aspiration._

## Stack (as built, not as proposed)

| Layer | Actual |
|---|---|
| Framework | TanStack Start v1 (React 19, Vite 7), file routes in `src/routes` |
| Package manager | bun |
| Backend | TanStack server functions (`*.functions.ts`) + server routes (`src/routes/api/*`) on Cloudflare Workers |
| Database | Postgres (Supabase / Lovable Cloud), RLS on every table |
| Auth | Supabase Auth — email/password + Google OAuth (`src/lib/auth.tsx`) |
| AI | Lovable AI Gateway → `google/gemini-2.5-flash`, `gemini-3-flash-preview`, `text-embedding-004` |
| Storage | Supabase Storage bucket `funding-attachments` (private) |
| Payments | Paystack (checkout + verified webhook) |
| Deployment | Lovable publish → Cloudflare Workers |

**Deviation from the prompt:** the prompt specifies Firebase/Firestore/GCP. This repository is
Supabase/Postgres on Cloudflare Workers, already carrying ~16k lines of working product. Migrating
to Firestore would delete every working subsystem (RLS tenancy, triggers, audit, Paystack, RAG) and
deliver nothing new for the economic loop. The loop was therefore built on the existing stack; the
Firestore entity list was mapped onto existing Postgres tables (see DATABASE.md).

## WORKING

- Auth: signup, login, logout, persistent session, protected route redirects, Google OAuth.
- Business onboarding (`/business`): name, industry, country, stage, team size, revenue range, objective, funding requirement → `businesses` row, owner-only RLS.
- Evidence upload + multimodal extraction (`/vault`): PDF/PNG/JPG → storage → Gemini extraction → chunked `knowledge_documents` with embeddings.
- RAG retrieval: `match_documents()` + `queryVault` with cited sources.
- Funding engine (`/funding`): AI Funding Decision Report, immutable `decision_report_versions`, PDF export.
- Human review: reviewer/admin roles via `has_role()`/`is_reviewer()`, approve / request revision / decline; `/approvals` queue for risk & vault overrides.
- Audit: `audit_log`, `agent_events`, `interaction_steps`, viewer at `/audit` with search, filters, CSV/JSON export.
- Observability console at `/observability`.
- Notifications: in-app realtime + per-event preferences.
- Billing: Paystack checkout, verification, webhook, plan entitlements and gating.
- Atlas CFO voice channel (ElevenLabs) with server tool webhook.

## ADDED IN THIS PHASE

- `src/lib/agent-tools.server.ts` — single audited tool registry (`getBusinessProfile`, `getFinancialSummary`, `getTrustProfile`, `searchBusinessKnowledge`, `generateTreasurySummary`, `generateFundingReadiness`, `requestHumanReview`).
- `src/routes/api/cfo/chat.ts` — Atlas CFO **text** channel with tool calling, bearer auth, rate limiting, and step tracing.
- `src/components/CfoChat.tsx` — text-first CFO interface on `/cfo`, showing tool invocations.
- Voice webhook now falls through to the same registry: one financial-logic implementation for both channels.

## MISSING

- Multi-user businesses (`business_members`) — one business per user today.
- Structured `financial_records` table; financial facts live inside `knowledge_documents` extractions.
- Automated test suite (no runner configured in this repo).
- Deterministic labelled demo dataset.
- Email delivery (queued only; needs a verified sender domain).

## BROKEN / MOCKED

- Voice channel is inert until `ELEVENLABS_API_KEY` / `ELEVENLABS_AGENT_ID` are set.
- `match_documents()` returns recency-ordered chunks with a fixed similarity of 0.5 — it is retrieval, but not yet true vector ranking (embeddings are stored as text).
- Several engine pages (growth, research, impact) generate content on demand rather than from persisted history.

## INSECURE

None known open. Prior scans closed: public exposure of `profiles`/`economic_*`/`asset_bids`, `SECURITY DEFINER` execute grants, missing write policies on `agent_events`/`audit_log`/`payment_transactions`/`ephemeral_sessions`, unrestricted `user_roles` insert, vulnerable `seroval` transitive dependency.

Residual: `SUPABASE_SERVICE_ROLE_KEY` is used broadly in server code; every path that uses it derives `userId` from a verified bearer token, never from client input.

## DUPLICATED

- Tool logic previously existed only in the voice webhook; now consolidated into the shared registry (webhook legacy cases retained for backward compatibility with existing ElevenLabs tool names).

## PRODUCTION_BLOCKERS

1. `LOVABLE_API_KEY` must be present in the deployed environment (all AI paths).
2. Paystack webhook URL must be registered in the Paystack dashboard.
3. Sender domain required before any email notification is delivered.
4. True vector search requires migrating `knowledge_documents.embedding` to `pgvector`.
