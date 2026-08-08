# Deployment — Atlas Sanctum

## Environments
| Env | URL |
|---|---|
| Preview | `https://id-preview--961aecac-cebd-4126-b234-17926cc02a20.lovable.app` |
| Production | `https://atlas-kindred-weave.lovable.app` |

Deploy with the **Publish** action in Lovable. The build runs on the Cloudflare Workers
runtime (no Node host — see `server-runtime` constraints: no `child_process`, `sharp`, or
native addons in server code).

## Required environment variables
| Variable | Scope | Needed for |
|---|---|---|
| `LOVABLE_API_KEY` | server | every AI call (chat, orchestrator, vault, CFO) |
| `SUPABASE_SERVICE_ROLE_KEY` | server | privileged writes (audit, notifications, payments) |
| `PAYSTACK_SECRET_KEY` | server | checkout + webhook verification |
| `ELEVENLABS_API_KEY` | server | Atlas CFO realtime voice |
| `ELEVENLABS_AGENT_ID` | server | Atlas CFO agent binding |
| `CFO_TOOLS_REQUIRE_EPHEMERAL` | server | set `true` in production |
| `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` | client | generated automatically |

## Post-deploy checklist
1. Paystack dashboard → webhook URL: `https://atlas-kindred-weave.lovable.app/api/public/paystack-webhook`
2. ElevenLabs agent → Server URL: `https://atlas-kindred-weave.lovable.app/api/cfo-tools`
3. Bootstrap the first admin: `SELECT public.bootstrap_admin('<user-uuid>');`
4. Confirm `cron.job` contains `expire-ephemeral-sessions`.
5. Submit `sitemap.xml` in Google Search Console after the verification meta tag goes live.

## Local development
```bash
bun install
bun run dev      # http://localhost:8080
```
Typecheck with `tsgo --noEmit`. Migrations live in `supabase/migrations/`.
