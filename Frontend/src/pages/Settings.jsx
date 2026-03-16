import React, { useState } from 'react';
import PatientLayout from '../layouts/PatientLayout';
import { useTheme } from '../context/ThemeContext';
import { 
  Bell, 
  Shield, 
  Eye, 
  Globe, 
  Lock, 
  Smartphone, 
  Mail, 
  MessageSquare,
  ChevronRight,
  ShieldCheck,
  Languages,
  Clock,
  Moon,
  Sun,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const [notifications, setNotifications] = useState({
        push: true,
        email: true,
        sms: false,
        appointments: true,
        reports: true
    });
    const [activeTab, setActiveTab] = useState('notifications');

    const toggleNotification = (key) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const SettingToggle = ({ label, description, icon, active, onToggle }) => (
        <div className="flex items-center justify-between p-6 bg-white rounded-2xl border border-slate-50 card-shadow">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-50 text-slate-400 rounded-xl">
                    {icon}
                </div>
                <div className="text-left">
                    <p className="font-bold text-slate-900">{label}</p>
                    <p className="text-xs text-slate-500 font-medium">{description}</p>
                </div>
            </div>
            <button 
                onClick={onToggle}
                className={`w-12 h-6 rounded-full transition-all relative ${active ? 'bg-primary-600' : 'bg-slate-200'}`}
            >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${active ? 'right-1' : 'left-1'}`} />
            </button>
        </div>
    );

    return (
        <PatientLayout>
            <div className="space-y-12 pb-12 max-w-5xl mx-auto text-left">
                
                {/* Header Section */}
                <div className="space-y-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <ShieldCheck className="w-3 h-3" /> PREFERENCES & SECURITY
                    </p>
                    <h1 className="text-4xl font-display font-bold text-slate-900">Account Settings</h1>
                    <p className="text-slate-500 font-medium tracking-wide text-left">Manage your notification preferences, account security, and privacy settings.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* Sidebar Tabs (Desktop) / Quick Links */}
                    <div className="space-y-2">
                         <div className="bg-white p-2 rounded-3xl card-shadow border border-slate-50 space-y-1">
                             <button 
                                onClick={() => setActiveTab('notifications')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm text-left transition-all ${activeTab === 'notifications' ? 'bg-primary-50 text-primary-600' : 'text-slate-500 hover:bg-slate-50'}`}
                             >
                                 <Bell className="w-4 h-4" /> Notifications
                             </button>
                             <button 
                                onClick={() => setActiveTab('security')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm text-left transition-all ${activeTab === 'security' ? 'bg-primary-50 text-primary-600' : 'text-slate-500 hover:bg-slate-50'}`}
                             >
                                 <Lock className="w-4 h-4" /> Security
                             </button>
                             <button 
                                onClick={() => setActiveTab('privacy')}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm text-left transition-all ${activeTab === 'privacy' ? 'bg-primary-50 text-primary-600' : 'text-slate-500 hover:bg-slate-50'}`}
                             >
                                 <Eye className="w-4 h-4" /> Privacy & Data
                             </button>
                              <button 
                                 onClick={() => setActiveTab('regional')}
                                 className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm text-left transition-all ${activeTab === 'regional' ? 'bg-primary-50 text-primary-600' : 'text-slate-500 hover:bg-slate-50'}`}
                              >
                                  <Globe className="w-4 h-4" /> Regional
                              </button>
                              <button 
                                 onClick={() => setActiveTab('appearance')}
                                 className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm text-left transition-all ${activeTab === 'appearance' ? 'bg-primary-50 text-primary-600' : 'text-slate-500 hover:bg-slate-50'}`}
                              >
                                  <Sun className="w-4 h-4" /> Appearance
                              </button>
                             <button 
                                onClick={() => {
                                    logout();
                                    navigate('/login');
                                }}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold text-sm text-red-500 hover:bg-red-50 transition-all text-left"
                             >
                                 <LogOut className="w-4 h-4" /> Sign Out
                             </button>
                         </div>

                         <div className="p-6 bg-primary-900 rounded-[2.5rem] text-white relative overflow-hidden group cursor-pointer">
                             <div className="absolute top-[-20%] right-[-10%] w-32 h-32 bg-primary-600/20 rounded-full blur-3xl group-hover:bg-primary-600/30 transition-all"></div>
                             <div className="relative z-10 space-y-4">
                                 <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md">
                                     <Smartphone className="w-5 h-5 text-primary-400" />
                                 </div>
                                 <div className="space-y-1">
                                     <p className="font-bold text-sm">Download App</p>
                                     <p className="text-[10px] text-primary-200 font-medium leading-relaxed">Get the full MediLink experience on your mobile device.</p>
                                 </div>
                                 <button className="w-full py-2.5 bg-white text-primary-900 rounded-xl text-xs font-bold hover:bg-primary-50 transition-all">Get the App</button>
                             </div>
                         </div>
                    </div>

                    {/* Settings Content */}
                    <div className="md:col-span-2 space-y-8 min-h-[500px]">
                        
                        {/* Notifications Section */}
                        {activeTab === 'notifications' && (
                            <section className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                    <Bell className="w-4 h-4 text-primary-600" /> Notification Channels
                                </h3>
                                <div className="space-y-3">
                                    <SettingToggle 
                                        label="Push Notifications"
                                        description="Receive instant alerts on your mobile and desktop."
                                        icon={<Smartphone className="w-5 h-5" />}
                                        active={notifications.push}
                                        onToggle={() => toggleNotification('push')}
                                    />
                                    <SettingToggle 
                                        label="Email Alerts"
                                        description="Get important updates and reports in your inbox."
                                        icon={<Mail className="w-5 h-5" />}
                                        active={notifications.email}
                                        onToggle={() => toggleNotification('email')}
                                    />
                                    <SettingToggle 
                                        label="SMS Text Messages"
                                        description="Urgent appointment reminders via text."
                                        icon={<MessageSquare className="w-5 h-5" />}
                                        active={notifications.sms}
                                        onToggle={() => toggleNotification('sms')}
                                    />
                                </div>
                            </section>
                        )}

                        {/* Appearance Section */}
                        {activeTab === 'appearance' && (
                            <section className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2 dark:text-white">
                                    <Sun className="w-4 h-4 text-primary-600" /> Appearance & Theme
                                </h3>
                                <div className="space-y-3">
                                    <SettingToggle 
                                        label="Dark Mode"
                                        description="Switch between light and dark themes for the application."
                                        icon={theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                                        active={theme === 'dark'}
                                        onToggle={toggleTheme}
                                    />
                                </div>
                            </section>
                        )}

                        {/* Security Section */}
                        {activeTab === 'security' && (
                            <section className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-primary-600" /> Security & Access
                                </h3>
                                <div className="space-y-4">
                                    <div className="bg-white p-6 rounded-[2rem] border border-slate-50 card-shadow space-y-6">
                                        <div className="space-y-4">
                                            <div className="space-y-1.5">
                                                <label className="text-xs font-bold text-slate-500 ml-1">Current Password</label>
                                                <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary-500/20 text-sm font-medium" />
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-bold text-slate-500 ml-1">New Password</label>
                                                    <input type="password" placeholder="New password" className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary-500/20 text-sm font-medium" />
                                                </div>
                                                <div className="space-y-1.5">
                                                    <label className="text-xs font-bold text-slate-500 ml-1">Confirm Password</label>
                                                    <input type="password" placeholder="Confirm password" className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary-500/20 text-sm font-medium" />
                                                </div>
                                            </div>
                                        </div>
                                        <button className="bg-primary-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-primary-700 transition-all text-sm">Update Password</button>
                                    </div>

                                    <div className="bg-white p-6 rounded-2xl border border-slate-50 card-shadow flex items-center justify-between group cursor-pointer hover:border-primary-100 transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                                                <ShieldCheck className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900">Two-Factor Authentication</p>
                                                <p className="text-xs text-primary-600 font-bold">Enabled • Verified</p>
                                            </div>
                                        </div>
                                        <button className="text-sm font-bold text-slate-400 hover:text-slate-600">Configure</button>
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Privacy Section */}
                        {activeTab === 'privacy' && (
                            <section className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                    <Eye className="w-4 h-4 text-primary-600" /> Privacy & Data Control
                                </h3>
                                <div className="space-y-3">
                                    <div className="bg-white p-6 rounded-2xl border border-slate-50 card-shadow flex flex-col gap-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                                    <Lock className="w-5 h-5" />
                                                </div>
                                                <div className="text-left">
                                                    <p className="font-bold text-slate-900">HIPAA Compliance Consent</p>
                                                    <p className="text-xs text-slate-500 font-medium">Manage how your health data is shared.</p>
                                                </div>
                                            </div>
                                            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Active</span>
                                        </div>
                                    </div>

                                    <div className="bg-white p-6 rounded-2xl border border-slate-50 card-shadow space-y-4">
                                        <h4 className="font-bold text-slate-900 text-sm">Data Export</h4>
                                        <p className="text-xs text-slate-500 font-medium leading-relaxed">Download a complete copy of your medical history, reports, and personal information for your records.</p>
                                        <button className="flex items-center gap-2 text-primary-600 font-bold text-xs hover:underline pt-2">
                                            Download Data Archive (ZIP/PDF) <ChevronRight className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Regional Section */}
                        {activeTab === 'regional' && (
                            <section className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                    <Globe className="w-4 h-4 text-primary-600" /> Language & Regional
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="bg-white p-5 rounded-3xl border border-slate-100 card-shadow space-y-2">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                            <Languages className="w-3 h-3" /> Language
                                        </label>
                                        <select className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 focus:ring-0 text-sm font-bold text-slate-900 cursor-pointer">
                                            <option>English (US)</option>
                                            <option>Spanish (ES)</option>
                                            <option>French (FR)</option>
                                            <option>German (DE)</option>
                                        </select>
                                    </div>
                                    <div className="bg-white p-5 rounded-3xl border border-slate-100 card-shadow space-y-2">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                                            <Clock className="w-3 h-3" /> Timezone
                                        </label>
                                        <select className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 focus:ring-0 text-sm font-bold text-slate-900 cursor-pointer">
                                            <option>(GMT-08:00) Pacific Time</option>
                                            <option>(GMT-05:00) Eastern Time</option>
                                            <option>(GMT+00:00) UTC</option>
                                            <option>(GMT+05:30) India Standard Time</option>
                                        </select>
                                    </div>
                                </div>
                            </section>
                        )}

                        <div className="pt-12 flex items-center justify-between opacity-50">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-relaxed">
                                MediLink Version 2.4.1 (Stable)<br />
                                Last sync: Just now
                            </p>
                            <button className="text-[10px] font-bold text-red-500 hover:text-red-700 uppercase tracking-widest underline decoration-red-500/30 underline-offset-4">
                                Deactivate Account
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </PatientLayout>
    );
};

export default Settings;
