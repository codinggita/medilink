import React from 'react';
import { Search, Bell, Asterisk } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const TopNavLayout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-medical-light font-sans">
      {/* Header */}
      <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 shrink-0 sticky top-0 z-50">
        <div className="flex items-center gap-12">
            <div className="flex items-center gap-3 text-primary-600">
                <div className="bg-primary-600 p-2 rounded-xl text-white shadow-lg shadow-primary-500/20">
                    <Asterisk className="w-5 h-5 stroke-[3]" />
                </div>
                <span className="text-xl font-display font-bold text-slate-900">MediLink</span>
            </div>
            
            <nav className="flex items-center gap-8 text-sm font-bold text-slate-500">
                <NavLink to="/patient" className={({isActive}) => isActive ? "text-primary-600 border-b-2 border-primary-600 h-[80px] flex items-center transition-colors" : "hover:text-primary-600 transition-colors h-[80px] flex items-center"}>Dashboard</NavLink>
                <NavLink to="/patient/records" className={({isActive}) => isActive ? "text-primary-600 border-b-2 border-primary-600 h-[80px] flex items-center transition-colors" : "hover:text-primary-600 transition-colors h-[80px] flex items-center"}>Records</NavLink>
                <NavLink to="/patient/doctors" className={({isActive}) => isActive ? "text-primary-600 border-b-2 border-primary-600 h-[80px] flex items-center transition-colors" : "hover:text-primary-600 transition-colors h-[80px] flex items-center"}>Doctors</NavLink>
                <NavLink to="/patient/files" className={({isActive}) => isActive ? "text-primary-600 border-b-2 border-primary-600 h-[80px] flex items-center transition-colors" : "hover:text-primary-600 transition-colors h-[80px] flex items-center"}>Files</NavLink>
            </nav>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
                type="text" 
                placeholder="Search records..."
                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/10"
            />
          </div>

          <button className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-100 transition-all">
            <Bell className="w-5 h-5" />
          </button>
          
          <img 
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100" 
            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm" 
            alt="Alex"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-12">
        {children}
      </main>
    </div>
  );
};

export default TopNavLayout;
