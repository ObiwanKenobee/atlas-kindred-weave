# Agents — Atlas Sanctum

Every agent runs server-side. No agent has arbitrary database access; each one is a
server function with a fixed input schema, a fixed output schema, and an audit record.

| Agent | Entry point | Model call | Output |
|---|---|---|---|
| Atlas Orchestrator | `src/routes/api/chat.ts` | streaming chat + RAG | conversational guidance |
| Atlas CFO | `src/lib/cfo-agent.server.ts`, `src/routes/api/cfo-tools.ts` | voice + tool calls | financial guidance, tool execution |
| Deal / Funding Agent | `src/lib/orchestrator.functions.ts` | structured object | Funding Decision Report |
| Verification Agent | `src/lib/verification.functions.ts` | vision + structured object | verdict, confidence, findings |
| Risk Agent | `src/lib/risk.functions.ts` | structured object | risk score, flags |
| Research Agent | `src/lib/research.functions.ts` | structured object | opportunities, grants, programs |
| Growth Agent | `src/lib/growth.functions.ts` | structured object | campaigns, segments, drafts |
| Advisor | `src/lib/advisor.functions.ts` | structured object | next-best-action guidance |

## Tool contract

A tool is only callable if it is registered in `src/routes/api/cfo-tools.ts`. Each tool
declares name, description, input schema (Zod), output shape, and whether it needs an
ephemeral session token (`CFO_TOOLS_REQUIRE_EPHEMERAL=true` in production).

Registered tools include: `getBusinessProfile`, `getFinancialSummary`, `getTrustProfile`,
`searchKnowledge`, `searchFundingOpportunities`, `analyzeBusinessEvidence`,
`createVerificationRecord`, `generateFundingReadiness`, `createFundingRequest`,
`updateFundingRequest`, `getFundingStatus`, `generateTreasuryReport`, `createOpportunity`,
`createNotification`, `requestHumanReview`.

## Risk tiers

| Tier | Behaviour | Example |
|---|---|---|
| Low | executes immediately | summarize, draft, organize |
| Medium | prepares the action, asks the user to confirm | submit funding request |
| High | creates an `approval_requests` row; a reviewer must approve | disbursement, binding terms |

States: `pending_review → approved | rejected → executed | failed`.

## Observability

`recordInteractionStep` writes each workflow step (engine, tool, status, timing) and
`recordAgentEvent` writes the audit event. Both are visible at `/observability` and
`/audit`. Chain-of-thought is never persisted — only operational traces.

## Safety rules enforced in prompts and schemas

- Outputs are labelled *extracted*, *estimated*, *verified* or *user-confirmed*.
- Funding output is always a **readiness recommendation**, never an approval.
- Retrieved evidence is cited back to the vault document it came from.
- Low-confidence vision results return `needs_review` instead of a verdict.
