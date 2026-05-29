import { Suspense } from "react";
import { ToolCard } from "@/components/ToolCard";
import { FilterBar } from "@/components/FilterBar";
import { SearchBar } from "@/components/SearchBar";

async function getTools(searchParams: Record<string, string>) {
  const params = new URLSearchParams(searchParams).toString();
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/tools?${params}&limit=12`, {
      cache: "no-store",
    });
    return await res.json();
  } catch {
    return { tools: [], total: 0, totalPages: 0 };
  }
}

async function getCategories() {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/categories`, {
      cache: "no-store",
    });
    return await res.json();
  } catch {
    return [];
  }
}

export default async function ToolsPage({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const sp = await searchParams;
  const [data, categories] = await Promise.all([getTools(sp), getCategories()]);
  const { tools, total, totalPages } = data;
  const page = parseInt(sp.page || "1");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Browse AI Tools</h1>
        <p className="text-zinc-400">{total} tools found{sp.q ? ` for "${sp.q}"` : ""}</p>
      </div>

      <SearchBar className="mb-8 max-w-xl" />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-56 flex-shrink-0">
          <Suspense>
            <FilterBar categories={categories} />
          </Suspense>
        </aside>

        {/* Grid */}
        <div className="flex-1">
          {tools.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {tools.map((tool: Parameters<typeof ToolCard>[0]["tool"]) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-10">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <a
                      key={p}
                      href={`?${new URLSearchParams({ ...sp, page: String(p) }).toString()}`}
                      className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
                        p === page
                          ? "bg-violet-600 text-white"
                          : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                      }`}
                    >
                      {p}
                    </a>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 text-zinc-500">
              <p className="text-4xl mb-3">🔍</p>
              <p className="font-medium text-white mb-1">No tools found</p>
              <p className="text-sm">Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
