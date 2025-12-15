// app/courses/[id]/page.tsx
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import AISummary from "./AISummary";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import TopBar from "@/components/ui/TopBar";
import CourseActions from "./CourseActions";
import LessonActions from "./LessonActions";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id?: string }>;
}) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  const session = await getServerSession(authOptions);

  const course = await prisma.course.findUnique({
    where: { id },
    include: { lessons: true },
  });

  if (!course) {
    notFound();
  }

  return (
    <>
      <TopBar title={course.title} />
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold">{course.title}</h1>
        <p className="">{course.description}</p>

        <AISummary courseId={course.id} />

        {session?.user.role === "EDUCATOR" && (
          <CourseActions courseId={course.id} />
        )}

        <h2 className="text-xl font-semibold mt-6">Lessons</h2>

        {course.lessons.length === 0 && (
          <p className="text-sm text-muted-foreground">No lessons added yet.</p>
        )}

        <div className="space-y-3">
          {course.lessons.map((lesson) => (
            <Card key={lesson.id}>
              <CardContent className="p-4 space-y-2">
                <p className="font-medium">{lesson.title}</p>

                {session?.user.role === "EDUCATOR" && (
                  <LessonActions lessonId={lesson.id} courseId={course.id} />
                )}

                <p className="text-sm whitespace-pre-line">{lesson.content}</p>

                {lesson.reference && (
                  <a
                    href={lesson.reference}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary underline"
                  >
                    Read more →
                  </a>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
