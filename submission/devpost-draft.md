# Devpost Draft — Live Web Evidence Agent

## Inspiration

AI can summarize the web quickly, but speed is not enough. Teams need to know which claims came from which source, what confidence level each claim deserves, and which claims should not be repeated until a human approves them.

Live Web Evidence Agent is built for that gap. It is an agentic research workflow where the answer is not just a paragraph. The answer is backed by source cards, a claim ledger, blocked claims, and a follow-up search plan.

## What It Does

The app turns a research question into:

- source cards
- extracted claims
- confidence labels
- blocked claims
- follow-up search plan
- approval-ready answer

## How I Built It

The current public prototype is a static HTML/CSS/JavaScript app. It uses bundled sample evidence to demonstrate the core workflow clearly and safely.

The intended sponsor integration is Nimble. The next version can connect Nimble Search, Extract, Crawl, Map, Web Search Agents, MCP server, or APIs to populate the same evidence table with live web data.

## Challenge Fit

This fits the Nimble challenge because it is an agentic app designed around live web intelligence. It also fits DeveloperWeek's overall judging criteria because it shows progress, solves a real problem, and has a feasible startup workflow for operators, founders, and teams.

## Claim Boundary

This static MVP does not claim live Nimble API usage yet. It demonstrates the workflow that live web data should feed.

## What's Next

- Add Nimble API integration.
- Add a backend proxy for safe API calls.
- Store dated source snapshots.
- Export evidence packets for submission and launch teams.

