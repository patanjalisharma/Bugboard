"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { editIssue, deleteIssue } from "@/lib/actions/issueActions";
import { Badge } from "./ui/badge";
import { useRouter } from "next/navigation";

interface IssueCardProps {
  id: number;
  title: string;
  description: string;
  status: "OPEN" | "IN_PROGRESS" | "CLOSED";
  creatorId: number;
  currentUserId?: number;
}

export default function IssueCard({
  id,
  title,
  description,
  status,
  creatorId,
  currentUserId,
}: IssueCardProps) {
  const router = useRouter();
  const [editTitle, setEditTitle] = useState(title);
  const [editDescription, setEditDescription] = useState(description);
  const [isLoading, setIsLoading] = useState(false);

  const canEdit = currentUserId === creatorId;

  const handleEdit = async () => {
    setIsLoading(true);
    try {
      await editIssue(id, { title: editTitle, description: editDescription });
      toast.success("Issue updated successfully");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message || "Failed to update issue");
      } else {
        toast.error("Failed to update issue");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this issue?")) return;
    setIsLoading(true);
    try {
      await deleteIssue(id);
      toast.success("Issue deleted successfully");
      router.push("/issues");
    } catch (err: unknown) {
      if (err instanceof Error) {
        toast.error(err.message || "Failed to delete issue");
      } else {
        toast.error("Failed to delete issue");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Badge color logic
  const badgeClass =
    status === "OPEN"
      ? "bg-green-500/20 text-green-400"
      : status === "IN_PROGRESS"
      ? "bg-yellow-500/20 text-yellow-400"
      : "bg-red-500/20 text-red-400";

  return (
    <Card className="m-10 max-w-4xl mx-auto bg-zinc-900">
      <CardHeader>
        <Badge variant="outline" className={badgeClass}>
          {status}
        </Badge>
      </CardHeader>

      {canEdit && (
        <CardContent className="flex gap-2 mt-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Issue</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Input
                  placeholder="Title"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
                <Textarea
                  placeholder="Description"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                />
                <Button onClick={handleEdit} disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="destructive" size="sm" onClick={handleDelete}>
            Delete
          </Button>
        </CardContent>
      )}
    </Card>
  );
}
