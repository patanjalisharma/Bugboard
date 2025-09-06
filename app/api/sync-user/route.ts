// app/api/sync-user/route.ts
import { currentUser } from "@clerk/nextjs/server";
import { getOrCreateUser } from "@/lib/actions/issueActions";

export async function POST() {
  const user = await currentUser();
  if (user) await getOrCreateUser();
  return new Response(JSON.stringify({ ok: true }));
}
