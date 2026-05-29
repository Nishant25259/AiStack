import { notFound } from "next/navigation";
import Link from "next/link";
import { ExternalLink, Star, Heart, Zap, Smartphone, CheckCircle, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

async function getTool(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL || "http://localhost:3000"}/api/tools/${slug}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

const pricingMap = {
  FREE: { label: "Free", variant: "free" as const },
  FREEMIUM: { label: "Freemium", variant: "freemium" as const },
  PAID: { label: "Paid", variant: "paid" as const },
};

export default async function ToolDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tool = await getTool(slug);
  if (!tool) notFound();

  const pricing = pricingMap[tool.pricing as keyof typeof pricingMap];
  const avgRating = tool.reviews.length > 0
    ? (tool.reviews.reduce((s: number, r: { rating: number }) => s + r.rating, 0) / tool.reviews.length).toFixed(1)
    : null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/tools" className="inline-flex items-center gap-1.5 text-zinc-500 hover:text-white text-sm mb-8 transition-colors">
        <ArrowLeft size={14} /> Back to tools
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-6 mb-10">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl border border-white/5 flex-shrink-0"
          style={{ backgroundColor: tool.category.color + "15" }}
        >
          {tool.logo ? <img src={tool.logo} className="w-14 h-14 rounded-xl object-cover" alt={tool.name} /> : tool.category.icon}
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <h1 className="text-3xl font-bold text-white">{tool.name}</h1>
            {tool.verified && <CheckCircle size={20} className="text-sky-400" />}
            {tool.featured && <Badge variant="featured">Featured</Badge>}
          </div>

          <p className="text-zinc-400 mb-4 leading-relaxed">{tool.description}</p>

          <div className="flex flex-wrap items-center gap-3">
            <Badge variant={pricing.variant}>{pricing.label}</Badge>
            {tool.apiAvailable && <Badge variant="default"><Zap size={10} className="mr-1" />API Available</Badge>}
            {tool.mobileSupport && <Badge variant="default"><Smartphone size={10} className="mr-1" />Mobile</Badge>}
            {avgRating && (
              <div className="flex items-center gap-1 text-amber-400 text-sm">
                <Star size={14} fill="currentColor" />
                <span className="font-medium">{avgRating}</span>
                <span className="text-zinc-500">({tool._count.reviews} reviews)</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <a href={tool.website} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="gap-2 w-full sm:w-auto">
              <ExternalLink size={15} />
              Visit Tool
            </Button>
          </a>
          <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto">
            <Heart size={15} />
            Save
          </Button>
        </div>
      </div>

      {/* Category & Tags */}
      <div className="flex flex-wrap items-center gap-2 mb-10 pb-10 border-b border-zinc-800">
        <Link href={`/tools?category=${tool.category.slug}`} className="flex items-center gap-1.5 bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-lg text-sm text-white transition-colors">
          {tool.category.icon} {tool.category.name}
        </Link>
        {tool.tags.map(({ tag }: { tag: { id: string; name: string; slug: string } }) => (
          <Link key={tag.id} href={`/tools?q=${tag.slug}`} className="bg-zinc-900 border border-zinc-800 hover:border-zinc-600 px-3 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-white transition-all">
            #{tag.name}
          </Link>
        ))}
      </div>

      {/* Long description */}
      {tool.longDesc && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">About {tool.name}</h2>
          <p className="text-zinc-400 leading-relaxed">{tool.longDesc}</p>
        </div>
      )}

      {/* Reviews */}
      <div>
        <h2 className="text-xl font-semibold text-white mb-6">
          Reviews {tool._count.reviews > 0 && <span className="text-zinc-500 font-normal text-base">({tool._count.reviews})</span>}
        </h2>

        {tool.reviews.length > 0 ? (
          <div className="space-y-4">
            {tool.reviews.map((review: { id: string; rating: number; comment?: string; createdAt: string; user: { name?: string; avatar?: string } }) => (
              <div key={review.id} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-sm font-medium text-violet-300">
                    {review.user.name?.[0] || "?"}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{review.user.name || "Anonymous"}</p>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={11} className={i < review.rating ? "text-amber-400 fill-amber-400" : "text-zinc-600"} />
                      ))}
                    </div>
                  </div>
                  <span className="ml-auto text-zinc-600 text-xs">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </span>
                </div>
                {review.comment && <p className="text-zinc-400 text-sm leading-relaxed">{review.comment}</p>}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-zinc-900/30 border border-zinc-800 rounded-xl text-zinc-500">
            <p className="mb-1">No reviews yet</p>
            <p className="text-sm">Be the first to review {tool.name}</p>
          </div>
        )}
      </div>
    </div>
  );
}
