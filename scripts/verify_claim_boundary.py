from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

required = [
    "It does not claim real Nimble API usage yet.",
    "It does not claim Nimble-powered live extraction in the public static build.",
    "does not claim live Nimble API usage",
]

text = (ROOT / "README.md").read_text() + "\n" + (ROOT / "index.html").read_text()
missing = [marker for marker in required if marker not in text]
if missing:
    raise SystemExit("missing claim boundary markers: " + ", ".join(missing))

print("live_web_evidence_agent_claim_boundary_ok")
