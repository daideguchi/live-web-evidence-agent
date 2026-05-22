# Live Web Evidence Agent

Live Web Evidence Agent is an agentic research workflow for DeveloperWeek New York 2026.

It is built around a simple rule: AI can help search and summarize, but every useful claim must be tied to a source, a confidence level, and a human approval state.

## Public Status

- Challenge: DeveloperWeek New York 2026 Hackathon
- Sponsor fit: Nimble — Build an Agentic App That Sees the Live Web
- Official Devpost: https://dwny-2026-hackathon.devpost.com/
- Public repo: pending
- Public app: pending
- Current data mode: bundled sample evidence and browser-side workflow
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
- follow-up search plan
- approval-ready answer

The app is designed so a live web provider such as Nimble can feed the evidence table, while the user keeps control of which claims are approved.

## What It Does Not Claim

- It does not claim real Nimble API usage yet.
- It does not claim live extraction in the public static build.
- It does not claim that bundled sample evidence is current.
- It does not replace human review.

## Run

```bash
open index.html
```

## Verify

```bash
npm run verify
```

## Next

1. Add Nimble Search / Extract / Crawl integration when credentials are available.
2. Add backend proxy for live API calls.
3. Add source snapshots and run history.
4. Add exportable evidence packets for teams.

