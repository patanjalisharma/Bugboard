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

interface StatusFormProps {
  issueId: number;
  currentStatus: "OPEN" | "IN_PROGRESS" | "CLOSED";
}

export default function StatusForm({
    issueId,
    currentStatus,
}: StatusFormProps) {
    const router = useRouter()
  const [status, setStatus] = useState(currentStatus);

  async function handleSubmit(formData: FormData) {

    
    const newStatus = formData.get("status") as
      | "OPEN"
      | "IN_PROGRESS"
      | "CLOSED";
    const res = await updateIssueStatus(issueId, newStatus);
    if (res) {
        router.push("/issues")
        toast(`Issue status updated to ${newStatus}`)
    }
    setStatus(newStatus);
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
    <Button type="submit" className="cursor-pointer" size="sm" disabled={pending}>
      {pending ? "Updating..." : "Update"}
    </Button>
  );
}
