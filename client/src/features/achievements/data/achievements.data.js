import pmLaptopAwardImg from '../../../assets/images/award.webp';
import ciscoAiCertImg from '../../../assets/images/certificate.webp';

export const ACHIEVEMENT_CATEGORIES = [
  'All',
  'Awards & Honors',
  'Certifications',
];

export const ACHIEVEMENTS_DATA = [
  {
    id: 'pm-youth-laptop-award',
    title: "Prime Minister's Youth Laptop Scheme Award",
    category: 'Awards & Honors',
    issuer: 'Higher Education Commission (HEC) · Government of Pakistan',
    date: '2026',
    featured: true,
    image: pmLaptopAwardImg,
    credentialUrl: null,
    summary:
      'National merit-based hardware award recognizing top undergraduate Computer Science standing (3.73 / 4.00 CGPA) at The Islamia University of Bahawalpur.',
    highlights: [
      'Selected on strict national academic merit criteria among high-performing undergraduate Computer Science candidates.',
      'Recognized for sustained academic excellence (3.73 / 4.00 CGPA) across core software engineering, algorithms, and systems coursework.',
    ],
    skills: [
      '3.73 / 4.00 CGPA',
      'National Merit Selection',
      'Software Engineering',
      'Algorithms & Systems',
      'HEC Pakistan',
    ],
  },
  {
    id: 'cisco-ai-fundamentals',
    title: 'AI Fundamentals: Foundations for Understanding AI',
    category: 'Certifications',
    issuer: 'Cisco Networking Academy (Cisco International)',
    date: '2026',
    featured: true,
    image: ciscoAiCertImg,
    credentialUrl: null, // Add your Credly / Cisco verification URL here when available
    summary:
      'International Cisco certification covering machine learning pipelines, neural networks, natural language processing, computer vision, and ethical AI guardrails.',
    highlights: [
      'Mastered core machine learning paradigms including supervised, unsupervised, and reinforcement learning pipelines.',
      'Studied neural network foundations, natural language processing (NLP), and real-world enterprise AI deployment patterns.',
      'Applied ethical AI governance, bias mitigation, and data-privacy principles directly into production RAG guardrail architectures.',
    ],
    skills: [
      'Artificial Intelligence',
      'Machine Learning',
      'Neural Networks',
      'NLP & LLMs',
      'AI Ethics & Guardrails',
      'Cisco Certified',
    ],
  },
];