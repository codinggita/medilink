import React, { useRef, useState, useEffect } from 'react';
import PatientLayout from '../layouts/PatientLayout';
import { 
  Search, 
  UploadCloud, 
  Filter, 
  File, 
  FileText,
  Image as ImageIcon,
  MoreVertical,
  Download,
  Eye,
  FolderOpen,
  Trash2,
  X
} from 'lucide-react';

const STORAGE_KEY_FILES = 'medilink_patient_files';

const defaultFiles = [
  { id: 1, name: 'Discharge Summary - City Hospital', type: 'PDF', size: '2.4 MB', date: 'Oct 15, 2023', iconType: 'pdf', uploadedBy: 'Dr. Sarah Chen', blobUrl: null },
  { id: 2, name: 'Post-Op Care Instructions', type: 'DOCX', size: '845 KB', date: 'Oct 02, 2023', iconType: 'doc', uploadedBy: 'Nurse Emily', blobUrl: null },
  { id: 3, name: 'EKG Scan Results', type: 'JPG', size: '4.1 MB', date: 'Sept 28, 2023', iconType: 'img', uploadedBy: 'North Memorial Lab', blobUrl: null },
  { id: 4, name: 'Annual Physical Report', type: 'PDF', size: '1.2 MB', date: 'Aug 10, 2023', iconType: 'pdf', uploadedBy: 'Dr. James Wilson', blobUrl: null },
];

function FileIcon({ type }) {
  if (type === 'pdf') return <FileText className="w-5 h-5 text-red-500" />;
  if (type === 'img') return <ImageIcon className="w-5 h-5 text-emerald-500" />;
  return <File className="w-5 h-5 text-blue-500" />;
}

const PatientFiles = () => {
  const fileInputRef = useRef(null);
  const [fileList, setFileList] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_FILES);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return defaultFiles;
  });
  const [openMenuId, setOpenMenuId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const fileFormats = ['All', ...new Set(defaultFiles.map(f => f.type))];

  const filteredFiles = fileList.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          file.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || file.type === activeFilter;
    return matchesSearch && matchesFilter;
  });

  // Save to localStorage when fileList changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_FILES, JSON.stringify(fileList));
  }, [fileList]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = () => setOpenMenuId(null);
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
      let iconType = 'doc';
      if (ext === 'pdf') iconType = 'pdf';
      else if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext)) iconType = 'img';

      const blobUrl = URL.createObjectURL(file);
      const newFile = {
        id: Date.now(),
        name: file.name,
        type: ext?.toUpperCase() || 'FILE',
        size: file.size < 1024 * 1024
          ? (file.size / 1024).toFixed(0) + ' KB'
          : (file.size / 1024 / 1024).toFixed(1) + ' MB',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        iconType,
        uploadedBy: 'You (Patient)',
        blobUrl,
      };
      setFileList(prev => [newFile, ...prev]);
      e.target.value = '';
    }
  };

  const handleView = (f) => {
    if (f.blobUrl) {
      window.open(f.blobUrl, '_blank');
    } else {
      alert(`"${f.name}" is a demo record.\nIn the full app, this would open a secure document viewer.`);
    }
  };

  const handleDownload = (f) => {
    if (f.blobUrl) {
      const a = document.createElement('a');
      a.href = f.blobUrl;
      a.download = f.name;
      a.click();
    } else {
      alert(`"${f.name}" is a demo record.\nIn the full app, this would trigger a secure download.`);
    }
  };

  const handleDelete = (id) => {
    setFileList(prev => prev.filter(f => f.id !== id));
    setOpenMenuId(null);
  };

  const toggleMenu = (e, id) => {
    e.stopPropagation();
    setOpenMenuId(prev => (prev === id ? null : id));
  };

  return (
    <PatientLayout>
      <div className="space-y-8 pb-12 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 text-left">
                <h1 className="text-4xl font-display font-bold text-slate-900">My Files</h1>
                <p className="text-slate-500 font-medium tracking-wide">Manage, view, and organize all your medical documents and scans.</p>
            </div>
            <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                onChange={handleFileChange}
            />
            <button 
                onClick={handleUploadClick}
                className="bg-primary-600 text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-primary-700 transition-all shadow-xl shadow-primary-500/20 whitespace-nowrap flex items-center gap-2"
            >
                <UploadCloud className="w-5 h-5" />
                Upload File
            </button>
        </div>

        {/* Action Bar */}
        <div className="bg-white p-6 rounded-[32px] card-shadow border border-slate-50 flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1 w-full relative group shadow-sm rounded-2xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                <input 
                    type="text" 
                    placeholder="Search by file name, type, or uploader..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all"
                />
            </div>
            <div className="flex w-full md:w-auto items-center gap-4 relative">
                <button 
                    onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                    className={`flex-1 md:flex-none px-6 py-4 rounded-2xl font-bold border flex items-center justify-center gap-3 transition-all shadow-sm ${activeFilter !== 'All' ? 'bg-primary-50 border-primary-200 text-primary-700' : 'bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100'}`}
                >
                    <Filter className={`w-5 h-5 ${activeFilter !== 'All' ? 'text-primary-500' : 'text-slate-400'}`} />
                    {activeFilter === 'All' ? 'Filter' : activeFilter}
                </button>

                {showFilterDropdown && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        {fileFormats.map(fmt => (
                            <button
                                key={fmt}
                                onClick={() => {
                                    setActiveFilter(fmt);
                                    setShowFilterDropdown(false);
                                }}
                                className={`w-full text-left px-4 py-2.5 text-sm font-bold transition-colors ${activeFilter === fmt ? 'text-primary-600 bg-primary-50' : 'text-slate-600 hover:bg-slate-50'}`}
                            >
                                {fmt}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>

        {/* Storage Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-primary-50 border border-primary-100 p-6 rounded-3xl space-y-4">
                <div className="flex items-center justify-between">
                    <div className="bg-primary-100 p-2 rounded-xl text-primary-600">
                        <FolderOpen className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-primary-600 uppercase tracking-widest">Storage</span>
                </div>
                <div>
                     <p className="text-2xl font-display font-bold text-slate-900 leading-none mb-1">2.4 GB</p>
                     <p className="text-xs font-bold text-slate-500">Used of 10 GB limit</p>
                </div>
                <div className="h-1.5 bg-primary-100 rounded-full overflow-hidden">
                     <div className="h-full bg-primary-600 rounded-full" style={{ width: '24%' }}></div>
                </div>
            </div>
            
            <div className="md:col-span-2 bg-white card-shadow border border-slate-50 p-6 rounded-3xl flex items-center gap-8">
                 <div className="w-20 h-20 bg-slate-50 rounded-2xl flex flex-col items-center justify-center gap-1 border border-slate-100">
                      <ImageIcon className="w-6 h-6 text-emerald-500" />
                      <span className="text-[10px] font-bold text-slate-500">1.2 GB</span>
                 </div>
                 <div className="w-20 h-20 bg-slate-50 rounded-2xl flex flex-col items-center justify-center gap-1 border border-slate-100">
                      <FileText className="w-6 h-6 text-red-500" />
                      <span className="text-[10px] font-bold text-slate-500">850 MB</span>
                 </div>
                 <div className="w-20 h-20 bg-slate-50 rounded-2xl flex flex-col items-center justify-center gap-1 border border-slate-100">
                      <File className="w-6 h-6 text-blue-500" />
                      <span className="text-[10px] font-bold text-slate-500">350 MB</span>
                 </div>
                 <div className="flex-1 text-right">
                     <h3 className="font-display font-bold text-slate-900">Supported Formats</h3>
                     <p className="text-xs font-medium text-slate-500 mt-1">.pdf, .docx, .jpg, .png, .dcm</p>
                 </div>
            </div>
        </div>

        {/* Files Table */}
        <div className="bg-white rounded-[40px] card-shadow border border-slate-50 overflow-hidden">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                <h2 className="text-xl font-display font-bold text-slate-900">Recent Documents</h2>
                <span className="text-xs font-bold text-slate-400">{filteredFiles.length} files</span>
            </div>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="bg-slate-50/50">
                        <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            <th className="px-8 py-4">File Name</th>
                            <th className="px-8 py-4">Format & Size</th>
                            <th className="px-8 py-4">Uploaded By</th>
                            <th className="px-8 py-4">Date Added</th>
                            <th className="px-8 py-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {filteredFiles.length > 0 ? (
                            filteredFiles.map((f) => (
                                <tr key={f.id} className="group hover:bg-slate-50 transition-colors">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="p-2.5 bg-white shadow-sm border border-slate-100 rounded-xl relative group-hover:-translate-y-1 transition-transform">
                                                <FileIcon type={f.iconType} />
                                            </div>
                                            <p className="font-bold text-slate-900 text-sm max-w-[250px] truncate">{f.name}</p>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-xs font-bold text-slate-700">{f.type}</span>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{f.size}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <p className="text-xs text-slate-600 font-bold">{f.uploadedBy}</p>
                                    </td>
                                    <td className="px-8 py-5">
                                        <p className="text-xs text-slate-500 font-medium italic">{f.date}</p>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button 
                                                onClick={() => handleView(f)}
                                                className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all" 
                                                title="View"
                                            >
                                                <Eye className="w-5 h-5" />
                                            </button>
                                            <button 
                                                onClick={() => handleDownload(f)}
                                                className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all" 
                                                title="Download"
                                            >
                                                <Download className="w-5 h-5" />
                                            </button>
                                            <div className="relative">
                                                <button 
                                                    onClick={(e) => toggleMenu(e, f.id)}
                                                    className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
                                                    title="More options"
                                                >
                                                    <MoreVertical className="w-5 h-5" />
                                                </button>
                                                {openMenuId === f.id && (
                                                    <div 
                                                        className="absolute right-0 top-full mt-1 w-44 bg-white border border-slate-100 rounded-2xl shadow-xl z-50 overflow-hidden"
                                                        onClick={e => e.stopPropagation()}
                                                    >
                                                        <button 
                                                            onClick={() => handleView(f)}
                                                            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                                                        >
                                                            <Eye className="w-4 h-4" /> View File
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDownload(f)}
                                                            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                                                        >
                                                            <Download className="w-4 h-4" /> Download
                                                        </button>
                                                        <div className="border-t border-slate-100 mx-2" />
                                                        <button 
                                                            onClick={() => handleDelete(f.id)}
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
                                <td colSpan="5" className="px-8 py-12 text-center">
                                    <div className="flex flex-col items-center gap-3 opacity-40">
                                        <Search className="w-10 h-10" />
                                        <p className="font-bold text-slate-900">No files found matching your criteria</p>
                                        <button 
                                            onClick={() => {setSearchQuery(''); setActiveFilter('All');}}
                                            className="text-primary-600 hover:underline text-sm"
                                        >
                                            Clear all filters
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            
            <div className="p-6 border-t border-slate-50 flex justify-center text-sm font-bold text-primary-600 hover:text-primary-700 cursor-pointer">
                View All Files
            </div>
        </div>

      </div>
    </PatientLayout>
  );
};

export default PatientFiles;
