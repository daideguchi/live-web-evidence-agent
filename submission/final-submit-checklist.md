# Final Submit Checklist — Live Web Evidence Agent

## DeveloperWeek / Nimble Requirements

- Sponsor fit: Nimble live-web agent challenge
- Live app: done
- Source repo: done
- Dated public source snapshot: done
- Demo video asset: done
- Claim boundary: done

## Public Links

- Live app: https://daideguchi.github.io/live-web-evidence-agent/
- GitHub repo: https://github.com/daideguchi/live-web-evidence-agent
- Demo video: https://youtu.be/5am3U5zT7Kk
- Backup demo asset: https://github.com/daideguchi/live-web-evidence-agent/releases/download/v0.1-submission/live-web-evidence-agent-demo-narrated.mp4
- Thumbnail: `media/live-web-evidence-agent-demo-thumb.png`
- Public source snapshot: `data/evidence_snapshot.json`

## Verification

```text
npm run verify
live_web_evidence_agent_app_verify_ok
live_web_evidence_agent_claim_boundary_ok
live_web_evidence_agent_demo_assets_ok
live_web_evidence_agent_no_secrets_ok
```

## Claim Boundary

Do not claim:

- real Nimble API usage
- Nimble-powered extraction
- automatically verified truth
- current evidence unless `npm run refresh:sources` was run near submission time
