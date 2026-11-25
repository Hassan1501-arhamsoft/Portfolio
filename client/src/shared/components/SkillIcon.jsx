import {
  Bluetooth,
  Bot,
  Brain,
  CheckCircle2,
  Cloud,
  Code2,
  Cpu,
  Database,
  Gauge,
  GitBranch,
  Globe,
  Layers,
  Palette,
  Radio,
  Search,
  Server,
  ShieldCheck,
  Sliders,
  Sparkles,
  Terminal,
  Wifi,
  Workflow,
  Zap,
} from 'lucide-react';

/**
 * Resolves any skill label (or explicit icon key) to a crisp 14px SVG / Lucide icon.
 */
export function SkillIcon({ name = '', iconKey = '', className = 'w-3.5 h-3.5' }) {
  const token = `${iconKey} ${name}`.toLowerCase();

  // Flagship Custom Brand Marks (zero external dependency)
  if (/\breact\b/.test(token)) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <circle cx="12" cy="12" r="2.1" fill="currentColor" />
        <ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="currentColor" strokeWidth="1.6" />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="4.2"
          transform="rotate(60 12 12)"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <ellipse
          cx="12"
          cy="12"
          rx="10"
          ry="4.2"
          transform="rotate(120 12 12)"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    );
  }

  if (/\bnode(\.js)?\b/.test(token)) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <polygon
          points="12,2 21,7 21,17 12,22 3,17 3,7"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="M9.5 14.5V9.5L14.5 14.5V9.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  if (/\bmongo(db)?\b/.test(token)) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
          d="M12 2.5C12 2.5 7 7.8 7 13.2C7 16.9 9.5 19.4 12 20.5C14.5 19.4 17 16.9 17 13.2C17 7.8 12 2.5 12 2.5Z"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path d="M12 8V22" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }

  if (/\b(javascript|js|es6)\b/.test(token)) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.7" />
        <path
          d="M10 10V15.2C10 16.2 9.3 16.8 8.3 16.8C7.6 16.8 7.1 16.4 6.8 15.9M16.8 11.2C16.4 10.4 15.6 10 14.7 10C13.6 10 12.9 10.6 12.9 11.5C12.9 12.4 13.6 12.8 14.8 13.2C16 13.6 16.9 14 16.9 15.1C16.9 16.1 16 16.8 14.7 16.8C13.6 16.8 12.8 16.3 12.4 15.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // AI, RAG & LLM Pipelines
  if (/\b(rag|llm|openai|gemini|ai|bot|agent|langchain|langgraph)\b/.test(token)) {
    return <Brain className={className} aria-hidden="true" />;
  }
  if (/\b(vector|search|rrf|re-rank|rerank|query|embedding)\b/.test(token)) {
    return <Search className={className} aria-hidden="true" />;
  }
  if (/\b(prompt|moderation|guardrail)\b/.test(token)) {
    return <Bot className={className} aria-hidden="true" />;
  }

  // Security & Auth
  if (/\b(jwt|abac|auth|security|cookie|acl|cerbos)\b/.test(token)) {
    return <ShieldCheck className={className} aria-hidden="true" />;
  }

  // Real-Time & Streaming
  if (/\b(sse|stream|socket|webrtc|real-?time)\b/.test(token)) {
    return <Radio className={className} aria-hidden="true" />;
  }

  // IoT, Embedded & Hardware
  if (/\b(esp32|arduino|microcontroller|embedded|hardware|chip)\b/.test(token)) {
    return <Cpu className={className} aria-hidden="true" />;
  }
  if (/\b(mqtt|wifi|wireless)\b/.test(token)) {
    return <Wifi className={className} aria-hidden="true" />;
  }
  if (/\b(bluetooth|hc-05)\b/.test(token)) {
    return <Bluetooth className={className} aria-hidden="true" />;
  }
  if (/\b(sensor|ultrasonic|dht|mq-7|ir|rfid|telemetry)\b/.test(token)) {
    return <Gauge className={className} aria-hidden="true" />;
  }
  if (/\b(relay|motor|servo|pwm|actuator|power)\b/.test(token)) {
    return <Zap className={className} aria-hidden="true" />;
  }
  if (/\b(i2c|uart|spi|gpio|lcd)\b/.test(token)) {
    return <Sliders className={className} aria-hidden="true" />;
  }

  // Databases & Backend
  if (/\b(sql|mysql|postgres|supabase|database|schema|mongoose|sequelize)\b/.test(token)) {
    return <Database className={className} aria-hidden="true" />;
  }
  if (/\b(express|api|rest|server|backend)\b/.test(token)) {
    return <Server className={className} aria-hidden="true" />;
  }

  // Frontend, Styling & State
  if (/\b(tailwind|css|ui|design|html)\b/.test(token)) {
    return <Palette className={className} aria-hidden="true" />;
  }
  if (/\b(redux|context|state|router|architecture)\b/.test(token)) {
    return <Layers className={className} aria-hidden="true" />;
  }

  // Testing, DevOps & Tooling
  if (/\b(jest|supertest|test|swagger|eval)\b/.test(token)) {
    return <CheckCircle2 className={className} aria-hidden="true" />;
  }
  if (/\b(git|github)\b/.test(token)) {
    return <GitBranch className={className} aria-hidden="true" />;
  }
  if (/\b(vercel|netlify|railway|cloud|deploy)\b/.test(token)) {
    return <Cloud className={className} aria-hidden="true" />;
  }
  if (/\b(linux|powershell|bash|cli|terminal)\b/.test(token)) {
    return <Terminal className={className} aria-hidden="true" />;
  }
  if (/\b(c\+\+|c\b|python|typescript|code)\b/.test(token)) {
    return <Code2 className={className} aria-hidden="true" />;
  }
  if (/\b(pipeline|workflow|orchestrat)\b/.test(token)) {
    return <Workflow className={className} aria-hidden="true" />;
  }
  if (/\b(web|http|browser)\b/.test(token)) {
    return <Globe className={className} aria-hidden="true" />;
  }

  return <Sparkles className={className} aria-hidden="true" />;
}