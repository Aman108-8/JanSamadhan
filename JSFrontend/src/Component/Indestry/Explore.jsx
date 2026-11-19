import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  User,
  MapPin,
  Building2,
  Droplet,
  Lightbulb,
  Wheat,
  HeartPulse,
  GraduationCap,
  Trash2,
  Sun,
  Send,
  ExternalLink,
  ArrowUpRight,
  X,
} from 'lucide-react';
import Navitem from './Component/Navitem'; // adjust path to wherever Navitem.jsx lives

const priorityStyles = {
  Critical: 'bg-red-50 text-red-500',
  High: 'bg-orange-50 text-orange-600',
  Medium: 'bg-amber-50 text-amber-600',
};

const categoryIcons = {
  Infrastructure: Building2,
  'Water & Sanitation': Droplet,
  Electricity: Lightbulb,
  Agriculture: Wheat,
  Healthcare: HeartPulse,
  Education: GraduationCap,
  Environment: Trash2,
  'Renewable Energy': Sun,
};

const problems = [
  {
    id: 'P-1024',
    title: 'Damaged Road',
    sub: 'Village X',
    category: 'Infrastructure',
    district: 'Khunti',
    date: '17 Sep 2026',
    priority: 'Critical',
    reportCount: 23,
    image: 'https://images.unsplash.com/photo-1545459702-9d3e3b0cb9a6?w=600&q=80',
    description:
      'The main road connecting Village X to the nearby market is severely damaged, making it difficult for villagers to travel, especially during the rainy season.',
    location: 'Village X, Khunti',
    expertise: ['Civil Engineering', 'Road Construction', 'Project Management'],
  },
  {
    id: 'P-1023',
    title: 'Water Supply Issue',
    sub: 'Ward 5',
    category: 'Water & Sanitation',
    district: 'Ranchi',
    date: '18 Sep 2026',
    priority: 'High',
    reportCount: 18,
    image: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?w=600&q=80',
    description:
      'Residents of Ward 5 have been facing irregular and insufficient water supply for the past three weeks, affecting daily household needs.',
    location: 'Ward 5, Ranchi',
    expertise: ['Water Engineering', 'Pipeline Infrastructure'],
  },
  {
    id: 'P-1022',
    title: 'Street Lighting',
    sub: 'Main Road',
    category: 'Electricity',
    district: 'Dumka',
    date: '18 Sep 2026',
    priority: 'Medium',
    reportCount: 12,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80',
    description:
      'Street lights along Main Road have been non-functional for over a month, creating safety concerns for residents during night hours.',
    location: 'Main Road, Dumka',
    expertise: ['Electrical Engineering', 'Solar Infrastructure'],
  },
  {
    id: 'P-1021',
    title: 'Agricultural Land Issue',
    sub: 'Kail Tola',
    category: 'Agriculture',
    district: 'Godda',
    date: '19 Sep 2026',
    priority: 'High',
    reportCount: 15,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80',
    description:
      'Farmers in Kail Tola are struggling with soil degradation affecting crop yield across the region, with several families impacted this season.',
    location: 'Kail Tola, Godda',
    expertise: ['Agronomy', 'Soil Science'],
  },
  {
    id: 'P-1020',
    title: 'Healthcare Center',
    sub: 'Block A',
    category: 'Healthcare',
    district: 'Chatra',
    date: '19 Sep 2026',
    priority: 'Medium',
    reportCount: 20,
    image: 'https://images.unsplash.com/photo-1587351021355-a479a299d2f9?w=600&q=80',
    description:
      'The primary health center in Block A lacks basic medical equipment and has been running without a resident doctor for two months.',
    location: 'Block A, Chatra',
    expertise: ['Healthcare Infrastructure', 'Medical Equipment Supply'],
  },
  {
    id: 'P-1019',
    title: 'Education Building',
    sub: 'School Road',
    category: 'Education',
    district: 'Deoghar',
    date: '20 Sep 2026',
    priority: 'High',
    reportCount: 11,
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&q=80',
    description:
      'The government school building on School Road has structural damage in two classrooms, posing a risk to student safety.',
    location: 'School Road, Deoghar',
    expertise: ['Civil Engineering', 'Structural Repair'],
  },
  {
    id: 'P-1018',
    title: 'Waste Management',
    sub: 'Market Area',
    category: 'Environment',
    district: 'Hazaribagh',
    date: '20 Sep 2026',
    priority: 'Medium',
    reportCount: 9,
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&q=80',
    description:
      'Uncollected waste in the Market Area has been piling up for weeks, creating sanitation and health hazards for local vendors and shoppers.',
    location: 'Market Area, Hazaribagh',
    expertise: ['Waste Management', 'Environmental Engineering'],
  },
  {
    id: 'P-1017',
    title: 'Renewable Energy',
    sub: 'Village Near Dam',
    category: 'Renewable Energy',
    district: 'Pakur',
    date: '21 Sep 2026',
    priority: 'High',
    reportCount: 14,
    image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80',
    description:
      'The village near the dam has no reliable electricity connection and could benefit from a solar micro-grid installation.',
    location: 'Village Near Dam, Pakur',
    expertise: ['Solar Engineering', 'Renewable Energy Systems'],
  },
];

const Explore = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(problems[0]);
  const [page, setPage] = useState(1);

  // Primary action: jump straight to the Challenge tied to this problem.
  // Adjust the route to wherever your Challenge detail page actually lives.
  const goToChallenge = (problem) => {
    navigate(`/industry/challenges/${problem.id}`);
  };

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      <Navitem />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex justify-end flex-shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="w-4 h-4 text-gray-500" />
              </div>
              <div className="leading-tight">
                <p className="text-sm font-medium text-gray-800">Ramesh Singh</p>
                <p className="text-[10px] text-gray-400">Industry Partner</p>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Left: list — only this panel scrolls. Grows to fill the space
              left behind when the detail panel is closed. */}
          <main className="flex-1 min-w-0 overflow-y-auto">
            {/* Filters — sticky so it stays pinned while the table scrolls beneath it */}
            <div className="sticky top-0 z-10 bg-gray-50 px-3 pt-3 pb-3">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-wrap items-center gap-3">
                <div className="relative flex-1 min-w-[220px]">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by problem name, location or keyword..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-md pl-9 pr-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
                  />
                </div>
                <select className="text-sm border border-gray-200 rounded-md px-3 py-1.5 text-gray-600">
                  <option>District</option>
                </select>
                <select className="text-sm border border-gray-200 rounded-md px-3 py-1.5 text-gray-600">
                  <option>Category</option>
                </select>
                <select className="text-sm border border-gray-200 rounded-md px-3 py-1.5 text-gray-600">
                  <option>Priority</option>
                </select>
                <button className="bg-green-900 hover:bg-green-950 text-white text-sm font-medium px-4 py-1.5 rounded-md">
                  Apply Filters
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="px-3 pb-6">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="text-sm font-semibold text-gray-800 mb-4">
                  Showing {problems.length} verified problems
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                        <th className="pb-2 font-medium pr-4">ID</th>
                        <th className="pb-2 font-medium pr-4">Problem</th>
                        <th className="pb-2 font-medium pr-4">Category</th>
                        <th className="pb-2 font-medium pr-4">District</th>
                        <th className="pb-2 font-medium pr-4">Date</th>
                        <th className="pb-2 font-medium pr-4">Priority</th>
                        <th className="pb-2 font-medium pr-4">Status</th>
                        <th className="pb-2 font-medium">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {problems.map((p) => {
                        const CatIcon = categoryIcons[p.category] || Building2;
                        const isActive = selected?.id === p.id;
                        return (
                          <tr
                            key={p.id}
                            onClick={() => setSelected(p)}
                            className={`border-b border-gray-50 last:border-0 cursor-pointer ${
                              isActive ? 'bg-green-50/60' : 'hover:bg-gray-50'
                            }`}
                          >
                            <td className="py-3 pr-4 text-gray-500">{p.id}</td>
                            <td className="py-3 pr-4">
                              <p className="text-gray-800 font-medium">{p.title}</p>
                              <p className="text-[11px] text-gray-400 flex items-center gap-1">
                                <MapPin className="w-3 h-3" /> {p.sub}
                              </p>
                            </td>
                            <td className="py-3 pr-4 text-gray-600">
                              <span className="flex items-center gap-1.5">
                                <CatIcon className="w-3.5 h-3.5 text-gray-400" />
                                {p.category}
                              </span>
                            </td>
                            <td className="py-3 pr-4 text-gray-600">{p.district}</td>
                            <td className="py-3 pr-4 text-gray-600">{p.date}</td>
                            <td className="py-3 pr-4">
                              <span className={`text-xs font-medium px-2 py-1 rounded-full ${priorityStyles[p.priority]}`}>
                                {p.priority}
                              </span>
                            </td>
                            <td className="py-3 pr-4">
                              <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-50 text-green-700">
                                Verified
                              </span>
                            </td>
                            <td className="py-3">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  goToChallenge(p);
                                }}
                                className="bg-green-900 hover:bg-green-950 text-white text-xs font-medium px-3 py-1.5 rounded-md flex items-center gap-1"
                              >
                                View Challenge <ArrowUpRight className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-end gap-1.5 mt-5">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="w-8 h-8 rounded-md border border-gray-200 text-gray-500 text-sm flex items-center justify-center hover:bg-gray-50"
                  >
                    ‹
                  </button>
                  {[1, 2, 3].map((n) => (
                    <button
                      key={n}
                      onClick={() => setPage(n)}
                      className={`w-8 h-8 rounded-md text-sm font-medium flex items-center justify-center ${
                        page === n
                          ? 'bg-green-900 text-white'
                          : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage((p) => Math.min(3, p + 1))}
                    className="w-8 h-8 rounded-md border border-gray-200 text-gray-500 text-sm flex items-center justify-center hover:bg-gray-50"
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>
          </main>

          {/* Right: detail panel — only rendered while a problem is selected */}
          {selected && (
          <aside className="w-80 flex-shrink-0 border-l border-gray-200 bg-gray-50 overflow-y-auto p-5">
            <div className="flex items-center justify-end mb-2">
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close problem details"
                className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="rounded-xl overflow-hidden relative">
              <img src={selected.image} alt={selected.title} className="w-full h-36 object-cover" />
              <span className="absolute top-2 right-2 bg-white/95 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full">
                Verified
              </span>
            </div>

            <p className="text-xs text-gray-400 mt-3">{selected.id}</p>
            <h2 className="text-lg font-bold text-gray-900">{selected.title}</h2>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">{selected.description}</p>

            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-gray-400">
                  <Building2 className="w-3.5 h-3.5" /> Category
                </span>
                <span className="text-gray-800 font-medium">{selected.category}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-gray-400">
                  <MapPin className="w-3.5 h-3.5" /> District
                </span>
                <span className="text-gray-800 font-medium">{selected.district}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-gray-400">
                  <span className="w-3.5 h-3.5 inline-block">●</span> Priority
                </span>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${priorityStyles[selected.priority]}`}>
                  {selected.priority}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Date Reported</span>
                <span className="text-gray-800 font-medium">{selected.date}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Report Count</span>
                <span className="text-gray-800 font-medium">{selected.reportCount}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 mt-5 pt-5">
              <p className="text-sm font-semibold text-gray-800 mb-2">Location</p>
              <div className="h-24 rounded-lg bg-green-50 border border-green-100 flex items-center justify-center relative overflow-hidden">
                <MapPin className="w-5 h-5 text-red-500" />
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-500">{selected.location}</span>
                <a href="#" className="text-xs text-green-700 font-medium flex items-center gap-1 hover:underline">
                  View on Map <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="border-t border-gray-200 mt-5 pt-5">
              <p className="text-sm font-semibold text-gray-800 mb-2">Required Expertise</p>
              <div className="flex flex-wrap gap-2">
                {selected.expertise.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-50 text-green-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => goToChallenge(selected)}
              className="w-full bg-green-900 hover:bg-green-950 text-white text-sm font-medium py-2.5 rounded-md mt-6 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" /> Express Interest
            </button>
          </aside>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explore;