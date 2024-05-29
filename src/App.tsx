import React, { useState } from 'react';
import StartPage from './StartPage';
import QuizPage from './QuizPage';

interface Settings {
  operators: { [key: string]: boolean };
  range: { min: number; max: number };
}

const App: React.FC = () => {
  const [settings, setSettings] = useState<Settings | null>(null);

  return (
    <div className="app">
      {!settings ? (
        <StartPage onStart={(settings) => setSettings(settings)} />
      ) : (
        <QuizPage settings={settings} onReset={() => setSettings(null)} />
      )}
    </div>
  );
};

export default App;
