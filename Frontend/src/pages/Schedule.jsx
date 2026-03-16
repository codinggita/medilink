import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown,
  Plus,
  Clock,
  MoreHorizontal
} from 'lucide-react';

const Schedule = () => {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const currentMonth = 'October 2023';
    
    // Simplistic calendar generation logic for display
    const calendarDays = Array.from({ length: 35 }, (_, i) => ({
        day: (i % 31) + 1,
        isCurrentMonth: i >= 0 && i < 31,
        events: i === 11 ? ['3 Apps'] : i === 12 ? ['9:0...','2:3...'] : []
    }));

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-12">
        {/* Header */}
        <div className="flex items-center justify-between">
            <div className="space-y-1 text-left">
                <h1 className="text-4xl font-display font-bold text-slate-900">Schedule</h1>
                <p className="text-slate-500 font-medium">Manage your patient appointments</p>
            </div>
            <div className="bg-slate-100 p-1.5 rounded-2xl flex gap-1">
                {['Month', 'Week', 'Day'].map(view => (
                    <button key={view} className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${view === 'Month' ? 'bg-white shadow text-primary-600' : 'text-slate-500 hover:text-slate-800'}`}>
                        {view}
                    </button>
                ))}
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendar View */}
            <div className="lg:col-span-2 bg-white p-8 rounded-[40px] card-shadow border border-slate-50 space-y-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-display font-bold text-slate-900">{currentMonth}</h2>
                    <div className="flex items-center gap-3">
                        <button className="p-2 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all"><ChevronLeft className="w-4 h-4" /></button>
                        <button className="p-2 border border-slate-100 rounded-xl hover:bg-slate-50 transition-all"><ChevronRight className="w-4 h-4" /></button>
                    </div>
                </div>

                <div className="grid grid-cols-7 border-t border-slate-100 pt-6">
                    {days.map(d => (
                        <div key={d} className="text-center pb-6">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{d}</span>
                        </div>
                    ))}
                    {calendarDays.map((d, i) => (
                        <div key={i} className={`h-32 border-t border-r border-slate-50 p-3 relative group transition-all hover:bg-slate-50/50 ${(i + 1) % 7 === 0 ? 'border-r-0' : ''}`}>
                             <span className={`text-xs font-bold ${d.isCurrentMonth ? 'text-slate-500' : 'text-slate-200'} ${d.day === 5 ? 'bg-primary-600 text-white w-6 h-6 rounded-full flex items-center justify-center -ml-1 -mt-1 shadow-lg shadow-primary-500/30' : ''}`}>
                                {d.day}
                             </span>
                             
                             <div className="mt-2 space-y-1">
                                {d.events.map((e, idx) => (
                                    <div key={idx} className={`px-2 py-1 rounded-md text-[9px] font-bold ${idx === 0 ? 'bg-blue-50 text-primary-600' : 'bg-green-50 text-green-600'}`}>
                                        {e}
                                    </div>
                                ))}
                             </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sidebar Columns */}
            <div className="space-y-8">
                {/* Today's Stats Card */}
                <div className="bg-primary-600 p-8 rounded-[40px] card-shadow text-white space-y-6 relative overflow-hidden">
                    <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
                    <div className="space-y-1 relative z-10">
                         <p className="text-[10px] font-bold text-primary-200 uppercase tracking-widest">Today's Appointments</p>
                         <h3 className="text-5xl font-display font-bold">12</h3>
                         <p className="text-sm font-medium text-primary-100 italic">Scheduled</p>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden relative z-10">
                        <div className="h-full bg-white rounded-full" style={{ width: '33%' }}></div>
                    </div>
                    <p className="text-xs font-medium text-primary-100 relative z-10">4 Completed, 8 remaining</p>
                </div>

                {/* Quick Add Form */}
                <div className="bg-white p-8 rounded-[40px] card-shadow border border-slate-50 space-y-6">
                    <h2 className="text-xl font-display font-bold text-slate-900">Quick Add</h2>
                    <div className="space-y-4">
                        <div className="space-y-2 text-left">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Patient Name</label>
                            <input 
                                type="text" 
                                placeholder="Search patient..."
                                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/10"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2 text-left">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Time</label>
                                <div className="relative">
                                    <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input 
                                        type="text" 
                                        placeholder="00:00 AM"
                                        className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/10"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2 text-left">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Type</label>
                                <select className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/10 appearance-none bg-no-repeat bg-[right_1rem_center]">
                                    <option>Follow-up</option>
                                    <option>New Consultation</option>
                                </select>
                            </div>
                        </div>
                        <button className="w-full bg-primary-600 text-white font-bold py-3.5 rounded-xl hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20 active:scale-[0.98]">
                            Schedule
                        </button>
                    </div>
                </div>

                {/* Clinic Notes */}
                <div className="bg-white p-8 rounded-[40px] card-shadow border border-slate-50 space-y-4">
                    <h2 className="text-xl font-display font-bold text-slate-900 flex items-center justify-between">
                        Clinic Notes
                        <Plus className="w-4 h-4 text-slate-400" />
                    </h2>
                    <div className="bg-orange-50/50 border-l-4 border-orange-400 p-4 rounded-xl">
                        <p className="text-[11px] text-orange-800 leading-relaxed font-medium">
                            System maintenance scheduled for Oct 15th, 02:00 AM. Appointment booking will be temporarily offline.
                        </p>
                    </div>
                </div>
            </div>
        </div>

        {/* Upcoming Reminders Strip */}
        <div className="space-y-6 text-left">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-display font-bold text-slate-900">Upcoming Reminders</h2>
                <button className="text-primary-600 font-bold text-sm tracking-wide">View All</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { title: 'Consultation with John...', sub: 'General Cardiovascular Checkup', time: '09:00 AM', day: 'Today', icon: '👤', color: 'bg-blue-100' },
                    { title: 'Weekly Staff Meeting', sub: 'Main Conference Room / Zoom', time: '02:30 PM', day: 'Today', icon: '👥', color: 'bg-green-100' },
                    { title: 'Surgery Prep: Sarah S.', sub: 'Review lab results and vitals', time: '08:00 AM', day: 'Tomorrow', icon: '📋', color: 'bg-orange-100' }
                ].map((r, i) => (
                    <div key={i} className="bg-white p-5 rounded-3xl card-shadow border border-slate-50 flex items-center justify-between group hover:border-primary-200 transition-all">
                        <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${r.color}`}>{r.icon}</div>
                            <div>
                                <p className="font-bold text-slate-900 text-sm">{r.title}</p>
                                <p className="text-[10px] text-slate-400 font-medium">{r.sub}</p>
                            </div>
                        </div>
                        <div className="text-right">
                             <p className="text-xs font-bold text-slate-900">{r.time}</p>
                             <p className={`text-[10px] font-bold ${r.day === 'Today' ? 'text-primary-600' : 'text-slate-400'}`}>{r.day}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Schedule;
