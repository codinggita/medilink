import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { 
  FileText, 
  Printer, 
  Download, 
  ChevronRight, 
  Maximize2, 
  Share2, 
  Calendar,
  Clock,
  User,
  Activity,
  Stethoscope,
  Info
} from 'lucide-react';

const MedicalReport = () => {
  return (
    <DashboardLayout>
      <div className="space-y-8 pb-12">
        {/* Breadcrumbs & Actions */}
        <div className="flex items-center justify-between">
            <nav className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                <span className="hover:text-primary-600 cursor-pointer">Reports</span>
                <ChevronRight className="w-3 h-3" />
                <span className="hover:text-primary-600 cursor-pointer">Radiology</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-slate-900">MRI Scan - June 2024</span>
            </nav>
            <div className="flex items-center gap-3">
                <button className="p-2.5 bg-white border border-slate-100 rounded-xl hover:bg-slate-50 transition-all card-shadow">
                    <Printer className="w-5 h-5 text-slate-400" />
                </button>
                <button className="bg-primary-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20">
                    <Download className="w-4 h-4" />
                    Download PDF
                </button>
            </div>
        </div>

        {/* Report Header */}
        <div className="space-y-2 text-left">
            <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-bold rounded-md uppercase tracking-widest">Finalized</span>
            <h1 className="text-5xl font-display font-bold text-slate-900 leading-tight">MRI Brain (Contrast)</h1>
            <p className="text-slate-500 font-medium tracking-wide">Report ID: #MR-882910 | Date: June 15, 2024</p>
        </div>

        {/* Patient Info Bar */}
        <div className="bg-white p-6 rounded-[32px] card-shadow border border-slate-50 flex items-center gap-8">
            <div className="flex items-center gap-4">
                <img 
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100" 
                    alt="John Doe" 
                    className="w-16 h-16 rounded-2xl object-cover ring-4 ring-slate-50"
                />
                <div>
                    <h3 className="text-2xl font-display font-bold text-slate-900">John Doe</h3>
                    <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                        <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> DOB: 05/12/1985 (39y)</span>
                        <span className="flex items-center gap-1.5"><User className="w-3 h-3" /> Gender: Male</span>
                        <span className="flex items-center gap-1.5"><Info className="w-3 h-3" /> ID: P-5521</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Clinical Findings */}
            <div className="lg:col-span-2 space-y-8">
                <div className="bg-white p-10 rounded-[40px] card-shadow border border-slate-50 space-y-10">
                    <div className="flex items-center gap-3 text-primary-600">
                        <FileText className="w-6 h-6" />
                        <h2 className="text-2xl font-display font-bold text-slate-900">Clinical Findings</h2>
                    </div>

                    <div className="space-y-8 text-left">
                        <div className="space-y-4">
                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Procedure</h4>
                            <p className="text-slate-600 leading-relaxed text-sm font-medium">
                                Multiplanar, multisequence MRI of the brain was performed before and after the intravenous administration of 15ml of Gadavist. Dedicated thin section images through the internal auditory canals were also obtained.
                            </p>
                        </div>

                        <div className="space-y-4">
                            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Observations</h4>
                            <p className="text-slate-600 leading-relaxed text-sm font-medium">
                                There is no evidence of intracranial hemorrhage, large territory acute infarct or space-occupying mass lesion. The ventricles and basal cisterns are normal in configuration and size for the patient's age. No abnormal enhancement is seen within the brain parenchyma.
                            </p>
                            <p className="text-slate-600 leading-relaxed text-sm font-medium">
                                Incidental note is made of a 4mm developmental venous anomaly in the right frontal lobe. The flow voids of the major intracranial arteries are preserved. The visualized portions of the paranasal sinuses and mastoid air cells are clear.
                            </p>
                        </div>

                        <div className="bg-primary-50/50 border border-primary-100 p-8 rounded-3xl space-y-4">
                             <h4 className="text-[10px] font-bold text-primary-600 uppercase tracking-widest leading-none">Impression</h4>
                             <ol className="list-decimal list-inside space-y-2 text-sm font-bold text-slate-900 leading-relaxed">
                                <li>No acute intracranial process identified.</li>
                                <li>Stable 4mm developmental venous anomaly in the right frontal lobe, non-specific.</li>
                             </ol>
                        </div>
                    </div>
                </div>

                {/* Physician Notes */}
                <div className="bg-white p-10 rounded-[40px] card-shadow border border-slate-50 space-y-8">
                     <div className="flex items-center gap-3 text-primary-600">
                        <Activity className="w-6 h-6" />
                        <h2 className="text-2xl font-display font-bold text-slate-900">Referring Physician's Notes</h2>
                     </div>
                     <div className="flex items-start gap-6">
                        <div className="w-12 h-12 bg-slate-50 flex items-center justify-center rounded-2xl text-primary-600">
                            <Stethoscope className="w-6 h-6" />
                        </div>
                        <div className="space-y-4 text-left">
                            <div className="space-y-1">
                                <p className="font-bold text-slate-900">Dr. Sarah Williams, MD</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Neurology Specialist</p>
                            </div>
                            <p className="text-slate-500 italic text-sm leading-relaxed font-medium">
                                "Findings are consistent with normal baseline. Patient reports relief of primary symptoms following initial therapy. Recommend follow-up scan in 12 months only if symptoms recur."
                            </p>
                        </div>
                     </div>
                </div>
            </div>

            {/* Right Column: Scan View & Metadata */}
            <div className="space-y-8 text-left">
                {/* Scan Image Container */}
                <div className="bg-[#1a1f2e] rounded-[40px] overflow-hidden shadow-2xl group relative h-[500px] flex flex-col">
                    <div className="flex-1 flex items-center justify-center p-8 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]">
                         <div className="relative cursor-zoom-in transition-transform duration-500 group-hover:scale-105">
                             <img 
                                src="https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=400" 
                                alt="MRI Scan" 
                                className="w-full max-w-sm rounded shadow-2xl opacity-80"
                             />
                             <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                                <Maximize2 className="w-10 h-10 text-white mb-2" />
                                <p className="text-xs font-bold text-white uppercase tracking-widest">Click to Enlarge</p>
                             </div>
                         </div>
                    </div>
                    <div className="bg-black/50 p-6 flex items-center justify-between border-t border-white/5">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">DICOM Sequence 04 of 12</p>
                        <div className="flex items-center gap-4 text-slate-400">
                             <Maximize2 className="w-4 h-4 cursor-pointer hover:text-white" />
                             <Share2 className="w-4 h-4 cursor-pointer hover:text-white" />
                        </div>
                    </div>
                </div>

                {/* Metadata Details */}
                <div className="bg-white p-8 rounded-[40px] card-shadow border border-slate-50 space-y-6">
                    <h2 className="text-xl font-display font-bold text-slate-900">Metadata Details</h2>
                    <div className="space-y-4">
                        {[
                            { label: 'Imaging Center', value: 'City General Imaging' },
                            { label: 'Radiologist', value: 'Dr. Alan Turing' },
                            { label: 'Equipment', value: '3T Siemens Magnetom' },
                            { label: 'File Format', value: 'DICOM (.dcm)' },
                            { label: 'File Size', value: '142.5 MB' },
                        ].map((item, i) => (
                            <div key={i} className="flex justify-between items-center py-1 border-b border-dotted border-slate-100 last:border-0 pb-3">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.label}</span>
                                <span className="text-sm font-bold text-slate-900">{item.value}</span>
                            </div>
                        ))}
                    </div>
                    <button className="w-full bg-slate-50 text-slate-500 font-bold py-3.5 rounded-xl hover:bg-slate-100 transition-all flex items-center justify-center gap-2 text-xs uppercase tracking-widest">
                        <Clock className="w-4 h-4" />
                        View Version History
                    </button>
                </div>

                {/* Next Steps Action Card */}
                <div className="bg-primary-600 p-8 rounded-[40px] card-shadow text-white space-y-8 relative overflow-hidden">
                    <div className="absolute bottom-[-40px] left-[-40px] w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
                    <div className="space-y-4 relative z-10">
                        <h2 className="text-2xl font-display font-bold">Next Steps</h2>
                        <p className="text-sm font-medium text-primary-100 leading-relaxed">
                            Share this report with your primary care physician or schedule a follow-up consultation.
                        </p>
                    </div>
                    <div className="space-y-3 relative z-10">
                         <button className="w-full bg-white text-primary-600 font-bold py-4 rounded-2xl hover:bg-primary-50 transition-all active:scale-[0.98]">
                            Book Consultation
                         </button>
                         <button className="w-full bg-primary-500 text-white font-bold py-3.5 rounded-2xl hover:bg-primary-400 transition-all active:scale-[0.98] border border-white/20">
                            Request Interpretation
                         </button>
                    </div>
                </div>
            </div>
        </div>

        {/* Global Footer Credits */}
        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-slate-200 mt-12 mb-4 opacity-40">
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">© 2024 MediLink Health Systems. All clinical data is encrypted and HIPAA compliant.</p>
           <div className="flex items-center gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              <span className="hover:text-slate-900 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-slate-900 cursor-pointer">Terms of Service</span>
              <span className="hover:text-slate-900 cursor-pointer">Support</span>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MedicalReport;
