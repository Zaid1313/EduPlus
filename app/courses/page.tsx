// app/courses/page.tsx

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import TopBar from "@/components/ui/TopBar";

export default async function CoursesPage() {
  const session = await getServerSession(authOptions);

  const courses = await prisma.course.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <TopBar title="Courses" />
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Explore Courses</h1>

        {courses.length === 0 && (
          <p className="text-muted-foreground">No courses available yet.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Link href={`/courses/${course.id}`} key={course.id}>
              <Card className="border-l-4 border-l-primary hover:shadow-md hover:scale-[1.01] transition cursor-pointer">
                <CardHeader className="flex justify-between">
                  <CardTitle>{course.title}</CardTitle>

                  {session?.user.role === "EDUCATOR" && (
                    <span className="text-xs text-primary font-medium">
                      Educator
                    </span>
                  )}
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {course.description}
                  </p>

                  <div className="flex justify-between items-center mt-4 text-xs">
                    <span className="rounded bg-muted px-2 py-1">
                      {course.level}
                    </span>
                    <span className="text-muted-foreground">
                      {course.category}
                    </span>
                  </div>

                  <div className="mt-4 text-right text-sm text-primary font-medium">
                    View Course →
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
