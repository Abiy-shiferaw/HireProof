import React from 'react';
import { SignInButton, SignUpButton, UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";

export default async function Home() {
  const { userId } = auth();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-xl font-bold">
            HiredProof
          </Link>
          <div className="flex items-center gap-4">
            {userId ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-gray-700 hover:text-gray-900"
                >
                  Dashboard
                </Link>
                <UserButton afterSignOutUrl="/" />
              </>
            ) : (
              <>
                <SignInButton mode="modal">
                  <button className="text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sign in
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                    Get Started
                  </button>
                </SignUpButton>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Your AI-Powered Career Execution Platform
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Get hired with confidence. HiredProof helps you find career clarity,
              build proof-based applications, and track your job search progress.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              {!userId && (
                <SignUpButton mode="modal">
                  <button className="rounded-md bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-700">
                    Start Your Journey
                  </button>
                </SignUpButton>
              )}
              {userId && (
                <Link
                  href="/onboarding"
                  className="rounded-md bg-blue-600 px-6 py-3 text-lg font-semibold text-white shadow-sm hover:bg-blue-700"
                >
                  Take Career Quiz
                </Link>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 