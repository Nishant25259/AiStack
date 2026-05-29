"use client";

import Link from "next/link";
import { Star, Heart, ExternalLink, Zap, Smartphone } from "lucide-react";
import { Badge } from "./ui/Badge";
import { cn } from "@/lib/utils";

interface Tool {
  id: string;
  name: string;
  slug: string;
  description: string;
  website: string;
  logo?: string;
  pricing: "FREE" | "FREEMIUM" | "PAID";
  featured: boolean;
  verified: boolean;
  apiAvailable: boolean;
  mobileSupport: boolean;
  category: { name: string; icon: string; color: string };
  _count: { reviews: number; favorites: number };
}

const pricingMap = {
  FREE: { label: "Free", variant: "free" as const },
  FREEMIUM: { label: "Freemium", variant: "freemium" as const },
  PAID: { label: "Paid", variant: "paid" as const },
};

export function ToolCard({ tool }: { tool: Tool }) {
  const pricing = pricingMap[tool.pricing];

  return (
    <Link href={`/tools/${tool.slug}`} className="group block">
      <div className={cn(
        "relative h-full rounded-xl border bg-zinc-900/50 p-5 transition-all duration-300",
        "hover:bg-zinc-900 hover:border-zinc-600 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-0.5",
        tool.featured ? "border-violet-500/30" : "border-zinc-800"
      )}>
        {tool.featured && (
          <div className="absolute top-3 right-3">
            <Badge variant="featured">⭐ Featured</Badge>
          </div>
        )}

        {/* Header */}
        <div className="flex items-start gap-3 mb-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 border border-white/5"
            style={{ backgroundColor: tool.category.color + "15" }}
          >
            {tool.logo ? (
              <img src={tool.logo} alt={tool.name} className="w-8 h-8 rounded-lg object-cover" />
            ) : (
              <span>{tool.category.icon}</span>
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="font-semibold text-white text-sm truncate">{tool.name}</h3>
              {tool.verified && <span title="Verified" className="text-sky-400 text-xs">✓</span>}
            </div>
            <span className="text-xs text-zinc-500">{tool.category.name}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2 mb-4">
          {tool.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Badge variant={pricing.variant}>{pricing.label}</Badge>
            {tool.apiAvailable && (
              <Badge variant="default" className="gap-1">
                <Zap size={10} /> API
              </Badge>
            )}
            {tool.mobileSupport && (
              <Badge variant="default" className="gap-1">
                <Smartphone size={10} /> Mobile
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-3 text-zinc-500 text-xs">
            <span className="flex items-center gap-1">
              <Heart size={11} />
              {tool._count.favorites}
            </span>
            <span className="flex items-center gap-1">
              <Star size={11} />
              {tool._count.reviews}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
