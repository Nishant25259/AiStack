import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { toolId, rating, comment } = await req.json();
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const review = await prisma.review.upsert({
    where: { userId_toolId: { userId: user.id, toolId } },
    create: { userId: user.id, toolId, rating, comment },
    update: { rating, comment },
  });

  return NextResponse.json(review);
}
