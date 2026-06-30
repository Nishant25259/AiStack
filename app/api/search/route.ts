import { NextRequest, NextResponse } from "next/server";
import { searchTools } from "@/lib/db";

export async function GET(req: NextRequest) {
  const q = new URL(req.url).searchParams.get("q") ?? "";
  return NextResponse.json(searchTools(q, 8));
}
