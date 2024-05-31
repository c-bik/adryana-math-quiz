import React, { useState } from 'react';

interface QuestionProps {
  index: number;
  question: string;
  correctAnswer: string;
  checked: boolean;
  onAnswer: (index: number, answer: string) => void;
}

const Question: React.FC<QuestionProps> = ({ index, question, correctAnswer, checked, onAnswer }) => {
  const [userAnswer, setUserAnswer] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const answer = e.target.value;
    setUserAnswer(answer);
    onAnswer(index, answer);
  };

  return (
    <div className="flex items-center p-4 bg-white rounded shadow">
      <span className="mr-4 flex items-center justify-center bg-blue-500 text-white rounded-full w-8 h-8">
        {index + 1}
      </span>
      <span className="mr-4">{question} = </span>
      <input
        type="number"
        className="p-1 border border-gray-300 rounded w-20"
        value={userAnswer}
        onChange={handleChange}
        disabled={checked}
        style={{
          overflow: 'hidden',
          WebkitAppearance: 'none', // Chrome, Safari, Edge, Opera
          MozAppearance: 'textfield' // Firefox
        }}
      />
      {checked && (
        <span className="ml-4">
          {correctAnswer === userAnswer ? (
            <span className="text-green-500 ml-2">&#10003;</span>
          ) : (
            <span className="text-red-500 ml-2">&#10007;</span>
          )}
        </span>
      )}
    </div>
  );
};

export default Question;
