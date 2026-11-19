import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Search,
  User,
  MapPin,
  ChevronDown,
  ArrowLeft,
  Building2,
  Flag,
  Calendar,
  CalendarCheck,
  CheckCircle2,
  Circle,
  Edit3,
  Send,
  Info,
} from 'lucide-react';
import Navitem from './Component/Navitem'; // adjust path to wherever Navitem.jsx lives

const priorityStyles = {
  Critical: 'bg-red-50 text-red-500',
  High: 'bg-orange-50 text-orange-600',
  Medium: 'bg-amber-50 text-amber-600',
};

const tabs = ['Overview', 'Submit Work Proof', 'Progress & Milestones', 'Government Feedback', 'Documents'];

// In a real app this comes from the project the person clicked "Update" on.
// Swap this out for data fetched by the :projectId route param.
const project = {
  id: 'P-1024',
  title: 'Rural Road Repair Project',
  description:
    'Repair and upgrade the damaged rural road connecting Village X to the nearby market to improve accessibility, especially during the rainy season.',
  image: 'https://images.unsplash.com/photo-1545459702-9d3e3b0cb9a6?w=800&q=80',
  location: 'Village X, Khunti',
  category: 'Infrastructure',
  priority: 'Critical',
  status: 'Approved',
  startDate: '10 Sep 2026',
  expectedCompletion: '30 Nov 2026',
  progress: 70,
  nextMilestone: { label: 'Final Road Surface Layer', due: '25 Sep 2026' },
};

const checklistItems = ['Location match (GPS)', 'Timestamp consistency', 'Visual similarity', 'Overall Result'];

const evidenceSeed = [
  {
    id: 1,
    startImage: 'https://images.unsplash.com/photo-1545459702-9d3e3b0cb9a6?w=600&q=80',
    lat: '23.3478° N',
    lon: '85.3287° E',
    timestamp: '12 Sep 2026, 09:15 AM',
    endImage: null,
    checks: { 'Location match (GPS)': true, 'Timestamp consistency': true, 'Visual similarity': true, 'Overall Result': true },
  },
  {
    id: 2,
    startImage: 'https://images.unsplash.com/photo-1545459702-9d3e3b0cb9a6?w=600&q=80',
    lat: '23.3478° N',
    lon: '85.3287° E',
    timestamp: '12 Sep 2026, 09:15 AM',
    endImage: null,
    checks: { 'Location match (GPS)': true, 'Timestamp consistency': true, 'Visual similarity': true, 'Overall Result': true },
  },
];

const EvidenceBlock = ({ evidence, index }) => (
  <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
    <h3 className="text-base font-bold text-gray-900 mb-4">Evidence {index + 1}</h3>

    <div className="flex flex-col lg:flex-row items-start gap-6">
      {/* Before / after pair */}
      <div className="flex items-center gap-3 flex-1">
        <div className="w-full max-w-[220px]">
          <div className="relative rounded-lg overflow-hidden">
            <span className="absolute top-2 left-2 bg-green-900 text-white text-[10px] font-medium px-2 py-1 rounded">
              Start – Left View
            </span>
            <img src={evidence.startImage} alt="Start" className="w-full h-36 object-cover" />
          </div>
          <div className="mt-2 space-y-1 text-xs text-gray-500">
            <p className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3" /> Lat: {evidence.lat} Lon: {evidence.lon}
            </p>
            <p className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3" /> {evidence.timestamp}
            </p>
          </div>
        </div>

        <div className="flex-1 h-px bg-gray-300 flex-shrink-0 min-w-[20px]" />

        <div className="w-full max-w-[220px]">
          <div className="h-36 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-300 text-2xl">
            +
          </div>
          <p className="text-center text-sm font-medium text-gray-700 mt-2">End</p>
        </div>
      </div>

      {/* Verification checklist */}
      <div className="w-full lg:w-56 flex-shrink-0">
        <p className="text-base font-bold text-gray-900 mb-3">Verfying</p>
        <div className="space-y-2.5">
          {checklistItems.map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm">
              {evidence.checks[item] ? (
                <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-gray-300 flex-shrink-0" />
              )}
              <span className="text-gray-700">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const UpdateProject = () => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const [activeTab, setActiveTab] = useState('Submit Work Proof');
  const [note, setNote] = useState('');

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
              placeholder="Search projects, challenges, locations..."
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
          {/* Left: main content */}
          <main className="flex-1 min-w-0 overflow-y-auto p-6 space-y-5">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" /> Back to My Projects
            </button>

            {/* Project header card */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
              <div className="flex flex-col sm:flex-row gap-4">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full sm:w-44 h-32 object-cover rounded-lg flex-shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-lg font-bold text-gray-900">{project.title}</h1>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-50 text-green-700">
                      {projectId || project.id}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap items-center gap-x-8 gap-y-2 mt-3 text-sm">
                    <span className="flex items-center gap-1.5 text-gray-600">
                      <MapPin className="w-3.5 h-3.5 text-gray-400" />
                      <span>
                        <span className="text-gray-400 text-xs block leading-none">Location</span>
                        {project.location}
                      </span>
                    </span>
                    <span className="flex items-center gap-1.5 text-gray-600">
                      <Building2 className="w-3.5 h-3.5 text-gray-400" />
                      <span>
                        <span className="text-gray-400 text-xs block leading-none">Category</span>
                        {project.category}
                      </span>
                    </span>
                    <span className="flex items-center gap-1.5 text-gray-600">
                      <Flag className="w-3.5 h-3.5 text-gray-400" />
                      <span>
                        <span className="text-gray-400 text-xs block leading-none">Priority</span>
                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${priorityStyles[project.priority]}`}>
                          {project.priority}
                        </span>
                      </span>
                    </span>
                    <span className="flex items-center gap-1.5 text-gray-600">
                      <CalendarCheck className="w-3.5 h-3.5 text-gray-400" />
                      <span>
                        <span className="text-gray-400 text-xs block leading-none">Status</span>
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-green-50 text-green-700">
                          {project.status}
                        </span>
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-6 mt-5 border-t border-gray-100 pt-3 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-2 text-sm font-medium whitespace-nowrap border-b-2 -mb-px ${
                      activeTab === tab
                        ? 'text-green-800 border-green-800'
                        : 'text-gray-500 border-transparent hover:text-gray-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {activeTab === 'Submit Work Proof' ? (
              <>
                {evidenceSeed.map((evidence, i) => (
                  <EvidenceBlock key={evidence.id} evidence={evidence} index={i} />
                ))}

                {/* Note + submit */}
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                  <p className="text-sm font-semibold text-gray-800 mb-2">Add Note (Optional)</p>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <input
                      type="text"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="Add any additional information about the work, site conditions, or special details..."
                      className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
                    />
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="border border-gray-300 text-gray-700 text-sm font-medium px-4 py-2 rounded-md flex items-center gap-1.5 whitespace-nowrap"
                      >
                        <Edit3 className="w-4 h-4" /> Update Evidence
                      </button>
                      <button
                        type="button"
                        className="bg-green-900 hover:bg-green-950 text-white text-sm font-medium px-4 py-2 rounded-md flex items-center gap-1.5 whitespace-nowrap"
                      >
                        <Send className="w-4 h-4" /> Submit Evidence
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-10 text-center text-sm text-gray-400">
                {activeTab} content goes here.
              </div>
            )}
          </main>

          {/* Right: project summary panel */}
          <aside className="w-80 flex-shrink-0 border-l border-gray-200 bg-gray-50 overflow-y-auto p-5">
            <div className="rounded-xl overflow-hidden relative">
              <img src={project.image} alt={project.title} className="w-full h-36 object-cover" />
              <span className="absolute top-2 right-2 bg-white/95 text-green-700 text-xs font-medium px-2.5 py-1 rounded-full">
                {project.status}
              </span>
            </div>

            <p className="text-sm font-bold text-gray-900 mt-4 mb-3">Project Summary</p>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400">Project ID</p>
                  <p className="text-gray-800 font-medium">{project.id}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Building2 className="w-3.5 h-3.5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400">Category</p>
                  <p className="text-gray-800 font-medium">{project.category}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400">Location</p>
                  <p className="text-gray-800 font-medium">{project.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Calendar className="w-3.5 h-3.5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400">Start Date</p>
                  <p className="text-gray-800 font-medium">{project.startDate}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <CalendarCheck className="w-3.5 h-3.5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-400">Expected Completion</p>
                  <p className="text-gray-800 font-medium">{project.expectedCompletion}</p>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-sm font-bold text-gray-900">Progress</p>
                <span className="text-sm font-semibold text-gray-800">{project.progress}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-600 rounded-full" style={{ width: `${project.progress}%` }} />
              </div>
            </div>

            <div className="mt-5">
              <p className="text-sm font-bold text-gray-900 mb-2">Next Milestone</p>
              <div className="flex items-start gap-2 text-sm">
                <Circle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-800 font-medium">{project.nextMilestone.label}</p>
                  <p className="text-xs text-gray-400">Due: {project.nextMilestone.due}</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mt-5 flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-blue-800 leading-relaxed">
                GPS is a location signal, not proof by itself.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default UpdateProject;