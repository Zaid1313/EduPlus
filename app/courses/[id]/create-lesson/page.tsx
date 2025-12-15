"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export default function CreateLessonPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    content: "",
    reference: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    try {
      const res = await fetch("/api/lessons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          courseId: params.id,
        }),
      });

      if (!res.ok) throw new Error();

      toast.success("Lesson added", {
        description: "Lesson has been added to the course.",
      });

      router.push(`/courses/${params.id}`);
    } catch {
      toast.error("Failed to create lesson");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add Lesson</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Lesson Title"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          required
        />

        <Textarea
          placeholder="Lesson content (explain the topic like W3Schools)"
          value={form.content}
          onChange={(e) =>
            setForm({ ...form, content: e.target.value })
          }
          className="min-h-[200px]"
          required
        />

        <Input
          placeholder="Reference link (optional, e.g. GeeksForGeeks)"
          value={form.reference}
          onChange={(e) =>
            setForm({ ...form, reference: e.target.value })
          }
        />

        <Button className="cursor-pointer" type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Lesson"}
        </Button>
      </form>
    </div>
  );
}
