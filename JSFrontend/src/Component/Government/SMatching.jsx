import React, { useState } from 'react';
import {
  LayoutDashboard, FileText, Layers, Flag, Users, ClipboardList,
  Activity, BarChart3, Bell, Settings, Search, User,
} from 'lucide-react';
import Navitem from './Navitem'; // adjust path to wherever Navitem.jsx lives

const universityMatches = [
  { rank: 1, name: 'BIT Mesra', expertise: 'Civil Engineering, Infrastructure', location: 'Ranchi', availability: 'Available' },
  { rank: 2, name: 'Jharkhand Technical University', expertise: 'Civil Engineering, GIS', location: 'Ranchi', availability: 'Available' },
  { rank: 3, name: 'National Institute of Technology', expertise: 'Civil Engineering, Smart Infrastructure', location: 'Jamshedpur', availability: 'Limited' },
  { rank: 4, name: 'Central University of Jharkhand', expertise: 'Rural Development, Infrastructure', location: 'Ranchi', availability: 'Available' },
  { rank: 4, name: 'Central University of Jharkhand', expertise: 'Rural Development, Infrastructure', location: 'Ranchi', availability: 'Available' },
];

const industryMatches = [
  { rank: 1, name: 'Tata Steel CSR', expertise: 'Infrastructure, Rural Development', location: 'Jamshedpur', availability: 'Available' },
  { rank: 2, name: 'L&T Construction', expertise: 'Civil Engineering, Roadworks', location: 'Ranchi', availability: 'Available' },
  { rank: 3, name: 'Birla Corporation', expertise: 'Cement, Infrastructure', location: 'Dhanbad', availability: 'Limited' },
];

const matchBreakdown = [
  { label: 'Expertise Match', value: 40 },
  { label: 'Location', value: 20 },
  { label: 'Availability', value: 15 },
  { label: 'Past Performance', value: 15 },
  { label: 'Workload', value: 10 },
];

const availabilityColor = (status) =>
  status === 'Available' ? 'text-green-600' : 'text-amber-600';

const SMatching = () => {
  const [tab, setTab] = useState('university');
  const matches = tab === 'university' ? universityMatches : industryMatches;

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <Navitem/>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
          <div className="relative w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-gray-50 border border-gray-200 rounded-md pl-9 pr-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="text-sm text-gray-600 border border-gray-200 rounded-md px-3 py-1.5 flex items-center gap-1">
              All Districts <span className="text-[10px]">▾</span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="w-4 h-4 text-gray-500" />
              </div>
              <div className="leading-tight">
                <p className="text-sm font-medium text-gray-800">Ramesh Singh</p>
                <p className="text-[10px] text-gray-400">Officer, Urban Development</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page body: matches + detail panel */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left: matches */}
          <main className="flex-1 overflow-y-auto p-6 space-y-5">
            <div>
              <h1 className="text-xl font-bold text-gray-900">Solver Matching</h1>
              <p className="text-sm text-gray-500 mt-1">
                Find the most suitable organization to address verified community problems.
              </p>
            </div>

            {/* Selected problem banner */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-5 py-3 flex flex-wrap items-center gap-x-8 gap-y-1 text-sm">
              <span className="text-gray-500">
                Selected Problem: <span className="font-semibold text-gray-800">#1024 — Damaged Road - Village X</span>
              </span>
              <span className="text-gray-500">
                District: <span className="font-semibold text-gray-800">Khunti</span>
              </span>
              <span className="text-gray-500">
                Category: <span className="font-semibold text-gray-800">Infrastructure</span>
              </span>
            </div>

            {/* Tabs */}
            <div className="flex gap-2">
              <button
                onClick={() => setTab('university')}
                className={`px-5 py-2 text-sm font-medium rounded-md border ${
                  tab === 'university'
                    ? 'bg-white border-gray-300 text-gray-900'
                    : 'bg-gray-100 border-gray-100 text-gray-500'
                }`}
              >
                University
              </button>
              <button
                onClick={() => setTab('industry')}
                className={`px-5 py-2 text-sm font-medium rounded-md border ${
                  tab === 'industry'
                    ? 'bg-white border-gray-300 text-gray-900'
                    : 'bg-gray-100 border-gray-100 text-gray-500'
                }`}
              >
                Industry
              </button>
            </div>

            {/* Matches table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <h3 className="text-sm font-semibold text-gray-800">
                {tab === 'university' ? 'University Matches' : 'Industry Matches'}
              </h3>
              <p className="text-xs text-gray-500 mt-1 mb-4">
                {tab === 'university' ? 'Universities' : 'Industry partners'} ranked according to expertise, availability and previous performance.
              </p>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                    <th className="pb-2 font-medium pr-4">Rank</th>
                    <th className="pb-2 font-medium pr-4">{tab === 'university' ? 'University' : 'Organization'}</th>
                    <th className="pb-2 font-medium pr-4">Expertise</th>
                    <th className="pb-2 font-medium pr-4">Location</th>
                    <th className="pb-2 font-medium">Availability</th>
                  </tr>
                </thead>
                <tbody>
                  {matches.map((m, i) => (
                    <tr key={`${m.name}-${i}`} className="border-b border-gray-50 last:border-0">
                      <td className="py-3 pr-4 text-gray-700">{m.rank}</td>
                      <td className="py-3 pr-4 text-gray-800 font-medium">{m.name}</td>
                      <td className="py-3 pr-4 text-gray-600">{m.expertise}</td>
                      <td className="py-3 pr-4 text-gray-600">{m.location}</td>
                      <td className={`py-3 font-medium ${availabilityColor(m.availability)}`}>{m.availability}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </main>

          {/* Right: detail panel */}
          <aside className="w-80 flex-shrink-0 border-l border-gray-200 bg-white overflow-y-auto p-5">
            <h2 className="text-base font-bold text-gray-900">BIT Mesra</h2>
            <p className="text-sm text-gray-500 mt-0.5">Type: University</p>

            <div className="mt-4">
              <p className="text-xs text-gray-400">Expertise:</p>
              <p className="text-sm text-gray-700 mt-1">Civil Engineering, Road Infrastructure, GIS Mapping</p>
            </div>

            <div className="mt-4 space-y-2 text-sm">
              <p><span className="text-gray-400">Location:</span> <span className="text-gray-700">Ranchi</span></p>
              <p><span className="text-gray-400">Available Team:</span> <span className="text-gray-700">12 Members</span></p>
              <p><span className="text-gray-400">Previous Projects:</span> <span className="text-gray-700">8</span></p>
              <p><span className="text-gray-400">Success Rate:</span> <span className="text-gray-700">92%</span></p>
              <p><span className="text-gray-400">Current Workload:</span> <span className="text-gray-700">Low</span></p>
            </div>

            <div className="mt-5">
              <p className="text-xs font-semibold text-gray-700">Why this organization matches:</p>
              <p className="text-sm text-gray-600 mt-1 italic leading-relaxed">
                "Strong expertise in civil engineering and road infrastructure with previous experience in similar projects."
              </p>
            </div>

            <div className="mt-5">
              <p className="text-xs font-semibold text-gray-700 mb-3">Matching Breakdown</p>
              <div className="space-y-2.5">
                {matchBreakdown.map((m) => (
                  <div key={m.label} className="flex items-center gap-3 text-xs">
                    <span className="text-gray-500 w-28 flex-shrink-0">{m.label}</span>
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-600 rounded-full" style={{ width: `${m.value}%` }} />
                    </div>
                    <span className="text-gray-700 font-medium w-8 text-right">{m.value}%</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                <span className="text-sm font-semibold text-gray-800">Overall Match:</span>
                <span className="text-sm font-bold text-green-700">94%</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <button className="border border-gray-300 text-gray-700 text-sm font-medium py-2 rounded-md">
                [Close]
              </button>
              <button className="bg-green-900 hover:bg-green-950 text-white text-sm font-medium py-2 rounded-md">
                [Assign Solver]
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default SMatching;