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
  const [min, setMin] = useState(2);
  const [max, setMax] = useState(100);

  const handleStart = () => {
    onStart({ operators, range: { min, max } });
  };

  const generateOptions = () => {
    const options = [];
    for (let i = 2; i <= 1000; i++) {
      options.push(<option key={i} value={i}>{i}</option>);
    }
    return options;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-xl">
      <h1 className="text-2xl font-bold mb-6">Adryana's Math Quiz</h1>
      <div className="mb-4">
        <div className="flex justify-center m-4">
          <div className="flex space-x-4">
            {['+', '-', '*', '/'].map((op) => (
              <label key={op} className="flex items-center space-x-2 bg-white rounded shadow p-2">
                <span>{op}</span>
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={operators[op]}
                  onChange={(e) => setOperators({ ...operators, [op]: e.target.checked })}
                />
              </label>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <span>Min:</span>
              <select
                className="p-1 border border-gray-300 rounded"
                value={min}
                onChange={(e) => setMin(parseInt(e.target.value))}
              >
                {generateOptions()}
              </select>
            </label>
            <label className="flex items-center space-x-2">
              <span>Max:</span>
              <select
                className="p-1 border border-gray-300 rounded"
                value={max}
                onChange={(e) => setMax(parseInt(e.target.value))}
              >
                {generateOptions()}
              </select>
            </label>
          </div>
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
