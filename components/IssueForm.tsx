"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { Combobox } from "./ComboBox";
import * as React from "react";

const issueSchema = z.object({
  title: z.string().min(4, "Title must be at least 4 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(500, "Description must be at most 500 characters long"),
  assigneeEmail: z.string().email("Invalid email").optional(),
});

const IssueForm = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const router = useRouter();
  const form = useForm<z.infer<typeof issueSchema>>({
    resolver: zodResolver(issueSchema),
    defaultValues: {
      title: "",
      description: "",
      assigneeEmail: "",
    },
  });

  const [options, setOptions] = React.useState<
    { value: string; label: string }[]
  >([]);

  React.useEffect(() => {
    const loadUsers = async () => {
      const res = await fetch("/api/users");
      if (res.ok) {
        const users: { id: number; email: string }[] = await res.json();
        setOptions(users.map((u) => ({ value: u.email, label: u.email })));
      }
    };
    loadUsers();
  }, []);

  async function onSubmit(values: z.infer<typeof issueSchema>) {
    setIsLoading(true); // start loader
    try {
      const payload = {
        ...values,
        assigneeEmail: values.assigneeEmail
          ? values.assigneeEmail.toLowerCase()
          : undefined,
      };

      const res = await fetch("/api/issues", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        toast.success("Issue has been created.");
        form.reset();
        router.push("/issues");
      } else {
        toast.error("Failed to create issue");
        console.error("Failed to create issue");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="max-w-7xl mx-auto p-4 mt-50">
      <div className="max-w-2xl mx-auto bg-zinc-900 p-8 rounded-4xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Issue Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Issue Description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Assignee Email */}
            <FormField
              control={form.control}
              name="assigneeEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Assign To</FormLabel>
                  <FormControl>
                    <Combobox
                      value={field.value}
                      onChange={field.onChange}
                      options={options}
                      placeholder="Select assignee..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full cursor-pointer"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Issue"}
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default IssueForm;
