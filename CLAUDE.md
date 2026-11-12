# CLAUDE.md — Portfolio de Tom Lefevre-Bonzon

## Le projet

Site personnel de **Tom Lefevre-Bonzon**, développeur à Rennes, alternant chez Capgemini et en Mastère Développement Full Stack à Sup de Vinci.

Ce n'est pas une candidature : Tom ne cherche ni alternance ni emploi pour l'instant. Le site est une carte de visite. Un visiteur doit repartir en se disant « il sait construire des choses, je le garde sous le coude » ou « il peut m'apporter quelque chose, je lui écris ». La preuve passe par les projets.

La conception complète est dans `docs/superpowers/specs/2026-11-12-refonte-portfolio-design.md`. En cas de doute, ce document fait foi.

## Pile technique

React 18, TypeScript strict, Vite, Tailwind 3, `react-router-dom` 6, Framer Motion (usage minimal). Tests : Vitest (contenu) et Playwright (pages et mise en page). Déploiement Vercel (`vercel.json` réécrit toutes les routes vers `index.html`).

```
src/
├── pages/            # HomePage, ProjectPage, OtherProjectsPage, ParcoursPage, NotFoundPage, BricksPage
├── components/
│   ├── layout/       # PageShell, SiteNav, ContactFooter, ScrollManager
│   ├── home/         # Hero, SpreadVizly, SpreadTti, SpreadCyna, OthersTeaser
│   ├── project/      # en-tête, faits, bande d'images, chiffres, sections, projet mineur
│   ├── parcours/     # en-tête au portrait, tableau, lignes de technos
│   ├── diagrams/     # kit SVG + un schéma par projet majeur
│   └── ui/           # BigTitle, PhoneFrame, Shot, ColorBlock, MediaImage
├── data/             # site, contact, parcours, projects/{vizly,tti,cyna,minors}
├── styles/           # globals, compositions, home, project, secondary, diagrams
└── types/
tests/                # Playwright
scripts/              # prepare-images.mjs (conversion WebP), capture.mjs (captures de relecture)
```

Commandes : `npm run dev`, `npm run build`, `npm run lint`, `npm test`, `npm run test:e2e` (sur `vite preview`, port 4173).

## Pages

| Route | Contenu |
|---|---|
| `/` | Nom en très grand, présentation, les trois projets majeurs, renvoi vers les autres |
| `/projets/:id` | Une page par projet majeur : `vizly`, `tti`, `cyna` |
| `/autres-projets` | NutriAI, IALocal, Gestion des stages, EcoPursue |
| `/parcours` | Portrait, expériences et formation, technos |
| `/__bricks` | Page de contrôle des briques visuelles et des schémas, non liée |

Le contact n'est pas une page : c'est le bloc noir « Écrivez-moi » en pied de chaque page.

## Design : style « affiche »

- **Couleurs** : fond gris froid `#E7E8E9`, encre `#0E0E0E`. Pas de couleur d'accent globale. Chaque projet porte la sienne (`color` / `onColor` dans ses données), tirée de ses propres écrans.
- **Typographie** : Archivo variable, seule police. Titres en graisse 900, largeur 68 %, capitales, interlignage 0.82 (classe `.title-xl`).
- **Traits** : filets noirs de 3 px entre grandes zones, 1 px entre lignes. Aucun arrondi sauf les cadres de téléphone, aucune ombre sauf sous les téléphones, aucun dégradé.
- **Imbrication** : titres, aplats de couleur et captures se chevauchent. Les compositions se règlent en unités `cqw` (le conteneur `.shell` a `container-type: inline-size`). Un chevauchement peut mordre une lettre, jamais rendre un mot illisible.
- **Schémas** : SVG dans le langage du site (traits 2 px, angles droits, liaisons orthogonales, un seul élément en couleur par schéma), avec une composition large et une composition étroite.
- **Photo** : portrait détouré, couleurs naturelles, sans filtre, uniquement sur Parcours et masqué sur mobile.
- **Grands écrans** : jusqu'à 1920 px le contenu suit la largeur de l'écran. De 1920 à 3840 px, la page entière grossit en proportion (propriété `zoom` pilotée par un petit script dans `index.html`), donc la mise en page est identique à celle d'un écran 1920 px, navigation et textes compris. Au-delà, elle reste centrée et les filets, aplats et pied de page filent jusqu'aux bords (`src/styles/wide.css`). Jamais de colonne encadrée flottant au milieu de l'écran.
- **Mouvement** : sobre. Le contenu doit rester visible sans animation, et `prefers-reduced-motion` est respecté.

### À ne jamais faire

- Cartes arrondies identiques, pastilles ou badges, dégradés, icônes décoratives, numérotation 01/02, petits labels en majuscules espacées, formules à effet dans les textes. Tom appelle ça « IA slop ».
- Orange signature, bleu électrique « tech », mode sombre.
- Filtre, trame ou effet sur la photo de Tom.
- Bibliothèques de composants (MUI, Chakra…).

## Contenu

- Tout le contenu vit dans `src/data/`. Rien en dur dans les composants.
- N'écrire que ce qui est attesté par les dépôts et documents de Tom. Sinon `{À COMPLÉTER}`, à lister dans `docs/superpowers/plans/contenu-a-valider.md`.
- Ton : phrases simples, première personne, sans superlatifs.
- **TTI** : projet de recherche, qui ne tourne pas en production (aucune stratégie retenue à ce jour). Jamais de montant, de rendement ni de pourcentage de performance. L'angle est la recherche et l'apprentissage. Pas de capture de code ni du journal de trading.
- **CYNA** : projet terminé, soutenu en mai 2026 ; textes au passé.
- Le projet Ouest-France n'apparaît que dans le parcours.
- FairsonJob Notifier n'est pas montré (choix de Tom).
- Ne pas mentionner l'usage de Claude Code sur Vizly.

Sources des projets sur la machine de Tom : Vizly `~/IdeaProjects/appPortfolio`, TTI `~/IdeaProjects/tti`, CYNA `~/Documents/projetsCours/Cyna`, EcoPursue `~/IdeaProjects/projethackaton`.

## Règles de code

- TypeScript strict, pas de `any`. Composants fonctionnels, un par fichier, props typées par `interface`.
- Images en WebP, noms sans espaces ni accents, `alt` descriptif, chargement différé sauf la première visible. Une image qui ne charge pas affiche son texte de remplacement dans son cadre.
- Mobile : marges de 16 px, pas de défilement horizontal, texte courant d'au moins 16 px.
- Toute modification de mise en page doit laisser `tests/layout.spec.ts` au vert (neuf largeurs de 390 à 1440 px).

## Contact (valeurs dans `src/data/contact.ts`)

tom.lefevrebonzon@gmail.com · 06 50 33 60 95 · Rennes · [LinkedIn](https://www.linkedin.com/in/tom-lefevre-bonzon-0800883a9/) · [GitHub](https://github.com/tomlefb)
