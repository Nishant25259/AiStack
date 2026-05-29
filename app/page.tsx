import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp, Shield, Zap } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { ToolCard } from "@/components/ToolCard";
import { Badge } from "@/components/ui/Badge";

async function getFeaturedTools() {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/tools?limit=6`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data.tools || [];
  } catch {
    return [];
  }
}

async function getCategories() {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/categories`, {
      cache: "no-store",
    });
    return await res.json();
  } catch {
    return [];
  }
}

const stats = [
  { label: "AI Tools", value: "5,000+" },
  { label: "Categories", value: "50+" },
  { label: "Monthly Users", value: "100k+" },
  { label: "Reviews", value: "25k+" },
];

export default async function HomePage() {
  const [tools, categories] = await Promise.all([getFeaturedTools(), getCategories()]);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-600/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-violet-500/10 border border-violet-500/20 rounded-full px-4 py-1.5 mb-6">
            <Sparkles size={14} className="text-violet-400" />
            <span className="text-violet-300 text-sm font-medium">5,000+ AI tools, curated daily</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="text-white">Discover the</span>
            <br />
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              best AI tools
            </span>
          </h1>

          <p className="text-zinc-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            The largest curated directory of AI tools. Find, compare, and save the right tools for your workflow.
          </p>

          <SearchBar large className="max-w-2xl mx-auto mb-8" />

          <div className="flex flex-wrap items-center justify-center gap-2 text-sm text-zinc-500">
            <span>Popular:</span>
            {["ChatGPT", "Midjourney", "GitHub Copilot", "Runway", "ElevenLabs"].map((term) => (
              <Link
                key={term}
                href={`/tools?q=${term}`}
                className="text-zinc-400 hover:text-violet-400 transition-colors"
              >
                {term}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-zinc-800/50 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {stats.map(({ label, value }) => (
              <div key={label}>
                <div className="text-3xl font-bold text-white mb-1">{value}</div>
                <div className="text-zinc-500 text-sm">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Browse by Category</h2>
            <p className="text-zinc-500 text-sm mt-1">Find tools for every use case</p>
          </div>
          <Link href="/categories" className="text-violet-400 hover:text-violet-300 text-sm flex items-center gap-1 transition-colors">
            All categories <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {categories.slice(0, 12).map((cat: { id: string; slug: string; icon: string; name: string; _count: { tools: number } }) => (
            <Link
              key={cat.id}
              href={`/tools?category=${cat.slug}`}
              className="group bg-zinc-900/50 border border-zinc-800 hover:border-zinc-600 rounded-xl p-4 text-center transition-all hover:bg-zinc-900 hover:-translate-y-0.5"
            >
              <div className="text-2xl mb-2">{cat.icon}</div>
              <div className="text-white text-sm font-medium mb-1">{cat.name}</div>
              <div className="text-zinc-500 text-xs">{cat._count?.tools || 0} tools</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Tools */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <TrendingUp size={22} className="text-violet-400" />
              Featured Tools
            </h2>
            <p className="text-zinc-500 text-sm mt-1">Hand-picked top performers</p>
          </div>
          <Link href="/tools" className="text-violet-400 hover:text-violet-300 text-sm flex items-center gap-1 transition-colors">
            Browse all <ArrowRight size={14} />
          </Link>
        </div>

        {tools.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map((tool: Parameters<typeof ToolCard>[0]["tool"]) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 text-zinc-500">
            <p className="mb-2">No tools yet.</p>
            <p className="text-sm">Run <code className="text-violet-400">npx prisma db seed</code> to add sample data.</p>
          </div>
        )}
      </section>

      {/* Why AIStack */}
      <section className="border-t border-zinc-800/50 bg-zinc-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h2 className="text-3xl font-bold text-white text-center mb-4">Why AIStack?</h2>
          <p className="text-zinc-400 text-center mb-12 max-w-xl mx-auto">Built for developers, creators, and teams who need the right AI tool — fast.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Sparkles, color: "violet", title: "Curated Quality", desc: "Every tool is manually reviewed and verified by our team before listing." },
              { icon: Zap, color: "amber", title: "AI Recommendations", desc: "Get personalized suggestions based on your role and preferences." },
              { icon: Shield, color: "emerald", title: "Always Up-to-Date", desc: "Pricing, features, and availability updated daily across all tools." },
            ].map(({ icon: Icon, color, title, desc }) => (
              <div key={title} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                <div className={`w-10 h-10 rounded-lg bg-${color}-500/10 border border-${color}-500/20 flex items-center justify-center mb-4`}>
                  <Icon size={18} className={`text-${color}-400`} />
                </div>
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
