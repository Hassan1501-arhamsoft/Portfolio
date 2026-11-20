export function TechBadge({ label, variant = 'default' }) {
  const variants = {
    default:
      'bg-white/[0.03] text-zinc-400 border-white/[0.08] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] hover:bg-white/[0.07] hover:text-zinc-100 hover:border-white/[0.18]',
    accent:
      'bg-white/[0.07] text-zinc-100 border-white/[0.16] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16)] hover:bg-cyan-400/[0.08] hover:text-white hover:border-cyan-400/40',
    indigo:
      'bg-white/[0.06] text-zinc-200 border-indigo-400/25 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12)] hover:bg-indigo-400/[0.1] hover:text-white hover:border-indigo-400/45',
  };

  const dotColors = {
    accent: 'bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]',
    indigo: 'bg-indigo-400 shadow-[0_0_6px_rgba(129,140,248,0.8)]',
  };

  const activeVariant = variants[variant] || variants.default;
  const dotClass = dotColors[variant];

  return (
    <span
      className={`group/badge inline-flex items-center gap-1.5 px-3 py-1 font-mono text-[11px] font-medium tracking-tight rounded-full border backdrop-blur-md transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-[1px] motion-reduce:transform-none ${activeVariant}`}
    >
      {dotClass && (
        <span
          aria-hidden="true"
          className={`w-1.5 h-1.5 rounded-full transition-transform duration-200 group-hover/badge:scale-125 ${dotClass}`}
        />
      )}
      <span>{label}</span>
    </span>
  );
}