import prisma from "@/lib/prisma";
import ProjectForm from "@/components/forms/ProjectForm";
import TaskForm from "@/components/forms/Taskform";
import DeleteProjectButton from "@/components/forms/DeleteProjectButton";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const project = await prisma.project.findUnique({
    where: { id: params.id },
    include: { tasks: true },
  });

  if (!project) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold">Project Not Found</h1>
      </div>
    );
  }

  return (
    <><Navbar /><div className="p-6 space-y-6">
          <h1 className="text-2xl font-bold">Project: {project.title}</h1>

          <section>
              <h2 className="font-semibold mb-2">Edit Project</h2>
              <ProjectForm project={project} />
          </section>

          <DeleteProjectButton id={project.id} />

          <section className="mt-10">
              <h2 className="text-xl font-semibold mb-2">Tasks</h2>

              {project.tasks.length > 0 ? (
                  <ul className="space-y-2">
                      {project.tasks.map((task) => (
                          <li key={task.id} className="border p-2 rounded hover:bg-gray-100">
                              <Link href={`/dashboard/tasks/${task.id}`} className="text-blue-600 underline">
                                  {task.title}
                              </Link>
                              <p className="text-sm text-gray-600">{task.status}</p>
                          </li>
                      ))}
                  </ul>
              ) : (
                  <p>No tasks yet.</p>
              )}
          </section>

          <section className="mt-6">
              <h3 className="font-semibold mb-2">Create a Task</h3>
              <TaskForm projectId={project.id} />
          </section>
      </div></>
  );
}
