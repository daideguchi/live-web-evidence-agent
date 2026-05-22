import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import path from 'path';
import http from 'http';
import fs from 'fs/promises';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
};

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', 'http://localhost');
  const relative = url.pathname === '/' ? '/index.html' : url.pathname;
  const filePath = path.normalize(path.join(root, relative));
  if (!filePath.startsWith(root)) {
    res.writeHead(403);
    res.end('forbidden');
    return;
  }
  try {
    const body = await fs.readFile(filePath);
    res.writeHead(200, { 'content-type': contentTypes[path.extname(filePath)] || 'text/plain' });
    res.end(body);
  } catch {
    res.writeHead(404);
    res.end('not found');
  }
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const { port } = server.address();

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1080 } });

await page.goto(`http://127.0.0.1:${port}/`);
await page.waitForSelector('text=Live Web Evidence Agent');
await page.waitForLoadState('networkidle');
await page.click('#buildBtn');

const rows = await page.locator('#claimTable tbody tr').count();
const blocked = await page.locator('#blockedList .card').count();
const handoffItems = await page.locator('#handoffList li').count();
const answer = await page.locator('#answer').textContent();
const body = await page.locator('body').textContent();

if (rows < 6) throw new Error(`expected at least 6 claim rows, got ${rows}`);
if (blocked < 3) throw new Error(`expected at least 3 blocked claims, got ${blocked}`);
if (handoffItems < 5) throw new Error(`expected handoff resume packet, got ${handoffItems}`);
if (!body.includes('One-Sentence Pitch') || !body.includes('reviewable evidence')) {
  throw new Error('missing one-sentence judge hook');
}
if (!body.includes('Review Path') || !body.includes('Snapshot status:')) {
  throw new Error('missing review path or snapshot status');
}
if (!answer.includes('Approved claims') || !answer.includes('Blocked claims')) {
  throw new Error('missing answer sections');
}
if (!answer.includes('Human handoff')) {
  throw new Error('missing human handoff section');
}

await page.getByRole('button', { name: '日本語' }).click();
const japaneseBody = await page.locator('body').innerText();
if (!japaneseBody.includes('ライブWeb証拠エージェント') || !japaneseBody.includes('レビュー可能な証拠')) {
  throw new Error('Japanese UI toggle failed');
}
for (const marker of ['承認できる主張', 'ブロックした主張', '人間への引き継ぎ', '次の検索計画', '文言調整のうえ承認']) {
  if (!japaneseBody.includes(marker)) {
    throw new Error(`Japanese dynamic UI missing marker: ${marker}`);
  }
}
for (const leaked of ['Approved claims', 'Blocked claims', 'Human handoff', 'approve with wording']) {
  if (japaneseBody.includes(leaked)) {
    throw new Error(`Japanese UI leaked English dynamic text: ${leaked}`);
  }
}

await page.screenshot({ path: path.join(root, 'media', 'live-web-evidence-agent-full.png'), fullPage: true });
await browser.close();
server.close();

console.log('live_web_evidence_agent_app_verify_ok');
console.log(`claim_rows=${rows}`);
console.log(`blocked_claims=${blocked}`);
console.log(`handoff_items=${handoffItems}`);
console.log('review_path_ok');
console.log('screenshot=media/live-web-evidence-agent-full.png');
