import { getOrCreateUser } from "@/lib/actions/issueActions";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, assigneeEmail } = body;

    const creator = await getOrCreateUser();

    let assignee = null;
    if (assigneeEmail) {
      assignee = await prisma.user.findUnique({
        where: { email: assigneeEmail.toLowerCase() }, 
      });

      if (!assignee) {
        return NextResponse.json(
          { error: "Assignee not found in system" },
          { status: 400 }
        );
      }
    }

    const issue = await prisma.issue.create({
      data: {
        title,
        description,
        creatorId: creator.id,
        assigneeId: assignee?.id,
      },
    });

    return NextResponse.json(issue, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create issue" },
      { status: 500 }
    );
  }
}
