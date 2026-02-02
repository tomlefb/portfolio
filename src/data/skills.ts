import { Skill } from '../types';

export const managementSkills: Skill[] = [
  { name: 'Méthodes Agiles (Scrum, Kanban)', category: 'management', subcategory: 'Méthodologie' },
  { name: 'Coordination d\'équipe', category: 'management', subcategory: 'Leadership' },
  { name: 'Chiffrage et estimation', category: 'management', subcategory: 'Planification' },
  { name: 'Relation client', category: 'management', subcategory: 'Communication' },
  { name: 'Suivi de production', category: 'management', subcategory: 'Delivery' },
  { name: 'Dossier de cadrage', category: 'management', subcategory: 'Documentation' },
  { name: 'RACI', category: 'management', subcategory: 'Gouvernance' },
  { name: 'Gestion des risques', category: 'management', subcategory: 'Planification' },
];

export const technicalSkills: Skill[] = [
  { name: 'Java', category: 'technical', subcategory: 'Langages' },
  { name: 'C#', category: 'technical', subcategory: 'Langages' },
  { name: 'PHP', category: 'technical', subcategory: 'Langages' },
  { name: 'Python', category: 'technical', subcategory: 'Langages' },
  { name: 'JavaScript', category: 'technical', subcategory: 'Langages' },
  { name: 'TypeScript', category: 'technical', subcategory: 'Langages' },
  { name: 'React', category: 'technical', subcategory: 'Frontend' },
  { name: 'Angular', category: 'technical', subcategory: 'Frontend' },
  { name: 'Ionic', category: 'technical', subcategory: 'Frontend' },
  { name: 'NestJS', category: 'technical', subcategory: 'Backend' },
  { name: 'Node.js', category: 'technical', subcategory: 'Backend' },
  { name: 'Express', category: 'technical', subcategory: 'Backend' },
  { name: 'PostgreSQL', category: 'technical', subcategory: 'BDD' },
  { name: 'MySQL', category: 'technical', subcategory: 'BDD' },
  { name: 'MongoDB', category: 'technical', subcategory: 'BDD' },
  { name: 'Redis', category: 'technical', subcategory: 'BDD' },
  { name: 'Git', category: 'technical', subcategory: 'DevOps' },
  { name: 'Docker', category: 'technical', subcategory: 'DevOps' },
  { name: 'GitHub Actions', category: 'technical', subcategory: 'DevOps' },
  { name: 'Railway', category: 'technical', subcategory: 'DevOps' },
  { name: 'Figma', category: 'technical', subcategory: 'Design' },
  { name: 'JWT', category: 'technical', subcategory: 'Sécurité' },
  { name: 'bcrypt', category: 'technical', subcategory: 'Sécurité' },
  { name: '2FA', category: 'technical', subcategory: 'Sécurité' },
  { name: 'Stripe', category: 'technical', subcategory: 'Paiement' },
];

export const tools: string[] = [
  'ClickUp',
  'Jira',
  'Notion',
  'VS Code',
  'IntelliJ IDEA',
  'Postman',
];
