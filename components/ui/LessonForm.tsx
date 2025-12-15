"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

export default function LessonForm({
  courseId,
  initialData,
}: {
  courseId: string;
  initialData?: any;
}) {
  const router = useRouter();
  const isEdit = Boolean(initialData);

  const [form, setForm] = useState({
    title: initialData?.title ?? "",
    content: initialData?.content ?? "",
    reference: initialData?.reference ?? "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/lessons", {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        isEdit
          ? { ...form, id: initialData.id }
          : { ...form, courseId }
      ),
    });

    router.push(`/courses/${courseId}`);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        placeholder="Lesson Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />

      <Textarea
        placeholder="Lesson Content"
        className="min-h-[200px]"
        value={form.content}
        onChange={(e) => setForm({ ...form, content: e.target.value })}
        required
      />

      <Input
        placeholder="Reference URL (optional)"
        value={form.reference}
        onChange={(e) => setForm({ ...form, reference: e.target.value })}
      />

      <Button className="cursor-pointer" type="submit">
        {isEdit ? "Update Lesson" : "Create Lesson"}
      </Button>
    </form>
  );
}
