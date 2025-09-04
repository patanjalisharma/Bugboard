// app/dashboard/page.tsx

import MyIssuesSection from "@/components/MyIssues";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <main className="min-h-screen bg-zinc-950 p-4 sm:p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        
        <MyIssuesSection />
      </div>
    </main>
  );
}
