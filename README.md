# Live Web Evidence Agent

Live Web Evidence Agent is an agentic research workflow for DeveloperWeek New York 2026.

It is built around a simple rule: AI can help search and summarize, but every useful claim must be tied to a source, a confidence level, and a human approval state.

## Public Status

- Challenge: DeveloperWeek New York 2026 Hackathon
- Sponsor fit: Nimble — Build an Agentic App That Sees the Live Web
- Official Devpost: https://dwny-2026-hackathon.devpost.com/
- Public repo: https://github.com/daideguchi/live-web-evidence-agent
- Public app: https://daideguchi.github.io/live-web-evidence-agent/
- YouTube demo: https://youtu.be/td_iwN247TE
- Release assets: https://github.com/daideguchi/live-web-evidence-agent/releases/tag/v0.1-submission
- Current data mode: live public-page snapshot plus browser-side workflow
- Final submission: not submitted

## Problem

People ask AI to research the live web, then get a confident answer with weak traceability.

For product teams, founders, investors, and operators, the problem is not only speed. The problem is knowing what was found, where it came from, what is still uncertain, and which claims are unsafe to repeat.

## Solution

Live Web Evidence Agent turns a research question into:

- source cards
- extracted claims
- confidence labels
- blocked claims
- voice handoff gate for human review
- follow-up search plan
- approval-ready answer

The app is designed so a live web provider such as Nimble can feed the evidence table, while the user keeps control of which claims are approved. When the agent finds a claim that should not be repeated yet, it prepares a human handoff packet and a browser-side voice prompt so the next person can review the risky part instead of rereading the whole session.

## Demo Video Asset

Current narrated review asset:

```text
media/live-web-evidence-agent-demo-narrated.mp4
```

Public release download:

```text
https://github.com/daideguchi/live-web-evidence-agent/releases/download/v0.1-submission/live-web-evidence-agent-demo-narrated.mp4
```

YouTube demo:

```text
https://youtu.be/td_iwN247TE
```

It includes:

- 1440x1080 screen recording
- English narration
- embedded English subtitle track
- generated thumbnail at `media/live-web-evidence-agent-demo-thumb.png`

## What It Does Not Claim

- It does not claim real Nimble API usage yet.
- It does not claim Nimble-powered live extraction in the public static build.
- It does not claim automatically verified truth.
- It does not replace human review.
- The voice handoff in the public app is a browser-side preview, not an external notification service.

## Run

```bash
open index.html
```

## Verify

```bash
npm run verify
```

Refresh the public source snapshot:

```bash
npm run refresh:sources
```

The snapshot is written to:

```text
data/evidence_snapshot.json
```

## Next

1. Add Nimble Search / Extract / Crawl integration when credentials are available.
2. Add backend proxy for live API calls.
3. Add source snapshots and run history.
4. Add exportable evidence packets for teams.
5. Connect the handoff packet to a local or enterprise notification channel when a human approval gate is reached.
