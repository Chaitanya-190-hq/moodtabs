import { CATEGORIES } from "../data/resources";

interface Props {
  active: string;
  onChange: (cat: string) => void;
}

export default function CategoryFilter({ active, onChange }: Props) {
  return (
    <div role="tablist" aria-label="Filter by category"
      className="mb-6 flex flex-wrap gap-1.5">
      {CATEGORIES.map((c) => {
        const isActive = active === c.id;
        return (
          <button
            key={c.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(c.id)}
            className={`rounded-md border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-all
              ${isActive
                ? "border-accent/50 bg-accent-dim text-accent"
                : "border-line text-slate-500 hover:border-linehi hover:text-slate-300"}`}
          >
            {c.label}
          </button>
        );
      })}
    </div>
  );
}
