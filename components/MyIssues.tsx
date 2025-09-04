// app/components/MyIssuesSection.tsx
import { getMyIssues, getOrCreateUser } from "@/lib/actions/issueActions";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import IssueCard from "./EditDelete";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

export default async function MyIssuesSection() {
  const user = await getOrCreateUser();

  const { createdIssues, assignedIssues } = await getMyIssues();

  return (
    <div className="max-w-5xl mx-auto space-y-8 mt-10">
      <div className="flex flex-col items-center bg-zinc-900 p-6 rounded-2xl shadow-md mb-8">
        <Image
          src="https://github.com/shadcn.png"
          alt="Avatar"
          width={96}
          height={96}
          className="w-24 h-24 rounded-full mb-4 border-4 border-zinc-700"
        />
        <h2 className="text-2xl font-bold text-white">{user.name || "User"}</h2>
        <p className="text-zinc-400">{user.email}</p>
      </div>
      {/* Accordion for Created by Me */}
      <Accordion type="single" collapsible>
        <AccordionItem value="created">
          <AccordionTrigger>
            <h2 className="text-2xl font-bold text-white">Created by Me</h2>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 mt-4">
            {createdIssues.length ? (
              createdIssues.map((issue) => (
                <Card
                  key={issue.id}
                  className="bg-zinc-900 text-white border border-zinc-800 shadow-md"
                >
                  <CardHeader className="flex justify-between items-center">
                    <CardTitle className="text-lg">{issue.title}</CardTitle>
                    <Badge
                      variant="outline"
                      className={
                        issue.status === "OPEN"
                          ? "bg-green-500/20 text-green-400"
                          : issue.status === "IN_PROGRESS"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                      }
                    >
                      {issue.status}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-zinc-300 line-clamp-2">
                      {issue.description}
                    </p>
                    <IssueCard
                      id={issue.id}
                      title={issue.title}
                      description={issue.description}
                      status={issue.status}
                      creatorId={issue.creatorId}
                      currentUserId={issue.creatorId}
                    />
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-zinc-400">No issues created by you.</p>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Accordion for Assigned to Me */}
      <Accordion type="single" collapsible>
        <AccordionItem value="assigned">
          <AccordionTrigger>
            <h2 className="text-2xl font-bold text-white">Assigned to Me</h2>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 mt-4">
            {assignedIssues.length ? (
              assignedIssues.map((issue) => (
                <Card
                  key={issue.id}
                  className="bg-zinc-900 text-white border border-zinc-800 shadow-md"
                >
                  <CardHeader className="flex justify-between items-center">
                    <CardTitle className="text-lg">{issue.title}</CardTitle>
                    <Badge
                      variant="outline"
                      className={
                        issue.status === "OPEN"
                          ? "bg-green-500/20 text-green-400"
                          : issue.status === "IN_PROGRESS"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-red-500/20 text-red-400"
                      }
                    >
                      {issue.status}
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-zinc-300 line-clamp-2">
                      {issue.description}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link href={`/issues/${issue.id}`}>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="cursor-pointer"
                      >
                        View Issue
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <p className="text-zinc-400">No issues assigned to you.</p>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
