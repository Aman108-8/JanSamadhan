import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Search,
  Flag,
  Activity,
  ClipboardList,
  BarChart3,
  Users,
  Bell,
  Settings,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/industry/dashboard' },
  { label: 'Explore Challenges', icon: Search, path: '/industry/explore' },
  { label: 'My Project', icon: Flag, path: '/industry/my-projects' },
  { label: 'Project Updates', icon: Activity, path: '/industry/project-updates' },
  { label: 'Assignments', icon: ClipboardList, path: '/industry/assignments' },
  { label: 'Completed', icon: BarChart3, path: '/industry/completed' },
  { label: 'Review', icon: Users, path: '/industry/review' },
  { label: 'Notifications', icon: Bell, path: '/industry/notifications', badge: 3 },
  { label: 'Settings', icon: Settings, path: '/industry/settings' },
];

const Navitem = () => {
  const location = useLocation();

  return (
    <div className="h-screen sticky top-0">
      <aside className="h-screen w-60 bg-green-950 text-green-100 flex-shrink-0 flex flex-col">
        <div className="px-5 py-5 border-b border-green-900/60 flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center">
            <span className="text-green-900 text-sm font-bold">JH</span>
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold text-white mt-0.5">JanSamadhan</p>
          </div>
        </div>

        <nav className="flex-1 py-3">
          {navItems.map((item) => {
            const isActive = item.path === location.pathname;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`relative flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                  isActive
                    ? 'bg-green-900 text-white border-l-4 border-lime-400 font-medium'
                    : 'text-green-200 hover:bg-green-900/60 hover:text-white border-l-4 border-transparent'
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
                {item.badge && (
                  <span className="ml-auto bg-green-400 text-green-950 text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>
    </div>
  );
};

export default Navitem;