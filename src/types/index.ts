export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  role: string;
  context: string;
  stack: string[];
  highlights: string[];
  githubUrl?: string;
  liveUrl?: string;
  images: string[];
  featured: boolean;
  category: 'professional' | 'personal' | 'academic';
  team?: TeamMember[];
  methodology?: string;
  hasRiskManagement?: boolean;
}

export interface TeamMember {
  name: string;
  role: string;
  isMe?: boolean;
}

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  organization: string;
  location?: string;
  description: string;
  type: 'education' | 'work' | 'objective';
}

export interface Skill {
  name: string;
  category: 'management' | 'technical';
  subcategory?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
}
