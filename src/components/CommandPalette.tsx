import { useEffect, useMemo, useRef, useState } from "react";
import type { Resource } from "../data/resources";
import { CATEGORIES } from "../data/resources";

interface Action {
  id: string;
  label: string;
  hint: string;
  run: () => void;
}

interface Props {
  open: boolean;
  onClose: () => void;
  resources: Resource[];
  onCategory: (cat: string) => void;
  onOpenResource: (url: string) => void;
  onToggleTheme: () => void;
  onReset: () => void;
  onAdd: () => void;
}

export default function CommandPalette({
  open, onClose, resources, onCategory, onOpenResource, onToggleTheme, onReset, onAdd,
}: Props) {
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const [lastOpen, setLastOpen] = useState(open);

  // Reset the palette's state each time it opens. Adjusting state during
  // render (instead of in an effect) is React's recommended pattern here.
  if (open !== lastOpen) {
    setLastOpen(open);
    if (open) {
      setQuery("");
      setCursor(0);
    }
  }

  const actions: Action[] = useMemo(() => {
    const q = query.toLowerCase();
    const acts: Action[] = [];

    if (!q || "theme toggle dark light".includes(q))
      acts.push({ id: "act-theme", label: "Toggle theme", hint: "Appearance", run: onToggleTheme });
    if (!q || "reset clear settings".includes(q))
      acts.push({ id: "act-reset", label: "Reset local settings", hint: "Clear stored preferences", run: onReset });
    if (!q || "add new create site resource".includes(q))
      acts.push({ id: "act-add", label: "Add a resource", hint: "New site", run: onAdd });

    CATEGORIES.forEach((c) => {
      if (c.id === "ALL") return;
      if (!q || c.label.toLowerCase().includes(q))
        acts.push({ id: `cat-${c.id}`, label: `Jump to ${c.label}`, hint: "Category", run: () => onCategory(c.id) });
    });

    resources
      .filter((r) =>
        !q ||
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.tags.some((t) => t.includes(q))
      )
      .slice(0, 6)
      .forEach((r) =>
        acts.push({ id: `res-${r.id}`, label: `Open ${r.name}`, hint: r.url, run: () => onOpenResource(r.url) })
      );

    return acts;
  }, [query, resources, onCategory, onOpenResource, onToggleTheme, onReset, onAdd]);

  // Run then close
  const run = (a: Action) => { a.run(); onClose(); };

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 30);
    return () => clearTimeout(t);
  }, [open]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setCursor((c) => Math.min(c + 1, actions.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setCursor((c) => Math.max(c - 1, 0)); }
    if (e.key === "Enter" && actions[cursor]) run(actions[cursor]);
    if (e.key === "Escape") onClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-4 pt-[15vh] backdrop-blur-sm"
      onMouseDown={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-xl border border-linehi bg-base-900 shadow-2xl animate-paletteIn"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => { setQuery(e.target.value); setCursor(0); }}
          onKeyDown={onKeyDown}
          placeholder="Type a command or search…"
          aria-label="Command palette input"
          className="w-full border-b border-line bg-transparent px-5 py-4 text-sm text-slate-100 placeholder-slate-600"
        />
        <ul role="listbox" className="max-h-80 overflow-y-auto py-2">
          {actions.length === 0 && (
            <li className="px-5 py-6 text-center font-mono text-xs text-slate-600">
              No matching resources.
            </li>
          )}
          {actions.map((a, i) => (
            <li key={a.id}>
              <button
                role="option"
                aria-selected={i === cursor}
                onClick={() => run(a)}
                onMouseEnter={() => setCursor(i)}
                className={`flex w-full items-center justify-between px-5 py-2.5 text-left text-sm transition-colors ${
                  i === cursor ? "bg-accent-dim text-slate-100" : "text-slate-400"
                }`}
              >
                <span>{a.label}</span>
                <span className="ml-4 truncate font-mono text-[10px] text-slate-600">{a.hint}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="flex gap-4 border-t border-line px-5 py-2.5 font-mono text-[10px] text-slate-600">
          <span>↑↓ navigate</span><span>↵ select</span><span>esc close</span>
        </div>
      </div>
    </div>
  );
}