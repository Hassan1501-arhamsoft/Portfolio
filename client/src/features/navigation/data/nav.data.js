import profilePic from '../../../assets/images/profile-pic.webp';
import resumePdf from '../../../assets/HassanResume.pdf';

export const BRAND = {
  monogram: 'HM',
  name: 'Hassan Maqbool',
  tagline: 'MERN & AI Engineer',
  avatarUrl: profilePic,
};

export const NAV_ITEMS = [
  { id: 'hero', label: 'Home', href: '#hero' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'services', label: 'Services', href: '#services' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'achievements', label: 'Achievements', href: '#achievements' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const RESUME_URL = resumePdf;

export const SOCIAL_LINKS = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/hassan42772',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/hassan-maqbool-dev',
  },
];