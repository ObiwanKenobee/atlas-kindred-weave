# Security — Atlas Sanctum

## Authentication
Supabase Auth: email/password (email confirmation on) and Google OAuth. Sessions persist in
the browser; `src/lib/auth.tsx` subscribes to `onAuthStateChange` and invalidates router +
query caches on change.

## Authorization
- Every protected server function uses `.middleware([requireSupabaseAuth])`, which validates
  the bearer token server-side and provides `userId` plus an RLS-scoped Supabase client.
- Roles live in `user_roles` and are read through the `has_role()` / `is_reviewer()`
  security-definer functions — never from a profile column (no privilege escalation).
- UI gating (`PlanGate`, sidebar locks) is cosmetic; the authoritative check is
  `requireFeature()` / role checks inside handlers.

## Tenancy
RLS policies scope every user-owned table by `user_id = auth.uid()`. `businesses` is
owner-only. `profiles` billing identifiers are visible to the owner and admins only.

## Secrets
Server-only, read inside handlers via `process.env`: `LOVABLE_API_KEY`,
`SUPABASE_SERVICE_ROLE_KEY`, `PAYSTACK_SECRET_KEY`, `ELEVENLABS_API_KEY`,
`ELEVENLABS_AGENT_ID`. Nothing sensitive is exposed under `VITE_*`.

## Ephemeral credentials
Realtime voice and CFO tool webhooks use single-use tokens minted by
`src/lib/ephemeral-session.server.ts` (5-minute TTL, marked used on verification, cleaned by
`expire_sessions`). Set `CFO_TOOLS_REQUIRE_EPHEMERAL=true` in production.

## Webhooks
`/api/public/paystack-webhook` verifies the Paystack HMAC signature before processing and is
idempotent per transaction reference.

## Rate limiting
`enforceRateLimit(userId, route)` backs AI and tool endpoints; exceeded limits return HTTP 429.

## Audit
`audit_log`, `agent_events` and `interaction_steps` record every consequential action with
actor, tool, input summary, output status and timestamp. They are service-role write only.

## Known residual risks
- ElevenLabs voice is inert until `ELEVENLABS_API_KEY` / `ELEVENLABS_AGENT_ID` are set.
- Email delivery requires a verified sender domain; until then notifications are in-app only.
- Funding decisions are recommendations; no regulated lending decision is made by this system.
