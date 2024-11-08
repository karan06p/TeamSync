import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-blue-600 p-4 text-white flex justify-between items-center">
      <h1 className="text-2xl font-bold">
        <Link href="/">TaskSphere</Link>
      </h1>
      <div className="space-x-4">
        <Link href="/auth/sign-in" className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200">
          Login
        </Link>
        <Link href="/auth/sign-up" className="bg-white text-blue-600 px-4 py-2 rounded hover:bg-gray-200">
          Sign Up
        </Link>
      </div>
    </nav>
  );
}
