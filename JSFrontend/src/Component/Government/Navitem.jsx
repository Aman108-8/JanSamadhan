import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, FileText, Layers, Flag, Users, ClipboardList, Activity, BarChart3, Bell, Settings, Search, User,} from 'lucide-react';

const Navitem = () => {
    const location = useLocation()
    const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/government/dashboard' },
    { label: 'Reported Problems', icon: FileText, path: '/government/reported-problems' },
    { label: 'Problem Clusters', icon: Layers },
    { label: 'Challenges', icon: Flag },
    { label: 'Solver Matching', icon: Users, path: '/government/solver-matching' },
    { label: 'Assignments', icon: ClipboardList },
    { label: 'Progress Monitoring', icon: Activity },
    { label: 'Impact', icon: BarChart3 },
    { label: 'Notifications', icon: Bell },
    { label: 'Settings', icon: Settings },
    ];
  return (
    <div className="h-screen sticky top-0">
        <aside className="h-screen w-60 bg-green-950 text-green-100 flex-shrink-0 flex flex-col">
            <div className="px-5 py-5 border-b border-green-900/60 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
                <span className="text-green-900 text-sm font-bold">JH</span>
            </div>
            <div className="leading-tight">
                <p className="text-[11px] text-green-300">झारखंड सरकार</p>
                <p className="text-[10px] text-green-400">Government of Jharkhand</p>
                <p className="text-sm font-semibold text-white mt-0.5">JanSamadhan</p>
            </div>
            </div>

            <nav className="flex-1 py-3">
            {navItems.map((item) => (
                <Link
                key={item.label}
                to={item.path || '#'}
                className={`flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                    item.path === location.pathname
                    ? 'bg-green-900 text-white border-l-4 border-lime-400 font-medium'
                    : 'text-green-200 hover:bg-green-900/60 hover:text-white border-l-4 border-transparent'
                }`}
                >
                <item.icon className="w-4 h-4" />
                {item.label}
                </Link>
            ))}
            </nav>
        </aside>
    </div>
  )
}

export default Navitem