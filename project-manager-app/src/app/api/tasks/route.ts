import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  const tasks = await prisma.task.findMany({ include: { project: true } });
  return NextResponse.json(tasks);
}

export async function POST(req: Request) {
  const { title, description, status, dueDate, projectId } = await req.json();

  const task = await prisma.task.create({
    data: { title, description, status, dueDate, projectId },
  });

  return NextResponse.json(task);
}
