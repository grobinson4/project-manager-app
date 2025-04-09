import prisma from "@/lib/prisma";
import TaskForm from "@/components/forms/Taskform";
import DeleteTaskButton from "@/components/forms/DeleteTaskButton";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default async function TaskPage({ params }: { params: { taskId: string } }) {
  const task = await prisma.task.findUnique({
    where: { id: params.taskId },
    include: { project: true },
  });

  if (!task) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">Task Not Found</h1>
      </div>
    );
  }

  return (
    <><Navbar /><div className="p-6 space-y-6">
          <h1 className="text-2xl font-bold">Task: {task.title}</h1>

          <div className="text-sm text-gray-500">
              Project:{" "}
              <Link href={`/dashboard/projects/${task.projectId}`} className="underline text-blue-500">
                  {task.project.title}
              </Link>
          </div>

          <section>
              <h2 className="font-semibold mb-2">Edit Task</h2>
              <TaskForm task={task} projectId={task.projectId} />
          </section>

          <DeleteTaskButton id={task.id} />
      </div></>
  );
}
