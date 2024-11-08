"use client";
import Navbar from "@/components/Navbar";
import Link from "next/link";

const HomePage = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <Navbar />
      <header className="text-center py-10">
        <h1 className="text-4xl font-bold text-blue-600">
          Welcome to TaskSphere
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          The place where your team stays organized and productive!
        </p>
      </header>

      <section className="mt-10 max-w-lg text-center">
        <h2 className="text-2xl font-semibold text-gray-800">Get Started</h2>
        <p className="mt-2 text-gray-600">
          Create a team, assign tasks, and manage projects easily.
        </p>
        <div className="mt-6">
          <Link
            href="/auth/sign-up"
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Sign Up
          </Link>
        </div>
      </section>

      <footer className="mt-auto py-4 text-gray-500">
        &copy; 2024 TaskSphere. All rights reserved.
      </footer>
    </main>
  );
};

export default HomePage;
