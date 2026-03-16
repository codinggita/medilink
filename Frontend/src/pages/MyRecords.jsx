import React, { useRef, useState, useEffect } from 'react';
import PatientLayout from '../layouts/PatientLayout';
import { 
  Search, 
  Upload, 
  Filter, 
  FileText, 
  FlaskConical, 
  Activity, 
  Dna, 
  Syringe, 
  Eye, 
  ChevronRight,
  Download,
  MoreVertical,
  Layers,
  ClipboardList,
  Trash2,
  Shield,
  User as UserIcon
} from 'lucide-react';

const STORAGE_KEY = 'medilink_patient_profile';
const STORAGE_KEY_RECORDS = 'medilink_patient_records';

const categories = [
    { name: 'Laboratory', countLabel: '12 Reports', icon: <FlaskConical className="w-6 h-6 text-blue-500" />, bg: 'bg-blue-50', badge: 'bg-blue-100 text-blue-600' },
    { name: 'MRI Scans', countLabel: '3 Reports', icon: <BrainIcon className="w-6 h-6 text-purple-500" />, bg: 'bg-purple-50', badge: 'bg-purple-100 text-purple-600' },
    { name: 'CT Scans', countLabel: '5 Reports', icon: <Layers className="w-6 h-6 text-orange-400" />, bg: 'bg-orange-50', badge: 'bg-orange-100 text-orange-600' },
    { name: 'X-Ray', countLabel: '8 Reports', icon: <SkeletonIcon className="w-6 h-6 text-green-500" />, bg: 'bg-green-50', badge: 'bg-green-100 text-green-600' },
    { name: 'Cardiology', countLabel: '2 Reports', icon: <HeartIcon className="w-6 h-6 text-rose-500" />, bg: 'bg-rose-50', badge: 'bg-rose-100 text-rose-600' },
    { name: 'Prescriptions', countLabel: '24 Items', icon: <ClipboardList className="w-6 h-6 text-indigo-500" />, bg: 'bg-indigo-50', badge: 'bg-indigo-100 text-indigo-600' },
    { name: 'Genetic', countLabel: '1 Report', icon: <Dna className="w-6 h-6 text-cyan-500" />, bg: 'bg-cyan-50', badge: 'bg-cyan-100 text-cyan-600' },
    { name: 'Vaccinations', countLabel: '15 Records', icon: <Syringe className="w-6 h-6 text-orange-500" />, bg: 'bg-orange-50', badge: 'bg-orange-100 text-orange-600' },
];

const initialReports = [
    { name: 'Annual Blood Panel', id: 'REP-1029-X', category: 'Laboratory', date: 'Oct 24, 2023', provider: 'North Memorial Lab', color: 'bg-blue-100 text-blue-600', blobUrl: null },
    { name: 'Lumbar Spine MRI', id: 'IMG-8822-M', category: 'MRI Scans', date: 'Oct 12, 2023', provider: 'Radiology Center East', color: 'bg-purple-100 text-purple-600', blobUrl: null },
    { name: 'Chest X-Ray Post-Op', id: 'IMG-4491-R', category: 'X-Ray', date: 'Sept 28, 2023', provider: 'City General Hospital', color: 'bg-green-100 text-green-600', blobUrl: null },
];

const MyRecords = () => {
  const fileInputRef = useRef(null);
  const [reportList, setReportList] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_RECORDS);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return initialReports;
  });
  const [openMenuId, setOpenMenuId] = useState(null);
  const [profile, setProfile] = useState({ fullName: 'Alex Johnson' });
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const filterOptions = ['All', ...categories.map(c => c.name)];

  const filteredReports = reportList.filter(rep => {
    const searchLower = searchQuery.toLowerCase().trim();
    const matchesSearch = !searchLower || 
                          rep.name.toLowerCase().includes(searchLower) || 
                          rep.provider.toLowerCase().includes(searchLower) ||
                          rep.id.toLowerCase().includes(searchLower) ||
                          rep.category.toLowerCase().includes(searchLower);

    const matchesFilter = activeFilter === 'All' || 
                          rep.category.toLowerCase().trim() === activeFilter.toLowerCase().trim();
    
    return matchesSearch && matchesFilter;
  });

  // Save to localStorage when reportList changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_RECORDS, JSON.stringify(reportList));
  }, [reportList]);

  const filteredCategories = categories.filter(cat => {
    if (!searchQuery) return true;
    const sLower = searchQuery.toLowerCase().trim();
    const matchesCatName = cat.name.toLowerCase().includes(sLower);
    const hasMatchingReports = reportList.some(r => 
      r.category.toLowerCase().includes(cat.name.toLowerCase()) && 
      (r.name.toLowerCase().includes(sLower) || 
       r.provider.toLowerCase().includes(sLower) ||
       r.id.toLowerCase().includes(sLower))
    );
    return matchesCatName || hasMatchingReports;
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setProfile(JSON.parse(saved));
    } catch (e) {}
    
    const handler = () => {
      setOpenMenuId(null);
      setShowFilterDropdown(false);
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const ext = file.name.split('.').pop()?.toLowerCase();
      let category = 'Laboratory';
      let color = 'bg-blue-100 text-blue-600';
      if (['jpg','jpeg','png'].includes(ext)) { category = 'X-Ray'; color = 'bg-green-100 text-green-600'; }
      else if (ext === 'pdf') { category = 'Prescriptions'; color = 'bg-indigo-100 text-indigo-600'; }

      const blobUrl = URL.createObjectURL(file);
      const newReport = {
        name: file.name,
        id: 'REP-' + Math.floor(Math.random() * 9000 + 1000),
        category,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        provider: 'Uploaded by Patient',
        color,
        blobUrl
      };
      setReportList(prev => [newReport, ...prev]);
      e.target.value = '';
    }
  };

  const handleView = (r) => {
    if (r.blobUrl) {
      window.open(r.blobUrl, '_blank');
    } else {
      alert(`"${r.name}" is a demo record.\nIn the full app, this would open a secure document viewer.`);
    }
  };

  const handleDownload = (r) => {
    if (r.blobUrl) {
      const a = document.createElement('a');
      a.href = r.blobUrl;
      a.download = r.name;
      a.click();
    } else {
      alert(`"${r.name}" is a demo record.\nIn the full app, this would trigger a secure download.`);
    }
  };

  const handleDelete = (id) => {
    setReportList(prev => prev.filter(r => r.id !== id));
    setOpenMenuId(null);
  };

  return (
    <PatientLayout>
      <div className="space-y-12 pb-12 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex items-center justify-between">
            <div className="space-y-2 text-left">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <FileText className="w-3 h-3" /> HEALTH REPOSITORY
                </p>
                <h1 className="text-4xl font-display font-bold text-slate-900">My Medical Records</h1>
                <p className="text-slate-500 font-medium tracking-wide">Secure access to your diagnostic results, lab reports, and imaging history from all MediLink providers.</p>
            </div>
            <button className="bg-white p-4 pr-6 rounded-[2rem] card-shadow border border-slate-100 flex items-center gap-4 hover:border-primary-100 transition-all cursor-pointer group text-left">
                 <div className="relative">
                     <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                        <UserIcon className="w-6 h-6" />
                     </div>
                     <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full"></div>
                 </div>
                 <div>
                    <p className="text-sm font-bold text-slate-900 group-hover:text-primary-600 transition-colors uppercase">{profile.fullName}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-0.5">ID: ML-8829</p>
                 </div>
                 <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all ml-2" />
            </button>
        </div>

        {/* Search & Actions */}
        <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1 w-full relative group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                <input 
                    type="text" 
                    placeholder="Search for reports, dates, or providers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-slate-100 rounded-2xl py-3.5 pl-14 pr-12 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-400 transition-all card-shadow shadow-sm hover:border-slate-200"
                />
                {searchQuery && (
                    <button 
                        onClick={() => setSearchQuery('')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 p-1"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                )}
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    onChange={handleFileChange}
                />
                <button 
                    onClick={handleUploadClick}
                    className="flex-1 md:flex-none bg-primary-600 text-white px-6 py-3.5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2.5 hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20 active:scale-95"
                >
                    <Upload className="w-4 h-4" />
                    Upload Record
                </button>
                <button 
                    onClick={(e) => { e.stopPropagation(); setShowFilterDropdown(!showFilterDropdown); }}
                    className={`flex-1 md:flex-none px-6 py-3.5 rounded-2xl text-sm font-bold border flex items-center justify-center gap-2.5 transition-all card-shadow shadow-sm active:scale-95 relative ${activeFilter !== 'All' ? 'bg-primary-50 border-primary-200 text-primary-600' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}`}
                >
                    <Filter className={`w-4 h-4 ${activeFilter !== 'All' ? 'text-primary-500' : 'text-slate-400'}`} />
                    {activeFilter === 'All' ? 'Filter' : activeFilter}

                    {showFilterDropdown && (
                        <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                            <div className="max-h-60 overflow-y-auto custom-scrollbar">
                                {filterOptions.map(opt => (
                                    <button
                                        key={opt}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveFilter(opt);
                                            setShowFilterDropdown(false);
                                        }}
                                        className={`w-full text-left px-5 py-3 text-xs font-bold transition-colors ${activeFilter === opt ? 'text-primary-600 bg-primary-50' : 'text-slate-600 hover:bg-slate-50'}`}
                                    >
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </button>
            </div>
        </div>

        {/* Categories Grid */}
        <div className="space-y-6">
            <h2 className="text-xl font-display font-bold text-slate-900 flex items-center gap-3 text-left">
                <div className="w-2 h-2 bg-primary-600 rounded-sm"></div>
                Report Categories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCategories.length > 0 ? (
                    filteredCategories.map(c => (
                        <div 
                            key={c.name} 
                            onClick={() => setActiveFilter(activeFilter === c.name ? 'All' : c.name)}
                            className={`p-6 rounded-[32px] card-shadow border transition-all cursor-pointer text-left space-y-6 relative overflow-hidden ${activeFilter === c.name ? 'bg-primary-50 border-primary-200 ring-2 ring-primary-500/10' : 'bg-white border-slate-50 hover:border-primary-100 group'}`}
                        >
                            <div className="flex items-start justify-between relative z-10">
                                <div className={`w-12 h-12 ${c.bg} rounded-2xl flex items-center justify-center transition-transform ${activeFilter === c.name ? 'scale-110' : 'group-hover:scale-110'}`}>
                                    {c.icon}
                                </div>
                                <span className={`text-[10px] ${c.badge || 'bg-primary-50 text-primary-600'} px-2 py-1 rounded-md font-bold uppercase tracking-widest`}>
                                    {reportList.filter(r => r.category === c.name).length} Reports
                                </span>
                            </div>
                            <div className="space-y-1 relative z-10">
                                <h3 className="font-display font-bold text-slate-900 flex items-center gap-2">
                                    {c.name}
                                    {activeFilter === c.name && <div className="w-1.5 h-1.5 bg-primary-500 rounded-full animate-pulse" />}
                                </h3>
                                <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                                    {c.name === 'Laboratory' ? 'Blood work, urine analysis, and pathology reports.' : 
                                     c.name === 'MRI Scans' ? 'High-resolution magnetic resonance imaging data.' :
                                     c.name === 'CT Scans' ? 'Computed tomography and specialized 3D imaging.' :
                                     c.name === 'X-Ray' ? 'Radiographic imaging for bone and chest diagnostics.' :
                                     c.name === 'Cardiology' ? 'ECG, Echocardiograms, and stress test results.' :
                                     c.name === 'Prescriptions' ? 'Medication history, dosages, and pharmacy records.' :
                                     c.name === 'Genetic' ? 'Genomic sequencing and hereditary analysis.' :
                                     'Immunization history and booster tracking.'}
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-12 text-center bg-slate-50/50 rounded-[32px] border border-dashed border-slate-200">
                        <p className="text-sm font-bold text-slate-400">No categories matching your search</p>
                    </div>
                )}
            </div>
        </div>

        {/* Recently Added Reports */}
        <div className="bg-white rounded-[40px] card-shadow border border-slate-50 overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <h2 className="text-xl font-display font-bold text-slate-900">Recently Added Reports</h2>
                    {activeFilter !== 'All' && (
                        <span className="bg-primary-50 text-primary-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-primary-100">
                             Viewing: {activeFilter}
                        </span>
                    )}
                </div>
                <button className="text-primary-600 font-bold text-sm tracking-wide hover:underline" onClick={() => {setSearchQuery(''); setActiveFilter('All');}}>Reset All</button>
            </div>
            
            <table className="w-full text-left">
                <thead className="bg-slate-50/50">
                    <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <th className="px-8 py-4">Report Name</th>
                        <th className="px-8 py-4">Category</th>
                        <th className="px-8 py-4">Date Added</th>
                        <th className="px-8 py-4">Provider</th>
                        <th className="px-8 py-4 text-right">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                    {filteredReports.length > 0 ? (
                        filteredReports.map((r) => (
                            <tr key={r.id} className="group hover:bg-slate-50 transition-colors">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="p-2 bg-primary-50 text-primary-600 rounded-lg group-hover:bg-primary-600 group-hover:text-white transition-all">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-slate-900 text-sm">{r.name}</p>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{r.id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className={`px-2.5 py-1 rounded-md text-[9px] font-bold tracking-widest ${r.color}`}>
                                        {r.category}
                                    </span>
                                </td>
                                <td className="px-8 py-6">
                                    <p className="text-xs text-slate-500 font-bold italic">{r.date}</p>
                                </td>
                                <td className="px-8 py-6">
                                    <p className="text-xs text-slate-900 font-bold">{r.provider}</p>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex items-center justify-end gap-3">
                                        <button 
                                            onClick={() => handleView(r)}
                                            className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all"
                                            title="View"
                                        >
                                            <Eye className="w-5 h-5" />
                                        </button>
                                        <button 
                                            onClick={() => handleDownload(r)}
                                            className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all"
                                            title="Download"
                                        >
                                            <Download className="w-5 h-5" />
                                        </button>
                                        <div className="relative">
                                            <button 
                                                onClick={(e) => { e.stopPropagation(); setOpenMenuId(openMenuId === r.id ? null : r.id); }}
                                                className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
                                            >
                                                <MoreVertical className="w-5 h-5" />
                                            </button>
                                            {openMenuId === r.id && (
                                                <div 
                                                    className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-100 rounded-2xl shadow-2xl z-50 overflow-hidden"
                                                    onClick={e => e.stopPropagation()}
                                                >
                                                    <button 
                                                        onClick={() => handleView(r)}
                                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                                                    >
                                                        <Eye className="w-4 h-4" /> View Report
                                                    </button>
                                                    <button 
                                                        onClick={() => handleDownload(r)}
                                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                                                    >
                                                        <Download className="w-4 h-4" /> Download
                                                    </button>
                                                    <div className="border-t border-slate-100 mx-2" />
                                                    <button 
                                                        onClick={() => handleDelete(r.id)}
                                                        className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
                                                    >
                                                        <Trash2 className="w-4 h-4" /> Delete
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="px-8 py-16 text-center">
                                <div className="flex flex-col items-center gap-3 opacity-30">
                                    <Search className="w-12 h-12" />
                                    <p className="font-bold text-slate-900">No medical records found</p>
                                    <button 
                                        onClick={() => {setSearchQuery(''); setActiveFilter('All');}}
                                        className="text-primary-600 hover:underline text-xs"
                                    >
                                        Reset all filters
                                    </button>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

        {/* Global Footer credits */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-slate-200 mt-12 mb-4 opacity-40">
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Shield className="w-3 h-3" /> Your medical data is encrypted and HIPAA compliant.
           </p>
           <div className="flex items-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <span className="hover:text-slate-900 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-slate-900 cursor-pointer">Terms of Service</span>
              <span className="hover:text-slate-900 cursor-pointer">Help Center</span>
           </div>
        </div>

      </div>
    </PatientLayout>
  );
};

// Simple Icon Components for specific needs
function BrainIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.54Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.54Z" />
    </svg>
  );
}

function SkeletonIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2v20" />
      <path d="M17 11a5 5 0 0 1-10 0" />
      <path d="M18 15a6 6 0 0 1-12 0" />
      <path d="M17 7a5 5 0 0 0-10 0" />
    </svg>
  );
}

function HeartIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.51 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

export default MyRecords;
