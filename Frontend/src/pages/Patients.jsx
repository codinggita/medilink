import React, { useState, useEffect, useMemo, useRef } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { useDebounce } from '../hooks/useDebounce';
import { 
  Users, 
  Plus, 
  Search, 
  ChevronLeft, 
  ChevronRight,
  Filter,
  ArrowUpRight,
  Calendar as CalendarIcon,
  Download,
  HelpCircle,
  ChevronDown,
  Loader2,
  Trash2,
  Edit2,
  X
} from 'lucide-react';
import apiClient from '../api/apiClient';

const Patients = () => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const [statusFilter, setStatusFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 6;

  // CRUD State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [formData, setFormData] = useState({ name: '', age: '', status: 'STABLE' });
  const [error, setError] = useState('');
  const nameInputRef = useRef(null);

  // Fetch Data
  const fetchPatients = async () => {
    setLoading(true);
    try {
        const response = await apiClient.get('/patients', {
            params: { search: debouncedSearch, status: statusFilter !== 'All' ? statusFilter : undefined }
        });
        setPatients(response.data);
    } catch (err) {
        console.error('Fetch error:', err);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [debouncedSearch, statusFilter]);

  const paginatedPatients = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return patients.slice(start, start + itemsPerPage);
  }, [patients, currentPage]);

  const totalPages = Math.ceil(patients.length / itemsPerPage);

  // CRUD Operations
  const handleAddPatient = () => {
    setEditingPatient(null);
    setFormData({ name: '', age: '', status: 'STABLE' });
    setIsModalOpen(true);
    setTimeout(() => nameInputRef.current?.focus(), 100);
  };

  const handleEditPatient = (patient) => {
    setEditingPatient(patient);
    setFormData({ name: patient.name, age: patient.age, status: patient.status });
    setIsModalOpen(true);
    setTimeout(() => nameInputRef.current?.focus(), 100);
  };

  const handleDeletePatient = async (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
        try {
            await apiClient.delete(`/patients/${id}`);
            fetchPatients();
        } catch (err) {
            alert('Failed to delete patient');
        }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
        if (editingPatient) {
            await apiClient.put(`/patients/${editingPatient.id}`, formData);
        } else {
            await apiClient.post('/patients', formData);
        }
        setIsModalOpen(false);
        fetchPatients();
    } catch (err) {
        setError('Operation failed. Please try again.');
    }
  };
  return (
    <DashboardLayout>
      <div className="space-y-8 pb-12">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-4xl font-display font-bold text-slate-900 dark:text-white">My Patients</h1>
            <p className="text-slate-500 font-medium dark:text-slate-400">Manage and view history for all your registered patients.</p>
          </div>
          <button 
            onClick={handleAddPatient}
            className="bg-primary-600 text-white px-6 py-3.5 rounded-xl font-bold flex items-center gap-2 hover:bg-primary-700 transition-all card-shadow shadow-primary-500/20"
          >
            <Plus className="w-5 h-5" />
            Add New Patient
          </button>
        </div>

        {/* Filters & Search */}
        <div className="bg-white p-6 rounded-[32px] card-shadow border border-slate-50 space-y-6">
            <div className="relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                <input 
                    type="text" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search patients by name or ID..."
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/10 transition-all dark:bg-slate-800 dark:border-slate-700 dark:text-white"
                />
            </div>

            <div className="flex flex-wrap items-center gap-3">
                {['All', 'Urgent', 'Follow-Up', 'Stable'].map((filter) => (
                    <button 
                        key={filter}
                        onClick={() => { setStatusFilter(filter); setCurrentPage(1); }}
                        className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${statusFilter === filter ? 'bg-primary-600 text-white shadow-sm' : 'bg-slate-50 text-slate-600 border border-slate-100 hover:bg-slate-100 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'}`}
                    >
                        {filter}
                    </button>
                ))}
            </div>
        </div>

        {/* Patient Grid */}
        {loading ? (
            <div className="flex justify-center py-20">
                <Loader2 className="w-10 h-10 animate-spin text-primary-600" />
            </div>
        ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {paginatedPatients.length > 0 ? paginatedPatients.map((p) => (
                    <div key={p.id} className="bg-white dark:bg-slate-800 p-6 rounded-[32px] border border-slate-50 dark:border-slate-700 hover:border-primary-200 transition-all card-shadow flex items-center gap-6 group">
                        <img src={p.img} alt={p.name} className="w-32 h-32 rounded-3xl object-cover shadow-sm grayscale-[0.2] group-hover:grayscale-0 transition-all" />
                        <div className="flex-1 space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white">{p.name}</h3>
                                    <span className={`px-2.5 py-1 rounded-md text-[9px] font-bold tracking-widest ${
                                        p.status === 'URGENT' ? 'bg-red-50 text-red-600' :
                                        p.status === 'FOLLOW-UP' ? 'bg-orange-50 text-orange-600' :
                                        p.status === 'STABLE' ? 'bg-green-50 text-green-600' :
                                        'bg-blue-50 text-primary-600'
                                    }`}>
                                        {p.status}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => handleEditPatient(p)} className="p-2 text-slate-400 hover:text-primary-600 transition-colors">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button onClick={() => handleDeletePatient(p.id)} className="p-2 text-slate-400 hover:text-red-600 transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            
                            <div className="space-y-2">
                                <p className="text-sm text-slate-500 font-medium dark:text-slate-400">Age: {p.age} | ID: {p.id}</p>
                                <p className="text-sm text-slate-500 font-medium flex items-center gap-2 dark:text-slate-400">
                                    <CalendarIcon className="w-4 h-4 text-slate-300" />
                                    Last Visit: {p.lastVisit}
                                </p>
                            </div>

                            <button className="bg-primary-50 text-primary-600 px-1 py-1.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary-100 transition-all w-full max-w-[200px] dark:bg-primary-900/20">
                                View Patient History
                                <ArrowUpRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )) : (
                    <div className="col-span-2 py-20 text-center space-y-4">
                        <p className="text-slate-500 font-bold">No patients found matching your search.</p>
                        <button onClick={() => {setSearch(''); setStatusFilter('All');}} className="text-primary-600 font-bold underline">Reset Filters</button>
                    </div>
                )}
            </div>
        )}

        {/* Pagination */}
        {!loading && patients.length > 0 && (
            <div className="flex items-center justify-between pt-8 border-t border-slate-200 dark:border-slate-700">
                <p className="text-sm text-slate-400 font-medium">Showing {(currentPage-1)*itemsPerPage + 1} to {Math.min(currentPage*itemsPerPage, patients.length)} of {patients.length} patients</p>
                <div className="flex items-center gap-2">
                    <button 
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="p-2 border border-slate-100 rounded-xl hover:bg-white transition-all disabled:opacity-30 dark:border-slate-700"
                    >
                        <ChevronLeft className="w-5 h-5 text-slate-400" />
                    </button>
                    {Array.from({length: totalPages}, (_, i) => i + 1).map(n => (
                        <button 
                            key={n} 
                            onClick={() => setCurrentPage(n)}
                            className={`w-10 h-10 rounded-xl font-bold text-sm ${n === currentPage ? 'bg-primary-600 text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-100 hover:border-slate-200 dark:bg-slate-800 dark:border-slate-700'}`}
                        >
                            {n}
                        </button>
                    ))}
                    <button 
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="p-2 border border-slate-100 rounded-xl hover:bg-white transition-all disabled:opacity-30 dark:border-slate-700"
                    >
                        <ChevronRight className="w-5 h-5 text-slate-400" />
                    </button>
                </div>
            </div>
        )}

        {/* CRUD Modal */}
        {isModalOpen && (
            <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white dark:bg-slate-800 w-full max-w-md rounded-[32px] p-8 card-shadow animate-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white">
                            {editingPatient ? 'Edit Patient' : 'Add New Patient'}
                        </h2>
                        <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-all">
                            <X className="w-6 h-6 text-slate-400" />
                        </button>
                    </div>

                    <form onSubmit={handleSave} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Patient Name</label>
                            <input 
                                ref={nameInputRef}
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                placeholder="Enter full name"
                                className="w-full bg-slate-50 border border-slate-100 dark:bg-slate-700 dark:border-slate-600 rounded-2xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:text-white"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Age</label>
                                <input 
                                    type="number"
                                    value={formData.age}
                                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                                    placeholder="Age"
                                    className="w-full bg-slate-50 border border-slate-100 dark:bg-slate-700 dark:border-slate-600 rounded-2xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:text-white"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Status</label>
                                <select 
                                    value={formData.status}
                                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                                    className="w-full bg-slate-50 border border-slate-100 dark:bg-slate-700 dark:border-slate-600 rounded-2xl py-3.5 px-4 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:text-white font-bold"
                                >
                                    <option value="STABLE">STABLE</option>
                                    <option value="FOLLOW-UP">FOLLOW-UP</option>
                                    <option value="URGENT">URGENT</option>
                                    <option value="ROUTINE">ROUTINE</option>
                                </select>
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-primary-600 text-white py-4 rounded-2xl font-bold hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20">
                            {editingPatient ? 'Update Patient' : 'Create Patient Entry'}
                        </button>
                    </form>
                </div>
            </div>
        )}

        {/* Footer Stats Strip */}
        <div className="bg-white/40 backdrop-blur-sm border-t border-slate-100 mt-20 p-6 flex items-center justify-between mx-[-32px]">
            <div className="flex items-center gap-12 ml-8">
                <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Patients</p>
                    <p className="text-2xl font-display font-bold text-slate-900">1,248</p>
                </div>
                <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">New This Month</p>
                    <p className="text-2xl font-display font-bold text-primary-600">+34</p>
                </div>
            </div>
            <div className="flex items-center gap-6 mr-8">
                <button className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors">
                    <Download className="w-4 h-4" />
                    Export Data
                </button>
                <button className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors">
                    <HelpCircle className="w-4 h-4" />
                    Support
                </button>
            </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Patients;
