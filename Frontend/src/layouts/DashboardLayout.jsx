import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  Home, 
  Bell, 
  Settings,
  Search,
  FileText,
  Menu,
  X
} from 'lucide-react';

const DashboardLayout = ({ children, title = "Dashboard" }) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    { icon: <Home className="w-5 h-5" />, label: 'Home', path: '/doctor' },
    { icon: <FileText className="w-5 h-5" />, label: 'Medical Records', path: '/doctor/records' },
  ];

  return (
    <div className="flex h-screen bg-medical-light overflow-hidden">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 
        w-72 bg-white border-r border-slate-200 flex flex-col
        transform transition-transform duration-300 ease-in-out
        lg:transform-none
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary-600">
            <div className="bg-primary-600 p-1.5 rounded-lg">
              <div className="w-5 h-5 border-2 border-white rounded flex items-center justify-center font-bold text-[10px] text-white">M</div>
            </div>
            <span className="text-xl font-display font-bold text-slate-900">MediLink</span>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 text-slate-400 hover:bg-slate-100 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-2">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-4">Menu</p>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/doctor'}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => 
                `sidebar-item ${isActive ? 'active' : ''}`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4">
           {/* Help Box */}
           <div className="bg-primary-50 rounded-2xl p-5 space-y-4">
              <div className="space-y-1">
                <p className="font-bold text-primary-900 text-sm">Need Help?</p>
                <p className="text-xs text-primary-700 leading-relaxed">Contact IT Support for system assistance.</p>
              </div>
              <button className="w-full bg-primary-600 text-white text-xs font-bold py-2.5 rounded-xl hover:bg-primary-700 transition-colors">
                Get Support
              </button>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 md:h-20 bg-white border-b border-slate-100 flex items-center justify-between px-4 md:px-8 shrink-0">
          <div className="flex items-center gap-4 flex-1">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-400 hover:bg-slate-50 rounded-lg"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="relative w-full max-w-md hidden sm:block">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
               <input 
                   type="text" 
                   placeholder="Search patients or records..."
                   className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/10 transition-all"
               />
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-xl transition-colors relative">
              <Bell className="w-5 h-5" />
              <div className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></div>
            </button>
            <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-xl transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <div className="h-8 w-px bg-slate-100 mx-1 md:mx-2 hidden sm:block"></div>
            <div className="flex items-center gap-3">
               <img 
                 src="https://images.unsplash.com/photo-1612349317150-e413f6a5b1a8?auto=format&fit=crop&q=80&w=100" 
                 alt="Dr. Smith" 
                 className="w-8 h-8 md:w-10 md:h-10 rounded-xl object-cover ring-2 ring-primary-50"
               />
               <div className="hidden lg:block text-left">
                  <p className="text-sm font-bold text-slate-900">Dr. Smith</p>
                  <p className="text-[10px] text-slate-500 font-medium">Cardiologist</p>
               </div>
            </div>
          </div>
        </header>

        {/* Page Body */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
