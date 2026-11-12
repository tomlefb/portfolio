export type DiagramId = 'cyna-architecture' | 'tti-boucle' | 'vizly-parcours';

export interface ProjectImage {
  src: string;
  alt: string;
  kind: 'desktop' | 'phone';
}

export interface ProjectFact {
  label: string;
  value: string;
}

export interface SectionItem {
  lead: string;
  text: string;
}

export interface ProjectSection {
  title: string;
  body?: string;
  items?: SectionItem[];
  diagram?: DiagramId;
}

export interface Project {
  id: string;
  title: string;
  tier: 'majeur' | 'mineur';
  /** Une phrase, affichée sous le titre. */
  tagline: string;
  /** Contexte court, ex. « Projet personnel, seul · 2026 ». */
  meta: string;
  /** Couleur de l'aplat du projet et couleur du texte posé dessus. */
  color: string;
  onColor: string;
  stack: string[];
  images: ProjectImage[];
  /** Exactement quatre pour un projet majeur. */
  facts?: ProjectFact[];
  /** Chiffres clés affichés en grand sur la page du projet. */
  figures?: ProjectFact[];
  /** Au moins deux pour un projet majeur. */
  sections?: ProjectSection[];
  githubUrl?: string;
  liveUrl?: string;
}

export type ParcoursKind = 'experience' | 'formation';

export interface ParcoursGroup {
  kind: ParcoursKind;
  label: string;
}

export interface ParcoursItem {
  kind: ParcoursKind;
  period: string;
  title: string;
  place: string;
  text: string;
  current?: boolean;
}

export interface TechnoGroup {
  label: string;
  items: string[];
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
}
