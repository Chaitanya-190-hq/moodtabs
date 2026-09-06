interface Props {
  onOpenSettings: () => void;
}

export default function Header({ onOpenSettings }: Props) {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <header className="sticky top-0 z-40 glass">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5">
        <a href="#" className="font-mono text-sm font-semibold tracking-[0.25em] text-slate-100">
          MOOD<span className="text-accent">TABS</span>
        </a>

        <nav aria-label="Primary" className="hidden sm:block">
          <ul className="flex gap-6 text-xs tracking-widest text-slate-400">
            {["explore", "learn", "build", "tools"].map((s) => (
              <li key={s}>
                <button
                  onClick={() => scrollTo("explorer")}
                  className="uppercase transition-colors hover:text-slate-100"
                >
                  {s}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <kbd className="hidden rounded border border-line bg-base-850 px-2 py-1 font-mono text-[10px] text-slate-500 sm:block">
            CTRL K
          </kbd>
          <button
            onClick={onOpenSettings}
            aria-label="Open settings"
            className="rounded-md border border-line p-2 text-slate-400 transition-colors hover:border-linehi hover:text-slate-100"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
