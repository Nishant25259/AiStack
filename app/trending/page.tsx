import { ToolCard, type ToolCardData } from "@/components/ToolCard";
import { getTools } from "@/lib/db";
import { TrendingUp } from "lucide-react";

export const metadata = { title: "Trending — AIStack" };

export default function TrendingPage() {
  const { tools } = getTools({ limit: 20 });
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "2rem 1.5rem", paddingTop: "calc(60px + 2rem)" }}>
      <div style={{ marginBottom: "2rem" }}>
        <p className="section-label" style={{ marginBottom: "0.5rem" }}>Trending</p>
        <h1 style={{ fontSize: "2rem", fontWeight: 900, letterSpacing: "-0.04em", margin: 0, display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <TrendingUp size={28} color="var(--red)" /> Trending AI Tools
        </h1>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "0.8rem" }}>
        {tools.map((tool) => <ToolCard key={tool.id} tool={tool as unknown as ToolCardData} />)}
      </div>
    </div>
  );
}
