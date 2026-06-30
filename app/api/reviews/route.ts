import { NextResponse } from "next/server";

export async function POST() {
  // Reviews need auth + a database — stub for now
  return NextResponse.json({ message: "Reviews coming soon" }, { status: 200 });
}
