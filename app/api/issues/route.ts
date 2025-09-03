import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {title, description} = body
    const issue = await prisma.issue.create({
      data: { title, description }, 
    });

    return NextResponse.json(issue, {status: 201})
  } catch (error) {
    return NextResponse.json({error: "Failed to create issue"}, {status: 500})
  }
}