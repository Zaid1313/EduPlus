// app/courses/[id]/LessonActions.tsx
"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LessonActions({
  lessonId,
  courseId,
}: {
  lessonId: string;
  courseId: string;
}) {
  const router = useRouter();

  async function handleDelete() {
    const ok = confirm("Delete this lesson?");
    if (!ok) return;

    const res = await fetch(`/api/lessons/${lessonId}`, { method: "DELETE" });
    if (res.ok) {router.refresh();}
    else {alert("Failed to delete lesson");}
  }

  return (
    <div className="flex gap-2">
      <Link href={`/courses/${courseId}/edit-lesson/${lessonId}`}>
        <Button className="cursor-pointer" size="sm" variant="outline">
          Edit
        </Button>
      </Link>

      <Button className="cursor-pointer" size="sm" variant="destructive" onClick={handleDelete}>
        Delete
      </Button>
    </div>
  );
}
