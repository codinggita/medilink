import React from 'react';
import PatientLayout from '../layouts/PatientLayout';

const Settings = () => {
  return (
    <PatientLayout>
      <div className="max-w-2xl space-y-8">
        <div>
          <h1 className="text-3xl font-display font-bold text-slate-900">Settings</h1>
          <p className="text-slate-500">Manage your profile and account preferences.</p>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm divide-y divide-slate-50">
          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="font-bold text-slate-900">Email Notifications</p>
              <p className="text-xs text-slate-500">Receive updates about your appointments.</p>
            </div>
            <div className="w-12 h-6 bg-primary-600 rounded-full"></div>
          </div>
          <div className="p-6 flex items-center justify-between">
            <div>
              <p className="font-bold text-slate-900">Dark Mode</p>
              <p className="text-xs text-slate-500">Enable dark theme for the application.</p>
            </div>
            <div className="w-12 h-6 bg-slate-200 rounded-full"></div>
          </div>
        </div>
      </div>
    </PatientLayout>
  );
};

export default Settings;
