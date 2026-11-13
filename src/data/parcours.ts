import type { ParcoursGroup, ParcoursHighlight, ParcoursItem, TechnoGroup, Timeline } from '../types';

export const parcoursIntro =
  'Développeur à Rennes. BTS SIO, puis bachelor et mastère à Sup de Vinci, en alternance chez Capgemini depuis 2025.';

export const parcoursGroups: ParcoursGroup[] = [
  { kind: 'formation', label: 'Formation' },
  { kind: 'experience', label: 'Expérience' },
];

/** Frise : dates en années décimales (2025.67 ≈ septembre 2025). */
export const timeline: Timeline = {
  start: 2022,
  end: 2029.75,
  lanes: parcoursGroups,
  bars: [
    { lane: 'formation', from: 2022, to: 2023.5, title: 'Lycée', detail: 'Bac 2023' },
    { lane: 'formation', from: 2023.67, to: 2025.5, title: 'BTS SIO', detail: 'Pôle Sup de la Salle' },
    { lane: 'formation', from: 2025.67, to: 2026.5, title: 'Bachelor', detail: 'Sup de Vinci' },
    { lane: 'formation', from: 2026.67, to: 2028.5, title: 'Mastère', detail: 'Sup de Vinci', ongoing: true },
    {
      lane: 'experience',
      from: 2025.67,
      to: 2028.5,
      title: 'Alternance Capgemini',
      detail: 'Développeur',
      ongoing: true,
    },
    { lane: 'experience', from: 2028.6, to: 2029.75, title: 'Ensuite', detail: 'CDI full stack', upcoming: true },
  ],
  stages: [
    { from: 2024.33, to: 2024.5, title: 'Stage Ouest-France', detail: 'Java · mai – juin 2024' },
    { from: 2025, to: 2025.16, title: 'Stage lycée hôtelier', detail: 'Web · janv. – févr. 2025' },
  ],
};

export const timelineLabels = {
  caption: 'Frise du parcours, de 2022 à 2028 et après',
  today: 'Aujourd’hui',
  ongoing: 'en cours',
};

/** Les quatre cases sous la frise, dans l’ordre du temps. */
export const parcoursHighlights: ParcoursHighlight[] = [
  {
    label: 'Avant',
    title: 'BTS, Bachelor, deux stages',
    text: 'Ouest-France (Java, outils internes) et un lycée hôtelier (application livrée seul).',
  },
  {
    label: 'Aujourd’hui · Capgemini',
    current: true,
    title: 'Alternant développeur',
    text: "Migration d’un logiciel Java pour un client grand compte, chiffrage, suivi des mises en production.",
  },
  {
    label: 'Aujourd’hui · Sup de Vinci',
    current: true,
    title: 'Mastère Full Stack',
    text: "Deux ans en alternance, jusqu’en 2028.",
  },
  {
    label: 'Après 2028',
    title: 'Un CDI full stack',
    text: 'À la fin de l’alternance, un CDI de développeur full stack, à Rennes ou en télétravail.',
  },
];

export const technosLabel = 'Ce avec quoi je travaille';

/** Du plus récent au plus ancien. */
export const parcours: ParcoursItem[] = [
  {
    kind: 'experience',
    period: 'Depuis sept. 2025',
    title: 'Alternant développeur',
    place: 'Capgemini, Cesson-Sévigné',
    text: "Migration d’un logiciel Java pour un client grand compte. Je participe au chiffrage et au suivi des mises en production.",
    current: true,
  },
  {
    kind: 'formation',
    period: 'Depuis sept. 2026',
    title: 'Mastère Développement Full Stack',
    place: 'Sup de Vinci, Rennes',
    text: 'En alternance, toujours chez Capgemini.',
  },
  {
    kind: 'formation',
    period: '2025 – 2026',
    title: 'Bachelor 3 Développement',
    place: 'Sup de Vinci, Rennes',
    text: 'Projet annuel CYNA en équipe de quatre, comme développeur backend et sous-chef de projet.',
  },
  {
    kind: 'experience',
    period: 'Janv. – févr. 2025',
    title: 'Stage développeur web',
    place: 'Lycée hôtelier Sainte-Thérèse, La Guerche-de-Bretagne',
    text: "Conception et livraison, seul, de l’application de gestion des stages de l’établissement.",
  },
  {
    kind: 'experience',
    period: 'Mai – juin 2024',
    title: 'Stage développeur Java',
    place: 'Ouest-France, Rennes',
    text: "Développement d’outils internes au sein du service informatique.",
  },
  {
    kind: 'formation',
    period: '2023 – 2025',
    title: 'BTS SIO option SLAM',
    place: 'Pôle Sup de la Salle, Rennes',
    text: 'Programmation, bases de données, analyse et conception de logiciels.',
  },
  {
    kind: 'formation',
    period: '2023',
    title: 'Baccalauréat',
    place: 'Lycée Saint-Martin, Rennes',
    text: 'Spécialités mathématiques et physique-chimie.',
  },
];

/** Les technos, par fréquence d'usage. */
export const technos: TechnoGroup[] = [
  { label: 'Au quotidien', items: ['Java', 'TypeScript', 'Python', 'PostgreSQL', 'Git', 'Docker'] },
  {
    label: 'Régulièrement',
    items: ['Next.js', 'React', 'NestJS', 'Node.js', 'Supabase', 'Stripe', 'GitHub Actions'],
  },
  {
    label: 'Déjà utilisé',
    items: ['Angular', 'Ionic', 'React Native', 'Redis', 'RabbitMQ', 'C#', 'PHP', 'MongoDB', 'Ollama'],
  },
];
