import React, { useState } from 'react';
import { questions, Question } from '../utils/questionBank';
import { useUser } from '@clerk/nextjs';

const OnboardingQuiz: React.FC = () => {
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { user } = useUser();

  const handleChange = (id: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleNext = () => {
    setStep((prev) => prev + 1);
  };

  const handlePrev = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/career-path', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers, user_id: user?.id }),
      });
      const data = await res.json();
      setResult(data.careerPath || 'No suggestion found.');
    } catch (e) {
      setResult('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const q = questions[step];

  return (
    <div className="w-full max-w-lg bg-white rounded-lg shadow p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Career Clarity Quiz</h2>
      {result ? (
        <div className="text-center">
          <h3 className="text-xl font-semibold mb-2">Your Suggested Path</h3>
          <p className="mb-4">{result}</p>
          <button
            className="mt-4 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            onClick={() => {
              setResult(null);
              setStep(0);
              setAnswers({});
            }}
          >
            Retake Quiz
          </button>
        </div>
      ) : (
        <>
          <div className="mb-8">
            <div className="mb-4 font-medium">{q.question}</div>
            {q.type === 'multiple-choice' && q.options && (
              <div className="flex flex-col gap-2">
                {q.options.map((option) => (
                  <label key={option} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={q.id}
                      value={option}
                      checked={answers[q.id] === option}
                      onChange={() => handleChange(q.id, option)}
                    />
                    {option}
                  </label>
                ))}
              </div>
            )}
            {q.type === 'slider' && (
              <div className="flex flex-col items-center">
                <input
                  type="range"
                  min={q.min}
                  max={q.max}
                  step={q.step}
                  value={answers[q.id] || q.min}
                  onChange={(e) => handleChange(q.id, Number(e.target.value))}
                  className="w-full"
                />
                <div className="mt-2 text-sm text-gray-600">
                  {answers[q.id] || q.min}
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-between">
            <button
              className="rounded bg-gray-200 px-4 py-2 text-gray-700 disabled:opacity-50"
              onClick={handlePrev}
              disabled={step === 0}
            >
              Back
            </button>
            {step < questions.length - 1 ? (
              <button
                className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                onClick={handleNext}
                disabled={!answers[q.id]}
              >
                Next
              </button>
            ) : (
              <button
                className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                onClick={handleSubmit}
                disabled={loading || !answers[q.id]}
              >
                {loading ? 'Getting Path...' : 'Get My Path'}
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default OnboardingQuiz; 