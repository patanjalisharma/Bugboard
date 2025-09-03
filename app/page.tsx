import WeeklyIssuesChart from "@/components/IssuesChart";
import { Button } from "@/components/ui/button";
import { getWeeklyIssueStats } from "@/lib/actions/issueActions";
import Link from "next/link";

export default async function DashboardPage() {
  const weeklyData = await getWeeklyIssueStats();

  return (
    <div className="max-w-5xl mx-auto mt-10 ">

      <WeeklyIssuesChart data={weeklyData} />
       <div className="max-w-3xl mx-auto mt-10 flex justify-center items-center gap-4">
        <Link href="/issues">
          <Button className=" cursor-pointer rounded-3xl py-7 hover:bg-gray-300">
            View All Issues
          </Button>
        </Link>
        <Link href="/issues/new">
          <Button variant={"outline"} className=" cursor-pointer rounded-3xl py-7 hover:bg-gray-300">
            Create a new Issue
          </Button>
        </Link>
      </div>
    </div>
  );
}