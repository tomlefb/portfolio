import { describe, expect, it } from 'vitest';
import { contactInfo, footerContent } from '../contact';
import { parcours, parcoursHighlights, parcoursIntro, technos, timeline } from '../parcours';
import { projects } from '../projects';
import { site } from '../site';

function strings(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(strings);
  return [];
}

const texts = strings([projects, parcours, parcoursHighlights, parcoursIntro, technos, timeline, site, footerContent])
  // Les adresses et numéros ne sont pas du texte composé.
  .filter((text) => !Object.values(contactInfo).includes(text) && !/^(https?:|mailto:|\/)/.test(text));

describe('typographie française', () => {
  it('n’utilise que des apostrophes typographiques', () => {
    expect(texts.filter((text) => /[A-Za-zÀ-ÿ]'[A-Za-zÀ-ÿ]/.test(text))).toEqual([]);
  });

  it('met une espace insécable avant les deux-points, points-virgules, points d’interrogation et d’exclamation', () => {
    expect(texts.filter((text) => /[^\u00a0\u202f] ?[:;?!](\s|$)/.test(text) && !/^[^:]*:\/\//.test(text))).toEqual([]);
  });

  it('sépare les milliers par une espace insécable', () => {
    expect(texts.filter((text) => /\b\d{4,}\b/.test(text) && !/\b(19|20)\d{2}\b/.test(text))).toEqual([]);
  });
});
