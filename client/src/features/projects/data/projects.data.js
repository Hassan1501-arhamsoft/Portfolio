export const PROJECT_CATEGORIES = [
  'All',
  'AI & RAG',
  'Full-Stack',
  'Real-Time & IoT',
];

export const PROJECTS_DATA = [
  {
    id: 'hybrid-rag-assistant',
    title: 'Enterprise Hybrid RAG Knowledge Assistant',
    category: 'AI & RAG',
    featured: true,
    summary:
      'Production retrieval-augmented generation platform built on the MERN stack with multi-stage retrieval, document-level authorization, and automated quality evaluation.',
    architecture: [
      'Combines MongoDB Atlas Vector Search with keyword retrieval via Reciprocal Rank Fusion (RRF) and cross-encoder re-ranking.',
      'Enforces input prompt guardrails, query transformation, and Attribute-Based Access Control (ABAC) before context injection.',
      'Streams token-level responses over Server-Sent Events (SSE) with automated conversation summarization and LLM-as-a-Judge scoring.',
    ],
    stack: [
      'React.js',
      'Node.js',
      'MongoDB Vector Search',
      'RRF & Re-Ranking',
      'SSE Streaming',
      'ABAC',
      'OpenAI / Gemini SDK',
    ],
    repoUrl: 'https://github.com/hassan427726',
    liveUrl: null,
  },
  {
    id: 'realtime-webrtc-chat',
    title: 'Real-Time Messaging & WebRTC Audio Platform',
    category: 'Real-Time & IoT',
    featured: true,
    summary:
      'Full-stack communication application supporting instant one-to-one and group messaging alongside peer-to-peer browser voice calls.',
    architecture: [
      'Engineered bi-directional event rooms, typing indicators, and delivery states with Socket.IO and JWT-authenticated handshakes.',
      'Implemented WebRTC signaling and peer-to-peer audio streams without third-party media relay dependencies.',
      'Built cursor-paginated infinite message scrolling backed by indexed MongoDB conversation schemas.',
    ],
    stack: [
      'React.js',
      'Node.js',
      'Express.js',
      'Socket.IO',
      'WebRTC',
      'MongoDB',
      'JWT',
    ],
    repoUrl: 'https://github.com/hassan427726',
    liveUrl: null,
  },
  {
    id: 'rfid-iot-attendance',
    title: 'RFID & Arduino Automated Attendance System',
    category: 'Real-Time & IoT',
    featured: false,
    summary:
      'Hardware-to-cloud attendance pipeline bridging physical RFID card scans on an Arduino microcontroller with a live MERN administrative dashboard.',
    architecture: [
      'Programmed Arduino Uno firmware to read RFID UIDs, display instant scan confirmation on an I2C LCD, and transmit serial payloads.',
      'Built an Express.js ingestion API to validate card signatures, prevent duplicate punch-ins, and log timestamps in MongoDB.',
      'Created a React dashboard for real-time attendance monitoring, student/staff card mapping, and log filtering.',
    ],
    stack: [
      'Arduino Uno',
      'RFID & I2C LCD',
      'Node.js',
      'Express.js',
      'MongoDB',
      'React.js',
    ],
    repoUrl: 'https://github.com/hassan427726',
    liveUrl: null,
  },
  {
    id: 'fragrance-ecommerce',
    title: 'E-Commerce Fragrance Storefront & COD Engine',
    category: 'Full-Stack',
    featured: false,
    summary:
      'Full-stack retail platform tailored for regional Cash-on-Delivery (COD) logistics, multi-attribute catalog filtering, and order lifecycle management.',
    architecture: [
      'Built multi-parameter product filtering across fragrance categories, brands, and price ranges with clean URL state.',
      'Designed an order fulfillment workflow supporting TCS and Leopard courier dispatch tracking and a 7-day unopened return policy.',
      'Documented and tested REST endpoints using Swagger and automated Jest/Supertest integration suites.',
    ],
    stack: [
      'React.js',
      'Redux Toolkit',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Tailwind CSS',
      'Jest & Swagger',
    ],
    repoUrl: 'https://github.com/hassan427726',
    liveUrl: null,
  },
  {
    id: 'supabase-task-manager',
    title: 'Cloud Workspace & Task Manager',
    category: 'Full-Stack',
    featured: false,
    summary:
      'Multi-user task tracking web application backed by PostgreSQL relational schemas, row-level security, and instant state synchronization.',
    architecture: [
      'Structured relational task boards and user workspaces on PostgreSQL via Supabase with strict Row-Level Security (RLS) policies.',
      'Implemented optimistic UI updates and status filtering in React.js and Tailwind CSS for zero-lag task transitions.',
    ],
    stack: [
      'React.js',
      'Tailwind CSS',
      'Supabase',
      'PostgreSQL',
      'REST APIs',
    ],
    repoUrl: 'https://github.com/hassan427726',
    liveUrl: null,
  },
];

// Named alias required by ProjectsSection.jsx
export const PROJECTS = PROJECTS_DATA;