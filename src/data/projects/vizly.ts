import type { Project } from '../../types';

export const vizly: Project = {
  id: 'vizly',
  title: 'Vizly',
  tier: 'majeur',
  tagline:
    'Vizly permet de créer son portfolio en ligne avec un formulaire guidé, puis de le publier sur pseudo.vizly.fr.',
  meta: 'Projet personnel, seul · 2026',
  color: '#F1B434',
  onColor: '#0E0E0E',
  stack: [
    'Next.js 15',
    'React 19',
    'TypeScript',
    'Tailwind CSS 4',
    'Supabase',
    'Stripe',
    'Resend',
    'Railway',
    'Docker',
    'Playwright',
    'Zod',
    'next-intl',
  ],
  liveUrl: 'https://www.vizly.fr',
  images: [
    { src: '/images/projects/vizly/landing.webp', alt: "Page d’accueil de Vizly : « Crée ton portfolio en 5 minutes »", kind: 'desktop' },
    { src: '/images/projects/vizly/dashboard.webp', alt: "Tableau de bord Vizly listant un portfolio en ligne", kind: 'desktop' },
    { src: '/images/projects/vizly/templates.webp', alt: "Catalogue des templates Vizly, filtres gratuits et premium", kind: 'desktop' },
    { src: '/images/projects/vizly/tarifs.webp', alt: "Page tarifs Vizly : offres Gratuit, Starter et Pro", kind: 'desktop' },
    { src: '/images/projects/vizly/portfolio-brutalist.webp', alt: "Portfolio généré avec le template Brutalist, fond noir et typographie massive", kind: 'desktop' },
    { src: '/images/projects/vizly/portfolio-colore.webp', alt: "Portfolio généré avec le template Coloré, tons roses et projets illustrés", kind: 'desktop' },
    { src: '/images/projects/vizly/editeur.webp', alt: "Éditeur Vizly, étape de publication avec récapitulatif et adresse personnalisée", kind: 'desktop' },
    { src: '/images/projects/vizly/mobile-landing.webp', alt: "Page d’accueil Vizly sur mobile", kind: 'phone' },
    { src: '/images/projects/vizly/mobile-portfolio.webp', alt: "Portfolio Créatif généré par Vizly, affiché sur mobile", kind: 'phone' },
    { src: '/images/projects/vizly/mobile-editeur.webp', alt: "Éditeur Vizly sur mobile, étape identité du formulaire", kind: 'phone' },
  ],
  facts: [
    { label: 'Mon rôle', value: 'Conception et développement complet' },
    { label: 'Équipe', value: 'Seul' },
    { label: 'Période', value: 'Mars à mai 2026' },
    { label: 'Technos', value: 'Next.js 15, TypeScript, Supabase, Stripe, Resend, Railway' },
  ],
  figures: [
    { value: '5', label: 'semaines de développement, seul' },
    { value: '8', label: 'templates' },
    { value: '19', label: 'migrations de base' },
    { value: '33', label: 'tests de bout en bout' },
  ],
  sections: [
    {
      title: "Ce que j’ai fait",
      items: [
        {
          lead: 'Un éditeur en quatre étapes',
          text: 'Profil, contenu, design, publication, avec aperçu en direct et envoi d’images.',
        },
        {
          lead: 'Huit templates',
          text: 'Quatre gratuits et quatre premium vendus à l’unité, chacun avec son propre style.',
        },
        {
          lead: 'Les abonnements',
          text: 'Paiement Stripe intégré à l’application, changement de plan, et passage à un plan inférieur appliqué en fin de période.',
        },
        {
          lead: 'Les adresses',
          text: 'Chaque portfolio répond sur pseudo.vizly.fr, et un compte Pro peut brancher son propre domaine, vérifié par DNS.',
        },
        {
          lead: 'Les e-mails',
          text: 'Douze modèles envoyés par Resend, plus cinq pour l’inscription et la connexion.',
        },
      ],
    },
    {
      title: 'Comment c’est construit',
      body: 'Une seule application Next.js sert le site, l’éditeur et les portfolios publiés. Le plan d’un compte ne change qu’à l’arrivée de la confirmation de Stripe, jamais au clic.',
      diagram: 'vizly-parcours',
    },
    {
      title: 'Le plus dur',
      body: 'Migrer le paiement d’une page hébergée par Stripe vers un paiement intégré, en sept phases. Le plus délicat a été la réception des confirmations de Stripe : il fallait qu’un même événement reçu deux fois ne produise ni double écriture ni double e-mail. Un champ absent de la réponse réelle, alors que les types TypeScript l’annonçaient, m’a appris à vérifier les réponses plutôt que la documentation.',
    },
  ],
};
