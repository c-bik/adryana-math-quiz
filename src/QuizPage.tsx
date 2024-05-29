import React, { useState, useEffect } from 'react';
import Question from './Question';

interface QuizPageProps {
  settings: {
    operators: { [key: string]: boolean };
    range: { min: number; max: number };
  };
  onReset: () => void;
}

interface QuestionType {
  question: string;
  answer: string;
}

const generateQuestion = (operators: string[], range: { min: number; max: number }): QuestionType => {
  const op = operators[Math.floor(Math.random() * operators.length)];
  const num1 = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;
  let num2 = Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;

  // Ensure num2 is not 1 for division
  if (op === '/' && num2 === 1) {
    num2 = Math.floor(Math.random() * (range.max - range.min)) + range.min + 1;
  }

  let question = '';
  let answer = 0;

  switch(op) {
    case '+':
      question = `${num1} + ${num2}`;
      answer = num1 + num2;
      break;
    case '-':
      question = `${num1} - ${num2}`;
      answer = num1 - num2;
      break;
    case '*':
      question = `${num1} . ${num2}`;
      answer = num1 * num2;
      break;
    case '/':
      // Ensure division results in an integer and change the division symbol to ':'
      const dividend = num1 * num2; // So the result will always be an integer
      question = `${dividend} : ${num2}`;
      answer = dividend / num2;
      break;
    default:
      break;
  }

  return { question, answer: answer.toString() }; // Store answer as string to compare properly
};

const QuizPage: React.FC<QuizPageProps> = ({ settings, onReset }) => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [checked, setChecked] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!paused) setTimeElapsed(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [paused]);

  useEffect(() => {
    generateQuestions();
  }, [settings]);

  const generateQuestions = () => {
    const newQuestions = [];
    for (let i = 0; i < 10; i++) {
      newQuestions.push(generateQuestion(Object.keys(settings.operators).filter(op => settings.operators[op]), settings.range));
    }
    setQuestions(newQuestions);
    setAnswers({});
    setChecked(false);
    setCorrectCount(0);
    setIncorrectCount(0);
    setPaused(false);
    setTimeElapsed(0);
  };

  const handleCheck = () => {
    let correct = 0;
    let incorrect = 0;
    questions.forEach((q, index) => {
      if (answers[index] && answers[index] === q.answer) {
        correct++;
      } else {
        incorrect++;
      }
    });
    setCorrectCount(correct);
    setIncorrectCount(incorrect);
    setChecked(true);
  };

  const handlePause = () => setPaused(!paused);

  const handleAnswer = (index: number, answer: string) => {
    setAnswers({ ...answers, [index]: answer });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="info mb-6 text-center">
        <div className="mb-2">Correct: {correctCount}</div>
        <div className="mb-2">Incorrect: {incorrectCount}</div>
        <div className="mb-2">Time: {timeElapsed}s</div>
        <button onClick={handlePause} className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-200">
          {paused ? 'Resume' : 'Pause'}
        </button>
      </div>
      {!paused && (
        <div className="questions grid grid-cols-1 md:grid-cols-2 gap-4">
          {questions.map((q, index) => (
            <Question
              key={index}
              index={index}
              question={q.question}
              correctAnswer={q.answer}
              checked={checked}
              onAnswer={handleAnswer}
            />
          ))}
        </div>
      )}
      <div className="mt-6">
        {!checked ? (
          <button onClick={handleCheck} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
            Check
          </button>
        ) : (
          <button onClick={generateQuestions} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200">
            Next
          </button>
        )}
        <button onClick={onReset} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200 ml-4">
          Reset
        </button>
      </div>
    </div>
  );
};

export default QuizPage;
