import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ message: "Favorites coming soon" }, { status: 200 });
}
