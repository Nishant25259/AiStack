import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCategories } from "@/lib/db";

export const metadata = { title: "Categories — AIStack" };

export default function CategoriesPage() {
  const categories = getCategories();
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 1.5rem", paddingTop: "calc(60px + 2rem)" }}>
      <div style={{ marginBottom: "2.5rem" }}>
        <p className="section-label" style={{ marginBottom: "0.5rem" }}>All Categories</p>
        <h1 style={{ fontSize: "2rem", fontWeight: 900, letterSpacing: "-0.04em", margin: 0 }}>Browse by Category</h1>
        <p style={{ color: "var(--text-secondary)", marginTop: "0.5rem", fontSize: "0.9rem" }}>{categories.length} categories · Find AI tools for every use case</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "0.9rem" }}>
        {categories.map((cat) => (
          <Link key={cat.id} href={`/tools?category=${cat.slug}`} style={{ textDecoration: "none" }}>
            <div className="card" style={{ padding: "1.4rem", height: "100%" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                <div style={{ width: 48, height: 48, borderRadius: 13, background: cat.color + "18", border: `1px solid ${cat.color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem" }}>{cat.icon}</div>
                <ArrowRight size={14} color="var(--text-faint)" />
              </div>
              <h3 style={{ fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.3rem" }}>{cat.name}</h3>
              <p style={{ fontSize: "0.78rem", color: "var(--text-muted)", lineHeight: 1.5, marginBottom: "0.75rem" }}>{cat.description}</p>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", fontWeight: 600 }}>{cat.toolCount} tools</span>
                <div style={{ height: 2, width: 28, borderRadius: 2, background: cat.color, opacity: 0.7 }} />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
