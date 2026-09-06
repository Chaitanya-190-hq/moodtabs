export type Category = "LEARN" | "BUILD" | "DATA" | "DOCS" | "TOOLS" | "COMMUNITY";

export interface Resource {
  id: string;
  name: string;
  description: string;
  url: string;
  category: Category;
  tags: string[];
  icon: string; // single renderable glyph
}

export const CATEGORIES: { id: Category | "ALL" | "FAVORITES"; label: string }[] = [
  { id: "ALL", label: "All" },
  { id: "LEARN", label: "Learn" },
  { id: "BUILD", label: "Build" },
  { id: "DATA", label: "Data" },
  { id: "DOCS", label: "Docs" },
  { id: "TOOLS", label: "Tools" },
  { id: "COMMUNITY", label: "Community" },
  { id: "FAVORITES", label: "★ Favorites" },
];

export const RESOURCES: Resource[] = [
  { id: "kaggle", name: "Kaggle", description: "Datasets, notebooks, and machine learning competitions.", url: "https://www.kaggle.com", category: "DATA", tags: ["datasets", "ml", "competitions"], icon: "◈" },
  { id: "leetcode", name: "LeetCode", description: "Practice coding problems and prepare for technical interviews.", url: "https://leetcode.com", category: "LEARN", tags: ["algorithms", "interviews", "practice"], icon: "⟨⟩" },
  { id: "github", name: "GitHub", description: "Host, review, and collaborate on code with the world's developers.", url: "https://github.com", category: "BUILD", tags: ["git", "code", "opensource"], icon: "⎇" },
  { id: "mdn", name: "MDN Web Docs", description: "The definitive reference for HTML, CSS, and JavaScript.", url: "https://developer.mozilla.org", category: "DOCS", tags: ["web", "html", "css", "javascript"], icon: "▤" },
  { id: "python-docs", name: "Python Documentation", description: "Official documentation and tutorials for the Python language.", url: "https://docs.python.org", category: "DOCS", tags: ["python", "reference"], icon: "λ" },
  { id: "huggingface", name: "Hugging Face", description: "Open models, datasets, and tooling for machine learning.", url: "https://huggingface.co", category: "DATA", tags: ["ai", "models", "llm"], icon: "◉" },
  { id: "colab", name: "Google Colab", description: "Run Python notebooks in the browser with free GPU access.", url: "https://colab.research.google.com", category: "TOOLS", tags: ["notebooks", "gpu", "python"], icon: "▶" },
  { id: "jupyter", name: "Jupyter", description: "Interactive notebooks for data science and exploration.", url: "https://jupyter.org", category: "TOOLS", tags: ["notebooks", "python", "data"], icon: "❖" },
  { id: "stackoverflow", name: "Stack Overflow", description: "Community answers for every programming question.", url: "https://stackoverflow.com", category: "COMMUNITY", tags: ["qa", "help", "debugging"], icon: "≡" },
  { id: "freecodecamp", name: "freeCodeCamp", description: "Free, project-based curriculum for learning to code.", url: "https://www.freecodecamp.org", category: "LEARN", tags: ["courses", "free", "web"], icon: "🔥" },
  { id: "cs50", name: "CS50", description: "Harvard's introduction to computer science — free and open.", url: "https://cs50.harvard.edu/x/", category: "LEARN", tags: ["course", "cs", "fundamentals"], icon: "◆" },
  { id: "roadmap", name: "Roadmap.sh", description: "Developer roadmaps, guides, and learning paths.", url: "https://roadmap.sh", category: "LEARN", tags: ["roadmap", "career", "guides"], icon: "⇢" },
  { id: "vercel", name: "Vercel", description: "Deploy frontend projects instantly from Git.", url: "https://vercel.com", category: "BUILD", tags: ["deploy", "hosting", "frontend"], icon: "▲" },
  { id: "react-docs", name: "React Docs", description: "Official documentation for building with React.", url: "https://react.dev", category: "DOCS", tags: ["react", "frontend", "ui"], icon: "⚛" },
  { id: "regex101", name: "Regex101", description: "Build, test, and debug regular expressions live.", url: "https://regex101.com", category: "TOOLS", tags: ["regex", "testing"], icon: ".*" },
  { id: "devto", name: "DEV Community", description: "Articles and discussion from a community of developers.", url: "https://dev.to", category: "COMMUNITY", tags: ["articles", "blog", "community"], icon: "✎" },
];

export const DISCOVERIES = [
  { label: "Dataset of the Day", title: "Open datasets on Kaggle", note: "Browse trending public datasets you can analyze or model on.", resourceId: "kaggle" },
  { label: "Tool of the Day", title: "Regex101", note: "Stop guessing at patterns — test regex with live explanations.", resourceId: "regex101" },
  { label: "Concept of the Day", title: "Learn via roadmaps", note: "Roadmap.sh maps entire skill paths, step by step.", resourceId: "roadmap" },
  { label: "Documentation Pick", title: "MDN Web Docs", note: "The single most reliable reference for the web platform.", resourceId: "mdn" },
];
