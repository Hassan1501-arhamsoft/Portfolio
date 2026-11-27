import profileImg from '../../../assets/images/profile-pic.webp';

export const HERO_DATA = {
  availability: 'Open to Full-Stack & AI Engineering Roles',
  eyebrow: 'Build · Innovate · Impact',
  name: 'Hassan Maqbool',
  role: 'Full-Stack MERN & AI Integration Engineer',
  summary:
    'I build full-stack web apps and grounded RAG pipelines that turn private company data into fast, reliable AI workflows.',
  primaryCta: {
    label: 'Explore Projects',
    href: '#projects',
  },
  secondaryCta: {
    label: 'Contact Me',
    href: '#contact',
  },
  credentials: [
    {
      id: 'experience',
      value: '1+ Year',
      label: 'Production Exp.',
    },
    {
      id: 'degree',
      value: '3.73 CGPA',
      label: 'BSCS Honours',
    },
  ],
  profileCard: {
    avatarUrl: profileImg,
    fileLabel: 'hassan.architecture.ts',
    location: 'Lahore, Pakistan',
    experience: '1+ Year Production Exp.',
    degree: 'BS Computer Science (3.73 CGPA)',
    pillars: [
      {
        title: 'AI & Retrieval Pipelines',
        detail:
          'Hybrid Vector Search, RRF, Cross-Encoder Re-Ranking, SSE Streaming & ABAC',
      },
      {
        title: 'Full-Stack MERN Systems',
        detail:
          'React, Node.js, Express, MongoDB, PostgreSQL & Automated API Testing',
      },
      {
        title: 'Real-Time & IoT Edge',
        detail:
          'Socket.IO, WebRTC Peer Audio, ESP32 / Arduino & MQTT Hardware Integrations',
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