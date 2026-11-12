import type { Project } from '../../types';

export const minorProjects: Project[] = [
  {
    id: 'nutriai',
    title: 'NutriAI',
    tier: 'mineur',
    tagline:
      'Une application de suivi nutritionnel avec génération de repas par IA et scan de code-barres.',
    meta: 'Projet personnel, seul',
    color: '#22B573',
    onColor: '#0E0E0E',
    stack: ['Express', 'Next.js', 'React Native', 'PostgreSQL', 'API Claude'],
    images: [],
  },
  {
    id: 'ialocal',
    title: 'IALocal',
    tier: 'mineur',
    tagline:
      "Une interface de chat pour des modèles d'IA qui tournent en local avec Ollama, sans envoi de données.",
    meta: 'Projet personnel, seul',
    color: '#2456E6',
    onColor: '#FFFFFF',
    stack: ['React', 'TypeScript', 'Vite', 'Node.js', 'Ollama'],
    images: [],
    githubUrl: 'https://github.com/tomlefb/IALocal',
  },
  {
    id: 'lycee-hotelier',
    title: 'Gestion des stages',
    tier: 'mineur',
    tagline:
      "Une application web de suivi des stages et des évaluations des élèves d'un lycée hôtelier.",
    meta: 'Stage, lycée hôtelier Sainte-Thérèse · janv. – févr. 2025',
    color: '#E9C07A',
    onColor: '#0E0E0E',
    stack: ['Angular', 'TypeScript', 'Docker', 'Git'],
    images: [],
  },
  {
    id: 'ecopursue',
    title: 'EcoPursue',
    tier: 'mineur',
    tagline:
      "Une application qui calcule l'empreinte carbone d'un site physique, réalisée en hackathon sur un sujet Capgemini.",
    meta: 'Hackathon, Rennes · mars 2026',
    color: '#0F7B45',
    onColor: '#FFFFFF',
    stack: ['Spring Boot', 'Angular', 'React Native', 'PostgreSQL', 'Chart.js'],
    images: [],
  },
  {
    id: 'fairsonjob',
    title: 'FairsonJob Notifier',
    tier: 'mineur',
    tagline:
      'Un service qui envoie une notification sur iPhone dès qu’une nouvelle mission apparaît près de Rennes.',
    meta: 'Projet personnel, seul · novembre 2026',
    color: '#FF2E7E',
    onColor: '#0E0E0E',
    stack: ['Python', 'Firebase Auth', 'ntfy', 'Railway', 'pytest'],
    images: [],
  },
];
