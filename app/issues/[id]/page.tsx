import { notFound, redirect } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { getIssueById, getOrCreateUser } from "@/lib/actions/issueActions";
import StatusForm from "@/components/StatusForm";
import IssueCard from "@/components/EditDelete";
import { auth } from "@clerk/nextjs/server";


interface IssuePageProps {
  params: { id: string };
}

export default async function IssuePage({ params }: IssuePageProps) {

  const { userId } = await auth()

  if (!userId) {
    redirect('/sign-in')
  }
 const { id } = await params; // 👈 await params
  const issueId = Number(id);
  const issue = await getIssueById(issueId);

  const user = await getOrCreateUser()
  const currentUserId = user.id

  if (!issue) return notFound();

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <Card className="bg-zinc-900 text-white border border-zinc-800 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">{issue.title}</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-zinc-300 line-clamp-2">{issue.description}</p>
        </CardContent>

        <CardFooter className="flex items-center justify-between">
          
          <StatusForm issueId={issueId} currentStatus={issue.status} assigneeEmail={issue.assignee?.email} />

        </CardFooter>
      </Card>
      <IssueCard  id={issue.id} title={issue.title} description={issue.description} status={issue.status} creatorId={issue.creatorId} currentUserId={currentUserId} />
    </div>
  );
}
