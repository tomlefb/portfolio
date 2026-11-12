import type { Project } from '../../types';

export const tti: Project = {
  id: 'tti',
  title: 'TTI',
  tier: 'majeur',
  tagline:
    'Un laboratoire de recherche de stratégies de trading : formuler une idée, la tester, la réfuter, et comprendre le marché.',
  meta: 'Projet personnel de recherche, seul · depuis 2026',
  color: '#F2431D',
  onColor: '#0E0E0E',
  stack: [
    'Python 3.11',
    'pandas',
    'NumPy',
    'PyArrow',
    'pytest',
    'Databento',
    'Quantower',
    'API ProjectX',
    'C#',
    'Pine Script',
    'Telegram',
    'Claude Code',
  ],
  images: [],
  facts: [
    { label: 'Mon rôle', value: 'Conception, développement, direction de la recherche' },
    { label: 'Équipe', value: 'Seul, avec des agents IA' },
    { label: 'Période', value: 'Depuis avril 2026' },
    { label: 'Technos', value: 'Python, pandas, Databento, Quantower, pytest, Claude Code' },
  ],
  figures: [
    { value: '1 738', label: 'sprints de recherche' },
    { value: '147', label: 'rétractations' },
    { value: '6', label: 'familles au cimetière' },
    { value: '18', label: 'familles de stratégies explorées' },
  ],
  sections: [
    {
      title: 'La méthode',
      items: [
        {
          lead: 'Une idée par sprint',
          text: 'Chaque sprint teste une famille de stratégies et n’y change qu’une seule chose concrète.',
        },
        {
          lead: 'Trois lectures',
          text: 'Je lis les statistiques, les images des trades gagnants et perdants, puis le code, avant de choisir la modification suivante.',
        },
        {
          lead: 'Un entonnoir de portes',
          text: 'Cohérence, causalité, significativité, viabilité, processus. On vérifie qu’une stratégie n’utilise aucune information du futur avant de juger son résultat.',
        },
        {
          lead: 'Rien sans preuve',
          text: 'Tout chiffre cite un fichier témoin, et chaque sprint entre dans un journal que l’on ne peut qu’allonger, vérifié à chaque commit.',
        },
        {
          lead: 'Un cerveau, des mains',
          text: 'Un agent IA cadre l’hypothèse et audite ; d’autres, sans mémoire du contexte, lancent les calculs lourds.',
        },
      ],
    },
    {
      title: 'Comment c’est construit',
      body: 'La recherche et l’exécution sont séparées. Le laboratoire peut tout casser sans toucher au moteur d’exécution, du Python classique conçu pour passer ses ordres via Quantower, et via ProjectX pour Topstep. À ce jour, aucune stratégie n’a passé toutes les portes : le projet reste de la recherche.',
      diagram: 'tti-boucle',
    },
    {
      title: 'Ce qui n’a pas marché',
      body: 'Quatre familles de stratégies sont mortes sur le même mur : leur avantage reposait sur un prix d’exécution que le marché n’offrait pas réellement. Une stratégie prête à déployer a été réfutée quand je l’ai rejouée minute par minute : elle sortait parfois sur un prix antérieur à son entrée. Un audit interne a aussi montré que des centaines de sprints reposaient sur un outil de mesure mal calibré, et j’ai reconstruit l’infrastructure.',
    },
    {
      title: 'Le plus dur',
      body: 'Ne pas croire un bon résultat. Plusieurs pistes prometteuses venaient d’une erreur de mesure, pas du marché. J’ai appris à valider l’outil sur des réponses connues avant de mesurer quoi que ce soit, et à garder une mémoire fiable sur plus de 1 700 sprints.',
    },
  ],
};
