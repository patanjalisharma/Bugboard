
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const users = await prisma.user.findMany({
    select: { id: true, email: true },
    orderBy: { email: "asc" },
  });
  return NextResponse.json(users);
}
