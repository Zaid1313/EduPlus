// app/api/lessons/[id]/route.ts

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
    return NextResponse.json({ error: "Lesson ID missing" }, { status: 400 });
  }

  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "EDUCATOR") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.lesson.delete({
    where: { id },
  });

  return NextResponse.json({ success: true });
}
