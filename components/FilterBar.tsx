"use client";

import { useRouter, useSearchParams } from "next/navigation";

const PRICING = [
  { label: "All Pricing", value: "" },
  { label: "Free",        value: "FREE" },
  { label: "Freemium",    value: "FREEMIUM" },
  { label: "Paid",        value: "PAID" },
];

interface Category {
  id:         string;
  name:       string;
  slug:       string;
  icon:       string;
  toolCount?: number;
  _count?:    { tools: number };
}

export function FilterBar({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const params = useSearchParams();
  const activeCategory = params.get("category") || "";
  const activePricing  = params.get("pricing")  || "";

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(params.toString());
    value ? next.set(key, value) : next.delete(key);
    next.delete("page");
    router.push(`/tools?${next.toString()}`);
  };

  const toolCount = (cat: Category) => cat.toolCount ?? cat._count?.tools ?? 0;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
      {/* Pricing */}
      <div>
        <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.6rem" }}>Pricing</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.15rem" }}>
          {PRICING.map(({ label, value }) => (
            <button key={value} onClick={() => update("pricing", value)} style={{
              textAlign: "left", padding: "0.45rem 0.7rem", borderRadius: 7, border: "none",
              cursor: "pointer", fontSize: "0.83rem", fontWeight: 500, fontFamily: "inherit",
              transition: "all 0.15s",
              background: activePricing === value ? "rgba(139,92,246,0.15)" : "transparent",
              color: activePricing === value ? "var(--purple-light)" : "var(--text-secondary)",
            }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <p style={{ fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.6rem" }}>Category</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.1rem", maxHeight: 360, overflowY: "auto" }}>
          <button onClick={() => update("category", "")} style={{
            textAlign: "left", padding: "0.45rem 0.7rem", borderRadius: 7, border: "none",
            cursor: "pointer", fontSize: "0.83rem", fontWeight: 500, fontFamily: "inherit",
            background: !activeCategory ? "rgba(139,92,246,0.15)" : "transparent",
            color: !activeCategory ? "var(--purple-light)" : "var(--text-secondary)",
          }}>All categories</button>

          {categories.map(cat => (
            <button key={cat.id} onClick={() => update("category", cat.slug)} style={{
              textAlign: "left", padding: "0.45rem 0.7rem", borderRadius: 7, border: "none",
              cursor: "pointer", fontSize: "0.83rem", fontWeight: 500, fontFamily: "inherit",
              display: "flex", alignItems: "center", gap: "0.5rem", transition: "all 0.15s",
              background: activeCategory === cat.slug ? "rgba(139,92,246,0.15)" : "transparent",
              color: activeCategory === cat.slug ? "var(--purple-light)" : "var(--text-secondary)",
            }}>
              <span style={{ fontSize: "0.95rem" }}>{cat.icon}</span>
              <span style={{ flex: 1 }}>{cat.name}</span>
              <span style={{ fontSize: "0.68rem", color: "var(--text-faint)" }}>{toolCount(cat)}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
