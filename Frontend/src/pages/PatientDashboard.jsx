import React from 'react';
import PatientLayout from '../layouts/PatientLayout';

const PatientDashboard = () => {
  return (
    <PatientLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-display font-bold text-slate-900">Patient Dashboard</h1>
        <p className="text-slate-500">Welcome back! Manage your health records and appointments here.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Upcoming Appointments</h3>
            <p className="text-sm text-slate-500 text-center py-8">No upcoming appointments found.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-2">Recent Records</h3>
            <p className="text-sm text-slate-500 text-center py-8">Your medical records will appear here.</p>
          </div>
        </div>
      </div>
    </PatientLayout>
  );
};

export default PatientDashboard;
