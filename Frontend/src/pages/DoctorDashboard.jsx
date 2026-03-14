import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';

const DoctorDashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-display font-bold text-slate-900">Doctor Dashboard</h1>
        <p className="text-slate-500">Welcome to the medical portal. This is a placeholder for the routing feature.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Today's Patients</p>
            <h3 className="text-2xl font-bold text-slate-900">12</h3>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Reports</p>
            <h3 className="text-2xl font-bold text-slate-900">5</h3>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Schedule</p>
            <h3 className="text-2xl font-bold text-slate-900">8 AM - 4 PM</h3>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DoctorDashboard;
