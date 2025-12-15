// app/courses/[id]/edit-lesson/[lessonId]/page.tsx

import { prisma } from "@/lib/prisma";
import LessonForm from "@/components/ui/LessonForm";
import { notFound } from "next/navigation";

export default async function EditLessonPage({
  params,
}: {
  params: Promise<{ id?: string; lessonId?: string }>;
}) {
  const { id, lessonId } = await params;

  if (!id || !lessonId) notFound();

  const lesson = await prisma.lesson.findUnique({
    where: { id: lessonId },
  });

  if (!lesson) notFound();

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Lesson</h1>
      <LessonForm courseId={id} initialData={lesson} />
    </div>
  );
}
