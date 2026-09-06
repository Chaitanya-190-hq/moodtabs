import { useEffect, useMemo, useState } from "react";
import Header from "./components/Header";
import CommandBar from "./components/CommandBar";
import DiscoveryPanel from "./components/DiscoveryPanel";
import CategoryFilter from "./components/CategoryFilter";
import ResourceGrid from "./components/ResourceGrid";
import CommandPalette from "./components/CommandPalette";
import SettingsPanel from "./components/SettingsPanel";
import AddResourceModal from "./components/AddResourceModal";
import { RESOURCES } from "./data/resources";
import type { Resource } from "./data/resources";
import { useLocalStorage } from "./hooks/useLocalStorage";

export default function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useLocalStorage<string>("mt-category", "ALL");
  const [favorites, setFavorites] = useLocalStorage<string[]>("mt-favorites", []);
  const [theme, setTheme] = useLocalStorage<"dark" | "light">("mt-theme", "dark");
  const [userResources, setUserResources] = useLocalStorage<Resource[]>("mt-user-resources", []);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);

  // Global keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Theme applied to root element (V1 ships dark-first; light kept minimal)
  useEffect(() => {
    document.documentElement.classList.toggle("light-mode", theme === "light");
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // User-added sites first, then the built-in list
  const allResources = useMemo(() => [...userResources, ...RESOURCES], [userResources]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return allResources.filter((r) => {
      if (category === "FAVORITES" && !favorites.includes(r.id)) return false;
      if (category !== "ALL" && category !== "FAVORITES" && r.category !== category) return false;
      if (!q) return true;
      return (
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q) ||
        r.tags.some((t) => t.includes(q))
      );
    });
  }, [query, category, favorites, allResources]);

  const toggleFavorite = (id: string) =>
    setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));

  const addResource = (r: Resource) => setUserResources((rs) => [r, ...rs]);

  const removeResource = (id: string) => {
    setUserResources((rs) => rs.filter((r) => r.id !== id));
    setFavorites((f) => f.filter((x) => x !== id));
  };

  const resetAll = () => {
    localStorage.removeItem("mt-category");
    localStorage.removeItem("mt-favorites");
    localStorage.removeItem("mt-theme");
    localStorage.removeItem("mt-user-resources");
    setCategory("ALL");
    setFavorites([]);
    setTheme("dark");
    setUserResources([]);
  };

  return (
    <div className="relative min-h-screen">
      <div className="atmosphere" aria-hidden="true" />

      <div className="relative z-10">
        <Header onOpenSettings={() => setSettingsOpen(true)} />

        <main className="mx-auto max-w-6xl px-5 pb-24">
          <CommandBar
            query={query}
            onChange={setQuery}
            onOpenPalette={() => setPaletteOpen(true)}
            onAdd={() => setAddOpen(true)}
          />

          <section id="explorer" aria-label="Resource explorer">
            <DiscoveryPanel />
            <CategoryFilter active={category} onChange={setCategory} />
            <ResourceGrid
              resources={filtered}
              favorites={favorites}
              userIds={userResources.map((r) => r.id)}
              onToggleFavorite={toggleFavorite}
              onRemove={removeResource}
            />
          </section>
        </main>

        <footer className="border-t border-line py-8 text-center font-mono text-[10px] tracking-widest text-slate-600">
          MOODTABS · A FOCUSED LAUNCHPAD · ALL DATA STAYS LOCAL
        </footer>
      </div>

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        resources={allResources}
        onCategory={(c) => setCategory(c)}
        onOpenResource={(url) => window.open(url, "_blank", "noopener,noreferrer")}
        onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
        onReset={resetAll}
        onAdd={() => setAddOpen(true)}
      />

      <SettingsPanel
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
        favoriteCount={favorites.length}
        onReset={resetAll}
      />

      <AddResourceModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onAdd={addResource}
      />
    </div>
  );
}