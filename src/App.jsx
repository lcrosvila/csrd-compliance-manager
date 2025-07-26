import { useState, useEffect } from 'react';

const checklistItems = [
  {
    id: 'environment',
    title: 'Environment (E1–E5)',
    explanation: 'Report your environmental impact, including climate change mitigation, pollution, and resource use.',
  },
  {
    id: 'social',
    title: 'Social (S1–S4)',
    explanation: 'Describe social aspects like employee wellbeing, human rights, and community impact.',
  },
  {
    id: 'governance',
    title: 'Governance (G1)',
    explanation: 'Explain governance practices, risk management, and ethics.',
  },
];

export default function App() {
  const [responses, setResponses] = useState(() => {
    const saved = localStorage.getItem('csrdResponses');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('csrdResponses', JSON.stringify(responses));
  }, [responses]);

  const toggleResponse = (id) => {
    setResponses((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const completedCount = Object.values(responses).filter(Boolean).length;
  const totalCount = checklistItems.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col max-w-3xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">CSRD Compliance Manager</h1>
        <p className="text-gray-600">
          A simple tool to help you prepare your CSRD sustainability report.
        </p>
      </header>

      <section className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-green-500 h-4 rounded-full transition-all"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <p className="mt-2 text-sm text-gray-700">{progressPercent}% completed</p>
      </section>

      <main className="space-y-6 flex-grow">
        {checklistItems.map(({ id, title, explanation }) => (
          <div key={id} className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={!!responses[id]}
                  onChange={() => toggleResponse(id)}
                  className="form-checkbox h-5 w-5 text-green-600"
                />
              </label>
            </div>
            <details className="mt-2 text-gray-600 text-sm">
              <summary className="cursor-pointer select-none">What to report</summary>
              <p className="mt-1">{explanation}</p>
            </details>
          </div>
        ))}
      </main>

      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>Progress is saved in your browser automatically.</p>
      </footer>
    </div>
  );
}
