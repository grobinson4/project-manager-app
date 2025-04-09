'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function TaskForm({ task, projectId }: { task?: any; projectId: string }) {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState(task?.status || "Not Started");
  const [dueDate, setDueDate] = useState(
    task?.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : ""
  );
  

  const router = useRouter();
  const isEdit = Boolean(task);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = isEdit ? "PUT" : "POST";
    const url = isEdit ? `/api/tasks/${task.id}` : "/api/tasks";

    const body = {
      title,
      description,
      status,
      dueDate: dueDate ? new Date(dueDate) : null,
      projectId,
    };

    const res = await fetch(url, {
      method,
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    if (res.ok) router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
        className="w-full p-2 border"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full p-2 border"
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full p-2 border">
        <option>Not Started</option>
        <option>In Progress</option>
        <option>Done</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="w-full p-2 border"
      />
      <button className="bg-green-600 text-white px-4 py-2 rounded">
        {isEdit ? "Update Task" : "Create Task"}
      </button>
    </form>
  );
}
