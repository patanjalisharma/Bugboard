"use client";

import { useFormStatus } from "react-dom";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { updateIssueStatus } from "@/lib/actions/issueActions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";

interface StatusFormProps {
  issueId: number;
  currentStatus: "OPEN" | "IN_PROGRESS" | "CLOSED";
  assigneeEmail?: string | null;
}

export default function StatusForm({
  issueId,
  currentStatus,
  assigneeEmail,
}: StatusFormProps) {
  const router = useRouter();
  const { user } = useUser(); // 👈 Clerk logged-in user
  const [status, setStatus] = useState(currentStatus);

  const isAssignee = user?.primaryEmailAddress?.emailAddress === assigneeEmail;

  async function handleSubmit(formData: FormData) {
    const newStatus = formData.get("status") as
      | "OPEN"
      | "IN_PROGRESS"
      | "CLOSED";

    try {
      const res = await updateIssueStatus(issueId, newStatus);
      if (res) {
        router.push("/issues");
        toast.success(`Issue status updated to ${newStatus}`);
      }
      setStatus(newStatus);
    } catch (err) {
      toast.error("You are not allowed to update this issue status.");
      console.error(err);
    }
  }

  if (!isAssignee) {
    return (
      <div className="text-sm text-gray-400">
        Only the assignee can update status.
      </div>
    );
  }

  return (
    <form action={handleSubmit} className="flex items-center gap-3">
      <input type="hidden" name="status" value={status} readOnly />

      <Select
        value={status}
        onValueChange={(value) =>
          setStatus(value as "OPEN" | "IN_PROGRESS" | "CLOSED")
        }
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="OPEN">Open</SelectItem>
          <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
          <SelectItem value="CLOSED">Closed</SelectItem>
        </SelectContent>
      </Select>

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      className="cursor-pointer"
      size="sm"
      disabled={pending}
    >
      {pending ? "Updating..." : "Update"}
    </Button>
  );
}
