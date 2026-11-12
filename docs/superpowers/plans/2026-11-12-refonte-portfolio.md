# Refonte du portfolio — plan de réalisation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remplacer le portfolio actuel par un site multipage au style « affiche » qui présente Tom comme développeur, avec Vizly, TTI et CYNA en projets majeurs.

**Architecture:** SPA React avec `react-router-dom` : accueil, une page par projet majeur, « Autres projets », « Parcours ». Tout le contenu vit dans `src/data/` ; les pages sont des compositions de petits composants (titre géant, cadre de téléphone, capture, aplat, schéma SVG). Les schémas sont des composants React construits sur un petit kit SVG commun.

**Tech Stack:** React 18, TypeScript strict, Vite 6, Tailwind 3, Framer Motion, `react-router-dom` 6 (ajout), Vitest (ajout, tests de contenu), `@playwright/test` (ajout, tests de mise en page).

**Spec:** `docs/superpowers/specs/2026-11-12-refonte-portfolio-design.md` — à lire en entier avant toute tâche. Maquettes de référence : `.superpowers/brainstorm/29168-1794488004/content/affiche-v4.html` (accueil, parcours) et `affiche-v2.html` (page projet).

## Global Constraints

- Tout se fait sur la branche `refonte-affiche`. Rien n'est fusionné dans `main` tant qu'il reste un `{À COMPLÉTER}` visible.
- Fond `#E7E8E9`, encre `#0E0E0E`. Aucune couleur d'accent globale : une couleur par projet, portée par les données.
- Police unique : Archivo variable (largeur 62–125, graisses 400–900). Titres : graisse 900, largeur 68 %, capitales, interlignage 0.82.
- Filets 3 px entre grandes zones, 1 px entre lignes. Aucun arrondi sauf cadres de téléphone. Aucune ombre sauf sous les téléphones. Aucun dégradé.
- Interdits : cartes arrondies, pastilles/badges, icônes décoratives, numérotation 01/02, micro-labels en majuscules espacées, formules à effet.
- Un chevauchement peut mordre une lettre, jamais rendre un mot illisible, à aucune largeur.
- Photo de Tom : couleurs naturelles, détourée, sans filtre, uniquement sur Parcours, masquée sous 640 px.
- TTI : aucun montant, aucun rendement, aucun pourcentage de performance, aucune capture de code ni du journal de trading.
- Contenu : uniquement ce qui est attesté par les dépôts et documents de Tom ; sinon `{À COMPLÉTER}`.
- Aucune donnée en dur dans les composants ; tout passe par `src/data/`.
- TypeScript strict, pas de `any`. Un composant par fichier. Props typées par `interface`.
- Mobile : marges 16 px, pas de défilement horizontal, texte courant ≥ 16 px.
- Contenu visible sans animation ; `prefers-reduced-motion` respecté.
- Images en WebP, noms sans espaces ni accents, `loading="lazy"` (sauf première image visible), `alt` descriptif.
- Commits : seulement quand Tom le demande ou l'a autorisé pour l'exécution du plan.

## Review Focus

1. **Largeurs entre les points de rupture** (700, 860, 1000, 1180 px) : aucune ne doit produire de texte recouvert ni de défilement horizontal. Test : Task 9, boucle sur ces largeurs.
2. **Chargement direct ou rafraîchissement d'une URL profonde** (`/projets/vizly`, `/parcours`) en production : la page doit s'afficher, pas un 404 Vercel. Test : Task 2, `vercel.json` + test Playwright en `vite preview`.
3. **Identifiant de projet inconnu ou projet mineur** (`/projets/nimportequoi`, `/projets/ialocal`) : page « introuvable » avec retour à l'accueil, pas d'écran blanc. Test : Task 6.
4. **Image absente ou en erreur** : la composition garde ses dimensions et affiche le nom du projet sur l'aplat, pas d'icône d'image cassée. Test : Task 4.
5. **Animations coupées** (`prefers-reduced-motion`, ou JavaScript d'observation qui ne se déclenche pas) : tout le contenu reste visible. Test : Task 9.

---

### Task 1 : Branche, ménage du dépôt, outils de test

**Files:**
- Create: `.gitignore`, `vitest.config.ts`, `playwright.config.ts`, `tests/smoke.spec.ts`
- Modify: `package.json`

**Interfaces:**
- Produces: scripts `npm test` (Vitest), `npm run test:e2e` (Playwright sur `vite preview`, port 4173), constante `WIDTHS = [390, 768, 1024, 1440]` et `ROUTES` exportées par `tests/helpers.ts`.

- [ ] **Step 1 :** Créer la branche `refonte-affiche` depuis `main`.
- [ ] **Step 2 :** Écrire `.gitignore` : `node_modules`, `dist`, `.superpowers`, `.playwright-mcp`, `test-results`, `playwright-report`, `.DS_Store`.
- [ ] **Step 3 :** Demander l'accord de Tom, puis `git rm -r --cached node_modules` dans un commit séparé « chore: sortir node_modules du suivi ». Sans accord, sauter cette étape et le signaler.
- [ ] **Step 4 :** Installer `vitest`, `@playwright/test`, `react-router-dom@6` ; ajouter les scripts.
- [ ] **Step 5 :** Écrire `tests/smoke.spec.ts` : la page `/` répond, sans erreur console. Lancer `npm run build && npm run test:e2e` → PASS.

### Task 2 : Fondations — tokens, police, routeur, gabarit de page

**Files:**
- Modify: `tailwind.config.js`, `src/styles/globals.css`, `index.html`, `src/App.tsx`, `src/main.tsx`
- Create: `vercel.json`, `src/components/layout/SiteNav.tsx`, `src/components/layout/ContactFooter.tsx`, `src/components/layout/PageShell.tsx`, `src/pages/NotFoundPage.tsx`, `src/components/ui/BigTitle.tsx`, `tests/routing.spec.ts`

**Interfaces:**
- Produces:
  - Tailwind : couleurs `paper` (`#E7E8E9`), `ink` (`#0E0E0E`) ; `fontFamily.sans = ['Archivo', …]` ; utilitaires `.rule-3`, `.rule-1` ; classe `.title-xl` (graisse 900, `font-stretch: 68%`, capitales, `line-height: .82`).
  - `PageShell({ navLabel, children }: PageShellProps)` : nav + contenu + pied de contact ; pose `container-type: inline-size` sur le conteneur pour que les compositions utilisent les unités `cqw`.
  - `SiteNav({ label }: SiteNavProps)` : liens Projets (`/#projets`), Parcours (`/parcours`), Contact (`#contact`), CV (`/CV_TOM.pdf`, `download`). Pas de hamburger.
  - `ContactFooter()` : bloc noir `id="contact"`, titre « Écrivez-moi », valeurs lues dans `src/data/contact.ts`.
  - `BigTitle({ as, children, className }: BigTitleProps)`.
  - Routes : `/`, `/projets/:id`, `/autres-projets`, `/parcours`, `*` → `NotFoundPage`.

- [ ] **Step 1 :** Écrire `tests/routing.spec.ts` : chaque route de `ROUTES` chargée directement renvoie un `h1` visible ; `/inconnu` affiche « Page introuvable » et un lien vers `/` ; la nav contient les quatre liens et aucun bouton de menu à 390 px. Lancer → FAIL.
- [ ] **Step 2 :** Remplacer la police dans `index.html` (Archivo variable, axes `wdth` et `wght`) ; mettre à jour `title`, `description`, Open Graph : « Tom Lefevre-Bonzon — Développeur », « Développeur à Rennes, alternant chez Capgemini. Projets : Vizly, TTI, CYNA. »
- [ ] **Step 3 :** Réécrire `tailwind.config.js` et `globals.css` selon Interfaces ; retirer palette orange, `text-gradient-orange`, `grain-overlay`, animations inutilisées. Défilement doux et retour en haut de page à chaque changement de route.
- [ ] **Step 4 :** Monter le routeur avec des pages provisoires (un `h1` chacune), `PageShell`, `SiteNav`, `ContactFooter`, `NotFoundPage`.
- [ ] **Step 5 :** `vercel.json` : réécriture de toutes les routes vers `/index.html`.
- [ ] **Step 6 :** `npm run build && npm run test:e2e` → PASS. Commit.

### Task 3 : Modèle de données et contenu

**Files:**
- Modify: `src/types/index.ts`, `src/data/projects.ts`, `src/data/contact.ts`
- Create: `src/data/parcours.ts`, `src/data/site.ts`, `src/data/__tests__/content.test.ts`
- Delete: `src/data/skills.ts`, `src/data/timeline.ts`

**Interfaces:**
- Produces (dans `src/types/index.ts`) :

```ts
export type DiagramId = 'cyna-architecture' | 'tti-boucle' | 'vizly-parcours';
export interface ProjectImage { src: string; alt: string; kind: 'desktop' | 'phone' }
export interface ProjectFact { label: string; value: string }
export interface SectionItem { lead: string; text: string }
export interface ProjectSection { title: string; body?: string; items?: SectionItem[]; diagram?: DiagramId }
export interface Project {
  id: string; title: string; tier: 'majeur' | 'mineur';
  tagline: string;        // une phrase, affichée sous le titre
  meta: string;           // ex. « Projet personnel, seul · 2026 »
  color: string; onColor: string;   // hex, couleur de l'aplat et du texte posé dessus
  stack: string[]; images: ProjectImage[];
  facts?: ProjectFact[];            // exactement 4 pour un majeur
  sections?: ProjectSection[];      // au moins 2 pour un majeur
  githubUrl?: string; liveUrl?: string;
}
export interface ParcoursItem { period: string; title: string; place: string; text: string; current?: boolean }
export interface TechnoGroup { label: string; items: string[] }
```

  - `src/data/projects.ts` : `projects`, `majorProjects` (ordre : `vizly`, `tti`, `cyna`), `minorProjects` (ordre : `nutriai`, `ialocal`, `lycee-hotelier`, `ecopursue`, `fairsonjob`), `getProject(id): Project | undefined`, `getNextMajor(id): Project`.
  - `src/data/parcours.ts` : `parcoursIntro: string`, `parcours: ParcoursItem[]` (du plus récent au plus ancien, Capgemini `current: true`), `technos: TechnoGroup[]` (trois groupes : « Au quotidien », « Régulièrement », « Déjà utilisé »).
  - `src/data/site.ts` : `site = { name, role: 'Développeur', city: 'Rennes', intro, facts: ProjectFact[] }`.

- [ ] **Step 1 :** Écrire `content.test.ts` :
  - chaque `images[].src` existe sous `public/` ;
  - chaque majeur a 4 `facts` et ≥ 2 `sections` ; chaque `color`/`onColor` est un hex à 6 chiffres ; le contraste `color`/`onColor` ≥ 4.5 ;
  - aucune chaîne de `src/data/**` ne contient « alternance Chef de Projet », « Recherche alternance », « Mastère Chef de Projet » ;
  - aucune chaîne du projet `tti` ne contient `€`, `$`, `%`, « k/an », « payout » ;
  - `majorProjects.map(p => p.id)` vaut `['vizly','tti','cyna']` ; `getNextMajor('cyna').id === 'vizly'`.
  Lancer `npm test` → FAIL.
- [ ] **Step 2 :** Lire les sources avant d'écrire : `~/IdeaProjects/appPortfolio/CLAUDE.md` et `REFONTE_REPORT.md` (Vizly) ; `~/IdeaProjects/tti/README.md`, `CLAUDE.md`, `docs/INDEX.md`, `research/families/_GRAVEYARD.md` et le README de `archi-autonomous-prop-research` (TTI) ; `~/Documents/projetsCours/Cyna/` (dossier technique, schémas) ; README de `FaireSonJobNotif` ; `~/IdeaProjects/projethackaton`. Lecture seule.
- [ ] **Step 3 :** Rédiger les données. Sections attendues par majeur : « Ce que j'ai fait » (`items`), « Comment c'est construit » (`diagram`), « Le plus dur » (`body`, brouillon à faire relire) ; CYNA ajoute « L'organisation » ; TTI remplace « Ce que j'ai fait » par « La méthode » et ajoute « Ce qui n'a pas marché ». Textes à la première personne, sans superlatifs, CYNA au passé. Tenir à jour `docs/superpowers/plans/contenu-a-valider.md` : chaque `{À COMPLÉTER}` et chaque brouillon subjectif.
- [ ] **Step 4 :** `npm test` → PASS (les chemins d'images échoueront jusqu'à Task 4 : marquer ce cas `test.todo` puis le réactiver en Task 4). Commit.

### Task 4 : Images et briques visuelles

**Files:**
- Create: `scripts/prepare-images.mjs`, `public/images/projects/{vizly,tti,cyna,nutriai,ialocal,lycee-hotelier,ecopursue}/*.webp`, `public/images/profile/tom-detoure.webp`, `src/components/ui/PhoneFrame.tsx`, `src/components/ui/Shot.tsx`, `src/components/ui/ColorBlock.tsx`, `tests/visual-bricks.spec.ts`

**Interfaces:**
- Produces:
  - `PhoneFrame({ image, className, eager }: PhoneFrameProps)` : cadre noir arrondi, ratio 430/932, ombre portée ; `image: ProjectImage`.
  - `Shot({ image, className, eager }: ShotProps)` : capture desktop, filet 3 px, `object-position: top`.
  - Les deux : en cas d'erreur de chargement, fond blanc conservé et `alt` affiché en texte, jamais l'icône du navigateur.
  - `ColorBlock({ color, className }: ColorBlockProps)`.

- [ ] **Step 1 :** Faire la sélection d'images, la regarder une par une, et l'écrire en tête de `prepare-images.mjs` sous forme de table `{ source, cible, largeur, recadrage? }`. Vizly : 8 à 10 captures couvrant landing, dashboard, éditeur, liste des templates, tarifs, deux templates rendus, mobile. CYNA : captures existantes renommées. EcoPursue : dashboard et login. Écarter toute capture montrant un outil de dev (pastille Next.js, bandeau d'erreurs) ou des données personnelles.
- [ ] **Step 2 :** Écrire le script (conversion WebP, largeur max 1600 desktop / 860 téléphone) ; l'exécuter ; vérifier le poids total < 4 Mo.
- [ ] **Step 3 :** Refaire le détourage du portrait en pleine résolution (`scratchpad/cut.swift` de la session de conception, ou équivalent Vision), vérifier le contour sur fond `#E7E8E9`, exporter en WebP avec transparence.
- [ ] **Step 4 :** Écrire `tests/visual-bricks.spec.ts` sur une route de démonstration `/__bricks` (dev seulement) : une `PhoneFrame` avec une image inexistante garde son ratio et affiche le texte de l'`alt`. → FAIL, puis implémenter les trois composants → PASS.
- [ ] **Step 5 :** Réactiver le test des chemins d'images de Task 3 → PASS. Commit.

### Task 5 : Schémas

C'est la tâche que Tom surveille le plus. Chaque schéma est d'abord conçu, montré à Tom, puis codé.

**Files:**
- Create: `src/components/diagrams/kit/Node.tsx`, `kit/Edge.tsx`, `kit/Note.tsx`, `kit/DiagramFrame.tsx`, `src/components/diagrams/CynaArchitecture.tsx`, `TtiBoucle.tsx`, `VizlyParcours.tsx`, `src/components/diagrams/Diagram.tsx`, `tests/diagrams.spec.ts`

**Interfaces:**
- Produces:
  - `Diagram({ id, color }: DiagramProps)` avec `id: DiagramId` : rend le schéma correspondant.
  - Kit : `DiagramFrame({ viewBox, title, children })` (`<svg role="img">` + `<title>`), `Node({ x, y, w, h, label, sub?, variant })` avec `variant: 'plain' | 'solid' | 'accent'`, `Edge({ points, dashed?, arrow? })`, `Note({ x, y, text, anchor? })`.
  - Règles du kit : traits 2 px encre, angles droits, liaisons orthogonales, texte Archivo (étiquettes en graisse 700, largeur 80 %), un seul élément en couleur du projet par schéma (`variant: 'accent'`), aucun dégradé ni ombre.

- [ ] **Step 1 :** Concevoir sur papier (liste de nœuds, liaisons, annotation unique) à partir des sources lues en Task 3 :
  - **CYNA — architecture** : clients (web, mobile, back-office) → passerelle API → 8 services (Auth, Catalog, Order, Payment, User, Notification, Content, Analytics) → bus RabbitMQ → PostgreSQL et Redis ; Stripe relié à Payment ; annotation : la recherche sous 500 ms.
  - **TTI — la boucle de recherche** : idée → backtest → portes de validation → abandon (vers le « cimetière ») ou déploiement → exécution en production → suivi → retour à l'idée. Annotation : le rapport entre pistes abandonnées et pistes déployées, si les sources le donnent. Aucun chiffre de performance.
  - **Vizly — du formulaire au site** : formulaire guidé → choix du template → paiement Stripe → publication sur `pseudo.vizly.fr` ; en dessous, la couche technique (Next.js, Supabase, Stripe, Resend, Railway) alignée sous chaque étape.
- [ ] **Step 2 :** Maquetter les trois schémas en SVG statique dans une page de maquette du serveur de brainstorming, en version large et en version mobile (les schémas se recomposent en vertical sous 640 px, ils ne rétrécissent pas jusqu'à l'illisible). Les montrer à Tom. **Attendre sa validation avant le Step 3.**
- [ ] **Step 3 :** Écrire `tests/diagrams.spec.ts` : sur `/__bricks`, chaque `Diagram` a un `role="img"` et un titre accessible ; à 390 px aucun texte SVG ne fait moins de 11 px rendus ; aucun débordement horizontal. → FAIL.
- [ ] **Step 4 :** Implémenter le kit puis les trois schémas → PASS. Commit.

### Task 6 : Page projet

**Files:**
- Create: `src/pages/ProjectPage.tsx`, `src/components/project/ProjectHeader.tsx`, `FactCells.tsx`, `ImageBand.tsx`, `SectionBlock.tsx`, `NextProject.tsx`, `tests/project-page.spec.ts`

**Interfaces:**
- Consumes: `getProject`, `getNextMajor`, `Diagram`, `PhoneFrame`, `Shot`, `BigTitle`, `PageShell`.
- Produces: route `/projets/:id` pour les trois majeurs.

- [ ] **Step 1 :** Écrire `tests/project-page.spec.ts` : pour `vizly`, `tti`, `cyna` : `h1` = titre, 4 cases de faits, chaque titre de section présent, lien « Tous les projets » vers `/#projets`, bandeau « Projet suivant » menant au bon projet ; `/projets/ialocal` et `/projets/xyz` affichent « Projet introuvable » ; la page TTI ne contient aucun `€`, `$` ni `%`. → FAIL.
- [ ] **Step 2 :** Implémenter d'après `affiche-v2.html` (page projet) : titre géant à cheval sur l'aplat de couleur, accroche, cases de faits séparées par des filets 3 px, bande d'images imbriquée (une capture large qui sort du bord, un ou deux téléphones posés dessus ; pour TTI, le schéma occupe la bande), blocs titre à gauche / texte à droite, bandeau final à la couleur du projet suivant.
- [ ] **Step 3 :** → PASS. Regarder les trois pages à 1440 et 390 px, corriger ce qui masque du texte. Commit.

### Task 7 : Accueil

**Files:**
- Create: `src/pages/HomePage.tsx`, `src/components/home/Hero.tsx`, `SpreadVizly.tsx`, `SpreadTti.tsx`, `SpreadCyna.tsx`, `OthersTeaser.tsx`, `tests/home.spec.ts`
- Delete: `src/components/sections/*`, `src/components/projects/AlgoTradingVisual.tsx`, `src/components/layout/Navbar.tsx`, `Footer.tsx`, `src/components/ui/{Badge,Button,SectionHeading}.tsx`, `src/hooks/useInView.ts` (s'ils ne sont plus importés)

**Interfaces:**
- Consumes: `site`, `majorProjects`, `minorProjects`, briques de Task 4, `Diagram`.
- Produces: `/` avec ancre `id="projets"`.

- [ ] **Step 1 :** Écrire `tests/home.spec.ts` : `h1` contient « Tom » et « Lefevre-Bonzon » ; l'intro et les deux faits de `site` sont visibles ; trois liens de projet dans l'ordre Vizly, TTI, CYNA mènent à leurs pages ; un lien « Autres projets » mène à `/autres-projets` ; aucun texte « alternance Chef de Projet » ; aucune `img` du portrait. → FAIL.
- [ ] **Step 2 :** Implémenter d'après `affiche-v4.html`. Une composition distincte par projet :
  - Hero : nom sur deux lignes, intro dans le vide à droite de « TOM », téléphone Vizly qui déborde sur la section suivante.
  - Vizly : la plus grande ; titre à cheval sur l'aplat, capture de la landing qui sort à droite, téléphone posé dessus, deuxième capture (dashboard ou éditeur) en retrait.
  - TTI : typographique ; le titre traverse l'aplat, qui porte une version réduite de la boucle de recherche.
  - CYNA : trois téléphones en escalier sur l'aplat.
  - Autres projets : bandeau avec les cinq noms en gros et deux images, lien vers la page.
  Chaque composition entière est un lien ; survol : l'aplat s'étend sous le titre.
- [ ] **Step 3 :** → PASS. Supprimer les anciens composants, `npm run build` et `npm run lint` sans erreur. Commit.

### Task 8 : Autres projets et Parcours

**Files:**
- Create: `src/pages/OtherProjectsPage.tsx`, `src/components/project/MinorProject.tsx`, `src/pages/ParcoursPage.tsx`, `src/components/parcours/ParcoursHeader.tsx`, `ParcoursTable.tsx`, `TechnoLines.tsx`, `tests/secondary-pages.spec.ts`

**Interfaces:**
- Consumes: `minorProjects`, `parcours`, `parcoursIntro`, `technos`.

- [ ] **Step 1 :** Écrire `tests/secondary-pages.spec.ts` :
  - `/autres-projets` : cinq projets dans l'ordre des données, chacun avec titre, phrase, technos ; lien GitHub présent seulement si `githubUrl` existe ;
  - `/parcours` : première ligne = Capgemini, marquée comme poste actuel ; lignes en ordre antichronologique ; trois lignes de technos ; portrait visible à 1440 px et absent du rendu à 390 px ; `alt` du portrait = « Portrait de Tom Lefevre-Bonzon ».
  → FAIL.
- [ ] **Step 2 :** Implémenter. Autres projets : grille deux colonnes (une sous 860 px), composition réduite par projet (titre au-dessus, aplat, capture qui dépasse) ; FairsonJob, sans capture, reçoit une composition typographique (« nouvelle mission → notification »). Parcours : titre géant, portrait détouré devant les dernières lettres, tableau à filets, poste actuel sur fond encre.
- [ ] **Step 3 :** → PASS. Commit.

### Task 9 : Largeurs intermédiaires, mouvement, accessibilité

**Files:**
- Create: `tests/layout.spec.ts`
- Modify: compositions des Tasks 6 à 8

- [ ] **Step 1 :** Écrire `tests/layout.spec.ts`, pour chaque route × largeurs `[390, 640, 700, 768, 860, 1000, 1024, 1180, 1440]` :
  - `document.documentElement.scrollWidth <= clientWidth` ;
  - toutes les `img` visibles ont `naturalWidth > 0` ;
  - pour chaque titre et paragraphe, le point central de sa boîte renvoie, via `elementFromPoint`, l'élément lui-même ou un descendant (rien ne le recouvre) ;
  - à 390 px, aucun texte courant sous 16 px ;
  - avec `reducedMotion: 'reduce'`, tous les `h1`, `h2`, `h3`, `p` ont une opacité de 1 sans défilement ;
  - parcours clavier : chaque lien reçoit un contour de focus visible.
  → FAIL attendu sur les largeurs intermédiaires.
- [ ] **Step 2 :** Concevoir la composition intermédiaire (640–1000 px) de chaque bloc : mêmes chevauchements, textes sortis des zones absolues. Corriger jusqu'à PASS.
- [ ] **Step 3 :** Mouvement : apparition au défilement en `opacity`/`transform` uniquement, état initial visible si `prefers-reduced-motion`, aucune animation en boucle.
- [ ] **Step 4 :** Produire les captures pleine page de chaque route à 390, 768, 1024, 1440 dans `.playwright-mcp/revue/` et les relire une par une contre la liste « Ce qui ferait de la refonte un échec » de la spec. Corriger. Commit.

### Task 10 : Finitions et passe de contenu

**Files:**
- Modify: `CLAUDE.md`, `docs/superpowers/plans/contenu-a-valider.md`

- [ ] **Step 1 :** Réécrire `CLAUDE.md` d'après la spec (positionnement, design, projets, règles) ; supprimer la mémoire `portfolio-refonte-2026-direction` devenue doublon.
- [ ] **Step 2 :** `grep -ri "chef de projet\|recherche alternance\|orange\|Clash Display\|Satoshi" src index.html` : seules occurrences admises = rôle « sous-chef de projet » dans CYNA.
- [ ] **Step 3 :** `npm run build`, `npm run lint`, `npm test`, `npm run test:e2e` → tout PASS.
- [ ] **Step 4 :** Présenter à Tom `contenu-a-valider.md` (placeholders et brouillons « Le plus dur », répartition des technos, rôle sur EcoPursue) et le site en local. Intégrer ses corrections.
- [ ] **Step 5 :** Quand plus aucun `{À COMPLÉTER}` n'est visible, proposer la fusion dans `main` ; ajouter le lien « Voir le site » de Vizly si `https://www.vizly.fr` répond 200.
