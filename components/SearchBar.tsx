"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export function SearchBar() {
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") || "");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = new URLSearchParams(params.toString());
    q.trim() ? next.set("q", q.trim()) : next.delete("q");
    next.delete("page");
    router.push(`/tools?${next.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} style={{ position: "relative", maxWidth: 480 }}>
      <Search size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text-faint)", pointerEvents: "none" }} />
      <input
        className="input"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search tools, categories, tags..."
        style={{ paddingLeft: "2.4rem", paddingRight: q ? "5.5rem" : "1rem" }}
      />
      {q && (
        <button type="submit" style={{ position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)", background: "#7c3aed", border: "none", borderRadius: 6, padding: "0.3rem 0.65rem", color: "white", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
          Search
        </button>
      )}
    </form>
  );
}
