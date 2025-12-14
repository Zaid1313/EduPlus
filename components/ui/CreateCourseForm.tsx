"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function CreateCourseForm({
  mode = "create",
  initialData,
}: {
  mode?: "create" | "edit";
  initialData?: any;
}) {
  const router = useRouter();
  const isEdit = mode === "edit";

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    category: initialData?.category || "",
    level: initialData?.level || "BEGINNER",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      await fetch("/api/courses", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          isEdit ? { ...form, id: initialData.id } : form
        ),
      });

      toast.success(
        isEdit ? "Course updated" : "Course created"
      );

      router.push("/courses");
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
      <Input
        placeholder="Course Title"
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
        required
      />

      <Textarea
        placeholder="Course Description"
        value={form.description}
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
        className="min-h-[160px]"
        required
      />

      <Input
        placeholder="Category"
        value={form.category}
        onChange={(e) =>
          setForm({ ...form, category: e.target.value })
        }
        required
      />

      <Select
        value={form.level}
        onValueChange={(value) =>
          setForm({ ...form, level: value })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder="Select level" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="BEGINNER">Beginner</SelectItem>
          <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
          <SelectItem value="ADVANCED">Advanced</SelectItem>
        </SelectContent>
      </Select>

      <Button type="submit" disabled={loading} className="w-full">
        {loading
          ? "Saving..."
          : isEdit
          ? "Update Course"
          : "Create Course"}
      </Button>
    </form>
  );
}
