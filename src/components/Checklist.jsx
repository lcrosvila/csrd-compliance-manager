import React from 'react';

const disclosures = [
  { id: 'E1', title: 'Climate Change', description: 'Report GHG emissions, climate risks and mitigation actions.' },
  { id: 'S1', title: 'Own Workforce', description: 'Provide data on diversity, equal pay, and employee well-being.' },
  { id: 'G1', title: 'Governance', description: 'Disclose board structure, anti-corruption measures, etc.' },
];

export default function Checklist({ data, setData }) {
  const toggleItem = (id) => {
    const updated = { ...data, [id]: !data[id] };
    setData(updated);
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Checklist</h2>
      <ul>
        {disclosures.map(item => (
          <li key={item.id} className="mb-3">
            <label className="flex items-start space-x-2">
              <input
                type="checkbox"
                checked={!!data[item.id]}
                onChange={() => toggleItem(item.id)}
              />
              <span>
                <strong>{item.title} ({item.id})</strong><br/>
                <small className="text-gray-600">{item.description}</small>
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
