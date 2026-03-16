import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PatientLayout from '../layouts/PatientLayout';
import { 
  Users,
  Search, 
  MapPin, 
  Star, 
  Calendar, 
  Video, 
  MessageSquare, 
  Phone,
  Filter
} from 'lucide-react';

const myDoctors = [
  { 
    id: 1, 
    name: 'Dr. James Wilson', 
    specialty: 'Senior Cardiologist', 
    clinic: 'Heart & Vascular Institute', 
    address: '1240 North Medical Plaza, Seattle, WA', 
    rating: 4.9, 
    reviews: 128,
    img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b1a8?auto=format&fit=crop&q=80&w=200',
    nextAvailable: 'Tomorrow, 09:30 AM',
    tags: ['Heart Failure', 'Echocardiography']
  },
  { 
    id: 2, 
    name: 'Dr. Sarah Chen', 
    specialty: 'Neurologist', 
    clinic: 'Brain Care Specialist Center', 
    address: '8900 City Wellness Center, Seattle, WA', 
    rating: 4.8, 
    reviews: 94,
    img: 'https://images.unsplash.com/photo-1559839734-2b71f1536783?auto=format&fit=crop&q=80&w=200',
    nextAvailable: 'Thu, Oct 24',
    tags: ['Migraines', 'Multiple Sclerosis']
  },
  { 
    id: 3, 
    name: 'Dr. Michael Roe', 
    specialty: 'Pediatrician', 
    clinic: 'Kids Health Hospital', 
    address: '450 Children\'s Medical Plaza, Seattle, WA', 
    rating: 5.0, 
    reviews: 312,
    img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=200',
    nextAvailable: 'Today, 04:00 PM',
    tags: ['Vaccinations', 'Child Development']
  },
  { 
    id: 4, 
    name: 'Dr. Emily Davis', 
    specialty: 'Dermatologist', 
    clinic: 'Clear Skin Clinic', 
    address: '102 East Lake Ave, Seattle, WA', 
    rating: 4.7, 
    reviews: 88,
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    nextAvailable: 'Mon, Oct 28',
    tags: ['Acne Treatment', 'Skin Screenings']
  }
];

const MyDoctors = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const specialties = ['All', ...new Set(myDoctors.map(d => d.specialty.split(' ').pop()))];

  const filteredDoctors = myDoctors.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          doc.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || doc.specialty.toLowerCase().includes(activeFilter.toLowerCase());
    return matchesSearch && matchesFilter;
  });
  return (
    <PatientLayout>
      <div className="space-y-8 pb-12 max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 text-left">
                <h1 className="text-4xl font-display font-bold text-slate-900">My Care Team</h1>
                <p className="text-slate-500 font-medium tracking-wide">Manage your doctors, view availability, and schedule new appointments.</p>
            </div>
            <button 
                onClick={() => navigate('/patient')}
                className="bg-primary-600 text-white px-8 py-3.5 rounded-2xl font-bold hover:bg-primary-700 transition-all shadow-xl shadow-primary-500/20 whitespace-nowrap"
            >
                Find New Specialist
            </button>
        </div>

        {/* Action Bar */}
        <div className="bg-white p-6 rounded-[32px] card-shadow border border-slate-50 flex flex-col md:flex-row items-center gap-4">
            <div className="flex-1 w-full relative group shadow-sm rounded-2xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                <input 
                    type="text" 
                    placeholder="Search your doctors by name or specialty..."
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
                        {specialties.map(spec => (
                            <button
                                key={spec}
                                onClick={() => {
                                    setActiveFilter(spec);
                                    setShowFilterDropdown(false);
                                }}
                                className={`w-full text-left px-4 py-2.5 text-sm font-bold transition-colors ${activeFilter === spec ? 'text-primary-600 bg-primary-50' : 'text-slate-600 hover:bg-slate-50'}`}
                            >
                                {spec}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doc) => (
                    <div key={doc.id} className="bg-white p-8 rounded-[32px] card-shadow border border-slate-50 group hover:border-primary-100 transition-all flex flex-col sm:flex-row gap-8">
                        {/* Image & Quick Actions */}
                        <div className="flex flex-col items-center gap-4 shrink-0">
                            <img src={doc.img} alt={doc.name} className="w-28 h-28 rounded-3xl object-cover shadow-md group-hover:scale-105 transition-transform duration-500" />
                            <div className="flex items-center justify-center gap-2 w-full">
                                <button className="p-2.5 bg-blue-50 text-primary-600 hover:bg-primary-600 hover:text-white rounded-xl transition-all shadow-sm" title="Video Consult">
                                    <Video className="w-4 h-4" />
                                </button>
                                <button className="p-2.5 bg-blue-50 text-primary-600 hover:bg-primary-600 hover:text-white rounded-xl transition-all shadow-sm" title="Message">
                                    <MessageSquare className="w-4 h-4" />
                                </button>
                                <button className="p-2.5 bg-blue-50 text-primary-600 hover:bg-primary-600 hover:text-white rounded-xl transition-all shadow-sm" title="Call Clinic">
                                    <Phone className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Details Container */}
                        <div className="flex-1 flex flex-col justify-between text-left space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="text-2xl font-display font-bold text-slate-900 group-hover:text-primary-600 transition-colors">{doc.name}</h3>
                                            <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-lg text-xs font-bold text-orange-600 shadow-sm border border-orange-100">
                                                <Star className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                                                {doc.rating} 
                                                <span className="text-orange-400 font-medium ml-0.5">({doc.reviews})</span>
                                            </div>
                                        </div>
                                        <p className="text-sm font-bold text-primary-600">{doc.specialty}</p>
                                    </div>
                                </div>

                                <div className="space-y-2.5">
                                    <div className="flex items-start gap-3 text-sm text-slate-500 font-medium">
                                        <MapPin className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                                        <span>
                                            <span className="text-slate-700 font-bold block mb-0.5">{doc.clinic}</span>
                                            {doc.address}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-500 font-medium bg-green-50/50 p-2.5 rounded-xl border border-green-100/50">
                                        <Calendar className="w-4 h-4 text-green-500" />
                                        <span>Next Available: <span className="text-green-700 font-bold">{doc.nextAvailable}</span></span>
                                    </div>
                                </div>
                            </div>

                            {/* Booking & Tags */}
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-50">
                                <div className="flex flex-wrap gap-2">
                                    {doc.tags.map(tag => (
                                        <span key={tag} className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1.5 rounded-lg tracking-wide border border-slate-200/60">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <button className="w-full sm:w-auto bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                                    Book Specific Time
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <div className="col-span-full bg-white rounded-[32px] p-12 text-center space-y-4 border border-slate-100">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                        <Users className="w-8 h-8 text-slate-300" />
                    </div>
                    <div>
                        <h3 className="text-xl font-display font-bold text-slate-900">No doctors found</h3>
                        <p className="text-slate-500 font-medium">Try adjusting your search or filters to find what you're looking for.</p>
                    </div>
                    <button 
                        onClick={() => {setSearchQuery(''); setActiveFilter('All');}}
                        className="text-primary-600 font-bold hover:underline"
                    >
                        Clear all filters
                    </button>
                </div>
            )}
        </div>
      </div>
    </PatientLayout>
  );
};

export default MyDoctors;
