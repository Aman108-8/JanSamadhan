import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  User,
  MapPin,
  Briefcase,
  Building2,
  Droplet,
  Zap,
  Wheat,
  HeartPulse,
  Leaf,
  Calendar,
  CalendarCheck,
  TrendingUp,
  ClipboardList,
  CheckCircle2,
  Circle,
  ChevronDown,
  Send,
  X,
} from 'lucide-react';
import Navitem from './Component/Navitem'; // adjust path to wherever Navitem.jsx lives

const categoryIcons = {
  Infrastructure: Building2,
  'Water & Sanitation': Droplet,
  Electricity: Zap,
  Agriculture: Wheat,
  Healthcare: HeartPulse,
  Environment: Leaf,
};

const statusStyles = {
  Ongoing: 'bg-green-50 text-green-700',
  'In Progress': 'bg-blue-50 text-blue-600',
  'On Hold': 'bg-amber-50 text-amber-600',
};

const tabs = ['All Projects', 'Ongoing', 'In Progress', 'On Hold'];

const projects = [
  {
    id: 'P-1024',
    name: 'Road Repair Project',
    org: 'ABC Infra Ltd.',
    problem: 'Damaged Rural Road',
    location: 'Khunti',
    region: 'Jharkhand',
    category: 'Infrastructure',
    progress: 70,
    status: 'Ongoing',
    image: 'https://images.unsplash.com/photo-1545459702-9d3e3b0cb9a6?w=600&q=80',
    description:
      'Repair and upgrade the damaged rural road connecting Village X to the nearby market to improve accessibility, especially during the rainy season.',
    startDate: '10 Sep 2026',
    expectedCompletion: '30 Nov 2026',
    problemDetails:
      'Damaged road with multiple potholes and water logging issues. Affects daily commute and transport of local goods.',
    nextSteps: [
      { label: 'Site inspection completed', done: true },
      { label: 'Design proposal submitted', done: true },
      { label: 'Awaiting government approval', done: false },
    ],
  },
  {
    id: 'P-1023',
    name: 'Water Supply Upgrade',
    org: 'GreenBuild Pvt. Ltd.',
    problem: 'Village Water Supply Issue',
    location: 'Ranchi',
    region: 'Jharkhand',
    category: 'Water & Sanitation',
    progress: 40,
    status: 'In Progress',
    image: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?w=600&q=80',
    description:
      'Upgrade the village water supply network to ensure consistent access to clean water for all households in the ward.',
    startDate: '02 Sep 2026',
    expectedCompletion: '15 Dec 2026',
    problemDetails:
      'Irregular and insufficient water supply affecting daily household needs across the ward.',
    nextSteps: [
      { label: 'Site survey completed', done: true },
      { label: 'Material procurement', done: false },
      { label: 'Pipeline installation', done: false },
    ],
  },
  {
    id: 'P-1022',
    name: 'Solar Street Lights',
    org: 'SunBright Energy',
    problem: 'Street Lighting Problem',
    location: 'Dumka',
    region: 'Jharkhand',
    category: 'Electricity',
    progress: 90,
    status: 'Ongoing',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80',
    description:
      'Install solar-powered street lights along Main Road to improve safety and visibility during night hours.',
    startDate: '15 Aug 2026',
    expectedCompletion: '10 Oct 2026',
    problemDetails:
      'Non-functional street lights for over a month creating safety concerns for residents at night.',
    nextSteps: [
      { label: 'Poles installed', done: true },
      { label: 'Solar panels mounted', done: true },
      { label: 'Final commissioning', done: false },
    ],
  },
  {
    id: 'P-1021',
    name: 'Farm Land Development',
    org: 'AgriTech Solutions',
    problem: 'Agricultural Land Issue',
    location: 'Godda',
    region: 'Jharkhand',
    category: 'Agriculture',
    progress: 60,
    status: 'In Progress',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&q=80',
    description:
      'Improve soil quality and irrigation access for farmers in Kail Tola affected by land degradation.',
    startDate: '20 Aug 2026',
    expectedCompletion: '05 Dec 2026',
    problemDetails:
      'Soil degradation affecting crop yield across the region, impacting several farming families.',
    nextSteps: [
      { label: 'Soil testing completed', done: true },
      { label: 'Treatment plan approved', done: false },
      { label: 'Field implementation', done: false },
    ],
  },
  {
    id: 'P-1020',
    name: 'Health Center Upgrade',
    org: 'MedLife Pvt. Ltd.',
    problem: 'Healthcare Facility Improvement',
    location: 'Chatra',
    region: 'Jharkhand',
    category: 'Healthcare',
    progress: 30,
    status: 'Ongoing',
    image: 'https://images.unsplash.com/photo-1587351021355-a479a299d2f9?w=600&q=80',
    description:
      'Equip the primary health center in Block A with essential medical equipment and staffing support.',
    startDate: '05 Sep 2026',
    expectedCompletion: '20 Jan 2027',
    problemDetails:
      'The health center lacks basic medical equipment and has had no resident doctor for two months.',
    nextSteps: [
      { label: 'Needs assessment completed', done: true },
      { label: 'Equipment sourcing', done: false },
      { label: 'Staff recruitment', done: false },
    ],
  },
  {
    id: 'P-1019',
    name: 'Waste Management System',
    org: 'EcoCare Ltd.',
    problem: 'Waste Management Issue',
    location: 'Hazaribagh',
    region: 'Jharkhand',
    category: 'Environment',
    progress: 20,
    status: 'In Progress',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&q=80',
    description:
      'Set up a structured waste collection and disposal system for the Market Area to resolve ongoing sanitation issues.',
    startDate: '25 Sep 2026',
    expectedCompletion: '28 Feb 2027',
    problemDetails:
      'Uncollected waste piling up for weeks, creating sanitation and health hazards for vendors and shoppers.',
    nextSteps: [
      { label: 'Site assessment completed', done: true },
      { label: 'Vendor selection', done: false },
      { label: 'Collection system setup', done: false },
    ],
  },
];

const tabCounts = {
  'All Projects': projects.length,
  Ongoing: projects.filter((p) => p.status === 'Ongoing').length,
  'In Progress': projects.filter((p) => p.status === 'In Progress').length,
  'On Hold': projects.filter((p) => p.status === 'On Hold').length,
};

const MyProject = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All Projects');
  const [selected, setSelected] = useState(projects[0]);
  const [page, setPage] = useState(1);
  const [stepsOpen, setStepsOpen] = useState(true);

  // Adjust this route to wherever UpdateProject.jsx is actually mounted.
  const goToUpdate = (project) => {
    navigate(`/industry/projects/${project.id}/update`);
  };

  const visibleProjects =
    activeTab === 'All Projects' ? projects : projects.filter((p) => p.status === activeTab);

  return (
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      <Navitem />

      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between flex-shrink-0">
          <div className="relative w-96">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search problems, locations, categories..."
              className="w-full bg-gray-50 border border-gray-200 rounded-md pl-9 pr-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="text-sm text-gray-600 border border-gray-200 rounded-md px-3 py-1.5 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5" /> All Districts <ChevronDown className="w-3.5 h-3.5" />
            </button>
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
          {/* Left: list */}
          <main className="flex-1 min-w-0 overflow-y-auto">
            <div className="px-6 pt-6">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-5 h-5 text-green-700" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">My Projects</h1>
                  <p className="text-sm text-gray-500 mt-1">
                    Track your active projects, monitor progress and view updates. Your contributions
                    are making a difference.
                  </p>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-6 mt-5 border-b border-gray-200">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex items-center gap-2 pb-3 text-sm font-medium border-b-2 -mb-px ${
                      activeTab === tab
                        ? 'text-green-800 border-green-800'
                        : 'text-gray-500 border-transparent hover:text-gray-700'
                    }`}
                  >
                    {tab}
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        activeTab === tab ? 'bg-green-800 text-white' : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {tabCounts[tab]}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Filters */}
            <div className="px-6 mt-5">
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex flex-wrap items-center gap-3">
                <div className="relative flex-1 min-w-[220px]">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by project name, location or ID..."
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
                  <option>Status</option>
                </select>
                <button className="bg-green-900 hover:bg-green-950 text-white text-sm font-medium px-4 py-1.5 rounded-md">
                  Apply Filters
                </button>
                <button className="text-sm text-gray-500 px-2 py-1.5">Reset</button>
              </div>
            </div>

            {/* Table */}
            <div className="px-6 mt-5 pb-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                      <th className="pb-2 font-medium pr-4">ID</th>
                      <th className="pb-2 font-medium pr-4">Project Name</th>
                      <th className="pb-2 font-medium pr-4">Problem/Challenge</th>
                      <th className="pb-2 font-medium pr-4">Location</th>
                      <th className="pb-2 font-medium pr-4">Category</th>
                      <th className="pb-2 font-medium pr-4">Progress</th>
                      <th className="pb-2 font-medium pr-4">Status</th>
                      <th className="pb-2 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleProjects.map((p) => {
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
                          <td className="py-3 pr-4 text-gray-500 align-top">{p.id}</td>
                          <td className="py-3 pr-4 align-top">
                            <p className="text-gray-800 font-medium">{p.name}</p>
                            <p className="text-[11px] text-gray-400">By {p.org}</p>
                          </td>
                          <td className="py-3 pr-4 text-gray-600 align-top">{p.problem}</td>
                          <td className="py-3 pr-4 align-top">
                            <p className="text-gray-600 flex items-center gap-1">
                              <MapPin className="w-3 h-3 text-gray-400" /> {p.location}
                            </p>
                            <p className="text-[11px] text-gray-400 ml-4">{p.region}</p>
                          </td>
                          <td className="py-3 pr-4 text-gray-600 align-top">
                            <span className="flex items-center gap-1.5">
                              <CatIcon className="w-3.5 h-3.5 text-gray-400" />
                              {p.category}
                            </span>
                          </td>
                          <td className="py-3 pr-4 align-top w-32">
                            <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                              <span>{p.progress}%</span>
                              <span>{p.progress}%</span>
                            </div>
                            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                              <div className="h-full bg-green-600 rounded-full" style={{ width: `${p.progress}%` }} />
                            </div>
                          </td>
                          <td className="py-3 pr-4 align-top">
                            <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[p.status]}`}>
                              {p.status}
                            </span>
                          </td>
                          <td className="py-3 align-top">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                goToUpdate(p);
                              }}
                              className="bg-green-900 hover:bg-green-950 text-white text-xs font-medium px-3 py-1.5 rounded-md flex items-center gap-1 whitespace-nowrap"
                            >
                              Update ›
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between mt-5">
                <p className="text-xs text-gray-400">
                  Showing 1–{visibleProjects.length} of {visibleProjects.length} projects
                </p>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="w-8 h-8 rounded-md border border-gray-200 text-gray-500 text-sm flex items-center justify-center hover:bg-gray-50"
                  >
                    ‹
                  </button>
                  <button className="w-8 h-8 rounded-md bg-green-900 text-white text-sm font-medium flex items-center justify-center">
                    {page}
                  </button>
                  <button
                    onClick={() => setPage((p) => p + 1)}
                    className="w-8 h-8 rounded-md border border-gray-200 text-gray-500 text-sm flex items-center justify-center hover:bg-gray-50"
                  >
                    ›
                  </button>
                </div>
              </div>
            </div>
          </main>

          {/* Right: detail panel */}
          {selected && (
            <aside className="w-80 flex-shrink-0 border-l border-gray-200 bg-gray-50 overflow-y-auto p-5">
              <div className="flex items-center justify-end mb-2">
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  aria-label="Close project details"
                  className="w-7 h-7 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-700 hover:bg-gray-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="rounded-xl overflow-hidden relative -mt-2">
                <img src={selected.image} alt={selected.name} className="w-full h-36 object-cover" />
                <span className={`absolute top-2 right-2 text-xs font-medium px-2.5 py-1 rounded-full bg-white/95 ${
                  selected.status === 'Ongoing' ? 'text-green-700' : 'text-blue-600'
                }`}>
                  {selected.status}
                </span>
              </div>

              <h2 className="text-lg font-bold text-gray-900 mt-3">{selected.name}</h2>
              <p className="text-xs text-gray-400">{selected.id}</p>
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
                    <MapPin className="w-3.5 h-3.5" /> Location
                  </span>
                  <span className="text-gray-800 font-medium">
                    {selected.location}, {selected.region}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-gray-400">
                    <Calendar className="w-3.5 h-3.5" /> Start Date
                  </span>
                  <span className="text-gray-800 font-medium">{selected.startDate}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-gray-400">
                    <CalendarCheck className="w-3.5 h-3.5" /> Expected Completion
                  </span>
                  <span className="text-gray-800 font-medium">{selected.expectedCompletion}</span>
                </div>
                <div>
                  <span className="flex items-center gap-2 text-gray-400 mb-1">
                    <TrendingUp className="w-3.5 h-3.5" /> Progress
                  </span>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-600 rounded-full"
                        style={{ width: `${selected.progress}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-700">{selected.progress}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-100 rounded-xl p-4 mt-5">
                <p className="text-sm font-semibold text-green-900 flex items-center gap-2">
                  <ClipboardList className="w-4 h-4" /> Problem Details
                </p>
                <p className="text-xs text-green-800 mt-2 leading-relaxed">{selected.problemDetails}</p>
              </div>

              <div className="mt-5">
                <button
                  type="button"
                  onClick={() => setStepsOpen((v) => !v)}
                  className="w-full flex items-center justify-between text-sm font-semibold text-gray-800"
                >
                  <span className="flex items-center gap-2">
                    <ClipboardList className="w-4 h-4 text-gray-500" /> Next Steps
                  </span>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${stepsOpen ? 'rotate-180' : ''}`} />
                </button>
                {stepsOpen && (
                  <div className="mt-3 space-y-2.5">
                    {selected.nextSteps.map((step) => (
                      <div key={step.label} className="flex items-center gap-2 text-sm">
                        {step.done ? (
                          <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-blue-400 flex-shrink-0" />
                        )}
                        <span className={step.done ? 'text-gray-700' : 'text-gray-500'}>{step.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={() => goToUpdate(selected)}
                className="w-full bg-green-900 hover:bg-green-950 text-white text-sm font-medium py-2.5 rounded-md mt-6 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Update
              </button>
            </aside>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProject;