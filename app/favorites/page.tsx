import Link from "next/link";
import { Bookmark } from "lucide-react";

export const metadata = { title: "Your Favorites" };

export default function FavoritesPage() {
  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "2rem 1.5rem", paddingTop: "calc(60px + 2rem)" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 900, letterSpacing: "-0.04em", margin: 0 }}>Your Favorites</h1>
        <p style={{ color: "var(--text-secondary)", marginTop: "0.5rem", fontSize: "0.9rem" }}>AI tools you've saved</p>
      </div>
      <div style={{ textAlign: "center", padding: "4rem 2rem", background: "var(--bg-surface)", border: "1px solid var(--border)", borderRadius: 20 }}>
        <Bookmark size={40} color="var(--text-faint)" style={{ marginBottom: "1rem" }} />
        <h2 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.4rem" }}>Sign in to see your favorites</h2>
        <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "1.5rem" }}>Save tools and access them from any device</p>
        <Link href="/auth/signin" className="btn btn-primary" style={{ textDecoration: "none" }}>Sign in</Link>
      </div>
    </div>
  );
}
