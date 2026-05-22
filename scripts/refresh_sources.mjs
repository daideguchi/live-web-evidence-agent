import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputPath = path.join(root, 'data', 'evidence_snapshot.json');

const targets = [
  {
    id: 'S1',
    title: 'DeveloperWeek NY 2026 Hackathon page',
    url: 'https://dwny-2026-hackathon.devpost.com/',
    markers: ['May 25', 'June 10', 'Nimble', 'Judging Criteria', 'Progress', 'Concept', 'Feasibility'],
  },
  {
    id: 'S2',
    title: 'DeveloperWeek New York Hackathon page',
    url: 'https://www.developerweek.com/newyork/hackathon/',
    markers: ['May 25', 'June 10', 'Tower', 'Nimble', 'Register on Devpost'],
  },
];

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();
}

function snippetAround(text, marker) {
  const idx = text.toLowerCase().indexOf(marker.toLowerCase());
  if (idx === -1) return null;
  const start = Math.max(0, idx - 130);
  const end = Math.min(text.length, idx + marker.length + 190);
  return text.slice(start, end).trim();
}

async function fetchTarget(target) {
  const response = await fetch(target.url, {
    headers: {
      'user-agent': 'LiveWebEvidenceAgent/0.1 evidence snapshot generator',
    },
  });
  if (!response.ok) {
    throw new Error(`${target.url} returned ${response.status}`);
  }
  const html = await response.text();
  const text = stripHtml(html);
  const snippets = target.markers
    .map((marker) => ({ marker, snippet: snippetAround(text, marker) }))
    .filter((item) => item.snippet);
  return {
    id: target.id,
    title: target.title,
    url: target.url,
    fetched_at: new Date().toISOString(),
    snippets,
  };
}

const sources = [];
for (const target of targets) {
  sources.push(await fetchTarget(target));
}

const claims = [
  {
    text: 'DeveloperWeek New York 2026 Hackathon runs online from May 25 to June 10, 2026.',
    source: 'S1',
    confidence: sources[0].snippets.some((item) => item.marker === 'May 25') ? 'high' : 'needs refresh',
    decision: 'approve',
  },
  {
    text: 'Nimble asks teams to build an AI-powered agentic app that searches, browses, extracts, crawls, maps, or analyzes live web data.',
    source: 'S1',
    confidence: sources[0].snippets.some((item) => item.marker === 'Nimble') ? 'high' : 'needs refresh',
    decision: 'approve',
  },
  {
    text: 'Overall judging includes progress, concept, and feasibility.',
    source: 'S1',
    confidence: ['Progress', 'Concept', 'Feasibility'].every((marker) => sources[0].snippets.some((item) => item.marker === marker)) ? 'high' : 'medium',
    decision: 'approve',
  },
  {
    text: 'A source-led evidence agent fits the sponsor challenge better than a generic research chatbot.',
    source: 'S1 + product reasoning',
    confidence: 'medium',
    decision: 'approve with wording',
  },
];

const snapshot = {
  generated_at: new Date().toISOString(),
  generator: 'scripts/refresh_sources.mjs',
  claim_boundary: 'This snapshot proves live page fetches for public source evidence. It does not prove Nimble API usage.',
  sources,
  claims,
};

await fs.mkdir(path.dirname(outputPath), { recursive: true });
await fs.writeFile(outputPath, JSON.stringify(snapshot, null, 2) + '\n');

console.log('live_web_evidence_snapshot_ok');
console.log(`sources=${sources.length}`);
console.log(`claims=${claims.length}`);
console.log(`output=${path.relative(root, outputPath)}`);
