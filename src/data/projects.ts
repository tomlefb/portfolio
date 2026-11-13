import type { Project } from '../types';
import { cyna } from './projects/cyna';
import { minorProjects as minors } from './projects/minors';
import { tti } from './projects/tti';
import { vizly } from './projects/vizly';

export const majorProjects: Project[] = [vizly, tti, cyna];

export const minorProjects: Project[] = minors;

export const projects: Project[] = [...majorProjects, ...minorProjects];

export function getProject(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}

/** Projet majeur qui suit celui donné, en boucle. */
export function getNextMajor(id: string): Project {
  const index = majorProjects.findIndex((project) => project.id === id);
  return majorProjects[(index + 1) % majorProjects.length];
}

/** Libellés de l'index des autres projets sur l'accueil. */
export const othersIndexLabels = {
  title: 'Autres projets',
  all: 'Tous les détails',
};
