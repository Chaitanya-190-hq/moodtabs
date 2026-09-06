import { useEffect, useState } from "react";
import { DISCOVERIES, RESOURCES } from "../data/resources";

export default function DiscoveryPanel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % DISCOVERIES.length), 6000);
    return () => clearInterval(t);
  }, []);

  const d = DISCOVERIES[index];
  const res = RESOURCES.find((r) => r.id === d.resourceId);

  return (
    <aside aria-label="Discover" className="mb-10">
      <h2 className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-slate-600">
        · Discover
      </h2>
      <div
        key={d.label}
        className="glass flex flex-col gap-2 rounded-lg p-5 animate-fadeUp sm:flex-row sm:items-center sm:justify-between"
      >
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-accent">{d.label}</p>
          <p className="mt-1 text-sm font-semibold text-slate-100">{d.title}</p>
          <p className="mt-1 text-xs text-slate-500">{d.note}</p>
        </div>
        {res && (
          <a
            href={res.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 shrink-0 rounded-md border border-line px-4 py-2 text-xs text-slate-300 transition-colors hover:border-accent/50 hover:text-accent sm:mt-0"
          >
            Open ↗
          </a>
        )}
      </div>

      <div className="mt-3 flex gap-1.5" role="tablist" aria-label="Discovery items">
        {DISCOVERIES.map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === index}
            aria-label={`Discovery ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1 rounded-full transition-all ${
              i === index ? "w-6 bg-accent" : "w-3 bg-line hover:bg-linehi"
            }`}
          />
        ))}
      </div>
    </aside>
  );
}
