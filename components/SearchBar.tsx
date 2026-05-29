"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Loader2, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function SearchBar({ className, large = false }: { className?: string; large?: boolean }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ id: string; name: string; slug: string; category: { icon: string } }[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (query.length < 2) { setResults([]); return; }
    const t = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/tools?q=${encodeURIComponent(query.trim())}`);
      setOpen(false);
    }
  };

  return (
    <div ref={ref} className={cn("relative", className)}>
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={large ? 18 : 16} />
          <input
            type="text"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
            onFocus={() => setOpen(true)}
            placeholder={large ? "Search 5,000+ AI tools..." : "Search tools..."}
            className={cn(
              "w-full bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 rounded-xl",
              "focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/50 transition",
              large ? "pl-12 pr-4 py-4 text-base" : "pl-10 pr-4 py-2.5 text-sm"
            )}
          />
          {loading && <Loader2 className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 animate-spin" size={16} />}
        </div>
      </form>

      {/* Dropdown */}
      {open && query.length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50">
          {results.length > 0 ? (
            <>
              {results.map((tool) => (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.slug}`}
                  onClick={() => { setOpen(false); setQuery(""); }}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors"
                >
                  <span className="text-lg">{tool.category.icon}</span>
                  <span className="text-white text-sm font-medium">{tool.name}</span>
                </Link>
              ))}
              <button
                onClick={handleSubmit as never}
                className="flex items-center gap-2 w-full px-4 py-3 text-violet-400 text-sm hover:bg-white/5 border-t border-zinc-800 transition-colors"
              >
                <Search size={14} />
                See all results for "{query}"
                <ArrowRight size={14} />
              </button>
            </>
          ) : !loading ? (
            <div className="px-4 py-8 text-center text-zinc-500 text-sm">No tools found for "{query}"</div>
          ) : null}
        </div>
      )}
    </div>
  );
}
