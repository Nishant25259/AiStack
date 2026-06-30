"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function SignInPage() {
  return (
    <div style={{ minHeight: "90vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem 1rem", paddingTop: "calc(60px + 2rem)" }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: "linear-gradient(135deg, #7c3aed, #6d28d9)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem", boxShadow: "0 0 30px rgba(109,40,217,0.4)" }}>
            <Sparkles size={22} color="white" />
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 900, letterSpacing: "-0.04em", marginBottom: "0.3rem" }}>Welcome back</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>Sign in to save favorites and write reviews</p>
        </div>

        <div style={{ background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: 18, padding: "2rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {[
              { provider: "Google",  emoji: "🔵", bg: "#4285f4" },
              { provider: "GitHub",  emoji: "⚫", bg: "#24292f" },
            ].map(({ provider, emoji, bg }) => (
              <button key={provider} style={{
                display: "flex", alignItems: "center", gap: "0.75rem",
                padding: "0.75rem 1.25rem", borderRadius: 10, border: "1px solid var(--border)",
                background: "var(--bg-surface)", color: "var(--text-primary)",
                cursor: "pointer", fontFamily: "inherit", fontWeight: 600, fontSize: "0.9rem",
                transition: "all 0.15s",
              }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--border-hover)"; e.currentTarget.style.background = "var(--bg-elevated)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "var(--bg-surface)"; }}>
                <span style={{ fontSize: "1.1rem" }}>{emoji}</span>
                Continue with {provider}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", margin: "1.25rem 0" }}>
            <div className="divider" style={{ flex: 1 }} />
            <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>or</span>
            <div className="divider" style={{ flex: 1 }} />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <input className="input" type="email" placeholder="Email address" />
            <input className="input" type="password" placeholder="Password" />
            <button className="btn btn-primary" style={{ width: "100%", padding: "0.7rem", fontSize: "0.95rem" }}>
              Sign in with Email
            </button>
          </div>

          <p style={{ textAlign: "center", marginTop: "1.25rem", fontSize: "0.825rem", color: "var(--text-muted)" }}>
            Don't have an account?{" "}
            <Link href="/auth/signin" style={{ color: "var(--purple-light)", fontWeight: 600, textDecoration: "none" }}>Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
