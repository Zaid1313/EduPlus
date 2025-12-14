// app/api/courses/[id]/route.ts

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  _req: Request,
  context: { params: Promise<{ id?: string }> }
) {
  const { id } = await context.params;

  if (!id) {
    return NextResponse.json(
      { error: "Course ID missing" },
      { status: 400 }
    );
  }

  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "EDUCATOR") {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  // 1️⃣ Delete lessons first
  await prisma.lesson.deleteMany({
    where: { courseId: id },
  });

  // 2️⃣ Then delete course
  await prisma.course.delete({
    where: { id },
  });

  console.log(`Course with ID ${id} and its lessons have been deleted.`);

  return NextResponse.json({ success: true });
}
