import { Suspense } from "react";
import { ToolCard, type ToolCardData } from "@/components/ToolCard";
import { FilterBar } from "@/components/FilterBar";
import { SearchBar } from "@/components/SearchBar";
import { getTools, getCategories } from "@/lib/db";

export default async function ToolsPage({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const sp         = await searchParams;
  const page       = parseInt(sp.page ?? "1");
  const categories = getCategories();
  const { tools, total, totalPages } = getTools({
    q:        sp.q        ?? "",
    category: sp.category ?? "",
    pricing:  sp.pricing  ?? "",
    featured: sp.featured ?? "",
    page,
    limit: 12,
  });

  const buildUrl = (updates: Record<string, string>) => {
    const next = { ...sp, ...updates };
    if (!updates.page) delete next.page;
    return `/tools?${new URLSearchParams(next).toString()}`;
  };

  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1.5rem", paddingTop: "calc(60px + 2rem)" }}>
      <div style={{ marginBottom: "1.75rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 900, letterSpacing: "-0.035em", marginBottom: "0.35rem" }}>
          {sp.q ? `Results for "${sp.q}"` : "All AI Tools"}
        </h1>
        <p style={{ color: "var(--text-muted)", fontSize: "0.875rem" }}>
          {total} tool{total !== 1 ? "s" : ""} found
        </p>
      </div>

      <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
        <aside style={{ width: 210, flexShrink: 0, position: "sticky", top: 76 }} className="hidden lg:block">
          <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 14, padding: "1.25rem" }}>
            <Suspense><FilterBar categories={categories} /></Suspense>
          </div>
        </aside>

        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ marginBottom: "1.25rem" }}>
            <Suspense><SearchBar /></Suspense>
          </div>

          {/* Active filter pills */}
          {(sp.pricing || sp.category || sp.q) && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.25rem" }}>
              {sp.q       && <a href={buildUrl({ q: "" })}        className="tag">Search: {sp.q} ✕</a>}
              {sp.pricing && <a href={buildUrl({ pricing: "" })}  className="tag">{sp.pricing} ✕</a>}
              {sp.category && <a href={buildUrl({ category: "" })} className="tag">Category ✕</a>}
              <a href="/tools" className="tag">Clear all</a>
            </div>
          )}

          {tools.length > 0 ? (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(270px, 1fr))", gap: "0.8rem" }}>
                {tools.map((tool) => <ToolCard key={tool.id} tool={tool as unknown as ToolCardData} />)}
              </div>

              {totalPages > 1 && (
                <div style={{ display: "flex", justifyContent: "center", gap: "0.4rem", marginTop: "2.5rem", flexWrap: "wrap" }}>
                  {page > 1 && <a href={buildUrl({ page: String(page - 1) })} className="btn btn-secondary btn-sm">← Prev</a>}
                  {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1).map((p) => (
                    <a key={p} href={buildUrl({ page: String(p) })} style={{
                      width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
                      borderRadius: 8, textDecoration: "none", fontSize: "0.85rem", fontWeight: 600,
                      background: p === page ? "#7c3aed" : "var(--bg-elevated)",
                      border: p === page ? "1px solid #7c3aed" : "1px solid var(--border)",
                      color: p === page ? "white" : "var(--text-secondary)",
                    }}>{p}</a>
                  ))}
                  {page < totalPages && <a href={buildUrl({ page: String(page + 1) })} className="btn btn-secondary btn-sm">Next →</a>}
                </div>
              )}
            </>
          ) : (
            <div style={{ textAlign: "center", padding: "4rem 2rem", background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 16, color: "var(--text-muted)" }}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
              <p style={{ fontWeight: 700, color: "var(--text-primary)", fontSize: "1.05rem", marginBottom: "0.4rem" }}>No tools found</p>
              <p style={{ fontSize: "0.875rem" }}>Try different keywords or remove filters</p>
              <a href="/tools" className="btn btn-primary" style={{ display: "inline-flex", marginTop: "1.25rem", textDecoration: "none" }}>Browse all tools</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
