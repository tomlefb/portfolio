import type { Project } from '../../types';

export const minorProjects: Project[] = [
  {
    id: 'nutriai',
    title: 'NutriAI',
    tier: 'mineur',
    tagline:
      'Une application de suivi nutritionnel avec génération de repas par IA et scan de code-barres.',
    indexLine: "Suivi nutritionnel, repas générés par IA et scan de code-barres.",
    indexMeta: 'Perso · web et mobile',
    meta: 'Projet personnel, seul',
    color: '#22B573',
    onColor: '#0E0E0E',
    stack: ['Express', 'Next.js', 'React Native', 'PostgreSQL', 'API Claude'],
    images: [
      { src: '/images/projects/nutriai/accueil.webp', alt: "Accueil NutriAI : calories restantes et suivi des macros", kind: 'phone' },
      { src: '/images/projects/nutriai/generateur-ia.webp', alt: "Générateur de repas par IA de NutriAI", kind: 'phone' },
      { src: '/images/projects/nutriai/ajout-repas.webp', alt: "Ajout d’un repas NutriAI : recherche, scan de code-barres, texte libre", kind: 'phone' },
    ],
  },
  {
    id: 'ialocal',
    title: 'IALocal',
    tier: 'mineur',
    tagline:
      "Une interface de chat pour des modèles d’IA qui tournent en local avec Ollama, sans envoi de données.",
    indexLine: "Un chat avec des modèles d’IA qui tournent en local, sans envoi de données.",
    indexMeta: 'Perso · open source',
    meta: 'Projet personnel, seul',
    color: '#2456E6',
    onColor: '#FFFFFF',
    stack: ['React', 'TypeScript', 'Vite', 'Node.js', 'Ollama'],
    images: [
      { src: '/images/projects/ialocal/conversation.webp', alt: "Conversation avec un modèle local dans IALocal", kind: 'desktop' },
      { src: '/images/projects/ialocal/accueil.webp', alt: "Écran d’accueil d’IALocal avec suggestions de requêtes", kind: 'desktop' },
    ],
    githubUrl: 'https://github.com/tomlefb/IALocal',
  },
  {
    id: 'lycee-hotelier',
    title: 'Gestion des stages',
    tier: 'mineur',
    tagline:
      "Une application web de suivi des stages et des évaluations des élèves d’un lycée hôtelier.",
    indexLine: "Le suivi des stages et des évaluations des élèves d’un lycée hôtelier.",
    indexMeta: 'Stage · 2025',
    meta: 'Stage, lycée hôtelier Sainte-Thérèse · janv. – févr. 2025',
    color: '#E9C07A',
    onColor: '#0E0E0E',
    stack: ['Angular', 'TypeScript', 'Docker', 'Git'],
    images: [
      { src: '/images/projects/lycee-hotelier/accueil.webp', alt: "Accueil de l’application de gestion des stages du lycée hôtelier", kind: 'desktop' },
      { src: '/images/projects/lycee-hotelier/fiche-stage.webp', alt: "Fiche d’un stage : établissement, dates, missions et photos", kind: 'desktop' },
    ],
  },
  {
    id: 'ecopursue',
    title: 'EcoPursue',
    tier: 'mineur',
    tagline:
      "Une application qui calcule l’empreinte carbone d’un site physique, réalisée en deux jours de hackathon sur un sujet Capgemini, qui a validé la solution.",
    indexLine: "L’empreinte carbone d’un site physique, calculée en deux jours de hackathon.",
    indexMeta: 'Hackathon · 2026',
    meta: 'Hackathon de 2 jours, équipe de 4 · mars 2026',
    color: '#0F7B45',
    onColor: '#FFFFFF',
    stack: ['Spring Boot', 'Angular', 'React Native', 'PostgreSQL', 'Chart.js'],
    images: [
      { src: '/images/projects/ecopursue/dashboard.webp', alt: "Tableau de bord EcoPursue : émissions carbone par source et matériau", kind: 'desktop' },
      { src: '/images/projects/ecopursue/connexion.webp', alt: "Page de connexion EcoPursue", kind: 'desktop' },
    ],
  },
];
