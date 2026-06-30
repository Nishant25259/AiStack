import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp, Shield, Zap, Star } from "lucide-react";
import { ToolCard, type ToolCardData } from "@/components/ToolCard";
import { getFeaturedTools, getCategories } from "@/lib/db";

const stats = [
  { value: "116+", label: "AI Tools" },
  { value: "15",   label: "Categories" },
  { value: "Free", label: "Always" },
  { value: "Daily",label: "Updated" },
];

const features = [
  { icon: Sparkles, title: "Curated Quality",   desc: "Every tool is verified before listing. No spam, no junk.", color: "#a78bfa" },
  { icon: Zap,      title: "Instant Search",    desc: "Find the right tool in seconds. Filter by pricing, category, and features.", color: "#fbbf24" },
  { icon: Shield,   title: "Always Free",       desc: "Browse, compare, and discover tools completely free. No paywalls ever.", color: "#34d399" },
];

export default function HomePage() {
  const featured   = getFeaturedTools(6);
  const categories = getCategories();

  return (
    <div style={{ paddingTop: 60 }}>

      {/* Hero */}
      <section className="dot-grid" style={{ position: "relative", overflow: "hidden", padding: "5rem 1.5rem 4rem", textAlign: "center" }}>
        <div className="glow-orb" style={{ width: 700, height: 400, background: "rgba(124,58,237,0.09)", top: "-10%", left: "50%", transform: "translateX(-50%)" }} />
        <div className="glow-orb" style={{ width: 300, height: 300, background: "rgba(79,70,229,0.07)", top: "40%", left: "10%" }} />
        <div className="glow-orb" style={{ width: 250, height: 250, background: "rgba(139,92,246,0.06)", top: "30%", right: "8%" }} />

        <div style={{ position: "relative", maxWidth: 740, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(139,92,246,0.1)", border: "1px solid rgba(139,92,246,0.25)", borderRadius: 99, padding: "0.35rem 1rem", marginBottom: "1.75rem", fontSize: "0.78rem", color: "var(--purple-light)", fontWeight: 600 }}>
            <Sparkles size={13} /> 116+ AI tools · 15 categories · Zero signup
          </div>

          <h1 style={{ fontSize: "clamp(2.4rem, 7vw, 4.25rem)", fontWeight: 900, lineHeight: 1.08, marginBottom: "1.25rem", letterSpacing: "-0.04em" }}>
            Find the perfect<br /><span className="text-gradient">AI tool</span> for anything
          </h1>

          <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.15rem)", color: "var(--text-secondary)", maxWidth: 520, margin: "0 auto 2.25rem", lineHeight: 1.65 }}>
            The largest curated directory of AI tools. Search, compare, and discover the right tools for developers, creators, and teams.
          </p>

          <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "2rem" }}>
            <Link href="/tools" className="btn btn-primary btn-lg" style={{ textDecoration: "none" }}>
              Browse All Tools <ArrowRight size={16} />
            </Link>
            <Link href="/categories" className="btn btn-secondary btn-lg" style={{ textDecoration: "none" }}>
              View Categories
            </Link>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.4rem", fontSize: "0.78rem" }}>
            <span style={{ color: "var(--text-muted)" }}>Popular:</span>
            {["ChatGPT", "Midjourney", "Cursor", "ElevenLabs", "Runway ML", "Suno"].map((t) => (
              <Link key={t} href={`/tools?q=${t}`} className="tag" style={{ textDecoration: "none" }}>{t}</Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <div style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "1.25rem 1.5rem", display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", textAlign: "center" }}>
          {stats.map(({ value, label }) => (
            <div key={label}>
              <div style={{ fontSize: "1.6rem", fontWeight: 900, letterSpacing: "-0.04em", color: "var(--text-primary)" }}>{value}</div>
              <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.1rem" }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Categories */}
        <section style={{ padding: "3.5rem 0 2rem" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "1.5rem" }}>
            <div>
              <p className="section-label" style={{ marginBottom: "0.4rem" }}>Explore</p>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, margin: 0 }}>Browse by Category</h2>
            </div>
            <Link href="/categories" style={{ display: "flex", alignItems: "center", gap: "0.3rem", color: "var(--purple-light)", textDecoration: "none", fontSize: "0.85rem", fontWeight: 600 }}>
              All categories <ArrowRight size={14} />
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: "0.65rem" }}>
            {categories.map((cat) => (
              <Link key={cat.id} href={`/tools?category=${cat.slug}`} style={{ textDecoration: "none" }}>
                <div className="card" style={{ padding: "1.1rem", textAlign: "center" }}>
                  <div style={{ fontSize: "1.75rem", marginBottom: "0.5rem" }}>{cat.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: "0.8rem", color: "var(--text-primary)", marginBottom: "0.2rem", lineHeight: 1.3 }}>{cat.name}</div>
                  <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>{cat.toolCount} tools</div>
                  <div style={{ width: 24, height: 2, borderRadius: 2, background: cat.color, margin: "0.6rem auto 0", opacity: 0.7 }} />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Tools */}
        <section style={{ padding: "2rem 0" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "1.5rem" }}>
            <div>
              <p className="section-label" style={{ marginBottom: "0.4rem" }}>Hand-picked</p>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 800, margin: 0, display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Star size={20} color="var(--amber)" fill="var(--amber)" /> Featured Tools
              </h2>
            </div>
            <Link href="/tools?featured=true" style={{ display: "flex", alignItems: "center", gap: "0.3rem", color: "var(--purple-light)", textDecoration: "none", fontSize: "0.85rem", fontWeight: 600 }}>
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "0.8rem" }}>
            {featured.map((tool) => <ToolCard key={tool.id} tool={tool as unknown as ToolCardData} />)}
          </div>
        </section>

        {/* Why AIStack */}
        <section style={{ padding: "2rem 0 4rem", borderTop: "1px solid var(--border)" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <p className="section-label" style={{ marginBottom: "0.5rem" }}>Why choose us</p>
            <h2 style={{ fontSize: "1.75rem", fontWeight: 900, margin: 0 }}>Built for AI explorers</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem" }}>
            {features.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="card" style={{ padding: "1.5rem" }}>
                <div style={{ width: 42, height: 42, borderRadius: 11, background: color + "15", border: `1px solid ${color}25`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
                  <Icon size={18} color={color} />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: "0.5rem" }}>{title}</h3>
                <p style={{ fontSize: "0.825rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
