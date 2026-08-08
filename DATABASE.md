# Database — Atlas Sanctum

Postgres (Supabase). Every table has Row Level Security enabled and explicit `GRANT`s.
Tenancy is enforced by `user_id = auth.uid()` policies, not by application code.

## Core tables

| Table | Purpose |
|---|---|
| `profiles` | user identity, trust score, subscription fields (owner/admin readable only) |
| `businesses` | business profile: name, type, country, industry, stage, team size, revenue range, objective, funding requirement/purpose |
| `user_roles` | `admin` / `reviewer` / `user`; read via `has_role()` security-definer function |
| `chat_conversations`, `chat_messages` | Atlas Orchestrator history |
| `knowledge_documents` | vault documents + embeddings, matched by `match_documents()` |
| `funding_requests` | pitch, amount, attachments, status, `business_id` |
| `decision_report_versions` | immutable AI decision reports with reviewer notes |
| `approval_requests` | human-in-the-loop queue for risk/vault/funding actions |
| `verification_events` | evidence analysis results feeding trust recalculation |
| `risk_scores` | risk agent output |
| `economic_nodes`, `economic_edges` | opportunity graph |
| `impact_assets`, `asset_bids`, `asset_transactions` | Regenerative Value Exchange |
| `interaction_steps`, `agent_events`, `audit_log` | observability and audit trail |
| `notifications`, `notification_preferences` | in-app/email delivery |
| `payment_transactions`, `subscription_events` | Paystack revenue records |
| `ephemeral_sessions` | short-lived tokens for voice/tool webhooks |
| `rate_limits`, `rate_limit_buckets` | per-user request throttling |
| `referrals`, `referral_codes`, `referral_rewards` | growth loop |
| `community_posts` | community feed |

## Write-restricted tables

`agent_events`, `audit_log`, `rate_limits`, `notifications`, `payment_transactions`,
`asset_bids`, `ephemeral_sessions` are service-role write only — clients cannot forge
audit, billing, or session rows.

## Migrations

All schema lives in `supabase/migrations/`, applied in filename order. Never edit an
applied migration; add a new one.
