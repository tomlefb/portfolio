import type { Page } from '@playwright/test';

export const WIDTHS = [390, 768, 1024, 1440] as const;

export const ROUTES = [
  '/',
  '/projets/vizly',
  '/projets/tti',
  '/projets/cyna',
  '/autres-projets',
  '/parcours',
] as const;

/**
 * Collecte les erreurs de la page : exceptions, erreurs console et ressources
 * en échec. Le script de mesure Vercel n'existe qu'en production, on l'ignore.
 */
export function collectErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error' && !msg.text().startsWith('Failed to load resource')) {
      errors.push(msg.text());
    }
  });
  page.on('pageerror', (err) => errors.push(err.message));
  page.on('response', (res) => {
    if (res.status() >= 400 && !res.url().includes('/_vercel/')) {
      errors.push(`${res.status()} ${res.url()}`);
    }
  });
  return errors;
}
