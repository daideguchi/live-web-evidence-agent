import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import path from 'path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1080 } });

await page.goto(`file://${path.join(root, 'index.html')}`);
await page.waitForSelector('text=Live Web Evidence Agent');
await page.click('#buildBtn');

const rows = await page.locator('#claimTable tbody tr').count();
const blocked = await page.locator('#blockedList .card').count();
const answer = await page.locator('#answer').textContent();

if (rows < 6) throw new Error(`expected at least 6 claim rows, got ${rows}`);
if (blocked < 3) throw new Error(`expected at least 3 blocked claims, got ${blocked}`);
if (!answer.includes('Approved claims') || !answer.includes('Blocked claims')) {
  throw new Error('missing answer sections');
}

await page.screenshot({ path: path.join(root, 'media', 'live-web-evidence-agent-full.png'), fullPage: true });
await browser.close();

console.log('live_web_evidence_agent_app_verify_ok');
console.log(`claim_rows=${rows}`);
console.log(`blocked_claims=${blocked}`);
console.log('screenshot=media/live-web-evidence-agent-full.png');

