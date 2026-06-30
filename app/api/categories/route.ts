import { NextResponse } from "next/server";
import { getCategories } from "@/lib/db";

export async function GET() {
  return NextResponse.json(getCategories());
}
