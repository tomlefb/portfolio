import type { ProjectFact } from '../types';

interface Site {
  name: string;
  role: string;
  city: string;
  intro: string;
  facts: ProjectFact[];
  portrait: { src: string; alt: string };
  cv: string;
}

export const site: Site = {
  name: 'Tom Lefevre-Bonzon',
  role: 'Développeur',
  city: 'Rennes',
  intro:
    "Je développe des applications complètes, de l’API au mobile, avec l’IA dans le produit comme dans ma façon de les construire.",
  portrait: { src: '/images/profile/tom-detoure.webp', alt: 'Portrait de Tom Lefevre-Bonzon' },
  cv: '/CV_TOM.pdf',
  facts: [
    { label: "Aujourd’hui", value: 'Alternant développeur, Capgemini' },
    { label: 'Études', value: 'Mastère Développement Full Stack, Sup de Vinci' },
  ],
};
