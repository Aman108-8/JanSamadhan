import { LayoutDashboard, FileText, Layers, Flag, Users, ClipboardList, Activity, BarChart3, Bell, Settings, Search, User,} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import Navitem from './Navitem';



    const stats = [
    { label: 'Total Problems Reported', value: '1,892', sub: '+12% from last week', subColor: 'text-green-600' },
    { label: 'Pending Review', value: '312' },
    { label: 'Active Challenges', value: '87' },
    { label: 'In Progress', value: '120' },
    { label: 'Completed', value: '1,350' },
    ];

    const priorities = [
    { label: 'Critical', value: 15, bg: 'bg-red-50', border: 'border-red-100', text: 'text-red-500' },
    { label: 'High', value: 42, bg: 'bg-orange-50', border: 'border-orange-100', text: 'text-orange-500' },
    { label: 'Medium', value: 120, bg: 'bg-teal-50', border: 'border-teal-100', text: 'text-teal-600' },
    { label: 'Low', value: 135, bg: 'bg-green-50', border: 'border-green-100', text: 'text-green-600' },
    ];

    const categories = [
    { label: 'Water', width: '85%' },
    { label: 'Healthcare', width: '65%' },
    { label: 'Education', width: '55%' },
    { label: 'Infrastructure', width: '45%' },
    ];

    const activityData = [
    { v: 20 }, { v: 28 }, { v: 30 }, { v: 45 }, { v: 60 },
    { v: 62 }, { v: 65 }, { v: 63 }, { v: 78 }, { v: 90 }, { v: 82 }, { v: 95 },
    ];

    const recentProblems = [
    { id: '#1024', title: 'Damaged Road - Village X', district: 'Khunti', priority: 'Critical', priorityColor: 'bg-red-50 text-red-500', status: 'New', statusColor: 'text-green-600' },
    { id: '#1023', title: 'Broken Handpump - Ward 5', district: 'Ranchi', priority: 'Medium', priorityColor: 'bg-teal-50 text-teal-600', status: 'Under Review', statusColor: 'text-gray-500' },
    ];

    const Dashboard = () => {
    return (
        <div className="h-screen overflow-hidden flex bg-gray-50">
        {/* Sidebar */}
        <div>
            <Navitem/>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col min-w-0">
            {/* Top bar */}
            <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
                <div className="relative w-72">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                    type="text"
                    placeholder="Search..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-md pl-9 pr-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
                    />
                </div>

                <div className="flex items-center gap-4">
                    <button className="bg-green-900 text-white text-xs font-medium px-3 py-1.5 rounded-md flex items-center gap-1">
                        All Districts <span className="text-[10px]">▾</span>
                    </button>
                    <Bell className="w-5 h-5 text-amber-400" />
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

            {/* Page content */}
            <main className="flex-1 overflow-y-auto p-6 space-y-6">
                <div>
                    <h1 className="text-xl font-bold text-green-900">Welcome back, Ramesh!</h1>
                    <p className="text-sm text-gray-500 mt-1">Overview of JanSamadhan platform statistics.</p>
                </div>

            {/* Stat cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {stats.map((s) => (
                <div key={s.label} className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 py-4">
                    <p className="text-xs text-gray-500">{s.label}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-2">{s.value}</p>
                    {s.sub && <p className={`text-[11px] mt-1 ${s.subColor}`}>{s.sub}</p>}
                </div>
                ))}
            </div>

            {/* Priority overview */}
            <div>
                <h2 className="text-sm font-semibold text-gray-800 mb-3">Priority Overview</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {priorities.map((p) => (
                    <div key={p.label} className={`rounded-xl border ${p.border} ${p.bg} px-4 py-3`}>
                        <p className={`text-xs font-medium ${p.text}`}>{p.label}</p>
                        <p className="text-xl font-bold text-gray-900 mt-1">{p.value}</p>
                    </div>
                ))}
                </div>
            </div>

            {/* Charts row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                    <h3 className="text-sm font-semibold text-gray-800 mb-4">Problems by Category</h3>
                    <div className="space-y-3">
                        {categories.map((c) => (
                        <div key={c.label} className="flex items-center gap-3">
                            <span className="text-xs text-gray-500 w-24 flex-shrink-0">{c.label}</span>
                            <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-green-900 rounded-full" style={{ width: c.width }} />
                            </div>
                        </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="text-sm font-semibold text-gray-800 mb-4">Platform Activity</h3>
                <div className="h-36">
                    <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={activityData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                        <defs>
                        <linearGradient id="activityFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#5eead4" stopOpacity={0.6} />
                            <stop offset="100%" stopColor="#5eead4" stopOpacity={0.05} />
                        </linearGradient>
                        </defs>
                        <Area
                        type="monotone"
                        dataKey="v"
                        stroke="#0d9488"
                        strokeWidth={2}
                        fill="url(#activityFill)"
                        />
                    </AreaChart>
                    </ResponsiveContainer>
                </div>
                </div>
            </div>

            {/* Recent problems table */}
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <h3 className="text-sm font-semibold text-gray-800 mb-4">Recent Problems</h3>
                <table className="w-full text-sm">
                <thead>
                    <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                    <th className="pb-2 font-medium">ID</th>
                    <th className="pb-2 font-medium">Problem Title</th>
                    <th className="pb-2 font-medium">District</th>
                    <th className="pb-2 font-medium">Priority</th>
                    <th className="pb-2 font-medium">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {recentProblems.map((row) => (
                    <tr key={row.id} className="border-b border-gray-50 last:border-0">
                        <td className="py-3 text-blue-600">{row.id}</td>
                        <td className="py-3 text-gray-700">{row.title}</td>
                        <td className="py-3 text-blue-600">{row.district}</td>
                        <td className="py-3">
                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${row.priorityColor}`}>
                            {row.priority}
                        </span>
                        </td>
                        <td className={`py-3 text-xs font-medium ${row.statusColor}`}>{row.status}</td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </main>
        </div>
        </div>
    );
};

export default Dashboard;