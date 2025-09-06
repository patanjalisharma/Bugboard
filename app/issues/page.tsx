import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"
import { getAllIssues } from "@/lib/actions/issueActions";

const IssuePage = async () => {
  

  const issues = await getAllIssues()
  return (
    <main className="max-w-7xl mx-auto p-10">
     

      <div className="max-w-7xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
    {issues.map((issue) => (

     <Card key={issue.id} className="shadow-md rounded-2xl border border-zinc-800 bg-zinc-900 text-white mt-8">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{issue.title}</CardTitle>
        <CardDescription className="text-zinc-400">Created on: {issue.createdAt.toDateString()}</CardDescription>
      </CardHeader>
      
      <CardContent>
        <p className="line-clamp-3">
          {issue.description}
        </p>
      </CardContent>
      
      <CardFooter className="flex items-center justify-between">
        <Badge
              variant="outline"
              className={
                issue.status === "OPEN"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : issue.status === "IN_PROGRESS"
                  ? "bg-blue-500/20 text-blue-400"
                  : "bg-red-500/20 text-red-400"
              }
            >
              {issue.status.replace("_", " ")}
            </Badge>
            <Link href={`/issues/${issue.id}`}>
        <Button size="sm" variant="secondary" className="cursor-pointer">
          View Issue
        </Button>
        </Link>
      </CardFooter>
    </Card>
    ))}
    </div>
      
    </main>
  );
};

export default IssuePage;
