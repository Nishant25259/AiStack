// ─── No-database data layer ─────────────────────────────────
// Reads from /data/*.json — zero setup, zero env vars needed.

import toolsRaw    from "../data/tools.json";
import categoriesRaw from "../data/categories.json";

// ── Types ────────────────────────────────────────────────────

export type Pricing = "FREE" | "FREEMIUM" | "PAID";

export interface Category {
  id:          string;
  name:        string;
  slug:        string;
  icon:        string;
  color:       string;
  description: string;
  toolCount?:  number;
}

export interface Tool {
  id:           string;
  name:         string;
  slug:         string;
  description:  string;
  website:      string;
  pricing:      Pricing;
  featured:     boolean;
  verified:     boolean;
  apiAvailable: boolean;
  categorySlug: string;
  tags:         string[];
  category:     Category;
  viewCount:    number;
}

// ── Raw data ─────────────────────────────────────────────────

const categoryMap = new Map<string, Category>(
  (categoriesRaw as Category[]).map((c) => [c.id, c])
);

// Hydrate tools with their category object
const allTools: Tool[] = (toolsRaw as Omit<Tool, "category" | "viewCount">[]).map((t) => ({
  ...t,
  viewCount: 0,
  category: categoryMap.get(t.categorySlug) ?? {
    id: t.categorySlug, name: t.categorySlug, slug: t.categorySlug,
    icon: "🤖", color: "#6366f1", description: "",
  },
}));

// ── Query helpers ─────────────────────────────────────────────

export interface ToolQuery {
  q?:       string;
  category?: string;  // slug
  pricing?:  string;
  featured?: string;
  page?:     number;
  limit?:    number;
}

export function getTools(query: ToolQuery = {}) {
  const { q = "", category = "", pricing = "", featured = "", page = 1, limit = 12 } = query;

  let results = allTools.filter((t) => {
    if (q) {
      const lower = q.toLowerCase();
      const match =
        t.name.toLowerCase().includes(lower) ||
        t.description.toLowerCase().includes(lower) ||
        t.tags.some((tag) => tag.toLowerCase().includes(lower)) ||
        t.category.name.toLowerCase().includes(lower);
      if (!match) return false;
    }
    if (category && t.categorySlug !== category) return false;
    if (pricing && t.pricing !== pricing.toUpperCase()) return false;
    if (featured === "true" && !t.featured) return false;
    return true;
  });

  // Sort: featured first, then alphabetically
  results = results.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return a.name.localeCompare(b.name);
  });

  const total      = results.length;
  const totalPages = Math.ceil(total / limit);
  const tools      = results.slice((page - 1) * limit, page * limit);

  return { tools, total, page, totalPages };
}

export function getTool(slug: string): Tool | null {
  return allTools.find((t) => t.slug === slug) ?? null;
}

export function searchTools(q: string, limit = 8): Tool[] {
  if (!q || q.length < 2) return [];
  const lower = q.toLowerCase();
  return allTools
    .filter((t) =>
      t.name.toLowerCase().includes(lower) ||
      t.tags.some((tag) => tag.toLowerCase().includes(lower)) ||
      t.category.name.toLowerCase().includes(lower)
    )
    .sort((a, b) => (a.featured ? -1 : 1))
    .slice(0, limit);
}

export function getCategories(): (Category & { toolCount: number })[] {
  return (categoriesRaw as Category[]).map((cat) => ({
    ...cat,
    toolCount: allTools.filter((t) => t.categorySlug === cat.id).length,
  }));
}

export function getFeaturedTools(limit = 6): Tool[] {
  return allTools.filter((t) => t.featured).slice(0, limit);
}
