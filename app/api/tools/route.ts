import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const pricing = searchParams.get("pricing") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "12");
  const skip = (page - 1) * limit;

  const where: Record<string, unknown> = {};
  if (q) {
    where.OR = [
      { name: { contains: q, mode: "insensitive" } },
      { description: { contains: q, mode: "insensitive" } },
    ];
  }
  if (category) where.category = { slug: category };
  if (pricing) where.pricing = pricing.toUpperCase();

  const [tools, total] = await Promise.all([
    prisma.tool.findMany({
      where,
      include: {
        category: true,
        tags: { include: { tag: true } },
        _count: { select: { reviews: true, favorites: true } },
      },
      orderBy: [{ featured: "desc" }, { viewCount: "desc" }],
      skip,
      take: limit,
    }),
    prisma.tool.count({ where }),
  ]);

  return NextResponse.json({ tools, total, page, totalPages: Math.ceil(total / limit) });
}
