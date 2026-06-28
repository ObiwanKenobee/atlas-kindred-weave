# Atlas Sanctum — Operational Runbook

Everything required to deploy, run, and step away from this product.

---

## 1. Environment Variables

Fill in `.env` (and mirror these in Lovable Cloud / Cloudflare env settings):

| Variable | Where to get it |
|---|---|
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Dashboard → Project Settings → API → service_role key |
| `LOVABLE_API_KEY` | Lovable Cloud → Project Settings → API Keys |
| `ELEVENLABS_API_KEY` | ElevenLabs → Profile → API Keys |
| `ELEVENLABS_AGENT_ID` | ElevenLabs → Conversational AI → your agent → Agent ID |
| `CFO_TOOLS_REQUIRE_EPHEMERAL` | Set to `true` in production |

**Never commit real keys.** `.env` is in `.gitignore`. Set production values in Lovable Cloud's environment variable panel.

---

## 2. Database Migrations

Run once after cloning or against a fresh Supabase project:

```bash
npx supabase db push --project-ref hwyuxuckvaiofezvpydp
```

Requires `SUPABASE_ACCESS_TOKEN` (from supabase.com → Account → Access Tokens) and `SUPABASE_DB_PASSWORD`.

After that, every push to `main` runs migrations automatically via `.github/workflows/deploy.yml`.

---

## 3. Bootstrap First Admin

After deploying, run this once in the Supabase SQL editor:

```sql
SELECT public.bootstrap_admin('<your-user-uuid>');
```

Get your UUID from: Supabase Dashboard → Authentication → Users.

This only works when zero admins exist — it cannot be used to escalate privileges later.

---

## 4. ElevenLabs Agent Webhook

In the ElevenLabs Conversational AI dashboard, set your agent's **Server URL** to:

```
https://<your-production-domain>/api/cfo-tools
```

This is how the CFO voice agent calls back to execute tools (create funding requests, check trust scores, etc.).

---

## 5. pg_cron (Automatic Session Cleanup)

The migration `20260610000000_ops_hardening.sql` installs pg_cron and schedules `expire_sessions` every 10 minutes automatically.

To verify it's running:
```sql
SELECT * FROM cron.job WHERE jobname = 'expire-ephemeral-sessions';
```

pg_cron requires Supabase Pro or Team plan. On free tier, sessions are still cleaned up opportunistically on each new mint.

---

## 6. GitHub Actions Secrets

Add these in GitHub → Repository → Settings → Secrets:

- `SUPABASE_ACCESS_TOKEN`
- `SUPABASE_DB_PASSWORD`
- `SUPABASE_URL`
- `SUPABASE_PUBLISHABLE_KEY`
- `LOVABLE_API_KEY`

---

## 7. Uptime & Error Monitoring (recommended)

Not yet wired in code — takes 10 minutes to set up externally:

- **Uptime**: [Better Uptime](https://betteruptime.com) or [UptimeRobot](https://uptimerobot.com) — ping `https://<domain>/api/session` every 5 minutes
- **Errors**: Add `SENTRY_DSN` to env and `import * as Sentry from "@sentry/cloudflare"` in `src/server.ts`

---

## 8. Stripe / Payment Integration (when ready)

Current state: plans are recorded but not payment-gated. To go live with real billing:

1. Add Stripe (or Flutterwave for Africa) webhook handler at `/api/billing/webhook`
2. On `checkout.session.completed` → call `changeSubscriptionPlan` with the purchased plan
3. On `customer.subscription.deleted` → set `subscription_status = 'cancelled'`
4. Wire `requirePlan(userId, "growth")` in server functions that need it — the helper is already in `subscription.functions.ts`

---

## 9. What Runs Autonomously

Once deployed with all env vars set:

| Feature | Runs without you |
|---|---|
| User signup + profile creation | ✅ (DB trigger) |
| Atlas Orchestrator AI underwriting | ✅ |
| CFO voice sessions (ElevenLabs) | ✅ |
| Knowledge Vault ingestion + RAG | ✅ |
| Notifications | ✅ |
| Observability / agent events | ✅ |
| Ephemeral session cleanup | ✅ (pg_cron every 10 min) |
| Rate limiting | ✅ |
| DB migrations on deploy | ✅ (GitHub Actions) |
| Payment collection | ❌ Stripe not wired yet |
| Email notifications | ❌ No email provider wired yet |
