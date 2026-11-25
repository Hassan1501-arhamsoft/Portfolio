import profileImg from '../../../assets/images/profile-pic.webp';

export const HERO_DATA = {
  availability: 'Open to Full-Stack & AI Engineering Roles',
  eyebrow: 'Build · Innovate · Impact',
  name: 'Hassan Maqbool',
  role: 'Full-Stack MERN & AI Integration Engineer',
  summary:
    'I architect production web applications and retrieval-augmented AI systems—combining React, Node.js, and MongoDB Atlas Vector Search with hybrid RRF retrieval, cross-encoder re-ranking, and real-time WebSockets.',
  primaryCta: {
    label: 'Explore Projects',
    href: '#projects',
  },
  secondaryCta: {
    label: 'Contact Me',
    href: '#contact',
  },
  profileCard: {
    avatarUrl: profileImg,
    fileLabel: 'hassan.architecture.ts',
    location: 'Lahore, Pakistan',
    experience: '1+ Year Production Exp.',
    degree: 'BS Computer Science (3.73 CGPA)',
    pillars: [
      {
        title: 'AI & Retrieval Pipelines',
        detail: 'Hybrid Vector Search, RRF, Cross-Encoder Re-Ranking, SSE Streaming & ABAC',
      },
      {
        title: 'Full-Stack MERN Systems',
        detail: 'React, Node.js, Express, MongoDB, PostgreSQL & Automated API Testing',
      },
      {
        title: 'Real-Time & IoT Edge',
        detail: 'Socket.IO, WebRTC Peer Audio, Arduino & RFID Hardware Integrations',
      },
    ],
    coreStack: [
      'React.js',
      'Node.js',
      'MongoDB',
      'Vector Search',
      'LLM APIs',
      'Express',
      'Socket.IO',
      'Tailwind CSS',
    ],
  },
};