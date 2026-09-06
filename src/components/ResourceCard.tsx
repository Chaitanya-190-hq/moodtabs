import type { Resource } from "../data/resources";

interface Props {
  resource: Resource;
  isFavorite: boolean;
  isUserAdded: boolean;
  onToggleFavorite: (id: string) => void;
  onRemove?: (id: string) => void;
  index: number;
}

export default function ResourceCard({ resource, isFavorite, isUserAdded, onToggleFavorite, onRemove, index }: Props) {
  return (
    <article
      className="card relative flex flex-col rounded-lg border border-line bg-base-850/60 p-5 animate-fadeUp"
      style={{ animationDelay: `${Math.min(index * 30, 300)}ms` }}
    >
      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex-1"
        aria-label={`${resource.name} — opens in new tab`}
      >
        <div className="mb-3 flex items-start justify-between">
          <span className="flex h-9 w-9 items-center justify-center rounded-md border border-line bg-base-800 font-mono text-sm text-accent">
            {resource.icon}
          </span>
          <span className="text-slate-600 transition-colors group-hover:text-accent" aria-hidden="true">↗</span>
        </div>
        <h3 className="text-sm font-semibold text-slate-100">{resource.name}</h3>
        <p className="mt-1.5 text-xs leading-relaxed text-slate-500">{resource.description}</p>
      </a>

      <div className="mt-4 flex items-center justify-between border-t border-line pt-3">
        <span className="font-mono text-[10px] uppercase tracking-widest text-slate-600">
          {resource.category}
        </span>
        <div className="flex items-center gap-2.5">
          {isUserAdded && onRemove && (
            <button
              onClick={() => onRemove(resource.id)}
              aria-label={`Remove ${resource.name}`}
              title="Remove this site"
              className="text-slate-700 transition-colors hover:text-red-400"
            >
              ✕
            </button>
          )}
          <button
            onClick={() => onToggleFavorite(resource.id)}
            aria-pressed={isFavorite}
            aria-label={isFavorite ? `Remove ${resource.name} from favorites` : `Add ${resource.name} to favorites`}
            className={`text-base transition-transform hover:scale-110 ${
              isFavorite ? "text-amber-400" : "text-slate-700 hover:text-slate-400"
            }`}
          >
            {isFavorite ? "★" : "☆"}
          </button>
        </div>
      </div>
    </article>
  );
}