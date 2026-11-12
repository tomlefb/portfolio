import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { contactInfo } from '../contact';
import { parcours, parcoursIntro, technos } from '../parcours';
import { getNextMajor, getProject, majorProjects, minorProjects, projects } from '../projects';
import { site } from '../site';

const HEX = /^#[0-9a-f]{6}$/i;

function luminance(hex: string): number {
  const channels = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const [r, g, b] = channels.map((c) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/** Toutes les chaînes d'une valeur, en profondeur. */
function strings(value: unknown): string[] {
  if (typeof value === 'string') return [value];
  if (Array.isArray(value)) return value.flatMap(strings);
  if (value && typeof value === 'object') return Object.values(value).flatMap(strings);
  return [];
}

const allContent = strings([projects, parcours, parcoursIntro, technos, site, contactInfo]);

describe('projets', () => {
  it('présente les trois projets majeurs dans l’ordre voulu', () => {
    expect(majorProjects.map((p) => p.id)).toEqual(['vizly', 'tti', 'cyna']);
  });

  it('range les projets mineurs dans l’ordre voulu', () => {
    expect(minorProjects.map((p) => p.id)).toEqual([
      'nutriai',
      'ialocal',
      'lycee-hotelier',
      'ecopursue',
    ]);
  });

  it('donne quatre faits et au moins deux sections à chaque projet majeur', () => {
    for (const project of majorProjects) {
      expect(project.facts, project.id).toHaveLength(4);
      expect(project.sections?.length ?? 0, project.id).toBeGreaterThanOrEqual(2);
    }
  });

  it('associe à chaque projet une couleur et un texte lisible dessus', () => {
    for (const project of projects) {
      expect(project.color, project.id).toMatch(HEX);
      expect(project.onColor, project.id).toMatch(HEX);
      expect(contrast(project.color, project.onColor), project.id).toBeGreaterThanOrEqual(4.5);
    }
  });

  it('ne référence que des images présentes dans public/', () => {
    for (const project of projects) {
      for (const image of project.images) {
        expect(existsSync(join(process.cwd(), 'public', image.src)), image.src).toBe(true);
        expect(image.alt.length, image.src).toBeGreaterThan(8);
      }
    }
  });

  it('retrouve un projet par son identifiant', () => {
    expect(getProject('vizly')?.title).toBe('Vizly');
    expect(getProject('inconnu')).toBeUndefined();
  });

  it('enchaîne les projets majeurs en boucle', () => {
    expect(getNextMajor('vizly').id).toBe('tti');
    expect(getNextMajor('tti').id).toBe('cyna');
    expect(getNextMajor('cyna').id).toBe('vizly');
  });

  it('ne présente pas TTI comme étant en production', () => {
    for (const text of strings(getProject('tti'))) {
      expect(text).not.toMatch(/en production/i);
    }
  });

  it('ne parle pas de production dans le schéma de TTI', () => {
    const source = readFileSync(join(process.cwd(), 'src/components/diagrams/TtiBoucle.tsx'), 'utf8');
    expect(source).not.toMatch(/production/i);
  });

  it('ne publie aucun montant ni rendement sur TTI', () => {
    for (const text of strings(getProject('tti'))) {
      expect(text).not.toMatch(/[€$%]|k\/an|payout/i);
    }
  });
});

describe('images publiées', () => {
  it('ne déploie que des images WebP', () => {
    const files = readdirSync(join(process.cwd(), 'public/images'), { recursive: true })
      .map(String)
      .filter((file) => /\.[a-z0-9]+$/i.test(file) && !file.endsWith('.DS_Store'));
    expect(files.filter((file) => !file.toLowerCase().endsWith('.webp'))).toEqual([]);
  });
});

describe('parcours', () => {
  it('commence par le poste actuel chez Capgemini', () => {
    expect(parcours[0].place).toContain('Capgemini');
    expect(parcours[0].current).toBe(true);
    expect(parcours.filter((item) => item.current)).toHaveLength(1);
  });

  it('classe les technos en trois groupes', () => {
    expect(technos.map((group) => group.label)).toEqual([
      'Au quotidien',
      'Régulièrement',
      'Déjà utilisé',
    ]);
  });
});

describe('positionnement', () => {
  it('ne parle plus de recherche d’alternance ni de chef de projet comme titre', () => {
    for (const text of allContent) {
      expect(text).not.toMatch(/recherche (d['’])?alternance|alternan\w+ chef de projet|mastère chef de projet/i);
    }
  });

  it('présente Tom comme développeur', () => {
    expect(site.role).toBe('Développeur');
  });
});
