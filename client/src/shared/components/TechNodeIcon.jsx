import {
  BellRing,
  BrainCircuit,
  CircuitBoard,
  Cloud,
  Code2,
  Cog,
  Cpu,
  Database,
  FlaskConical,
  Gauge,
  Layers,
  Lightbulb,
  Radio,
  Server,
  ShieldCheck,
  Sparkles,
  Terminal,
  Workflow,
} from 'lucide-react';

export function TechNodeIcon({ label = '', className = 'w-3.5 h-3.5 shrink-0' }) {
  const key = label.toLowerCase();

  // React / R3F
  if (key.includes('react')) {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        className={className}
      >
        <circle cx="12" cy="12" r="2.1" fill="currentColor" stroke="none" />
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      </svg>
    );
  }

  // Node.js
  if (key.includes('node')) {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
        className={className}
      >
        <polygon points="12 2 21 7 21 17 12 22 3 17 3 7 12 2" />
        <path d="M9.5 14.5V9.5L14.5 14.5V9.5" strokeLinecap="round" />
      </svg>
    );
  }

  // MongoDB / Atlas
  if (key.includes('mongo') || key.includes('mongoose')) {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M12 2C8.5 6.2 7 9.6 7 13.2c0 3.3 2.2 5.7 5 6.8 2.8-1.1 5-3.5 5-6.8 0-3.6-1.5-7-5-11.2z" />
        <path d="M12 10v12" />
      </svg>
    );
  }

  // Tailwind CSS
  if (key.includes('tailwind')) {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <path d="M6 10c1-3 3.2-4.5 6-4.5 4 0 4.5 3 6.5 3.5 1.4.3 2.6-.2 3.5-1.5-1 3-3.2 4.5-6 4.5-4 0-4.5-3-6.5-3.5-1.4-.3-2.6.2-3.5 1.5z" />
        <path d="M2 16.5c1-3 3.2-4.5 6-4.5 4 0 4.5 3 6.5 3.5 1.4.3 2.6-.2 3.5-1.5-1 3-3.2 4.5-6 4.5-4 0-4.5-3-6.5-3.5-1.4-.3-2.6.2-3.5 1.5z" />
      </svg>
    );
  }

  // JavaScript / TypeScript
  if (key.includes('javascript') || key.includes('es6') || key === 'js') {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className={className}
      >
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <path d="M10 10v5.5a1.5 1.5 0 0 1-3 0" strokeLinecap="round" />
        <path
          d="M16.5 10.5c-.5-.5-1.2-.7-1.8-.5-.7.2-1.1.8-1 1.4.2.8 1.1 1 1.9 1.3.9.3 1.4.9 1.3 1.7-.1.9-1 1.4-2 1.3-.7-.1-1.3-.4-1.7-.9"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  // Arduino / ESP32
  if (key.includes('arduino') || key.includes('esp32')) {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        className={className}
      >
        <path d="M7.5 15.5a3.5 3.5 0 1 1 0-7c2.3 0 3.5 2.2 4.5 3.5 1 1.3 2.2 3.5 4.5 3.5a3.5 3.5 0 1 0 0-7c-2.3 0-3.5 2.2-4.5 3.5-1 1.3-2.2 3.5-4.5 3.5z" />
        <path d="M6.2 12h2.6M15.2 12h2.6M16.5 10.7v2.6" />
      </svg>
    );
  }

  // Git / GitHub
  if (key.includes('git')) {
    return (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
      >
        <circle cx="6" cy="6" r="2.2" />
        <circle cx="6" cy="18" r="2.2" />
        <circle cx="18" cy="9" r="2.2" />
        <path d="M6 8.2v7.6M8.2 6h4.3a3 3 0 0 1 3 3v0" />
      </svg>
    );
  }

  // AI, RAG & Algorithms
  if (
    key.includes('rag') ||
    key.includes('llm') ||
    key.includes('langchain') ||
    key.includes('langgraph') ||
    key.includes('embedding') ||
    key.includes('rerank') ||
    key.includes('re-rank') ||
    key.includes('algorithm')
  ) {
    return <BrainCircuit aria-hidden="true" className={className} />;
  }
  if (key.includes('openai') || key.includes('gemini') || key.includes('agent')) {
    return <Sparkles aria-hidden="true" className={className} />;
  }

  // Databases
  if (
    key.includes('sql') ||
    key.includes('supabase') ||
    key.includes('sequelize') ||
    key.includes('vector')
  ) {
    return <Database aria-hidden="true" className={className} />;
  }

  // Security & Auth
  if (
    key.includes('jwt') ||
    key.includes('abac') ||
    key.includes('auth') ||
    key.includes('security') ||
    key.includes('guardrail')
  ) {
    return <ShieldCheck aria-hidden="true" className={className} />;
  }

  // Streaming & Wireless Protocols
  if (
    key.includes('socket') ||
    key.includes('webrtc') ||
    key.includes('mqtt') ||
    key.includes('sse') ||
    key.includes('stream') ||
    key.includes('bluetooth')
  ) {
    return <Radio aria-hidden="true" className={className} />;
  }

  // Backend & APIs
  if (
    key.includes('express') ||
    key.includes('api') ||
    key.includes('swagger') ||
    key.includes('telemetry')
  ) {
    return <Server aria-hidden="true" className={className} />;
  }

  // Frontend State & Routing
  if (
    key.includes('redux') ||
    key.includes('context') ||
    key.includes('router')
  ) {
    return <Layers aria-hidden="true" className={className} />;
  }

  // Testing
  if (key.includes('jest') || key.includes('supertest') || key.includes('test')) {
    return <FlaskConical aria-hidden="true" className={className} />;
  }

  // IoT Sensors
  if (
    key.includes('sensor') ||
    key.includes('ultrasonic') ||
    key.includes('probe') ||
    key.includes('sensing')
  ) {
    return <Gauge aria-hidden="true" className={className} />;
  }

  // IoT Actuators & Motors
  if (
    key.includes('motor') ||
    key.includes('servo') ||
    key.includes('switch') ||
    key.includes('pump')
  ) {
    return <Cog aria-hidden="true" className={className} />;
  }

  // Alerts & Indicators
  if (key.includes('alarm') || key.includes('buzzer') || key.includes('haptic')) {
    return <BellRing aria-hidden="true" className={className} />;
  }
  if (key.includes('led')) {
    return <Lightbulb aria-hidden="true" className={className} />;
  }

  // Embedded Circuits, Relays, Displays & RTC
  if (
    key.includes('i2c') ||
    key.includes('uart') ||
    key.includes('rfid') ||
    key.includes('lcd') ||
    key.includes('relay') ||
    key.includes('driver') ||
    key.includes('rtc') ||
    key.includes('keypad') ||
    key.includes('embedded') ||
    key.includes('c++')
  ) {
    return <CircuitBoard aria-hidden="true" className={className} />;
  }

  // Cloud & CLI
  if (
    key.includes('vercel') ||
    key.includes('netlify') ||
    key.includes('railway') ||
    key.includes('docker')
  ) {
    return <Cloud aria-hidden="true" className={className} />;
  }
  if (key.includes('linux') || key.includes('powershell')) {
    return <Terminal aria-hidden="true" className={className} />;
  }
  if (key.includes('html') || key.includes('css')) {
    return <Code2 aria-hidden="true" className={className} />;
  }
  if (key.includes('cpu')) {
    return <Cpu aria-hidden="true" className={className} />;
  }

  return <Workflow aria-hidden="true" className={className} />;
}