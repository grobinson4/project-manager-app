'use client';

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from 'next/link';


export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-100 border-b">
      <Link href="/dashboard">
      <h1 className="text-xl font-bold">Project Manager</h1>
      </Link>  
      <button
        onClick={() => signOut({ callbackUrl: "/login" })}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </nav>
  );
}
