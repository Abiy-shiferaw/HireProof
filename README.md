# HiredProof

AI-powered career execution platform that helps users find career clarity, build proof-based applications, and track job search progress.

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with the following variables:
   ```
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

   # OpenAI
   OPENAI_API_KEY=your-openai-api-key

   # Clerk
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
   CLERK_SECRET_KEY=your-clerk-secret-key
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- Supabase (Database + Auth)
- OpenAI API
- Clerk (Authentication)

## Project Structure

```
/hiredproof
├── /src
│   ├── /app
│   ├── /components
│   ├── /lib
│   └── /utils
├── /public
└── [config files]
```

## Features

1. Career Clarity Engine
   - Onboarding quiz
   - AI-powered career suggestions
   - Role fit scoring

2. Resume + Proof Builder
   - AI-enhanced resume creation
   - Template selection
   - Proof section integration

3. Job Search Engine
   - AI-powered job matching
   - One-click applications
   - Application tracking

4. Daily Execution Hub
   - Action planning
   - Progress tracking
   - Streak system 