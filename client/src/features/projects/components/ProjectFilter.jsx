export function ProjectFilter({
  categories = [],
  activeCategory,
  onSelectCategory,
  counts = {},
}) {
  return (
    <div
      role="group"
      aria-label="Filter projects by category"
      className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-10 sm:mb-12"
    >
      {categories.map((category) => {
        const isActive = activeCategory === category;
        const count = counts[category] ?? 0;

        return (
          <button
            key={category}
            type="button"
            aria-pressed={isActive}
            onClick={() => onSelectCategory(category)}
            className={`group inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs font-semibold tracking-wider uppercase border backdrop-blur-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#47f59c] ${
              isActive
                ? 'bg-[#47f59c] text-zinc-950 border-[#47f59c] shadow-[0_0_24px_-4px_rgba(71,245,156,0.6)]'
                : 'bg-[#0b0e0d]/90 text-zinc-300 border-white/[0.09] hover:text-white hover:border-[#47f59c]/45 hover:bg-[#0f1914]/90'
            }`}
          >
            <span
              aria-hidden="true"
              className={`w-1.5 h-1.5 rounded-full transition-all ${
                isActive
                  ? 'bg-zinc-950'
                  : 'bg-zinc-600 group-hover:bg-[#47f59c] group-hover:shadow-[0_0_6px_#47f59c]'
              }`}
            />
            <span>{category}</span>
            <span
              className={`px-1.5 py-0.5 text-[10px] rounded-full font-bold transition-colors ${
                isActive
                  ? 'bg-zinc-950/15 text-zinc-950'
                  : 'bg-white/[0.06] text-[#47f59c]'
              }`}
            >
              {String(count).padStart(2, '0')}
            </span>
          </button>
        );
      })}
    </div>
  );
}