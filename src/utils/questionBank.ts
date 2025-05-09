export type QuestionType = 'multiple-choice' | 'slider' | 'text';

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
}

export const questions: Question[] = [
  {
    id: 'skills',
    type: 'multiple-choice',
    question: 'What are your top 3 technical skills?',
    options: [
      'Programming/Development',
      'Data Analysis',
      'Design',
      'Project Management',
      'Writing/Content Creation',
      'Marketing',
      'Sales',
      'Customer Service',
      'Research',
      'Other'
    ]
  },
  {
    id: 'work-style',
    type: 'multiple-choice',
    question: 'What work environment do you prefer?',
    options: [
      'Remote',
      'Hybrid',
      'In-office',
      'Flexible'
    ]
  },
  {
    id: 'salary-expectation',
    type: 'slider',
    question: 'What is your target salary range?',
    min: 30000,
    max: 200000,
    step: 10000
  },
  {
    id: 'growth',
    type: 'multiple-choice',
    question: 'What matters most to you in your career?',
    options: [
      'Career Growth',
      'Work-Life Balance',
      'Financial Security',
      'Making an Impact',
      'Learning & Development'
    ]
  }
]; 