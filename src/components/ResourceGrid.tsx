import type { Resource } from "../data/resources";
import ResourceCard from "./ResourceCard";

interface Props {
  resources: Resource[];
  favorites: string[];
  userIds: string[];
  onToggleFavorite: (id: string) => void;
  onRemove: (id: string) => void;
}

export default function ResourceGrid({ resources, favorites, userIds, onToggleFavorite, onRemove }: Props) {
  if (resources.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-line py-20 text-center animate-fadeUp">
        <p className="font-mono text-sm text-slate-500">No matching resources.</p>
        <p className="mt-1 text-xs text-slate-600">Try a different search or category.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" role="list">
      {resources.map((r, i) => (
        <ResourceCard
          key={r.id}
          resource={r}
          index={i}
          isFavorite={favorites.includes(r.id)}
          isUserAdded={userIds.includes(r.id)}
          onToggleFavorite={onToggleFavorite}
          onRemove={userIds.includes(r.id) ? onRemove : undefined}
        />
      ))}
    </div>
  );
}