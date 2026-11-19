import React, { useState } from 'react';

const areaOptions = [
  'Infrastructure & Construction',
  'Road Construction',
  'Structural Engineering',
  'Engineering & Technical Services',
  'Water & Environment',
  'Agriculture & Rural Development',
  'Waste Management',
  'Software Development',
  'Digital & Technology',
  'Healthcare & Education',
  'Other',
];

// Simple toggleable pill used for multi-select "areas of work" type fields
const TagPill = ({ label, selected, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`text-xs font-medium px-3 py-1.5 rounded-md border transition-colors ${
      selected
        ? 'bg-green-800 border-green-800 text-white'
        : 'bg-gray-100 border-gray-100 text-gray-700 hover:bg-gray-200'
    }`}
  >
    {label}
  </button>
);

const TextArea = (props) => (
  <textarea
    {...props}
    rows={4}
    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-700 focus:border-green-700"
  />
);

const OrgDetails = () => {
  const [selectedAreas, setSelectedAreas] = useState([
    'Road Construction',
    'Structural Engineering',
    'Software Development',
  ]);

  const toggleArea = (area) => {
    setSelectedAreas((prev) =>
      prev.includes(area) ? prev.filter((a) => a !== area) : [...prev, area]
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-bold text-gray-900 mb-1">What Can Your Organization Do?</h2>
        <p className="text-xs text-gray-500 mb-3">Select all areas that apply.</p>
        <div className="flex flex-wrap gap-2">
          {areaOptions.map((area) => (
            <TagPill
              key={area}
              label={area}
              selected={selectedAreas.includes(area)}
              onClick={() => toggleArea(area)}
            />
          ))}
        </div>
      </div>

      <div className="border-t border-gray-100 pt-6">
        <h2 className="text-base font-bold text-gray-900 mb-1">Services & Solutions</h2>
        <p className="text-xs text-gray-500 mb-3">
          Describe the main services, products or solutions your organization can provide.
        </p>
        <TextArea placeholder="Descriptive input" />
      </div>
    </div>
  );
};

export default OrgDetails;