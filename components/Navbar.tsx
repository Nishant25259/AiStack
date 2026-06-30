"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Zap, Menu, X, TrendingUp, LayoutGrid, Bookmark, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/tools",      label: "Browse",     icon: LayoutGrid  },
  { href: "/categories", label: "Categories", icon: Zap         },
  { href: "/trending",   label: "Trending",   icon: TrendingUp  },
  { href: "/favorites",  label: "Favorites",  icon: Bookmark    },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<{ id: string; name: string; slug: string; category: { icon: string; name: string } }[]>([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!query || query.length < 2) { setSearchResults([]); return; }
    const t = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setSearchResults(data.slice(0, 6));
      } finally { setSearching(false); }
    }, 280);
    return () => clearTimeout(t);
  }, [query]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) window.location.href = `/tools?q=${encodeURIComponent(query.trim())}`;
  };

  return (
    <>
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(7,7,15,0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        transition: "all 0.3s ease",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 1.25rem", height: 60, display: "flex", alignItems: "center", gap: "1rem" }}>

          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none", flexShrink: 0 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 9, flexShrink: 0,
              background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 16px rgba(124,58,237,0.5)",
            }}>
              <Sparkles size={16} color="white" strokeWidth={2.5} />
            </div>
            <span style={{ fontWeight: 900, fontSize: "1.05rem", letterSpacing: "-0.04em", color: "var(--text-primary)" }}>
              AI<span style={{ color: "var(--purple-light)" }}>Stack</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav style={{ display: "flex", gap: "0.15rem", flex: 1 }} className="hidden md:flex">
            {navLinks.map(({ href, label }) => (
              <Link key={href} href={href} style={{
                padding: "0.4rem 0.85rem", borderRadius: 8, textDecoration: "none",
                fontSize: "0.85rem", fontWeight: 500, transition: "all 0.15s",
                color: pathname === href ? "var(--text-primary)" : "var(--text-muted)",
                background: pathname === href ? "rgba(139,92,246,0.12)" : "transparent",
              }}>
                {label}
              </Link>
            ))}
          </nav>

          {/* Search trigger */}
          <button onClick={() => setSearchOpen(true)} style={{
            display: "flex", alignItems: "center", gap: "0.5rem",
            background: "var(--bg-surface)", border: "1px solid var(--border)",
            borderRadius: 8, padding: "0.4rem 0.75rem",
            color: "var(--text-muted)", cursor: "pointer",
            fontSize: "0.8rem", transition: "all 0.15s",
            marginLeft: "auto",
          }}>
            <Search size={14} />
            <span className="hidden sm:inline">Search tools...</span>
            <span style={{ background: "var(--bg-elevated)", borderRadius: 4, padding: "1px 5px", fontSize: "0.7rem", color: "var(--text-faint)" }} className="hidden lg:inline">⌘K</span>
          </button>

          {/* Auth */}
          <div className="hidden md:flex" style={{ gap: "0.5rem", flexShrink: 0 }}>
            <Link href="/auth/signin" className="btn btn-secondary btn-sm">Sign in</Link>
          </div>

          {/* Mobile toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden btn btn-ghost btn-sm" style={{ flexShrink: 0, padding: "0.4rem" }}>
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div style={{ background: "rgba(7,7,15,0.98)", backdropFilter: "blur(20px)", borderTop: "1px solid var(--border)", padding: "1rem 1.25rem" }}>
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} style={{
                display: "flex", alignItems: "center", gap: "0.6rem",
                padding: "0.65rem 0.75rem", borderRadius: 8, textDecoration: "none",
                color: pathname === href ? "var(--text-primary)" : "var(--text-secondary)",
                background: pathname === href ? "rgba(139,92,246,0.1)" : "transparent",
                fontSize: "0.9rem", fontWeight: 500, marginBottom: "0.2rem",
              }}>
                <Icon size={16} /> {label}
              </Link>
            ))}
            <div style={{ borderTop: "1px solid var(--border)", marginTop: "0.75rem", paddingTop: "0.75rem" }}>
              <Link href="/auth/signin" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>Sign in</Link>
            </div>
          </div>
        )}
      </header>

      {/* Search modal */}
      {searchOpen && (
        <div
          onClick={() => { setSearchOpen(false); setQuery(""); setSearchResults([]); }}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(10px)", zIndex: 200, display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: "12vh" }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ width: "100%", maxWidth: 580, margin: "0 1rem", background: "var(--bg-elevated)", borderRadius: 16, border: "1px solid rgba(139,92,246,0.3)", overflow: "hidden", boxShadow: "0 40px 80px rgba(0,0,0,0.6)" }}
          >
            <form onSubmit={handleSearchSubmit} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "1rem 1.25rem", borderBottom: "1px solid var(--border)" }}>
              <Search size={18} color="var(--purple)" style={{ flexShrink: 0 }} />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search 200+ AI tools..."
                style={{ flex: 1, background: "none", border: "none", outline: "none", color: "var(--text-primary)", fontSize: "1rem", fontFamily: "inherit" }}
              />
              {searching && <div style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid rgba(139,92,246,0.3)", borderTop: "2px solid var(--purple)", animation: "spin 0.7s linear infinite" }} />}
              <button type="button" onClick={() => { setSearchOpen(false); setQuery(""); }} style={{ background: "none", border: "none", color: "var(--text-muted)", cursor: "pointer", display: "flex" }}>
                <X size={16} />
              </button>
            </form>

            {searchResults.length > 0 ? (
              <div>
                {searchResults.map((tool) => (
                  <Link key={tool.id} href={`/tools/${tool.slug}`} onClick={() => { setSearchOpen(false); setQuery(""); setSearchResults([]); }}
                    style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.75rem 1.25rem", textDecoration: "none", transition: "background 0.1s", borderBottom: "1px solid var(--border)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--bg-overlay)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <span style={{ fontSize: "1.2rem" }}>{tool.category?.icon}</span>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--text-primary)" }}>{tool.name}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>{tool.category?.name}</div>
                    </div>
                  </Link>
                ))}
                <div style={{ padding: "0.6rem 1.25rem" }}>
                  <Link href={`/tools?q=${encodeURIComponent(query)}`} onClick={() => { setSearchOpen(false); setQuery(""); }}
                    style={{ fontSize: "0.8rem", color: "var(--purple-light)", textDecoration: "none", fontWeight: 600 }}>
                    See all results for "{query}" →
                  </Link>
                </div>
              </div>
            ) : query.length >= 2 && !searching ? (
              <div style={{ padding: "2rem", textAlign: "center", color: "var(--text-muted)", fontSize: "0.875rem" }}>
                No tools found for "{query}"
              </div>
            ) : (
              <div style={{ padding: "1rem 1.25rem", display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginRight: "0.25rem" }}>Try:</span>
                {["ChatGPT", "Midjourney", "Cursor", "ElevenLabs", "Runway", "Notion"].map((s) => (
                  <button key={s} onClick={() => setQuery(s)} style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 6, padding: "0.2rem 0.6rem", fontSize: "0.775rem", color: "var(--text-secondary)", cursor: "pointer", fontFamily: "inherit" }}>
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  );
}
