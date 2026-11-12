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

/** Collecte les erreurs console et les exceptions de la page. */
export function collectErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  page.on('pageerror', (err) => errors.push(err.message));
  return errors;
}
