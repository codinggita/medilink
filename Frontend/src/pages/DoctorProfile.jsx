import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function DoctorProfile() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8 pb-12 text-left">
        <div className="space-y-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Profile
          </p>
          <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h1 className="text-3xl font-display font-bold text-slate-900">
                    Dr. Smith&apos;s Profile
                </h1>
                <p className="text-slate-500 font-medium">
                    Review and manage your professional details shown across MediLink.
                </p>
              </div>
              <button 
                onClick={() => {
                    logout();
                    navigate('/login');
                }}
                className="bg-red-50 text-red-600 border border-red-100 px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-red-100 transition-all shadow-sm"
              >
                  <LogOut className="w-5 h-5" />
                  Sign Out
              </button>
          </div>
        </div>

        <div className="bg-white rounded-[32px] card-shadow border border-slate-100 p-8 space-y-8">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <img
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b1a8?auto=format&fit=crop&q=80&w=200"
              alt="Dr. Smith"
              className="w-28 h-28 rounded-2xl object-cover ring-4 ring-primary-50"
            />
            <div className="space-y-2">
              <h2 className="text-2xl font-display font-bold text-slate-900">
                Dr. Amelia Smith
              </h2>
              <p className="text-slate-500 font-medium">
                Cardiology • City General Hospital
              </p>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">
                NPI: 1234567890 • License: CA-98213
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">
                Contact
              </h3>
              <div className="text-sm text-slate-600 space-y-1">
                <p>Email: dr.smith@example.com</p>
                <p>Phone: (555) 123-9876</p>
                <p>Clinic: North Memorial Cardiology</p>
              </div>
            </div>
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">
                Availability
              </h3>
              <div className="text-sm text-slate-600 space-y-1">
                <p>Mon – Thu: 9:00 AM – 5:00 PM</p>
                <p>Fri: 9:00 AM – 1:00 PM</p>
                <p>Telehealth: Tue &amp; Thu afternoons</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default DoctorProfile;

