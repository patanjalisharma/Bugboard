import { notFound } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { getIssueById } from "@/lib/actions/issueActions";
import StatusForm from "@/components/StatusForm";


interface IssuePageProps {
  params: { id: string };
}

export default async function IssuePage({ params }: IssuePageProps) {
 const { id } = await params; // 👈 await params
  const issueId = Number(id);
  const issue = await getIssueById(issueId);

  if (!issue) return notFound();

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <Card className="bg-zinc-900 text-white border border-zinc-800 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl">{issue.title}</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-zinc-300">{issue.description}</p>
        </CardContent>

        <CardFooter className="flex items-center justify-between">
          
          <StatusForm issueId={issueId} currentStatus={issue.status} />
        </CardFooter>
      </Card>
    </div>
  );
}
