import { ToolCard } from "@/components/ToolCard";

async function getTrendingTools() {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/tools?limit=12`, { cache: "no-store" });
    const data = await res.json();
    return data.tools || [];
  } catch { return []; }
}

export default async function TrendingPage() {
  const tools = await getTrendingTools();
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-white mb-2">Trending Tools</h1>
      <p className="text-zinc-400 mb-10">Most viewed and favorited AI tools this week</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tools.map((tool: Parameters<typeof ToolCard>[0]["tool"]) => <ToolCard key={tool.id} tool={tool} />)}
      </div>
    </div>
  );
}
