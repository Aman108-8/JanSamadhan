import React from 'react';
import {
  Users,
  Flag,
  FolderOpen,
  TrendingUp,
  Search,
  User,
  UserCheck,
  ShieldCheck,
  Building2,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import Navitem from './Component/Navitem'; // adjust path to wherever Navitem.jsx lives

const processSteps = [
  { label: 'Citizen Report', icon: UserCheck },
  { label: 'Government Verification', icon: ShieldCheck },
  { label: 'Challenge', icon: Flag },
  { label: 'Industry Solution', icon: Building2 },
  { label: 'Resolution', icon: CheckCircle2 },
];

const stats = [
  { label: 'Total projects', value: '1,892', change: '+18%', up: true, icon: FolderOpen, color: 'text-gray-700 bg-gray-100' },
  { label: 'Project Pitched', value: '326', change: '+8%', up: true, icon: TrendingUp, color: 'text-blue-600 bg-blue-50' },
  { label: 'Waiting Action', value: '326', change: '+8%', up: true, icon: TrendingUp, color: 'text-blue-600 bg-blue-50' },
  { label: 'Completed Projects', value: '1,420', change: '+15%', up: true, icon: CheckCircle2, color: 'text-green-600 bg-green-50' },
  { label: 'Active Project', value: '86', change: '-5%', up: false, icon: Flag, color: 'text-red-500 bg-red-50' },
];

const priorityStyles = {
  Critical: 'bg-red-50 text-red-500',
  High: 'bg-orange-50 text-orange-600',
  Medium: 'bg-amber-50 text-amber-600',
};

const statusStyles = {
  Verified: 'bg-green-50 text-green-600',
  'Under Review': 'bg-blue-50 text-blue-600',
};

const recentProblems = [
  { id: '#1024', title: 'Damaged Road', sub: 'Village X', category: 'Infrastructure', district: 'Khunti', date: '17 Sep 2026', priority: 'Critical', count: 23, status: 'Verified' },
  { id: '#1023', title: 'Water Supply Issue', sub: 'Ward 5', category: 'Water', district: 'Ranchi', date: '18 Sep 2026', priority: 'High', count: 18, status: 'Verified' },
  { id: '#1022', title: 'Street Lighting', sub: 'Main Road', category: 'Infrastructure', district: 'Dumka', date: '18 Sep 2026', priority: 'Medium', count: 12, status: 'Verified' },
];

const openChallenges = [
  { title: 'Damaged Rural Road' },
  { title: 'Village Water Supply' },
  { title: 'Street Lighting' },
];

const howItWorks = [
  { num: '01', label: 'Report' },
  { num: '02', label: 'Verify' },
  { num: '03', label: 'Create Challenge' },
  { num: '04', label: 'Industry Takes Challenge' },
  { num: '05', label: 'Work & Submit Proof' },
  { num: '06', label: 'Resolve' },
];

const impactStats = [
  { label: 'Districts Covered', value: '24' },
  { label: 'Problems Resolved', value: '1,240' },
  { label: 'Active Challenges', value: '86' },
  { label: 'Citizen Reports', value: '1,892' },
];

const footerLinks = ['Community Problems', 'Challenges', 'Report a Problem', 'My Reports', 'About', 'Help & Support'];


const activeProjects = [
  {
    id: "#P-201",
    title: "Rural Road Repair",
    location: "Khunti, Jharkhand",
    progress: 65,
    status: "In Progress",
    updated: "Updated 2 hours ago",
  },
  {
    id: "#P-198",
    title: "Village Water Supply",
    location: "Ranchi, Jharkhand",
    progress: 35,
    status: "In Progress",
    updated: "Updated yesterday",
  },
  {
    id: "#P-194",
    title: "Street Light Installation",
    location: "Dumka, Jharkhand",
    progress: 80,
    status: "Government Review",
    updated: "Updated 2 days ago",
  },
];

const recentActivity = [
  {
    title: "Government response received",
    description:
      "Your proposal for a project has been approved.",
    time: "Today, 10:30 AM",
    type: "success",
  },
  {
    title: "New challenge assigned",
    description:
      "You have been invited to work and take the challenge.",
    time: "Yesterday, 3:15 PM",
    type: "info",
  },
  {
    title: "Project update submitted",
    description:
      "Your progress report for people is awaiting review.",
    time: "29 Sep 2026",
    type: "pending",
  },
];

const IndustryDashboard = () => {
  return (
    // h-screen + overflow-hidden locks the whole layout to the viewport height.
    // Without this, the root div grows as tall as the page content (min-h-screen
    // does this too), so the BODY scrolls instead of just the main panel — and
    // the sidebar, having no fixed height of its own, scrolls away with it
    // instead of staying pinned. That's what made the nav look like it was
    // "repeating": you were actually scrolling the whole page, sidebar included.
    <div className="h-screen flex bg-gray-50 overflow-hidden">
      {/* Navitem is now a self-contained sidebar (its own <aside>, its own
          hardcoded nav list, its own routing via useLocation). It must be
          rendered exactly ONCE — mapping over it stacks N full-height
          sidebars on top of each other, which is what was happening before. */}
      <Navitem />

      {/* Main content — this column, not the page body, owns the scroll */}
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
              All Districts <span className="text-[10px]">▾</span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                <User className="w-4 h-4 text-gray-500" />
              </div>
              <div className="leading-tight">
                <p className="text-sm font-medium text-gray-800">Aman Yadav</p>
                <p className="text-[10px] text-gray-400">Citizen</p>
              </div>
            </div>
          </div>
        </header>

        {/* Only this scrolls */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Welcome + process flow */}
          <div className="flex flex-col lg:flex-row gap-5 items-stretch">
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">Welcome to Your Industry Portal</h1>
              <p className="text-sm text-gray-500 mt-1">
                Solve community problems, give them progress and be a part of building a better tomorrow.
              </p>
              <div className="flex gap-3 mt-4">
                <button className="bg-green-800 hover:bg-green-900 text-white text-sm font-medium px-4 py-2 rounded-md">
                  Report a Problem
                </button>
                <button className="border border-gray-300 text-gray-700 text-sm font-medium px-4 py-2 rounded-md">
                  Explore Problems
                </button>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl px-6 py-4 flex items-center gap-2 flex-wrap">
              <p className="text-[10px] font-semibold text-green-800 tracking-wide w-full mb-1">Process</p>
              {processSteps.map((s, i) => (
                <React.Fragment key={s.label}>
                  <div className="flex flex-col items-center gap-1 w-16">
                    <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow-sm">
                      <s.icon className="w-4 h-4 text-green-700" />
                    </div>
                    <span className="text-[9px] text-gray-600 text-center leading-tight">{s.label}</span>
                  </div>
                  {i < processSteps.length - 1 && <ArrowRight className="w-3.5 h-3.5 text-green-300 mb-4" />}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-4 flex items-start gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${s.color}`}>
                  <s.icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs text-gray-500">{s.label}</p>
                  <div className="flex items-baseline gap-1.5">
                    <p className="text-lg font-bold text-gray-900">{s.value}</p>
                    <span className={`text-[10px] font-medium ${s.up ? 'text-green-600' : 'text-red-500'}`}>
                      {s.up ? '↑' : '↓'} {s.change}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent problems */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <h3 className="text-sm font-semibold text-gray-800">Available Challenges</h3>
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search problems"
                    className="bg-gray-50 border border-gray-200 rounded-md pl-8 pr-3 py-1.5 text-xs w-44 focus:outline-none focus:ring-2 focus:ring-green-700"
                  />
                </div>
                <select className="text-xs border border-gray-200 rounded-md px-2 py-1.5 text-gray-600">
                  <option>District</option>
                </select>
                <select className="text-xs border border-gray-200 rounded-md px-2 py-1.5 text-gray-600">
                  <option>Category</option>
                </select>
                <select className="text-xs border border-gray-200 rounded-md px-2 py-1.5 text-gray-600">
                  <option>Priority</option>
                </select>
                <select className="text-xs border border-gray-200 rounded-md px-2 py-1.5 text-gray-600">
                  <option>Status</option>
                </select>
                <button className="bg-green-900 hover:bg-green-950 text-white text-xs font-medium px-3 py-1.5 rounded-md">
                  Apply Filters
                </button>
              </div>
            </div>

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
                    <th className="pb-2 font-medium pr-4">Report Count</th>
                    <th className="pb-2 font-medium pr-4">Status</th>
                    <th className="pb-2 font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentProblems.map((p) => (
                    <tr key={p.id} className="border-b border-gray-50 last:border-0">
                      <td className="py-3 pr-4 text-blue-600">{p.id}</td>
                      <td className="py-3 pr-4">
                        <p className="text-gray-800">{p.title}</p>
                        <p className="text-[11px] text-gray-400">{p.sub}</p>
                      </td>
                      <td className="py-3 pr-4 text-gray-600">{p.category}</td>
                      <td className="py-3 pr-4 text-gray-600">{p.district}</td>
                      <td className="py-3 pr-4 text-gray-600">{p.date}</td>
                      <td className="py-3 pr-4">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${priorityStyles[p.priority]}`}>
                          {p.priority}
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-gray-600">{p.count}</td>
                      <td className="py-3 pr-4">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${statusStyles[p.status]}`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3">
                        <button className="bg-green-900 hover:bg-green-950 text-white text-xs font-medium px-3 py-1.5 rounded-md">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Open challenges */}
          {/*<div>
            <h3 className="text-sm font-semibold text-gray-800 mb-3">Open Challenges</h3>
            <div className="grid sm:grid-cols-3 gap-4">
              {openChallenges.map((c) => (
                <div key={c.title} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{c.title}</p>
                    <p className="text-[11px] text-amber-600 font-medium mt-0.5">Industry Partner Required</p>
                  </div>
                  <button className="border border-gray-300 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-md whitespace-nowrap">
                    View Challenge
                  </button>
                </div>
              ))}
            </div>
          </div>*/}

          {/* How it works + Impact */}
          
{/* Section 4: My Active Projects */}
<section className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
    <div>
      <h3 className="text-sm font-semibold text-gray-800">
        My Active Projects
      </h3>
      <p className="text-xs text-gray-500 mt-1">
        Track progress and manage your ongoing work.
      </p>
    </div>

    <button className="border border-gray-300 text-gray-700 text-xs font-medium px-3 py-2 rounded-md">
      View All Projects
    </button>
  </div>

  <div className="overflow-x-auto">
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
          <th className="pb-3 pr-4 font-medium">Project</th>
          <th className="pb-3 pr-4 font-medium">Location</th>
          <th className="pb-3 pr-4 font-medium">Progress</th>
          <th className="pb-3 pr-4 font-medium">Status</th>
          <th className="pb-3 pr-4 font-medium">Last Update</th>
          <th className="pb-3 font-medium">Action</th>
        </tr>
      </thead>

      <tbody>
        {activeProjects.map((project) => (
          <tr
            key={project.id}
            className="border-b border-gray-50 last:border-0"
          >
            <td className="py-4 pr-4">
              <p className="text-xs text-blue-600">{project.id}</p>
              <p className="text-sm font-medium text-gray-800 mt-1">
                {project.title}
              </p>
            </td>

            <td className="py-4 pr-4 text-xs text-gray-600">
              {project.location}
            </td>

            <td className="py-4 pr-4 min-w-36">
              <div className="flex items-center gap-2">
                <div className="h-2 flex-1 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-700 rounded-full"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-gray-700">
                  {project.progress}%
                </span>
              </div>
            </td>

            <td className="py-4 pr-4">
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  project.status === "In Progress"
                    ? "bg-blue-50 text-blue-600"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                {project.status}
              </span>
            </td>

            <td className="py-4 pr-4 text-xs text-gray-500">
              {project.updated}
            </td>

            <td className="py-4">
              <button className="bg-green-900 hover:bg-green-950 text-white text-xs font-medium px-3 py-2 rounded-md whitespace-nowrap">
                Open Project
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</section>

{/* Section 5: Recent Activity */}
<section className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
  <div className="flex items-center justify-between gap-3 mb-4">
    <div>
      <h3 className="text-sm font-semibold text-gray-800">
        Recent Activity
      </h3>
      <p className="text-xs text-gray-500 mt-1">
        New assignments, government responses, and project updates.
      </p>
    </div>

    <button className="text-xs font-medium text-green-800 hover:text-green-950">
      View Notifications
    </button>
  </div>

  <div className="space-y-4">
    {recentActivity.map((activity, index) => (
      <div
        key={`${activity.title}-${index}`}
        className="flex items-start gap-3 border-b border-gray-100 last:border-0 pb-4 last:pb-0"
      >
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
            activity.type === "success"
              ? "bg-green-50 text-green-700"
              : activity.type === "info"
              ? "bg-blue-50 text-blue-700"
              : "bg-amber-50 text-amber-700"
          }`}
        >
          {activity.type === "success" ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : activity.type === "info" ? (
            <Flag className="w-4 h-4" />
          ) : (
            <FolderOpen className="w-4 h-4" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-800">
            {activity.title}
          </p>
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            {activity.description}
          </p>
          <p className="text-[11px] text-gray-400 mt-2">
            {activity.time}
          </p>
        </div>
      </div>
    ))}
  </div>
</section>
        </main>
      </div>
    </div>
  );
};

export default IndustryDashboard;