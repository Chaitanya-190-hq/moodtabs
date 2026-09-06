interface Props {
  query: string;
  onChange: (q: string) => void;
  onOpenPalette: () => void;
  onAdd: () => void;
}

export default function CommandBar({ query, onChange, onOpenPalette, onAdd }: Props) {
  return (
    <section className="mx-auto max-w-3xl px-5 pb-10 pt-16 text-center animate-fadeUp">
      <p className="mb-3 font-mono text-[11px] tracking-[0.3em] text-accent">
        DISCOVER → EXPLORE → BUILD
      </p>
      <h1 className="text-3xl font-semibold tracking-tight text-slate-100 sm:text-4xl">
        Explore something useful.
      </h1>
      <p className="mt-3 text-sm text-slate-500">
        A focused launchpad for learning, building, and discovering.
      </p>

      <div className="relative mt-8">
        <svg className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="search"
          role="searchbox"
          aria-label="Search resources"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onOpenPalette}
          placeholder="Search resources, tools, documentation…"
          className="w-full rounded-lg border border-line bg-base-850/80 py-3.5 pl-11 pr-20 text-sm text-slate-200 placeholder-slate-600 transition-colors focus:border-accent/40"
        />
        <button
          onClick={onOpenPalette}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded border border-line bg-base-800 px-2 py-1 font-mono text-[10px] text-slate-500"
        >
          CTRL / K
        </button>
      </div>

      <button
        onClick={onAdd}
        className="mt-5 inline-flex items-center gap-1.5 rounded-md border border-dashed border-line px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-slate-500 transition-colors hover:border-accent/50 hover:text-accent"
      >
        <span aria-hidden="true">+</span> Add a site
      </button>
    </section>
  );
}
