import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Settings, 
  Bell,
  Search,
  Plus,
  User as UserIcon,
  FolderOpen
} from 'lucide-react';

const PatientLayout = ({ children }) => {
  const navigate = useNavigate();

  const navItems = [
    { icon: <Home className="w-5 h-5" />, label: 'Home', path: '/patient' },
    { icon: <FolderOpen className="w-5 h-5" />, label: 'Files', path: '/patient/files' },
    { icon: <UserIcon className="w-5 h-5" />, label: 'Profile', path: '/patient/profile' },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-8 flex items-center gap-2 text-primary-600">
          <div className="bg-primary-600 p-1.5 rounded-lg text-white">
            <Plus className="w-5 h-5 stroke-[3]" />
          </div>
          <span className="text-xl font-display font-bold text-slate-900">MediLink</span>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive ? 'bg-primary-50 text-primary-600 font-bold' : 'text-slate-500 hover:bg-slate-50'}`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 shrink-0">
          <div className="flex-1 flex items-center gap-4">
             <div className="relative w-full max-w-xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                    type="text" 
                    placeholder="Search..."
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/10 transition-all"
                />
             </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2.5 bg-slate-50 text-slate-400 rounded-xl">
              <Bell className="w-5 h-5" />
            </button>
            <button 
              onClick={() => navigate('/patient/settings')}
              className="p-2.5 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 transition-all"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 overflow-y-auto p-12 custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
};

export default PatientLayout;
