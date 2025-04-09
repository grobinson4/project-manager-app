'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function ProjectForm({ project }: { project?: any }) {
  const [title, setTitle] = useState(project?.title || "");
  const [description, setDescription] = useState(project?.description || "");
  const router = useRouter();

  const isEdit = Boolean(project);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = isEdit ? "PUT" : "POST";
    const url = isEdit ? `/api/projects/${project.id}` : "/api/projects";

    const res = await fetch(url, {
      method,
      body: JSON.stringify({ title, description }),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) router.refresh();
  };

  return (
    
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Project title"
        className="w-full p-2 border"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full p-2 border"
      />
      <button className="bg-blue-600 text-white px-4 py-2 rounded">
        {isEdit ? "Update Project" : "Create Project"}
      </button>
    </form>
  );
}
