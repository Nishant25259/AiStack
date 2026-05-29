"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const pricingFilters = [
  { label: "All", value: "" },
  { label: "Free", value: "free" },
  { label: "Freemium", value: "freemium" },
  { label: "Paid", value: "paid" },
];

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  _count: { tools: number };
}

export function FilterBar({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const activeCategory = params.get("category") || "";
  const activePricing = params.get("pricing") || "";

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    if (value) next.set(key, value);
    else next.delete(key);
    next.delete("page");
    router.push(`/tools?${next.toString()}`);
  };

  return (
    <div className="space-y-4">
      {/* Pricing */}
      <div>
        <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Pricing</p>
        <div className="flex flex-wrap gap-2">
          {pricingFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => update("pricing", f.value)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                activePricing === f.value
                  ? "bg-violet-600 text-white"
                  : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-2">Category</p>
        <div className="space-y-1 max-h-80 overflow-y-auto pr-1">
          <button
            onClick={() => update("category", "")}
            className={cn(
              "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left transition-all",
              !activeCategory
                ? "bg-violet-600/20 text-violet-300 border border-violet-500/30"
                : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
            )}
          >
            All categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => update("category", cat.slug)}
              className={cn(
                "w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left transition-all",
                activeCategory === cat.slug
                  ? "bg-violet-600/20 text-violet-300 border border-violet-500/30"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              )}
            >
              <span>{cat.icon}</span>
              <span className="flex-1">{cat.name}</span>
              <span className="text-xs text-zinc-600">{cat._count.tools}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
