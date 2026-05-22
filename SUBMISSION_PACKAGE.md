# Submission Package — Live Web Evidence Agent

## Project Name

Live Web Evidence Agent

## Tagline

Source-led answers from live web evidence.

## Public Links

- Live app: https://daideguchi.github.io/live-web-evidence-agent/
- GitHub repo: https://github.com/daideguchi/live-web-evidence-agent
- Demo video asset: `media/live-web-evidence-agent-demo-narrated.mp4`
- Public evidence snapshot: `data/evidence_snapshot.json`

## 250-500 Word Project Description

Live Web Evidence Agent is an agentic research workflow for teams that need current web intelligence without losing traceability.

The problem is familiar: someone asks an AI system to check the web, and the answer comes back confident. But the team still has to ask: which claim came from which source, what confidence does it deserve, what is stale, and which sentence should not be repeated yet?

This project turns that problem into a structured workflow. A research question becomes source cards, extracted claims, confidence labels, blocked claims, a follow-up search plan, and an approval-ready answer. The key product idea is that the answer is not just a paragraph. It is a claim ledger.

For DeveloperWeek New York, the product is aimed at Nimble's live web challenge. The current build includes a refresh script that fetches public DeveloperWeek and Devpost pages, extracts marker snippets, and writes a dated evidence snapshot to `data/evidence_snapshot.json`. The browser app then turns that snapshot into source cards and claim rows.

The public static build does not claim real Nimble API usage yet. Instead, it shows the workflow that a live web provider should feed: search or crawl the web, extract source-backed facts, label confidence, block unsafe claims, and require a human to approve the final answer.

The business use is broader than hackathons. Operators, founders, investors, and launch teams all need current web facts for deadlines, requirements, competitive pages, compliance pages, and public announcements. Live Web Evidence Agent helps them move faster while keeping every important claim tied to a source and approval state.

## Claim Boundary

Do not claim:

- real Nimble API usage
- Nimble-powered extraction
- automatically verified truth
- current evidence unless `npm run refresh:sources` was run near submission time

