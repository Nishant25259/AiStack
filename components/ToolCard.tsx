"use client";

import Link from "next/link";
import { Star, Heart, Zap } from "lucide-react";

export interface ToolCardData {
  id:           string;
  name:         string;
  slug:         string;
  description:  string;
  website:      string;
  logo?:        string;
  pricing:      "FREE" | "FREEMIUM" | "PAID";
  featured:     boolean;
  verified:     boolean;
  apiAvailable: boolean;
  tags:         string[];
  category:     { name: string; icon: string; color: string; slug: string };
  // optional counts (present when using Prisma, absent with JSON)
  _count?:      { reviews: number; favorites: number };
}

const pricingConfig = {
  FREE:     { label: "Free",     cls: "badge-free"     },
  FREEMIUM: { label: "Freemium", cls: "badge-freemium" },
  PAID:     { label: "Paid",     cls: "badge-paid"     },
};

export function ToolCard({ tool }: { tool: ToolCardData }) {
  const pricing = pricingConfig[tool.pricing] ?? pricingConfig.FREE;
  const color   = tool.category?.color || "#6366f1";

  return (
    <Link href={`/tools/${tool.slug}`} style={{ textDecoration: "none", display: "block", height: "100%" }}>
      <article
        className={`card ${tool.featured ? "card-featured" : ""}`}
        style={{ padding: "1.1rem", height: "100%", display: "flex", flexDirection: "column", gap: "0.75rem", position: "relative", cursor: "pointer" }}
      >
        {tool.featured && (
          <span className="badge badge-featured" style={{ position: "absolute", top: 10, right: 10 }}>
            ✦ Featured
          </span>
        )}

        {/* Logo + name */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
          <div style={{
            width: 46, height: 46, borderRadius: 12, flexShrink: 0,
            background: color + "18", border: `1px solid ${color}30`,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22,
          }}>
            {tool.logo
              ? <img src={tool.logo} alt={tool.name} width={30} height={30} style={{ borderRadius: 8, objectFit: "cover" }} />
              : tool.category?.icon}
          </div>
          <div style={{ minWidth: 0, flex: 1, paddingTop: "0.1rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", flexWrap: "wrap" }}>
              <h3 style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--text-primary)", margin: 0 }}>{tool.name}</h3>
              {tool.verified && <span title="Verified" style={{ color: "var(--cyan)", fontSize: 11 }}>✓</span>}
            </div>
            <span style={{ fontSize: "0.72rem", color: "var(--text-muted)", display: "block", marginTop: "0.1rem" }}>
              {tool.category?.name}
            </span>
          </div>
        </div>

        {/* Description */}
        <p style={{
          fontSize: "0.815rem", color: "var(--text-secondary)", lineHeight: 1.55, flex: 1,
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" as const, overflow: "hidden",
        }}>
          {tool.description}
        </p>

        {/* Tags */}
        {tool.tags?.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.3rem" }}>
            {tool.tags.slice(0, 3).map(tag => (
              <span key={tag} className="tag" style={{ fontSize: "0.68rem", padding: "0.15rem 0.45rem" }}>#{tag}</span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "0.5rem", paddingTop: "0.6rem", borderTop: "1px solid var(--border)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", flexWrap: "wrap" }}>
            <span className={`badge ${pricing.cls}`}>{pricing.label}</span>
            {tool.apiAvailable && <span className="badge badge-api"><Zap size={9} />API</span>}
          </div>
          {tool._count && (
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "var(--text-faint)", fontSize: "0.73rem", flexShrink: 0 }}>
              {tool._count.favorites > 0 && (
                <span style={{ display: "flex", alignItems: "center", gap: "0.2rem" }}>
                  <Heart size={11} /> {tool._count.favorites}
                </span>
              )}
              {tool._count.reviews > 0 && (
                <span style={{ display: "flex", alignItems: "center", gap: "0.2rem" }}>
                  <Star size={11} /> {tool._count.reviews}
                </span>
              )}
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}
