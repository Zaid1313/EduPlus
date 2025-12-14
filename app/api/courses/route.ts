// app/api/courses/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createCourseSchema } from "@/lib/validations/course";

export async function GET() {
  const courses = await prisma.course.findMany({
    include: {
      author: {
        select: { name: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(courses);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "EDUCATOR") {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await req.json();
  const parsed = createCourseSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const course = await prisma.course.create({
    data: {
      ...parsed.data,
      authorId: session.user.id,
    },
  });

  return NextResponse.json(course, { status: 201 });
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "EDUCATOR") {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = await req.json();

  if (!body.id) {
    return NextResponse.json(
      { error: "Course ID is required" },
      { status: 400 }
    );
  }

  const parsed = createCourseSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const course = await prisma.course.updateMany({
    where: {
      id: body.id,
      authorId: session.user.id, // 🔐 ownership check
    },
    data: parsed.data,
  });

  if (course.count === 0) {
    return NextResponse.json(
      { error: "Course not found or unauthorized" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true });
}
