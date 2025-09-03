'use server'

import { revalidatePath } from "next/cache";
import prisma from "../db"

export async function getAllIssues() {
    return await prisma.issue.findMany({
        orderBy: { createdAt: 'desc' }
    })
}


export async function getIssueById(id: number) {
  return await prisma.issue.findUnique({
    where: { id },
  });
}


export async function updateIssueStatus(id: number, status: "OPEN" | "IN_PROGRESS" | "CLOSED") {
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
        gte: new Date(new Date().setDate(new Date().getDate() - 28)), // last 4 weeks
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