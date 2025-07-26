import React, { useState, useEffect } from 'react';
import Checklist from './components/Checklist';
import Report from './components/Report';

export default function App() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem('csrdData');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('csrdData', JSON.stringify(data));
  }, [data]);

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'csrd-compliance.json';
    link.click();
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">CSRD Compliance Manager</h1>
      <Checklist data={data} setData={setData} />
      <button onClick={handleExport} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">Download Report</button>
      <Report data={data} />
    </div>
  );
}
