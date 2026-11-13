// Captures de toutes les pages sur les formats d'écran courants : node scripts/screens.mjs [dossier]
import { mkdirSync } from 'node:fs';
import { chromium } from '@playwright/test';

const base = process.env.BASE_URL ?? 'http://localhost:4173';
const out = process.argv[2] ?? 'screen';
const formats = [
  ['1280x800', 'petit portable', 1280, 800],
  ['1440x900', 'MacBook Air 13', 1440, 900],
  ['1536x864', 'portable Windows 15 pouces', 1536, 864],
  ['1920x1080', 'Full HD', 1920, 1080],
  ['2560x1440', 'QHD 27 pouces', 2560, 1440],
  ['3440x1440', 'ultra-large', 3440, 1440],
  ['3840x2160', '4K', 3840, 2160],
];
const pages = [
  ['/', 'accueil'],
  ['/projets/vizly', 'projet-vizly'],
  ['/projets/tti', 'projet-tti'],
  ['/projets/cyna', 'projet-cyna'],
  ['/autres-projets', 'autres-projets'],
  ['/parcours', 'parcours'],
];

const browser = await chromium.launch();
for (const [name, , width, height] of formats) {
  const dir = `${out}/${name}`;
  mkdirSync(dir, { recursive: true });
  const page = await browser.newPage({ viewport: { width, height } });
  for (const [route, slug] of pages) {
    await page.goto(base + route, { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    // Fait défiler la page pour charger les images différées.
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += 700) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
    await page.waitForTimeout(250);
    // Les images chargées en dernier peuvent décaler la page : on remonte tout en haut juste avant.
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.waitForFunction(() => window.scrollY === 0);
    await page.screenshot({ path: `${dir}/${slug}-ecran.png` });
    await page.screenshot({ path: `${dir}/${slug}-page.png`, fullPage: true });
  }
  await page.close();
  console.log('ok', name);
}
await browser.close();
