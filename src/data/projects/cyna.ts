import type { Project } from '../../types';

export const cyna: Project = {
  id: 'cyna',
  title: 'CYNA',
  tier: 'majeur',
  tagline:
    'Une plateforme e-commerce B2B de solutions de cybersécurité, conçue en équipe de quatre : site web, application mobile et back-office.',
  meta: "Projet d’école, équipe de 4 · 2025–2026",
  githubUrl: 'https://github.com/CynaOrg/cyna-api',
  color: '#5B3FF0',
  onColor: '#FFFFFF',
  stack: [
    'NestJS',
    'TypeScript',
    'Angular 20',
    'Ionic 8',
    'Capacitor',
    'RabbitMQ',
    'PostgreSQL 16',
    'Redis 7',
    'Stripe',
    'Cloudflare R2',
    'Railway',
    'GitHub Actions',
    'Docker',
    'Figma',
    'ClickUp',
  ],
  images: [
    { src: '/images/projects/cyna/landing.webp', alt: "Page d’accueil CYNA : « La protection de votre entreprise commence ici »", kind: 'desktop' },
    { src: '/images/projects/cyna/mobile-accueil.webp', alt: "Accueil de l’application mobile CYNA, offres de cybersécurité mises en avant", kind: 'phone' },
    { src: '/images/projects/cyna/mobile-catalogue.webp', alt: "Catalogue CYNA sur mobile : services et produits", kind: 'phone' },
    { src: '/images/projects/cyna/mobile-produit.webp', alt: "Fiche produit SOC Premium dans l’application mobile CYNA", kind: 'phone' },
    { src: '/images/projects/cyna/mobile-compte.webp', alt: "Espace compte CYNA : commandes, abonnements et paramètres", kind: 'phone' },
  ],
  facts: [
    { label: 'Mon rôle', value: 'Développeur backend et sous-chef de projet' },
    { label: 'Équipe', value: '4 développeurs' },
    { label: 'Période', value: 'Octobre 2025 à mai 2026' },
    { label: 'Technos', value: 'NestJS, Angular / Ionic, RabbitMQ, PostgreSQL, Redis, Stripe' },
  ],
  figures: [
    { value: '8', label: 'services derrière une passerelle' },
    { value: '47', label: 'pages de cadrage' },
    { value: '4', label: 'développeurs' },
    { value: '2', label: 'tâches en cours au plus, par personne' },
  ],
  sections: [
    {
      title: "Ce que j’ai fait",
      items: [
        {
          lead: 'Le backend',
          text: 'J’ai développé des services NestJS et leur communication par messages avec RabbitMQ.',
        },
        {
          lead: 'Le paiement',
          text: 'J’ai intégré Stripe, pour des abonnements et des achats ponctuels dans un même panier, et travaillé sur la base PostgreSQL.',
        },
        {
          lead: 'Le front',
          text: 'J’ai aussi développé sur l’application Angular / Ionic et sur le back-office.',
        },
        {
          lead: 'La documentation',
          text: 'J’ai rédigé le dossier de cadrage de 47 pages et mis en forme le dossier technique, le backlog et les supports de soutenance.',
        },
      ],
    },
    {
      title: 'Comment c’est construit',
      body: 'Une passerelle reçoit tous les appels et parle aux huit services par messages. Aucun service n’en appelle un autre directement.',
      diagram: 'cyna-architecture',
    },
    {
      title: "L’organisation",
      body: 'J’étais sous-chef de projet, aux côtés du chef de projet. J’ai rédigé le dossier de cadrage : périmètre, risques, planning et matrice RACI. Le suivi passait par des réunions hebdomadaires et un tableau Kanban d’une centaine de tâches, avec deux tâches en cours au maximum par développeur.',
    },
    {
      title: 'Le plus dur',
      body: 'Le plus dur n’a pas été technique : tenir une architecture ambitieuse avec une équipe de quatre. Une passerelle et huit services, c’était beaucoup ; à deux, nous avons porté l’essentiel du backend pour livrer. Sur un prochain projet, je découperais le travail plus tôt pour que chacun prenne en main un service.',
    },
  ],
};
