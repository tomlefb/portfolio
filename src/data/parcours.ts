import type { ParcoursItem, TechnoGroup } from '../types';

export const parcoursIntro =
  'Développeur à Rennes. BTS SIO, puis bachelor et mastère à Sup de Vinci, en alternance chez Capgemini depuis 2025.';

/** Du plus récent au plus ancien. */
export const parcours: ParcoursItem[] = [
  {
    period: 'Depuis sept. 2025',
    title: 'Alternant développeur',
    place: 'Capgemini, Cesson-Sévigné',
    text: "Migration d'un logiciel Java pour un client grand compte. Je participe au chiffrage et au suivi des mises en production.",
    current: true,
  },
  {
    period: 'Depuis sept. 2026',
    title: 'Mastère Développement Full Stack',
    place: 'Sup de Vinci, Rennes',
    text: 'En alternance, toujours chez Capgemini.',
  },
  {
    period: '2025 – 2026',
    title: 'Bachelor 3 Développement',
    place: 'Sup de Vinci, Rennes',
    text: 'Projet annuel CYNA en équipe de quatre, comme développeur backend et sous-chef de projet.',
  },
  {
    period: 'Janv. – févr. 2025',
    title: 'Stage développeur web',
    place: 'Lycée hôtelier Sainte-Thérèse, La Guerche-de-Bretagne',
    text: "Conception et livraison, seul, de l'application de gestion des stages de l'établissement.",
  },
  {
    period: 'Mai – juin 2024',
    title: 'Stage développeur Java',
    place: 'Ouest-France, Rennes',
    text: "Développement d'outils internes au sein du service informatique.",
  },
  {
    period: '2023 – 2025',
    title: 'BTS SIO option SLAM',
    place: 'Pôle Sup de la Salle, Rennes',
    text: 'Programmation, bases de données, analyse et conception de logiciels.',
  },
  {
    period: '2023',
    title: 'Baccalauréat',
    place: 'Lycée Saint-Martin, Rennes',
    text: 'Spécialités mathématiques et physique-chimie.',
  },
];

/** Répartition proposée, à valider par Tom. */
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
