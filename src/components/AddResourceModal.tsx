import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Category, Resource } from "../data/resources";
import { CATEGORIES } from "../data/resources";

const CATEGORY_OPTIONS = CATEGORIES.filter(
  (c) => c.id !== "ALL" && c.id !== "FAVORITES"
) as { id: Category; label: string }[];

function normalizeUrl(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const withScheme = /^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;
  try {
    return new URL(withScheme).toString();
  } catch {
    return null;
  }
}

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (resource: Resource) => void;
}

export default function AddResourceModal({ open, onClose, onAdd }: Props) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category>("TOOLS");
  const [tags, setTags] = useState("");
  const [error, setError] = useState<string | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const [lastOpen, setLastOpen] = useState(open);

  // Reset the form each time the modal opens (render-time adjustment,
  // React's recommended replacement for resetting state in an effect).
  if (open !== lastOpen) {
    setLastOpen(open);
    if (open) {
      setName("");
      setUrl("");
      setDescription("");
      setCategory("TOOLS");
      setTags("");
      setError(null);
    }
  }

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => nameRef.current?.focus(), 30);
    return () => clearTimeout(t);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cleanName = name.trim();
    if (!cleanName) {
      setError("Name is required.");
      return;
    }
    const cleanUrl = normalizeUrl(url);
    if (!cleanUrl) {
      setError("Enter a valid URL — for example example.com");
      return;
    }
    const cleanTags = tags
      .split(",")
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean);
    const initials = cleanName
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();

    onAdd({
      id: `user-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
      name: cleanName,
      url: cleanUrl,
      description: description.trim(),
      category,
      tags: cleanTags,
      icon: initials,
    });
    onClose();
  };

  if (!open) return null;

  const inputClass =
    "w-full rounded-lg border border-line bg-base-850/60 px-3.5 py-2.5 text-sm text-slate-200 placeholder-slate-600 transition-colors focus:border-accent/40 outline-none";
  const labelClass =
    "mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-slate-500";
  const optionalClass =
    "normal-case tracking-normal text-slate-600";

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 px-4 pt-[12vh] backdrop-blur-sm"
      onMouseDown={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Add a website"
    >
      <form
        onSubmit={handleSubmit}
        onMouseDown={(e) => e.stopPropagation()}
        className="w-full max-w-md overflow-hidden rounded-xl border border-linehi bg-base-900 shadow-2xl animate-paletteIn"
      >
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-slate-100">
            Add a site
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-slate-500 transition-colors hover:text-slate-100"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 px-5 py-5">
          <div>
            <label htmlFor="add-name" className={labelClass}>Name</label>
            <input
              id="add-name"
              ref={nameRef}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Example: Hacker News"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="add-url" className={labelClass}>URL</label>
            <input
              id="add-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="news.ycombinator.com"
              inputMode="url"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="add-category" className={labelClass}>Category</label>
            <select
              id="add-category"
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className={inputClass}
            >
              {CATEGORY_OPTIONS.map((c) => (
                <option key={c.id} value={c.id}>{c.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="add-description" className={labelClass}>
              Description <span className={optionalClass}>(optional)</span>
            </label>
            <textarea
              id="add-description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              placeholder="What is this site for?"
              className={`${inputClass} resize-none`}
            />
          </div>
          <div>
            <label htmlFor="add-tags" className={labelClass}>
              Tags <span className={optionalClass}>(optional, comma separated)</span>
            </label>
            <input
              id="add-tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="news, community, links"
              className={inputClass}
            />
          </div>

          {error && (
            <p role="alert" className="text-xs text-red-400">{error}</p>
          )}
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-line px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-line px-4 py-2 text-xs text-slate-400 transition-colors hover:border-linehi hover:text-slate-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-accent px-4 py-2 text-xs font-semibold text-base-950 transition-opacity hover:opacity-90"
          >
            Add site
          </button>
        </div>
      </form>
    </div>
  );
}