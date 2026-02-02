import { ContactInfo, SocialLink } from '../types';

export const contactInfo: ContactInfo = {
  email: 'tom.lefevrebonzon@gmail.com',
  phone: '06 50 33 60 95',
  location: 'Rennes, France',
  linkedin: 'https://www.linkedin.com/in/tom-lefevre-bonzon-0800883a9/',
  github: 'https://github.com/tomlefb',
};

export const socialLinks: SocialLink[] = [
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/tom-lefevre-bonzon-0800883a9/',
    icon: 'linkedin',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/tomlefb',
    icon: 'github',
  },
  {
    name: 'Email',
    url: 'mailto:tom.lefevrebonzon@gmail.com',
    icon: 'mail',
  },
];
