import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabaseClient';

export async function POST(req: NextRequest) {
  const { answers, user_id } = await req.json();

  // Compose a prompt for OpenAI
  const prompt = `Given the following answers to a career clarity quiz, suggest an ideal career path, a role fit score (1-100), an estimated income range, and a brief growth outlook.\n\nAnswers: ${JSON.stringify(answers, null, 2)}\n\nRespond in this format:\nCareer Path: <role>\nRole Fit Score: <score>\nIncome Range: <range>\nGrowth Outlook: <outlook>`;

  // Call OpenAI API (replace with your actual OpenAI API key in .env.local)
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Missing OpenAI API key' }, { status: 500 });
  }

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a career coach.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 300,
        temperature: 0.7,
      }),
    });
    const data = await openaiRes.json();
    const careerPath = data.choices?.[0]?.message?.content || '';

    // Save to Supabase
    await supabase.from('career_quiz_results').insert([
      {
        user_id: user_id || null,
        answers,
        career_path: careerPath,
      },
    ]);

    return NextResponse.json({ careerPath });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to get suggestion from OpenAI.' }, { status: 500 });
  }
} 