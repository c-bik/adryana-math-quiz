import React, { useState } from 'react';

interface StartPageProps {
  onStart: (settings: { operators: { [key: string]: boolean }; range: { min: number; max: number } }) => void;
}

const StartPage: React.FC<StartPageProps> = ({ onStart }) => {
  const [operators, setOperators] = useState<{ [key: string]: boolean }>({
    '+': true,
    '-': true,
    '*': true,
    '/': true,
  });
  const [range, setRange] = useState<{ min: number; max: number }>({ min: 1, max: 10 });

  const handleStart = () => {
    onStart({ operators, range });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Math Quiz</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Select Operators</h3>
          {['+', '-', '*', '/'].map((op) => (
            <label key={op} className="block">
              <input
                type="checkbox"
                className="mr-2"
                checked={operators[op]}
                onChange={(e) => setOperators({ ...operators, [op]: e.target.checked })}
              />
              {op}
            </label>
          ))}
        </div>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Number Range</h3>
          <label className="block mb-2">
            Min:
            <input
              type="number"
              className="ml-2 p-1 border border-gray-300 rounded"
              value={range.min}
              onChange={(e) => setRange({ ...range, min: parseInt(e.target.value) })}
            />
          </label>
          <label className="block">
            Max:
            <input
              type="number"
              className="ml-2 p-1 border border-gray-300 rounded"
              value={range.max}
              onChange={(e) => setRange({ ...range, max: parseInt(e.target.value) })}
            />
          </label>
        </div>
        <button
          onClick={handleStart}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default StartPage;
