import type { ContactInfo } from '../types';

export const contactInfo: ContactInfo = {
  email: 'tom.lefevrebonzon@gmail.com',
  phone: '06 50 33 60 95',
  location: 'Rennes, France',
  linkedin: 'https://www.linkedin.com/in/tom-lefevre-bonzon-0800883a9/',
  github: 'https://github.com/tomlefb',
};

/** Textes du pied de page (colophon). */
export const footerContent = {
  contactLabel: 'Contact',
  contactText: "Pour parler d’un projet, d’une idée ou d’un poste.",
  copyHint: 'Copier',
  copyLabel: 'Copier l’adresse e-mail',
  copiedHint: 'Adresse copiée',
  elsewhereLabel: 'Ailleurs',
  pagesLabel: 'Pages',
  pagesNavLabel: 'Pages du site',
  pages: [
    { label: 'Accueil', to: '/' },
    { label: 'Autres projets', to: '/autres-projets' },
    { label: 'Parcours', to: '/parcours' },
  ],
  siteLabel: 'Ce site',
  siteText: 'React, TypeScript et Vite. Composé en Archivo.',
  sourceLabel: 'Code source',
  sourceUrl: 'https://github.com/tomlefb/portfolio',
};
