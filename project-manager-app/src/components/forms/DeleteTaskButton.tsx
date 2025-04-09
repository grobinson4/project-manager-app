'use client';

import { useRouter } from "next/navigation";

type Props = {
  id: string;
};

export default function DeleteTaskButton({ id }: Props) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this task?");
    if (!confirmed) return;

    const res = await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.push("/dashboard/projects"); // or router.back()
    } else {
      alert("Failed to delete task.");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
    >
      Delete Task
    </button>
  );
}
