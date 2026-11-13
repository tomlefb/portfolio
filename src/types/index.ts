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
  /** Contexte très court, affiché dans l'index de l'accueil (ex. « Stage · 2025 »). */
  indexMeta?: string;
  /** Phrase courte pour l'index de l'accueil ; à défaut, l'accroche. */
  indexLine?: string;
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

/** Période longue sur la frise du parcours (dates en années décimales : 2025.67 ≈ sept. 2025). */
export interface TimelineBar {
  lane: ParcoursKind;
  from: number;
  to: number;
  title: string;
  detail: string;
  /** En cours : plein jusqu'à aujourd'hui, hachuré ensuite. */
  ongoing?: boolean;
  /** Prévu après l’alternance : contour pointillé. */
  upcoming?: boolean;
}

/** Période courte (stage), dessinée comme un trait fin avec son libellé à côté. */
export interface TimelineStage {
  from: number;
  to: number;
  title: string;
  detail: string;
}

export interface Timeline {
  start: number;
  end: number;
  lanes: ParcoursGroup[];
  bars: TimelineBar[];
  stages: TimelineStage[];
}

export interface ParcoursHighlight {
  label: string;
  title: string;
  text: string;
}
