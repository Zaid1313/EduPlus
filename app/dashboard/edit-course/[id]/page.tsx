import CreateCourseForm from "@/components/ui/CreateCourseForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
    const { id } = await params;

  const course = await prisma.course.findUnique({
    where: { id },
  });

  if (!course) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Course</h1>
      <CreateCourseForm
        mode="edit"
        initialData={course}
      />
    </div>
  );
}
