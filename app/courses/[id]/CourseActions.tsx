"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CourseActions({ courseId }: { courseId: string }) {
  const router = useRouter();

  async function handleDelete() {
    const ok = confirm("Are you sure you want to delete this course?");
    if (!ok) return;

    const res = await fetch(`/api/courses/${courseId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.push("/courses");
    } else {
      alert("Failed to delete course");
    }
  }

  return (
    <div className="flex gap-3">
      <Link href={`/courses/${courseId}/create-lesson`}>
        <Button className="cursor-pointer">Add Lesson</Button>
      </Link>

      <Link href={`/dashboard/edit-course/${courseId}`}>
        <Button className="cursor-pointer">Edit Course</Button>
      </Link>

      <Button className="cursor-pointer" variant="destructive" onClick={handleDelete}>
        Delete Course
      </Button>
    </div>
  );
}
