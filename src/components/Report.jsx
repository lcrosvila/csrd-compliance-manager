import React from 'react';

export default function Report({ data }) {
  const completed = Object.values(data).filter(Boolean).length;
  const total = Object.keys(data).length;

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-2">Progress Report</h2>
      <p>{completed} of {total} items completed.</p>
      <progress value={completed} max={total} className="w-full mt-2"></progress>
    </div>
  );
}
