'use client';

import { useRouter } from "next/navigation";

type Props = {
  id: string;
};

export default function DeleteProjectButton({ id }: Props) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this project?");
    if (!confirmed) return;

    const res = await fetch(`/api/projects/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      router.push("/dashboard/projects");
    } else {
      alert("Failed to delete project.");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
    >
      Delete Project
    </button>
  );
}
