import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import ProjectForm from "@/components/forms/ProjectForm";
import TaskForm from "@/components/forms/Taskform";
import Link from "next/link";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return <p className="p-4 text-red-500">You must be logged in to view this page.</p>;
  }

  const [projects, tasks] = await Promise.all([
    prisma.project.findMany({
      where: { userId: session.user.id },
    }),
    prisma.task.findMany({
      where: {
        project: {
          userId: session.user.id,
        },
      },
      include: { project: true },
    }),
  ]);

  return (
    <>
      <Navbar />

      <div className="p-6 space-y-10">
        {/* Projects Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Your Projects</h2>

          <div className="mb-4">
            <ProjectForm />
          </div>

          {projects.length > 0 ? (
            <ul className="space-y-2">
              {projects.map((project) => (
                <li key={project.id} className="p-2 border rounded hover:bg-gray-100">
                  <Link href={`/dashboard/projects/${project.id}`} className="text-blue-600 underline">
                    {project.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No projects yet.</p>
          )}
        </section>

        {/* Tasks Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>

          <div className="mb-4">
            {projects.length > 0 ? (
              <TaskForm projectId={projects[0].id} />
            ) : (
              <p className="text-sm text-gray-500">Create a project before adding tasks.</p>
            )}
          </div>

          {tasks.length > 0 ? (
            <ul className="space-y-2">
              {tasks.map((task) => (
                <li key={task.id} className="p-2 border rounded hover:bg-gray-100">
                  <Link href={`/dashboard/tasks/${task.id}`} className="text-green-700 underline">
                    {task.title}
                  </Link>
                  <p className="text-sm text-gray-500">From: {task.project.title}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No tasks yet.</p>
          )}
        </section>
      </div>
    </>
  );
}
