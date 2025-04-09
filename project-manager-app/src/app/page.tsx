import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">Welcome to Project Manager</h1>
        <p className="mt-4 text-lg text-gray-600">
          Manage your projects and tasks efficiently.
        </p>
        <div className="mt-6">
          <Link href="/dashboard">
            
              Go to Dashboard
           
          </Link>
        </div>
      </div>
    </div>
  );
}
