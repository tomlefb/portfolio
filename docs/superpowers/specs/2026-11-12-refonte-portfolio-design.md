# Refonte du portfolio — document de conception

Date : 2026-11-12. Statut : en attente de validation par Tom.

Les mentions « (choix Claude) » sont des décisions prises sans que Tom les ait
explicitement validées ; tout le reste vient de la conversation avec lui.

## 1. Pourquoi

Le site actuel a deux défauts :

- **Il est périmé.** Il présente Tom comme « alternant chef de projet IT en
  recherche d'alternance pour septembre 2026 ». Tom est aujourd'hui développeur,
  en mastère développement à Sup de Vinci et en alternance chez Capgemini. Il ne
  cherche rien. La gestion de projet est une idée de carrière lointaine, plus
  l'axe du site.
- **Il a l'air générique.** Tom le décrit comme « IA slop, pas original, moche,
  mal pensé web et mobile » : cartes arrondies uniformes, pastilles, dégradé
  orange, mur de tags, 13 écrans de cartes empilées sur mobile.

## 2. À quoi sert le nouveau site

Une carte de visite, pas une candidature. Le visiteur (recruteur, lead tech,
personne croisée sur LinkedIn) doit repartir avec l'une de ces deux pensées :

- « Il sait construire des choses, bon profil, je le garde et je le recontacte
  pour un CDI plus tard. »
- « Il peut m'apporter quelque chose, je lui écris. »

La preuve passe par les projets. Ils portent le site ; le parcours et les
compétences sont secondaires.

### Objectifs

- Positionnement à jour partout (pages, balises meta, `CLAUDE.md`).
- Un design que Tom reconnaît comme le sien : style « affiche », un peu
  brutaliste, un peu bento, avec images, aplats et titres imbriqués.
- Des projets présentés en profondeur, avec la matière réelle trouvée sur sa
  machine.
- Une version mobile pensée pour elle-même, pas un empilement.

### Hors périmètre

- Remise en ligne de Vizly (chantier séparé : base Supabase à relancer,
  transfert du projet Railway vers l'espace de Tom).
- Refonte du CV PDF (Tom le refera).
- Formulaire de contact, blog, i18n, mode sombre.

### Ce qui ferait de la refonte un échec

- Qu'on puisse encore dire « ça sent le template » : cartes arrondies
  identiques, pastilles/badges, dégradés, icônes décoratives, numérotation
  01/02, micro-labels en majuscules espacées, formules à effet dans les textes.
- Du texte illisible parce qu'une image le recouvre, à n'importe quelle largeur.
- Du contenu inventé sur les projets.
- Un filtre ou une trame sur la photo de Tom (il a trouvé ça « immonde »).

## 3. Contenu

### Identité

- Tom Lefevre-Bonzon, développeur, Rennes.
- Alternant développeur chez Capgemini (Cesson-Sévigné) depuis septembre 2025 :
  migration d'un logiciel Java pour un client grand compte, participation au
  chiffrage et au suivi des mises en production.
- Mastère Développement Full Stack, Sup de Vinci Rennes, en alternance
  (intitulé relevé sur les annuaires de formations ; l'année en cours n'est pas
  affichée sur le site).
- Langues : français, anglais C1 (TOEIC 950), espagnol A2.
- Contact : e-mail, LinkedIn, GitHub, téléphone (valeurs dans `src/data/contact.ts`).

### Projets

Trois projets majeurs, dans cet ordre :

1. **Vizly** (vedette). SaaS de création de portfolios, construit seul :
   formulaire guidé, choix d'un template, site publié sur `pseudo.vizly.fr`.
   Next.js 15, Supabase, Stripe (abonnements et achats ponctuels), Resend,
   Railway. Source : `~/IdeaProjects/appPortfolio` (dépôt `tomlefb/vizly`,
   400 commits, 152 captures à la racine, `CLAUDE.md` décrivant stack et design
   system). Pas de lien « voir le site » tant que Vizly n'est pas en ligne.
2. **TTI — système de trading.** Projet de recherche de stratégies de trading en Python,
   fruit de milliers d'heures. Il ne tourne pas en production : aucune
   stratégie n'a été retenue à ce jour. Source : `~/IdeaProjects/tti`
   (4 181 commits), kit public dérivé `tomlefb/archi-autonomous-prop-research`.
   Tom autorise à tout dire **sauf les rendements et montants**. L'angle voulu
   est la recherche et l'apprentissage : comment on cherche une stratégie,
   comment on la valide, ce qui a échoué, comment le système est construit et
   exploité. Pas de capture de code. Pas de capture du journal de trading dans
   cette version (choix Claude) : il ne contient que des données réelles. La
   page est illustrée par des schémas.
3. **CYNA.** Projet terminé : la soutenance orale a eu lieu et s'est bien
   passée ; les textes sont au passé. Contenu actuel de `CLAUDE.md` conservé, enrichi des vrais schémas
   de `~/Documents/projetsCours/Cyna` (architecture, MCD, pipeline CI/CD, états
   de commande) et des captures déjà dans `public/images/projects/cyna/`.

Projets mineurs : pas de page dédiée chacun, mais **une page commune « Autres
projets »** qui les rassemble (demande de Tom). Chacun y a une composition, un
court texte, ses technos et un lien GitHub s'il existe.

- **NutriAI** : conservé à la demande de Tom, contenu et captures actuels.
- **IALocal** et **Gestion des stages** : contenu actuel.
- **EcoPursue** (hackathon 2026) : tableau de bord d'empreinte carbone des
  bâtiments, en équipe ; Angular 19, Spring Boot, React Native. Source :
  `~/IdeaProjects/projethackaton` (captures dans `slides-assets/`). D'après
  l'historique git, Tom a fait l'essentiel du front web ; rôle exact à
  confirmer.
- FairsonJob Notifier : retiré à la demande de Tom.

L'ancienne fiche « Algo Trading » disparaît, remplacée par TTI.

Règle de contenu : uniquement ce qui est attesté par les dépôts, leurs README
et les documents de Tom. Ce qui manque s'écrit `{À COMPLÉTER}` et se liste dans
le compte rendu final. Les blocs subjectifs (« Le plus dur ») sont rédigés en
brouillon à partir des documents, puis relus et corrigés par Tom : aucun ne
part en ligne sans sa relecture. Ton des textes : phrases simples à la première personne,
sans superlatifs.

## 4. Structure du site

Site multipage avec `react-router` (choix Claude ; Tom a autorisé des pages
séparées). Prévoir la réécriture SPA côté Vercel.

| Route | Contenu |
|---|---|
| `/` | Haut de page, les trois projets majeurs, un renvoi vers « Autres projets » |
| `/projets/:id` | Une page par projet majeur |
| `/autres-projets` | Les projets mineurs réunis sur une page |
| `/parcours` | Présentation courte, expériences et formation, technos |

- **Navigation** : mention à gauche (« Développeur, Rennes » sur l'accueil, le
  nom de Tom ailleurs), liens Projets / Parcours / Contact à droite. Sur mobile
  les trois liens restent visibles, pas de menu hamburger (choix Claude).
- **Contact** : pas de page. Un bloc « Écrivez-moi » en pied de chaque page,
  avec e-mail, LinkedIn, GitHub, téléphone. Le lien « Contact » y fait défiler.
- **CV** : le lien de téléchargement est conservé (demande de Tom, qui mettra
  le PDF à jour plus tard), dans la navigation et dans le bloc de contact.

### Accueil

- Nom en très grand sur deux lignes. Dans le vide à droite de « TOM » : deux
  phrases de présentation et deux faits (poste, études). Un téléphone montrant
  un écran de Vizly chevauche le bas du haut de page et déborde sur la section
  suivante.
- Chaque projet majeur a sa propre composition, cliquable en entier : titre
  géant à cheval sur un aplat de la couleur du projet, captures qui dépassent
  du bord ou se superposent, court texte, « Voir le projet ». TTI n'a pas de
  capture d'application : sa composition est typographique (les étapes du
  système dans l'aplat).
- Après les trois majeurs, un bloc qui annonce les autres projets (leurs noms,
  une ou deux images) et mène à la page « Autres projets ». Sur cette page :
  grille en deux colonnes, même vocabulaire en plus petit.

### Page projet

Retour « Tous les projets », titre géant, phrase d'accroche, quatre cases de
faits (rôle, équipe, période, technos), bande d'images, puis des blocs titre à
gauche / texte à droite : « Ce que j'ai fait », « Le plus dur », et pour CYNA
« L'organisation » (sous-chef de projet, cadrage, RACI). Schémas d'architecture
en SVG pour CYNA et TTI. Bandeau « Projet suivant » en bas, à la couleur du
projet suivant.

### Parcours

Titre géant avec le portrait détouré de Tom qui passe devant les dernières
lettres (desktop). Tableau daté du plus récent au plus ancien, poste actuel
surligné en noir. Technos en trois lignes de texte (« au quotidien »,
« régulièrement », « déjà utilisé »), pas de tags ; la répartition est à
valider par Tom. Sur mobile, le portrait n'est pas affiché (choix Claude ; Tom
a dit « peut-être », à trancher sur pièce).

## 5. Design

La maquette de référence est
`.superpowers/brainstorm/29168-1794488004/content/affiche-v4.html` (accueil et
parcours) ; `affiche-v2.html` montre la structure de la page projet. Elles
fixent l'intention, pas le pixel.

- **Couleurs** : fond gris froid `#E7E8E9`, encre `#0E0E0E`. Pas de couleur
  d'accent globale. Chaque projet a la sienne, tirée de ses propres écrans
  (exemples de la maquette : violet CYNA `#6A4DFF`, jaune `#FFC400`) ; celle de
  Vizly est à prendre dans son design system. La couleur apparaît dans l'aplat
  du projet, sur sa page et dans le bandeau « projet suivant ».
- **Typographie** : Archivo variable (axe largeur 62–125, graisses 400–900).
  Titres en graisse 900, largeur ~68 %, capitales, interlignage serré. Texte
  courant en largeur normale. Plus de Clash Display ni de Satoshi.
- **Traits** : filets noirs de 3 px entre les grandes zones, 1 px entre les
  lignes. Aucun arrondi, sauf les cadres de téléphone. Aucune ombre, sauf sous
  les téléphones. Aucun dégradé.
- **Imbrication** : c'est le principe central. Titres, aplats et images se
  chevauchent ; rien n'est « un élément puis l'autre ». Règle absolue : un
  chevauchement peut mordre une lettre, jamais rendre un mot illisible.
- **Schémas et illustrations** : exigence forte de Tom. Les schémas
  d'architecture (CYNA, TTI, Vizly) sont redessinés en SVG dans le langage du
  site (mêmes filets, même typographie, couleur du projet), pas des exports
  collés tels quels. Chaque capture est choisie, recadrée et placée dans une
  composition ; aucune image posée par défaut dans un rectangle.
- **Photo** : couleurs naturelles, détourée, sans filtre. Uniquement sur
  Parcours.
- **Mouvement** : sobre. Remplissage de couleur au survol des projets,
  apparition simple au défilement. Le contenu doit être visible sans
  JavaScript d'animation et `prefers-reduced-motion` respecté.
- **Largeurs** : trois compositions pensées séparément : mobile (jusqu'à
  ~640 px), intermédiaire (tablette), large. La maquette ne traite pas
  l'intermédiaire et y casse ; c'est à concevoir. Mobile : marges de 16 px, pas
  de défilement horizontal, textes courants à 16 px minimum.

## 6. Technique

- Pile conservée : React 18, TypeScript strict, Vite, Tailwind 3, Framer
  Motion, Lucide (usage réduit). Ajout : `react-router-dom`.
- Données centralisées dans `src/data/`. Le type `Project` gagne : couleur et
  couleur de texte associée, niveau (`majeur` / `mineur`), faits, sections de
  page. Rien en dur dans les composants.
- Images : copier dans `public/images/projects/<id>/` une sélection de
  captures (Vizly, CYNA, journal de trading), noms sans espaces ni accents,
  converties en WebP, `loading="lazy"`, `alt` descriptifs. Portrait détouré en
  WebP avec transparence (un détourage automatique existe déjà :
  `.superpowers/brainstorm/29168-1794488004/content/tom-cut.png`, à refaire en
  pleine résolution).
- Anciennes sections (Hero, About, Skills, Timeline, Contact) et styles orange
  supprimés une fois remplacés.
- `index.html` : titre, description et Open Graph mis à jour.
- `CLAUDE.md` réécrit pour refléter ce document (positionnement, design,
  projets, règles).
- Ménage du dépôt : ajouter un `.gitignore` (`node_modules`, `dist`,
  `.superpowers`, `.playwright-mcp`) et sortir `node_modules` du suivi git.
  Cette dernière opération se fait dans un commit séparé, après accord de Tom.

## 7. Déroulement

Tout le travail se fait sur une branche dédiée (choix Claude), `main` étant
probablement déployée automatiquement. La fusion n'a lieu qu'après une passe de
contenu avec Tom : plus aucun `{À COMPLÉTER}` visible sur le site.

## 8. Vérification

- `npm run build` et `npm run lint` sans erreur.
- Captures Playwright de chaque page à 390, 768, 1024 et 1440 px : aucun mot
  masqué, aucun débordement horizontal.
- Navigation complète au clavier, focus visible.
- Recherche dans le code et les textes : plus aucune occurrence de
  « recherche d'alternance », « Chef de Projet » comme titre, ni d'orange hérité.

## 9. Laissé au développeur

Découpage des composants, mécanique CSS des chevauchements, choix précis des
captures et de leurs cadrages, couleur de chaque projet mineur, composition de
la largeur intermédiaire, micro-interactions.
