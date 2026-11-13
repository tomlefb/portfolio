import type { Project } from '../../types';

export const tti: Project = {
  id: 'tti',
  title: 'TTI',
  tier: 'majeur',
  tagline:
    'Un laboratoire de recherche de stratégies de trading : j’en ai conçu la méthode et l’architecture, des agents IA écrivent le code et lancent les tests.',
  meta: 'Projet personnel de recherche · depuis 2026',
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
    { label: 'Mon rôle', value: 'Méthode de recherche, architecture, direction des agents IA' },
    { label: 'Équipe', value: 'Seul ; le code est écrit par des agents IA' },
    { label: 'Période', value: 'Depuis avril 2026' },
    { label: 'Technos', value: 'Python, pandas, Databento, Quantower, pytest, Claude Code' },
  ],
  figures: [
    { value: '1 738', label: 'stratégies testées sur l’historique' },
    { value: '18', label: 'pistes de recherche explorées' },
    { value: '147', label: 'résultats corrigés après vérification' },
    { value: '0', label: 'stratégie retenue à ce jour' },
  ],
  sections: [
    {
      title: 'La méthode',
      items: [
        {
          lead: 'Une hypothèse à la fois',
          text: 'Chaque série de tests porte sur une seule idée et n’en change qu’un paramètre, pour savoir ce qui fait vraiment la différence.',
        },
        {
          lead: 'Trois lectures',
          text: 'Les statistiques, puis les graphiques des trades gagnants et perdants, puis le code, avant de décider de la suite.',
        },
        {
          lead: 'Cinq contrôles successifs',
          text: 'Cohérence, aucune information du futur, significativité statistique, viabilité, processus : une stratégie doit tous les passer.',
        },
        {
          lead: 'Rien sans preuve',
          text: 'Chaque chiffre renvoie à un fichier de résultats, et chaque test est consigné dans un journal qu’on ne peut pas réécrire, vérifié à chaque commit.',
        },
        {
          lead: 'Des agents IA comme équipe',
          text: 'J’ai défini leurs rôles : un agent cadre l’hypothèse et vérifie les résultats, d’autres écrivent le code et lancent les calculs. Mon travail, c’est la méthode, l’architecture et les décisions.',
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
      body: 'Quatre pistes sont mortes sur le même mur : leur avantage reposait sur un prix d’exécution que le marché n’offrait pas réellement. Une stratégie prête à déployer a été réfutée quand je l’ai rejouée minute par minute : elle sortait parfois sur un prix antérieur à son entrée. Un audit interne a aussi montré que des centaines de tests reposaient sur un outil de mesure mal calibré, et j’ai reconstruit l’infrastructure.',
    },
    {
      title: 'Le plus dur',
      body: 'Ne pas croire un bon résultat. Plusieurs pistes prometteuses venaient d’une erreur de mesure, pas du marché. J’ai appris à valider l’outil sur des réponses connues avant de mesurer quoi que ce soit, et à garder une mémoire fiable sur plus de 1 700 tests.',
    },
  ],
};
