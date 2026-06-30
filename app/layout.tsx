import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: { default: "AIStack — Discover the Best AI Tools", template: "%s | AIStack" },
  description: "The largest curated directory of AI tools. Discover, compare, and save the best AI tools for developers, creators, and teams.",
  keywords: ["AI tools", "artificial intelligence", "ChatGPT alternatives", "AI directory"],
  openGraph: {
    title: "AIStack — Discover the Best AI Tools",
    description: "The largest curated directory of AI tools.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Navbar />
        <main style={{ minHeight: "100vh" }}>{children}</main>
        <footer style={{ borderTop: "1px solid var(--border)", marginTop: "5rem", padding: "2rem 1.5rem", background: "var(--bg-surface)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "1rem" }}>
            <a href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem", textDecoration: "none" }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg, #7c3aed, #6d28d9)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: "white" }}>
                AI
              </div>
              <span style={{ fontWeight: 800, fontSize: "0.95rem", letterSpacing: "-0.02em", color: "var(--text-primary)" }}>AIStack</span>
            </a>
            <p style={{ color: "var(--text-muted)", fontSize: "0.8rem" }}>© 2026 AIStack · The AI tools directory</p>
            <div style={{ display: "flex", gap: "1.5rem" }}>
              {[["Browse", "/tools"], ["Categories", "/categories"], ["Trending", "/trending"]].map(([label, href]) => (
                <a key={href} href={href} style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.825rem" }}>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
