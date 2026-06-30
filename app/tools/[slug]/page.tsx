import { notFound } from "next/navigation";
import Link from "next/link";
import { ExternalLink, Heart, Star, Zap, CheckCircle, ArrowLeft, Globe } from "lucide-react";
import { getTool, getTools } from "@/lib/db";

export async function generateStaticParams() {
  const { tools } = getTools({ limit: 200 });
  return tools.map((t) => ({ slug: t.slug }));
}

const pricingCfg = {
  FREE:     { label: "Free",     cls: "badge-free"     },
  FREEMIUM: { label: "Freemium", cls: "badge-freemium" },
  PAID:     { label: "Paid",     cls: "badge-paid"     },
};

export default async function ToolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = getTool(slug);
  if (!tool) notFound();

  const pricing = pricingCfg[tool.pricing] ?? pricingCfg.FREE;
  const color   = tool.category?.color || "#6366f1";

  return (
    <div style={{ maxWidth: 860, margin: "0 auto", padding: "2rem 1.5rem", paddingTop: "calc(60px + 2rem)" }}>
      <Link href="/tools" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", color: "var(--text-muted)", textDecoration: "none", fontSize: "0.85rem", marginBottom: "1.75rem", fontWeight: 500 }}>
        <ArrowLeft size={14} /> Back to tools
      </Link>

      {/* Hero card */}
      <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 20, padding: "2rem", marginBottom: "1.5rem", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${color}, transparent)`, opacity: 0.7 }} />

        <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap" }}>
          <div style={{ width: 72, height: 72, borderRadius: 18, background: color + "18", border: `1px solid ${color}30`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.25rem", flexShrink: 0 }}>
            {tool.category?.icon}
          </div>
          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
              <h1 style={{ fontSize: "1.75rem", fontWeight: 900, margin: 0, letterSpacing: "-0.03em" }}>{tool.name}</h1>
              {tool.verified && <CheckCircle size={18} color="var(--cyan)" />}
              {tool.featured && <span className="badge badge-featured">✦ Featured</span>}
            </div>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.65, marginBottom: "1rem" }}>{tool.description}</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", alignItems: "center" }}>
              <span className={`badge ${pricing.cls}`}>{pricing.label}</span>
              {tool.apiAvailable && <span className="badge badge-api"><Zap size={9} />API</span>}
              <Link href={`/tools?category=${tool.category?.slug}`} className="tag" style={{ textDecoration: "none" }}>
                {tool.category?.icon} {tool.category?.name}
              </Link>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", flexShrink: 0 }}>
            <a href={tool.website} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-lg" style={{ textDecoration: "none" }}>
              <ExternalLink size={15} /> Visit Tool
            </a>
            <button className="btn btn-secondary btn-lg"><Heart size={15} /> Save</button>
          </div>
        </div>
      </div>

      {/* Tags */}
      {tool.tags?.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.5rem" }}>
          {tool.tags.map((tag) => (
            <Link key={tag} href={`/tools?q=${tag}`} className="tag" style={{ textDecoration: "none" }}>#{tag}</Link>
          ))}
        </div>
      )}

      {/* Website */}
      <div style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 14, padding: "1.25rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "1rem" }}>
        <Globe size={18} color="var(--text-muted)" style={{ flexShrink: 0 }} />
        <div>
          <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginBottom: "0.15rem" }}>Official Website</p>
          <a href={tool.website} target="_blank" rel="noopener noreferrer" style={{ color: "var(--purple-light)", textDecoration: "none", fontSize: "0.9rem", fontWeight: 600 }}>{tool.website}</a>
        </div>
      </div>

      {/* Reviews placeholder */}
      <div style={{ textAlign: "center", padding: "2.5rem", background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 14, color: "var(--text-muted)" }}>
        <Star size={32} style={{ marginBottom: "0.75rem", opacity: 0.3 }} />
        <p style={{ fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.3rem" }}>Reviews coming soon</p>
        <p style={{ fontSize: "0.8rem" }}>Sign in to be the first to review {tool.name}</p>
      </div>
    </div>
  );
}
