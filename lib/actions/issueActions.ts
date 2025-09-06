"use server";

import { revalidatePath } from "next/cache";
import prisma from "../db";
import { currentUser } from "@clerk/nextjs/server";



export async function getAllIssues() {
  return await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
  });
}

export async function getIssueById(id: number) {
  return prisma.issue.findUnique({
    where: { id },
    include: {
      assignee: true, 
      creator: true, 
    },
  });
}

export async function updateIssueStatus(
  id: number,
  status: "OPEN" | "IN_PROGRESS" | "CLOSED"
) {
  const user = await getOrCreateUser();

  const issue = await prisma.issue.findUnique({
    where: { id },
    include: { assignee: true }, // Ensure assignee.email is available
  });

  if (!issue) {
    throw new Error("Issue not found");
  }

  // Make sure there's an assignee
  if (!issue.assignee) {
    throw new Error("This issue has no assignee. Status cannot be updated.");
  }

  // Validate: only the assignee can update
  if (issue.assignee.email.toLowerCase() !== user.email.toLowerCase()) {
    throw new Error("You are not allowed to update the status of this issue.");
  }

  // Update status
  const updated = await prisma.issue.update({
    where: { id },
    data: { status },
  });

  revalidatePath(`/issues/${id}`);
  revalidatePath("/issues");

  return updated;
}
export async function getWeeklyIssueStats() {
  const results = await prisma.issue.groupBy({
    by: ["status"],
    _count: { status: true },
   where: {
  createdAt: {
    gte: new Date(new Date().setDate(new Date().getDate() - 28)),
  },
},


  });

  const summary = { OPEN: 0, IN_PROGRESS: 0, CLOSED: 0 };

  results.forEach((r) => {
    summary[r.status as "OPEN" | "IN_PROGRESS" | "CLOSED"] = r._count.status;
  });

  return [
    {
      week: "Last 4 Weeks",
      ...summary,
    },
  ];
}

export async function getOrCreateUser() {
  const clerkUser = await currentUser();
  if (!clerkUser) throw new Error("You must be logged in.");

  
  let user = await prisma.user.findUnique({
    where: { clerkId: clerkUser.id },
  });

  
  if (!user) {
    user = await prisma.user.findUnique({
      where: { email: clerkUser.emailAddresses[0].emailAddress.toLowerCase() },
    });
  }

  // If still not found, create a new user
  if (!user) {
    user = await prisma.user.create({
      data: {
        clerkId: clerkUser.id,
        email: clerkUser.emailAddresses[0].emailAddress.toLowerCase(),
        name: clerkUser.firstName || "",
      },
    });
  } else if (!user.clerkId) {
    // If email existed but clerkId was empty, update it
    user = await prisma.user.update({
      where: { email: user.email },
      data: { clerkId: clerkUser.id },
    });
  }

  return user;
}


export async function editIssue(
  id: number,
  data: { title?: string; description?: string; status?: "OPEN" | "IN_PROGRESS" | "CLOSED" }
) {
  const user = await getOrCreateUser();

  const issue = await prisma.issue.findUnique({ where: { id } });
  if (!issue) throw new Error("Issue not found");

  // Only creator can edit
  if (issue.creatorId !== user.id) {
    throw new Error("You are not allowed to edit this issue");
  }

  const updatedIssue = await prisma.issue.update({
    where: { id },
    data,
  });

  revalidatePath(`/issues/${id}`);
  revalidatePath("/issues");

  return updatedIssue;
}


export async function deleteIssue(id: number) {

  
  const user = await getOrCreateUser();

  const issue = await prisma.issue.findUnique({ where: { id } });
  if (!issue) throw new Error("Issue not found");

  // Only creator can delete
  if (issue.creatorId !== user.id) {
    throw new Error("You are not allowed to delete this issue");
  }

  await prisma.issue.delete({ where: { id } });

  revalidatePath("/issues");
  
  

  return { success: true };
}

export async function getMyIssues() {
  const user = await getOrCreateUser(); // ensures logged in

  const createdIssues = await prisma.issue.findMany({
    where: { creatorId: user.id },
    orderBy: { createdAt: "desc" },
  });

  const assignedIssues = await prisma.issue.findMany({
    where: { assigneeId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return { createdIssues, assignedIssues };
}