import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const tool = await prisma.tool.findUnique({
    where: { slug: id },
    include: {
      category: true,
      tags: { include: { tag: true } },
      reviews: {
        include: { user: { select: { name: true, avatar: true } } },
        orderBy: { createdAt: "desc" },
        take: 20,
      },
      _count: { select: { reviews: true, favorites: true } },
    },
  });

  if (!tool) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.tool.update({ where: { id: tool.id }, data: { viewCount: { increment: 1 } } });

  return NextResponse.json(tool);
}
