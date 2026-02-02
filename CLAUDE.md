# CLAUDE.md — Portfolio Tom Lefevre-Bonzon

## Identité du projet

Portfolio personnel de **Tom Lefevre-Bonzon**, développeur en alternance chez Capgemini évoluant vers la gestion de projet IT. Ce site sert à présenter son parcours, ses projets et ses compétences dans l'optique d'une alternance de 2 ans (sept. 2026) pour un Mastère Chef de Projet IT à Sup de Vinci.

**Positionnement clé** : ce n'est PAS un portfolio de développeur classique. C'est le portfolio d'un futur chef de projet IT qui sait aussi coder. Chaque projet doit mettre en avant la dimension coordination / pilotage / décision en plus de la technique.

---

## Stack technique du portfolio

- **Framework** : React 18+ avec TypeScript
- **Build** : Vite
- **Styling** : Tailwind CSS
- **Animations** : Framer Motion (motion)
- **Icônes** : Lucide React
- **Déploiement** : Vercel (probable, à finaliser en fin de projet)
- **IDE** : IntelliJ IDEA

### Structure du projet

```
portfolio/
├── public/
│   ├── images/
│   │   ├── projects/        # Screenshots et visuels des projets
│   │   │   ├── cyna/
│   │   │   ├── nutriai/
│   │   │   ├── ialocal/
│   │   │   ├── algo-trading/
│   │   │   └── lycee-hotelier/
│   │   ├── profile/         # Photo de Tom
│   │   └── icons/           # Icônes custom si besoin
│   └── CV_TOM.pdf           # CV téléchargeable
├── src/
│   ├── components/
│   │   ├── layout/          # Navbar, Footer, ScrollToTop
│   │   ├── sections/        # Hero, About, Projects, Skills, Timeline, Contact
│   │   ├── ui/              # Boutons, Cards, Tags, Modal réutilisables
│   │   └── projects/        # Composants spécifiques aux fiches projet
│   ├── data/
│   │   └── projects.ts      # Données structurées des projets (voir plus bas)
│   ├── hooks/               # Hooks custom (useInView, useTheme, etc.)
│   ├── styles/
│   │   └── globals.css       # Tailwind directives + custom CSS
│   ├── types/
│   │   └── index.ts          # Types TypeScript partagés
│   ├── App.tsx
│   └── main.tsx
├── CLAUDE.md
├── index.html
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── package.json
```

---

## Design & Direction artistique

### Ton & Atmosphère
- **Style** : Moderne, épuré mais pas fade. Professionnel avec du caractère.
- **Thème** : FOND CLAIR. Base blanche / gris très clair (#FAFAFA, #F5F5F7), avec un accent ORANGE comme couleur signature (ex: orange vif #F97316, orange chaud #EA580C, ou ambre #F59E0B — à ajuster pour trouver le bon équilibre entre énergie et professionnalisme). Texte principal sombre (#0A0A0A ou similaire). L'orange apporte du dynamisme et se démarque du bleu classique "dev/IT" tout en restant pro.
- **Typographie** : Une font display distinctive pour les titres (ex: Clash Display, Cabinet Grotesk, Satoshi, General Sans — PAS Inter, PAS Roboto, PAS Arial). Une font body lisible et élégante pour le texte.
- **Animations** : Entrées en scroll (fade-in + translate), hover effects sur les cartes projet, transitions de page fluides. Pas de surcharge : chaque animation doit avoir un but.
- **Signature visuelle** : Un élément récurrent qui donne de la personnalité (ex: une grille subtile en fond, un gradient mesh doux, des formes géométriques, un jeu de lignes fines). Garder l'ensemble aéré et lumineux.

### À éviter absolument
- Le dark mode — on reste en clair
- Le look "template AI générique" (gradient violet sur blanc, Inter partout, cards identiques en grid 3 colonnes)
- Les emojis dans le contenu du portfolio
- Le style trop "dev GitHub readme" — c'est un site pro, pas un markdown

### Responsive
- Mobile-first. Le site doit être impeccable sur téléphone.
- Navbar : hamburger menu sur mobile, fixe en haut sur desktop.

---

## Sections du portfolio

### 1. Hero / Accueil
- Nom : **Tom Lefevre-Bonzon**
- Titre : **Alternant Chef de Projet IT**
- Accroche courte (1-2 lignes) : reprendre l'idée "Du code à la coordination — développeur en alternance chez Capgemini, j'évolue vers le pilotage de projets IT."
- CTA : "Voir mes projets" + "Télécharger mon CV"
- Liens : LinkedIn (https://www.linkedin.com/in/tom-lefevre-bonzon-0800883a9/), GitHub (https://github.com/tomlefb), Email (tom.lefevrebonzon@gmail.com)

### 2. À propos
- Parcours résumé en quelques phrases : BTS SIO → Bachelor Dev → alternance Capgemini → objectif Mastère Chef de Projet IT
- Mettre en avant la double compétence : technique + gestion
- Localisation : Rennes
- Langues : Français natif, Anglais C1 (TOEIC 885), Espagnol A2

### 3. Projets (section principale)
Chaque projet est une card cliquable qui ouvre un détail (modal ou page dédiée). Chaque fiche projet contient :
- Titre + courte description
- Image/screenshot (depuis `public/images/projects/`)
- Stack technique (badges/tags)
- Mon rôle précis (technique ET gestion si applicable)
- Liens : GitHub, demo live si dispo
- **Impact / résultat** : qu'est-ce que ça a changé, qu'est-ce que j'ai appris

---

#### Projet 1 : CYNA — Plateforme e-commerce B2B cybersécurité ⭐ (projet vedette)

**Contexte** :
Projet annuel Sup de Vinci B3 DEV (2025-2026). Cyna est une entreprise française spécialisée dans la vente de solutions de cybersécurité (SOC, EDR, XDR) en mode SaaS à destination des entreprises. Le projet consiste à développer une plateforme e-commerce complète comprenant un site web mobile-first, une application mobile (iOS/Android), un dashboard client et un back-office d'administration.

**Équipe** : 4 développeurs
- Iliès Mahoudeau — Chef de projet, Designer & Développeur Full Stack
- **Tom Lefevre-Bonzon — Développeur Backend & Sous-chef de projet**
- Evan Davison — Développeur Backend & Testeur
- Kéliane Kossa — Développeuse Frontend & Architecte BDD

**Mon rôle précis (sous-chef de projet + dev backend)** :
- Architecture de l'API backend (NestJS, microservices)
- Organisation et gestion de projet : planification, suivi des tâches sur ClickUp (Kanban)
- Participation à la rédaction du dossier de cadrage (47 pages) : périmètre, risques, planning, RACI
- Développement backend : API REST, logique métier
- Matrice RACI : Réalise + Approuve sur le dev backend, Réalise + Approuve sur la gestion de projet, Consulté sur les autres domaines

**Stack technique** :
- Frontend : Angular Ionic (codebase unique web + mobile iOS/Android via Capacitor)
- Backend : NestJS (TypeScript) — architecture microservices (Auth, Catalog, Order, Payment, User, Notification, Content, Analytics)
- Communication inter-services : RabbitMQ
- Base de données : PostgreSQL (indexation GIN pour recherche full-text < 500ms)
- Cache : Redis (performance < 1ms, sessions)
- Paiement : Stripe (Subscriptions pour SaaS récurrents, Checkout pour achats ponctuels, Webhooks)
- CI/CD : GitHub Actions
- Hébergement : Railway (PaaS)
- Stockage images : Cloudflare R2 (CDN intégré)
- Design : Figma (maquettes mobile + desktop + back-office)
- Gestion de projet : ClickUp (Kanban), GitHub (versioning, PRs, code reviews)

**Fonctionnalités clés développées** :
- Site e-commerce mobile-first : catalogue, recherche avec filtres (< 500ms), fiches produits, panier mixte (SaaS + produits physiques + licences)
- Tunnel d'achat complet en 5 étapes (auth, facturation, livraison conditionnelle, paiement Stripe, confirmation)
- Dashboard client : services actifs, gestion abonnements, historique commandes, factures PDF
- Back-office admin : gestion produits/stocks, commandes, abonnements, utilisateurs, contenu homepage (carrousel), analytics (KPIs, MRR, ventes)
- Application mobile hybride iOS/Android (Ionic + Capacitor)
- Sécurité : JWT + refresh tokens, 2FA par email pour admins, bcrypt, protection XSS/CSRF
- i18n : français + anglais
- Accessibilité : WCAG 2.1 niveau A

**Méthodologie** :
- Approche hybride : cycle en V pour les interactions client + Kanban en interne
- Réunions hebdomadaires (dimanche soir, 1h), communication quotidienne
- WIP limité à 2 tâches par développeur
- Jalons : MVP (16/04/2026), V1 complète (mai 2026), démonstration orale (20/05/2026)

**Gestion des risques** (extrait du dossier de cadrage) :
- R1 (critique) : Complexité du panier mixte SaaS + produits → mitigation par API Stripe Mixed Cart + tables polymorphiques
- R2 (haute) : Performance recherche < 500ms → mitigation par cache Redis + index GIN PostgreSQL
- R3 (haute) : Sécurité paiements/webhooks → mitigation par tests unitaires handlers + sandbox Stripe

**Points forts à mettre en avant sur le portfolio** :
- Rôle de sous-chef de projet : planification, RACI, suivi ClickUp, cadrage
- Production d'un dossier de cadrage professionnel de 47 pages
- Architecture microservices avec 8 services distincts
- Gestion d'un panier hybride complexe (SaaS récurrents + produits one-time)
- Collaboration en équipe de 4 sur un projet annuel structuré

**Images** : dossier `public/images/projects/cyna/` — screenshots de l'app (maquettes Figma, interface mobile, landing page, back-office, dashboard, architecture technique)

---

#### Projet 2 : NutriAI — App de gestion de calories boostée à l'IA

**Contexte** : Projet personnel — application complète (API + web + mobile) de suivi nutritionnel intelligent

**Description** : Application de suivi nutritionnel avec intégration IA (Claude API d'Anthropic) pour la génération de repas personnalisés, le scan de produits alimentaires via code-barres (Open Food Facts), et la gestion d'abonnements premium. Le projet est structuré en 3 sous-projets indépendants partageant la même API.

**Mon rôle** : Conception, architecture et développement complet — projet solo sur les 3 briques

**Stack** :
- API : Node.js + Express + TypeScript, Prisma ORM, PostgreSQL (Supabase), Claude AI (Anthropic API) pour la génération de repas, Open Food Facts API (scan produits), Stripe (gestion abonnements)
- Web : Next.js 14 + TypeScript + Tailwind CSS — landing page marketing + dashboard utilisateur authentifié
- Mobile : React Native + Expo + TypeScript — app iOS/Android avec scan code-barres natif

**Points forts** :
- Architecture multi-projets (API + Web + Mobile) avec une API partagée — vraie logique de système distribué
- Intégration IA concrète : Claude API pour la génération de repas personnalisés selon les objectifs nutritionnels
- Intégration Open Food Facts : scan code-barres pour récupérer automatiquement les infos nutritionnelles
- Monétisation : gestion d'abonnements Stripe (freemium → premium)
- Stack moderne et complète de bout en bout (backend, web, mobile)

**Images** : dossier `public/images/projects/nutriai/`

---

#### Projet 3 : IALocal — Interface IA locale avec Ollama

**Contexte** : Projet personnel — créer un chatbot IA qui tourne 100% en local, sans envoyer de données en ligne

**Description** : Front React + TypeScript connecté à Ollama via un serveur Node.js (server.js). Interface de chat pour interagir avec des LLMs locaux. Inclut un système de "skills" custom et un dossier de données locales.

**Mon rôle** : Développement complet (front + back + intégration Ollama)

**Stack** : React, TypeScript, Vite, Tailwind CSS, PostCSS, Node.js (Express via server.js), Ollama, ESLint

**Lien GitHub** : https://github.com/tomlefb/IALocal

**Points forts** : souveraineté des données / privacy by design, intégration d'IA en local sans dépendance cloud, architecture client-serveur custom, système de skills extensible

**Images** : dossier `public/images/projects/ialocal/`

---

#### Projet 4 : Algo Trading — Bot de trading automatisé avec analyse IA

**Contexte** : Projet personnel de longue haleine — conception d'un système de trading algorithmique autonome

**Description** : Logiciel backend Python qui se connecte à MetaTrader 5 (MT5) pour exécuter du trading automatisé sur les marchés financiers. Le système crée et gère des stratégies de trading, analyse les marchés via un LLM (modèle de langage) pour prendre des décisions informées, et exécute les ordres de manière autonome. Le programme gère l'ensemble du cycle : collecte de données de marché, analyse technique et fondamentale assistée par IA, création de stratégies, gestion du risque, exécution des ordres et suivi des performances.

**Mon rôle** : Conception et développement complet — projet solo

**Stack** : Python, MetaTrader 5 (API MT5), LLM (pour l'analyse de marché et la prise de décision), pandas (manipulation de données), probablement numpy, matplotlib ou plotly pour la visualisation

**Pas de screenshots** : C'est un logiciel purement backend sans interface graphique. Sur le portfolio, présenter ce projet via une description riche, un schéma d'architecture ou un diagramme de flux (généré en SVG ou via un composant React), et des chiffres/métriques si disponibles. On peut aussi montrer un extrait de la logique ou du workflow sous forme visuelle stylisée (pas du code brut).

**Points forts à mettre en avant** :
- Intégration d'un LLM pour l'analyse de marché — utilisation concrète de l'IA au-delà du chatbot
- Architecture logicielle complexe : pipeline de données → analyse IA → décision → exécution → monitoring
- Gestion du risque et automatisation de bout en bout
- Manipulation de données financières en temps réel
- Projet qui montre une curiosité et une ambition au-delà du dev web classique
- Capacité à concevoir un système autonome qui tourne sans intervention

**Idée de présentation visuelle sur le portfolio** : un schéma/diagramme montrant le flux (Données MT5 → Analyse LLM → Stratégie → Exécution → Résultats), stylisé avec les couleurs du portfolio. Pas besoin de screenshots puisque c'est du backend pur.

---

#### Projet 5 : Gestion des stages — Lycée hôtelier Sainte-Thérèse

**Contexte** : Stage développeur web (janvier-février 2025) au lycée hôtelier Sainte-Thérèse, La Guerche-de-Bretagne

**Description** : Conception et développement d'une application web complète de gestion des stages pour l'établissement. L'application permet aux enseignants de suivre les affectations de stages des élèves, de gérer les évaluations, et de centraliser toutes les informations liées aux périodes de formation en entreprise.

**Mon rôle** : Développeur principal — conception, développement et livraison du projet en autonomie

**Stack** : Angular, TypeScript, Docker, Git

**Points forts** : autonomie complète sur un projet livré en production, compréhension du besoin métier (éducation), UX pensée pour des utilisateurs non-techniques (enseignants), conteneurisation Docker

**Images** : dossier `public/images/projects/lycee-hotelier/` — Tom mettra des screenshots de l'application

---

### 4. Compétences
Deux colonnes ou deux groupes visuellement distincts :

**Gestion de projet & Méthodologie** :
- Méthodes Agiles (Scrum, Kanban) — sprints, daily, rétros, WIP limits
- Coordination d'équipe (4 développeurs)
- Chiffrage et estimation des charges
- Relation client / parties prenantes
- Suivi de mise en production
- Rédaction de dossier de cadrage (périmètre, RACI, risques, planning)
- Outils : ClickUp, Jira, Notion

**Technique** :
- Langages : Java, C#, PHP, Python, JavaScript, TypeScript
- Front : React, Angular, Ionic
- Back : NestJS, Node.js, Express
- BDD : PostgreSQL, MySQL, MongoDB, Redis
- DevOps : Git, Docker, GitHub Actions, Railway
- Design : Figma
- Sécurité : JWT, bcrypt, 2FA, HTTPS/TLS, protection XSS/CSRF
- Paiement : Stripe (Subscriptions, Checkout, Webhooks)

### 5. Parcours / Timeline
Timeline verticale, du plus récent au plus ancien :
1. **2026-2028** — Mastère Chef de Projet IT, Sup de Vinci (objectif)
2. **Depuis sept. 2025** — Alternance développeur, Capgemini (Cesson) — migration logicielle Java, chiffrage, coordination client
3. **2025-2026** — Bachelor 3 Développement Informatique, Sup de Vinci
4. **Jan-Fév 2025** — Stage développeur web, Lycée hôtelier Sainte-Thérèse (La Guerche-de-Bretagne)
5. **Mai-Juin 2024** — Stage développeur Java, Ouest-France (Rennes)
6. **2023-2025** — BTS SIO option SLAM, Pôle Sup de la Salle
7. **2023** — Baccalauréat (Maths + Physique-Chimie), Lycée Saint-Martin

### 6. Contact
- Email : tom.lefevrebonzon@gmail.com
- Téléphone : 06 50 33 60 95
- LinkedIn : https://www.linkedin.com/in/tom-lefevre-bonzon-0800883a9/
- GitHub : https://github.com/tomlefb
- Formulaire de contact optionnel (ou simple mailto)

---

## Données des projets (src/data/projects.ts)

Utiliser une structure TypeScript comme celle-ci pour centraliser les données :

```typescript
export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  role: string;
  context: string;
  stack: string[];
  highlights: string[];       // Points forts / résultats
  githubUrl?: string;
  liveUrl?: string;
  images: string[];           // chemins vers public/images/projects/{id}/
  featured: boolean;          // true = mis en avant (CYNA)
  category: 'professional' | 'personal' | 'academic';
}
```

---

## Images et assets

Les images des projets sont en place dans les dossiers correspondants sous `public/images/projects/`. La photo de profil est dans `public/images/profile/`. Claude Code doit :
- Scanner les dossiers d'images et les intégrer automatiquement dans les composants correspondants
- Référencer ces images via les chemins relatifs dans les données des projets
- Prévoir des fallbacks / placeholders si une image est absente (placeholder élégant avec icône et nom du projet, pas un broken image)
- Utiliser des composants `<img>` avec `loading="lazy"` et des `alt` descriptifs
- Pour le projet Algo Trading : PAS de screenshots disponibles (backend pur), créer un composant visuel (schéma de flux / diagramme d'architecture) à la place

---

## Règles pour Claude Code

### Style de code
- TypeScript strict (pas de `any`)
- Composants fonctionnels React avec hooks
- Nommage : PascalCase pour les composants, camelCase pour les fonctions/variables
- Un composant par fichier
- Props typées avec des interfaces (pas de `type` inline)
- Imports absolus si configurés, sinon relatifs propres

### Principes de design
- THÈME CLAIR obligatoire — fond blanc / gris très clair, texte sombre
- Mobile-first responsive
- Animations subtiles et performantes (pas de jank)
- Accessibilité : sémantique HTML correcte, alt text, contraste suffisant, navigation clavier
- Performance : lazy loading des images, code splitting si nécessaire

### Ce qu'il ne faut PAS faire
- Mettre un dark mode ou un fond sombre
- Utiliser des composants UI libraries lourdes (pas de MUI, pas de Chakra) — on fait du custom avec Tailwind
- Mettre des données en dur dans les composants — tout passe par `src/data/`
- Créer des pages séparées avec un router (sauf si Tom le demande) — c'est un single-page avec scroll
- Inventer du contenu pour les projets : utiliser uniquement les infos fournies dans ce fichier, ou mettre un placeholder clair `{À COMPLÉTER}`
- Utiliser Inter, Roboto, Arial ou toute font générique
- Inclure le projet Ouest-France dans les projets affichés (retiré du portfolio, reste dans la timeline)

### Workflow attendu
1. Lire ce CLAUDE.md en entier avant de commencer
2. Initialiser le projet Vite + React + TypeScript + Tailwind
3. Mettre en place la structure de fichiers
4. Créer les données des projets dans `src/data/projects.ts`
5. Développer section par section (Hero → About → Projects → Skills → Timeline → Contact)
6. Ajouter les animations et polish en dernier
7. Tester le responsive sur mobile

---

## Informations de contact de Tom (pour le site)

- **Nom complet** : Tom Lefevre-Bonzon
- **Email** : tom.lefevrebonzon@gmail.com
- **Téléphone** : 06 50 33 60 95
- **Localisation** : Rennes, France
- **LinkedIn** : https://www.linkedin.com/in/tom-lefevre-bonzon-0800883a9/
- **GitHub** : https://github.com/tomlefb
- **Permis B** : oui
- **PSC1** : oui

---

## TODO — À compléter par Tom

- [ ] Confirmer le déploiement Vercel en fin de projet
