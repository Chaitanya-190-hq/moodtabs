interface Props {
  open: boolean;
  onClose: () => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
  favoriteCount: number;
  onReset: () => void;
}

export default function SettingsPanel({
  open, onClose, theme, onToggleTheme, favoriteCount, onReset,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm"
      onMouseDown={onClose} role="dialog" aria-modal="true" aria-label="Settings">
      <aside
        className="h-full w-full max-w-sm border-l border-line bg-base-900 p-6 animate-fadeUp"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-slate-400">Settings</h2>
          <button onClick={onClose} aria-label="Close settings"
            className="rounded border border-line px-2 py-1 text-xs text-slate-400 hover:text-slate-100">
            ✕
          </button>
        </div>

        <div className="space-y-6 text-sm">
          <div className="flex items-center justify-between rounded-lg border border-line p-4">
            <span className="text-slate-300">Theme</span>
            <button
              onClick={onToggleTheme}
              className="rounded-md border border-line px-3 py-1.5 text-xs text-slate-300 hover:border-linehi"
            >
              {theme === "dark" ? "Dark ●" : "Light ●"} — switch
            </button>
          </div>

          <div className="flex items-center justify-between rounded-lg border border-line p-4">
            <span className="text-slate-300">Favorites stored locally</span>
            <span className="font-mono text-xs text-accent">{favoriteCount}</span>
          </div>

          <button
            onClick={onReset}
            className="w-full rounded-md border border-red-900/50 py-2.5 text-xs text-red-400 transition-colors hover:bg-red-950/30"
          >
            Reset all local settings
          </button>

          <p className="text-xs leading-relaxed text-slate-600">
            All preferences are stored only in this browser. Nothing is sent anywhere.
          </p>
        </div>
      </aside>
    </div>
  );
}
