// Captures pleine page pour la relecture visuelle : node scripts/capture.mjs [route ...]
import { chromium } from '@playwright/test';

const base = process.env.BASE_URL ?? 'http://localhost:4173';
const routes = process.argv.slice(2).length
  ? process.argv.slice(2)
  : ['/', '/projets/vizly', '/projets/tti', '/projets/cyna', '/autres-projets', '/parcours'];
const widths = (process.env.WIDTHS ?? '390,768,1024,1440').split(',').map(Number);

const browser = await chromium.launch();
for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  for (const route of routes) {
    await page.goto(base + route, { waitUntil: 'networkidle' });
    // Fait défiler toute la page pour déclencher les images en chargement différé.
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 60));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(300);
    const name = route === '/' ? 'accueil' : route.slice(1).replaceAll('/', '-');
    await page.screenshot({ path: `.playwright-mcp/revue/${name}-${width}.png`, fullPage: true });
  }
  await page.close();
}
await browser.close();
