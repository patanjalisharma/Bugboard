"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea"
import {  useRouter } from "next/navigation";
const issueSchema = z.object({
  title: z.string().min(4, "Title must atleast 4 characters long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(500, "Description must be at most 500 characters long"),
  
});

const IssueForm = () => {

    const router = useRouter()
  const form = useForm<z.infer<typeof issueSchema>>({
    resolver: zodResolver(issueSchema),
    defaultValues: {
      title: "",
      description: "",
      
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof issueSchema>) {
     const res = await fetch("/api/issues", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
if (res.ok) {
  toast("Issue has been created.");
  form.reset();
  router.push("/issues");
} else {
    toast("Failed to create issue");
    console.error("Failed to create issue");
  }

    console.log(values);
  }
  return (
    <main className="max-w-7xl mx-auto p-4 mt-50">
        <div className="max-w-2xl mx-auto bg-zinc-900 p-8 rounded-4xl">
      <Form {...form}> 
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
          
          <Button className="w-full cursor-pointer hover:bg-gray-300" type="submit">Create Issue</Button>
        </form>
      </Form>
      </div>
    </main>
  );
};

export default IssueForm;
