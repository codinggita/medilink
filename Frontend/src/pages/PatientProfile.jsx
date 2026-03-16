import React, { useState } from 'react';
import PatientLayout from '../layouts/PatientLayout';
import { 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Activity, 
  CreditCard,
  Edit3,
  X,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const STORAGE_KEY = 'medilink_patient_profile';

const defaultProfile = {
    fullName: 'Alex Johnson',
    dob: '1985-05-12',
    phone: '(555) 342-8912',
    email: 'alex.j@example.com',
    address: '123 Pine St, Seattle, WA 98101',
    profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    bloodType: 'O+',
    height: '70',
    weight: '165',
    gender: 'Male',
    allergies: 'Penicillin, Peanuts'
};

const PatientProfile = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [profileData, setProfileData] = useState(() => {
      try {
          const saved = localStorage.getItem(STORAGE_KEY);
          return saved ? { ...defaultProfile, ...JSON.parse(saved) } : defaultProfile;
      } catch { return defaultProfile; }
  });
  const [editFormData, setEditFormData] = useState(profileData);

  const handleEditOpen = () => {
      setEditFormData(profileData);
      setIsEditModalOpen(true);
  };

  const handleEditSave = () => {
      setProfileData(editFormData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(editFormData));
      // Dispatch a custom event to notify other components (like PatientLayout)
      window.dispatchEvent(new Event('profileUpdate'));
      setIsEditModalOpen(false);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setEditFormData(prev => ({ ...prev, profileImage: reader.result }));
        };
        reader.readAsDataURL(file);
    }
  };

  const calculateBMI = (weight, height) => {
      if (!weight || !height) return 0;
      return ((weight / (height * height)) * 703).toFixed(1);
  };

  const formatHeight = (inches) => {
      const feet = Math.floor(Number(inches) / 12);
      const remainingInches = Number(inches) % 12;
      return `${feet}'${remainingInches}"`;
  };

  return (
    <PatientLayout>
      <div className="space-y-8 pb-12 max-w-7xl mx-auto text-left">
        
        {/* Header Section */}
        <div className="flex items-start justify-between">
            <div className="space-y-2">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Account Settings</p>
                <h1 className="text-4xl font-display font-bold text-slate-900">My Profile</h1>
            </div>
            <div className="flex gap-3">
                <button 
                    onClick={handleEditOpen}
                    className="bg-white border border-slate-200 text-slate-700 px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all card-shadow shadow-sm"
                >
                    <Edit3 className="w-4 h-4" />
                    Edit Profile
                </button>
                <button 
                    onClick={() => {
                        logout();
                        navigate('/login');
                    }}
                    className="bg-red-50 text-red-600 border border-red-100 px-6 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-red-100 transition-all shadow-sm"
                >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                </button>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Personal Info */}
            <div className="lg:col-span-1 space-y-6">
                 {/* Profile Card */}
                  <div className="bg-white rounded-[32px] p-8 card-shadow border border-slate-50 flex flex-col items-center text-center space-y-6 overflow-hidden">
                     <div className="relative shrink-0">
                         <img
                           src={profileData.profileImage}
                           className="w-32 h-32 rounded-[2rem] object-cover ring-8 ring-primary-50"
                           alt={profileData.fullName}
                         />
                         <div className="absolute -bottom-3 -right-3 bg-green-500 text-white p-2 rounded-xl border-4 border-white shadow-sm">
                              <ShieldCheck className="w-4 h-4" />
                         </div>
                     </div>
                     <div className="space-y-1">
                         <h2 className="text-2xl font-display font-bold text-slate-900">{profileData.fullName}</h2>
                         <p className="text-sm font-medium text-slate-500">Patient ID: ML-882910</p>
                     </div>

                      <div className="w-full pt-6 border-t border-slate-100 space-y-4 text-left overflow-hidden">
                           <div className="flex items-start gap-3">
                               <MapPin className="w-5 h-5 text-slate-400 shrink-0 mt-0.5" />
                               <p className="text-sm font-medium text-slate-600 break-words">{profileData.address}</p>
                           </div>
                           <div className="flex items-center gap-3 min-w-0">
                               <Phone className="w-5 h-5 text-slate-400 shrink-0" />
                               <p className="text-sm font-medium text-slate-600 truncate">{profileData.phone}</p>
                           </div>
                           <div className="flex items-center gap-3 min-w-0">
                               <Mail className="w-5 h-5 text-slate-400 shrink-0" />
                               <p className="text-sm font-medium text-slate-600 truncate">{profileData.email}</p>
                           </div>
                      </div>
                 </div>

                 {/* Insurance Card */}
                 <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[32px] p-8 card-shadow text-white space-y-6 relative overflow-hidden">
                     <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                     <div className="flex items-center gap-3 text-white/80">
                         <CreditCard className="w-5 h-5" />
                         <span className="text-xs font-bold uppercase tracking-widest">Primary Insurance</span>
                     </div>
                     <div className="space-y-1">
                          <p className="font-display font-bold text-2xl">BlueCross BlueShield</p>
                          <p className="text-sm font-medium text-white/60">PPO Gold Network</p>
                     </div>
                     <div className="pt-4 border-t border-white/10 space-y-2">
                         <div className="flex justify-between text-xs">
                             <span className="text-white/60">Member ID</span>
                             <span className="font-bold font-mono">BC-92812739</span>
                         </div>
                         <div className="flex justify-between text-xs">
                             <span className="text-white/60">Group ID</span>
                             <span className="font-bold font-mono">G-44910</span>
                         </div>
                     </div>
                 </div>
            </div>

            {/* Right Column - Medical Overview */}
            <div className="lg:col-span-2 space-y-6">
                <div className="bg-white p-8 rounded-[32px] card-shadow border border-slate-50 space-y-8 text-left">
                     <h2 className="text-xl font-display font-bold text-slate-900 flex items-center gap-2">
                         <Activity className="w-5 h-5 text-primary-600" />
                         Medical Overview
                     </h2>

                     <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                          <div className="bg-slate-50 p-4 rounded-2xl space-y-1 text-center border border-slate-100">
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Blood Type</p>
                               <p className="text-xl font-display font-bold text-primary-600">{profileData.bloodType}</p>
                          </div>
                          <div className="bg-slate-50 p-4 rounded-2xl space-y-1 text-center border border-slate-100">
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Height</p>
                               <p className="text-xl font-display font-bold text-slate-900">{formatHeight(profileData.height)}</p>
                          </div>
                          <div className="bg-slate-50 p-4 rounded-2xl space-y-1 text-center border border-slate-100">
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Weight</p>
                               <p className="text-xl font-display font-bold text-slate-900">{profileData.weight} lbs</p>
                          </div>
                          <div className="bg-slate-50 p-4 rounded-2xl space-y-1 text-center border border-slate-100">
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">BMI</p>
                               <p className="text-xl font-display font-bold text-green-600">{calculateBMI(profileData.weight, profileData.height)}</p>
                          </div>
                          <div className="bg-slate-50 p-4 rounded-2xl space-y-1 text-center border border-slate-100">
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Gender</p>
                               <p className="text-xl font-display font-bold text-primary-600 truncate px-1">{profileData.gender}</p>
                          </div>
                     </div>

                     <div className="space-y-6 pt-4 border-t border-slate-100">
                          <div className="space-y-3">
                              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Allergies</h3>
                              <div className="flex flex-wrap gap-2">
                                  {profileData.allergies.split(',').map((allergy, index) => (
                                      <span key={index} className="bg-red-50 text-red-600 px-3 py-1.5 rounded-lg text-xs font-bold border border-red-100">
                                          {allergy.trim()}
                                      </span>
                                  ))}
                              </div>
                          </div>
                          
                          <div className="space-y-3">
                              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">Current Medications</h3>
                              <div className="space-y-2">
                                  <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                                      <div>
                                          <p className="font-bold text-slate-900 text-sm">Lisinopril</p>
                                          <p className="text-[11px] text-slate-500 font-medium">10mg • Daily with food</p>
                                      </div>
                                      <span className="text-primary-600 font-bold text-xs bg-primary-50 px-2 py-1 rounded">Active</span>
                                  </div>
                                  <div className="flex justify-between items-center bg-slate-50 p-3 rounded-xl border border-slate-100">
                                      <div>
                                          <p className="font-bold text-slate-900 text-sm">Atorvastatin</p>
                                          <p className="text-[11px] text-slate-500 font-medium">20mg • Nightly</p>
                                      </div>
                                      <span className="text-primary-600 font-bold text-xs bg-primary-50 px-2 py-1 rounded">Active</span>
                                  </div>
                              </div>
                          </div>
                     </div>
                </div>

                <div className="bg-white p-6 rounded-[32px] card-shadow border border-slate-50 flex items-center justify-between group cursor-pointer hover:border-primary-100 transition-all">
                     <div className="flex items-center gap-4">
                          <div className="bg-blue-50 p-3 rounded-xl text-primary-600">
                              <User className="w-5 h-5" />
                          </div>
                          <div className="text-left">
                              <p className="font-bold text-slate-900">Emergency Contacts</p>
                              <p className="text-xs text-slate-500 font-medium">Manage who we contact in emergencies</p>
                          </div>
                     </div>
                     <button className="text-sm font-bold text-primary-600 pe-2 group-hover:translate-x-1 transition-transform">View Details →</button>
                </div>
            </div>
        </div>
      </div>

      {/* Edit Profile Modal Container */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-[32px] w-full max-w-2xl max-h-[90vh] overflow-y-auto card-shadow border border-slate-100 flex flex-col text-left">
                
                {/* Modal Header */}
                <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10 rounded-t-[32px]">
                    <h2 className="text-2xl font-display font-bold text-slate-900">Edit Profile Details</h2>
                    <button 
                        onClick={() => setIsEditModalOpen(false)}
                        className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Modal Form Content */}
                <div className="p-8 space-y-8">
                    {/* Photo Upload Section */}
                    <div className="flex flex-col items-center gap-4 p-6 bg-slate-50 rounded-[2rem] border border-slate-100">
                        <div className="relative group">
                            <img 
                                src={editFormData.profileImage} 
                                className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white shadow-md transition-all group-hover:opacity-75" 
                                alt="Profile Preview"
                            />
                            <label className="absolute inset-0 flex items-center justify-center cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                                <span className="bg-slate-900/40 backdrop-blur-sm text-white px-2 py-1 rounded-lg text-[10px] font-bold">Change</span>
                                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                            </label>
                        </div>
                        <div className="text-center">
                            <h4 className="text-sm font-bold text-slate-900">Profile Photo</h4>
                            <p className="text-[10px] text-slate-400 font-medium">JPG, PNG, or GIF. Max 5MB.</p>
                        </div>
                    </div>

                    {/* Basic Info */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                           <User className="w-4 h-4 text-primary-600" /> Basic Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 ml-1">Full Name</label>
                                <input type="text" value={editFormData.fullName} onChange={e => setEditFormData({...editFormData, fullName: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary-500/20 text-sm font-medium" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 ml-1">Date of Birth</label>
                                <input type="date" value={editFormData.dob} onChange={e => setEditFormData({...editFormData, dob: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary-500/20 text-sm font-medium" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 ml-1">Phone Number</label>
                                <input type="tel" value={editFormData.phone} onChange={e => setEditFormData({...editFormData, phone: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary-500/20 text-sm font-medium" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 ml-1">Email Address</label>
                                <input type="email" value={editFormData.email} onChange={e => setEditFormData({...editFormData, email: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary-500/20 text-sm font-medium" />
                            </div>
                        </div>
                        <div className="space-y-1.5 pt-2">
                             <label className="text-xs font-bold text-slate-500 ml-1">Home Address</label>
                             <input type="text" value={editFormData.address} onChange={e => setEditFormData({...editFormData, address: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary-500/20 text-sm font-medium" />
                        </div>
                    </div>

                    {/* Medical Info */}
                    <div className="space-y-4 pt-6 border-t border-slate-100">
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                           <Activity className="w-4 h-4 text-primary-600" /> Medical Profile
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-primary-50/50 p-4 rounded-2xl border border-primary-100/50">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 ml-1">Blood Type</label>
                                <select value={editFormData.bloodType} onChange={e => setEditFormData({...editFormData, bloodType: e.target.value})} className="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-3 focus:outline-none text-sm font-bold text-primary-700">
                                    <option>A+</option><option>A-</option><option>B+</option><option>B-</option>
                                    <option>AB+</option><option>AB-</option><option>O+</option><option>O-</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 ml-1">Height (in)</label>
                                <input type="number" value={editFormData.height} onChange={e => setEditFormData({...editFormData, height: e.target.value})} className="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-3 focus:outline-none text-sm font-bold" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 ml-1">Weight (lbs)</label>
                                <input type="number" value={editFormData.weight} onChange={e => setEditFormData({...editFormData, weight: e.target.value})} className="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-3 focus:outline-none text-sm font-bold" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-500 ml-1">Gender</label>
                                <select value={editFormData.gender} onChange={e => setEditFormData({...editFormData, gender: e.target.value})} className="w-full bg-white border border-slate-200 rounded-xl py-2.5 px-3 focus:outline-none text-sm font-bold text-primary-700">
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Another</option>
                                </select>
                            </div>
                        </div>
                        <div className="space-y-1.5 mt-4">
                            <label className="text-xs font-bold text-slate-500 ml-1">Known Allergies</label>
                            <input type="text" value={editFormData.allergies} onChange={e => setEditFormData({...editFormData, allergies: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary-500/20 text-sm font-medium" />
                            <p className="text-[10px] text-slate-400 font-medium ml-1">Separate allergies with a comma.</p>
                        </div>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t border-slate-100 bg-slate-50 rounded-b-[32px] flex items-center justify-end gap-3">
                    <button 
                        onClick={() => setIsEditModalOpen(false)}
                        className="px-6 py-3 rounded-xl font-bold text-slate-600 hover:bg-slate-200 transition-colors"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={handleEditSave}
                        className="bg-primary-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
      )}

    </PatientLayout>
  );
};

export default PatientProfile;
