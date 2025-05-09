import React from 'react';
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Career Clarity Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Career Clarity</h2>
          <p className="text-gray-600 mb-4">Take our quiz to discover your ideal career path</p>
          <a
            href="/onboarding"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Start Quiz
          </a>
        </div>

        {/* Resume Builder Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Resume Builder</h2>
          <p className="text-gray-600 mb-4">Create an AI-enhanced resume that stands out</p>
          <a
            href="/resume"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Build Resume
          </a>
        </div>

        {/* Job Search Card */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Job Search</h2>
          <p className="text-gray-600 mb-4">Find and track your job applications</p>
          <a
            href="/jobs"
            className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Search Jobs
          </a>
        </div>
      </div>
    </div>
  );
} 