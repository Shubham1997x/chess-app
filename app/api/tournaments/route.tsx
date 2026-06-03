import tournaments from "@/data/tournaments.json"
import type { Tournament } from "@/types/tournament"
import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json(tournaments as Tournament[])
}
