import { NextRequest, NextResponse } from "next/server";
import { getTools } from "@/lib/db";

export async function GET(req: NextRequest) {
  const sp = new URL(req.url).searchParams;
  const result = getTools({
    q:        sp.get("q")        ?? "",
    category: sp.get("category") ?? "",
    pricing:  sp.get("pricing")  ?? "",
    featured: sp.get("featured") ?? "",
    page:     parseInt(sp.get("page")  ?? "1"),
    limit:    parseInt(sp.get("limit") ?? "12"),
  });
  return NextResponse.json(result);
}
