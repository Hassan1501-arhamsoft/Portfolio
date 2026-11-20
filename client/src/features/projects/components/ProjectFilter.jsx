export function ProjectFilter({
  categories,
  activeCategory,
  onSelectCategory,
  counts,
}) {
  return (
    <div
      role="group"
      aria-label="Filter projects by category"
      className="flex flex-wrap items-center justify-center gap-2 mb-10"
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
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
              isActive
                ? 'bg-cyan-400 text-slate-950 border-cyan-400'
                : 'bg-slate-900/70 text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white'
            }`}
          >
            <span>{category}</span>
            <span
              className={`px-1.5 py-0.5 text-[11px] rounded-md ${
                isActive
                  ? 'bg-slate-950/15 text-slate-950'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}