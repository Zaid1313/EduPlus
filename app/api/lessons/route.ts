import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "EDUCATOR") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const lesson = await prisma.lesson.create({
    data: {
      title: body.title,
      content: body.content,
        reference: body.reference, // optional
        courseId: body.courseId,
    },
  });

  return NextResponse.json(lesson, { status: 201 });
}
