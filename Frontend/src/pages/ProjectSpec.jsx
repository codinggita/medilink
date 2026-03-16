import React from 'react';
import { 
  Compass, 
  Layout, 
  Users, 
  Shield, 
  Globe, 
  Code, 
  Search, 
  Bell, 
  CheckCircle2, 
  Download, 
  Share2,
  ChevronRight,
  Target,
  Palette
} from 'lucide-react';

const ProjectSpec = () => {
  const sections = [
    { id: 'Project Vision', icon: <Compass className="w-5 h-5" /> },
    { id: 'Design System', icon: <Layout className="w-5 h-5" /> },
    { id: 'User Experience', icon: <Users className="w-5 h-5" /> },
    { id: 'Core Goals', icon: <CheckCircle2 className="w-5 h-5" /> },
    { id: 'Target Users', icon: <Users className="w-5 h-5" /> },
    { id: 'Technical Spec', icon: <Code className="w-5 h-5" /> },
    { id: 'Security Standards', icon: <Shield className="w-5 h-5" /> },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Documentation Sidebar */}
      <aside className="w-72 bg-white border-r border-slate-200 flex flex-col">
        <div className="p-8 pb-4 flex items-center gap-3">
            <div className="bg-primary-600 p-2 rounded-xl text-white">
                <Layout className="w-6 h-6" />
            </div>
            <span className="text-xl font-display font-bold text-slate-900">MediLink</span>
        </div>
        
        <div className="px-8 py-4">
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Document Contents</p>
             <h4 className="text-sm font-bold text-slate-900 mb-6">MediLink Spec v1.2</h4>
             
             <nav className="space-y-1">
                {sections.map(s => (
                    <button key={s.id} className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${s.id === 'Project Vision' ? 'bg-primary-50 text-primary-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
                        {s.icon}
                        {s.id}
                    </button>
                ))}
             </nav>
        </div>

        <div className="mt-auto p-8">
             <div className="bg-slate-50 rounded-2xl p-6 space-y-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</p>
                  <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs font-bold text-slate-700 tracking-tight">Active Production</span>
                  </div>
             </div>
        </div>
      </aside>

      {/* Doc Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-12 shrink-0">
             <div className="flex items-center gap-8 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  <span className="hover:text-primary-600 cursor-pointer transition-colors">Dashboard</span>
                  <span className="text-primary-600 border-b-2 border-primary-600 pb-7 mt-7 h-full cursor-pointer">Documentation</span>
                  <span className="hover:text-primary-600 cursor-pointer transition-colors">Teams</span>
                  <span className="hover:text-primary-600 cursor-pointer transition-colors">API Docs</span>
             </div>

             <div className="flex items-center gap-6">
                  <div className="relative">
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                       <input 
                         type="text" 
                         placeholder="Search spec..."
                         className="bg-slate-50 border border-slate-100 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/10 w-64"
                       />
                  </div>
                  <Bell className="w-5 h-5 text-slate-400 cursor-pointer" />
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100" className="w-10 h-10 rounded-xl object-cover" />
             </div>
        </header>

        {/* Scrollable Doc */}
        <main className="flex-1 overflow-y-auto p-12 bg-white">
             <div className="max-w-4xl mx-auto space-y-12 pb-24">
                  {/* Breadcrumbs */}
                  <nav className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                       <span>Docs</span> <ChevronRight className="w-3 h-3" />
                       <span>Product Specs</span> <ChevronRight className="w-3 h-3" />
                       <span className="text-slate-900">MediLink Vision</span>
                  </nav>

                  {/* Title Area */}
                  <div className="border-b border-slate-100 pb-12 relative">
                       <div className="absolute top-0 right-0 text-right opacity-30 italic font-mono text-[10px] space-y-1">
                            <p>Ref: ML-2023-012</p>
                            <p>Version 1.2</p>
                            <p>Oct 2023</p>
                       </div>
                       <h1 className="text-6xl font-display font-bold text-slate-900 leading-tight tracking-tight">MediLink Project Specification</h1>
                       <p className="text-xl text-slate-500 font-medium italic mt-4">Connecting Healthcare with Precision and Empathy</p>
                  </div>

                  {/* Section: Project Vision */}
                  <section className="space-y-8 text-left">
                       <h2 className="text-2xl font-display font-bold text-slate-900 flex items-center gap-4">
                            <div className="bg-primary-50 p-2.5 rounded-xl text-primary-600"><Compass className="w-6 h-6" /></div>
                            Project Vision
                       </h2>
                       <p className="text-slate-600 leading-relaxed text-lg font-medium">
                            MediLink is designed to be the definitive platform for seamless healthcare coordination. Our mission is to bridge the communication gap between medical professionals, patients, and healthcare <span className="text-slate-900 font-bold">administrators</span> through an intuitive, secure, and lightning-fast digital ecosystem.
                       </p>
                  </section>

                  {/* Section: Core Goals */}
                  <section className="space-y-8 text-left">
                       <h2 className="text-2xl font-display font-bold text-slate-900 flex items-center gap-4">
                            <div className="bg-primary-50 p-2.5 rounded-xl text-primary-600"><CheckCircle2 className="w-6 h-6" /></div>
                            Core Goals
                       </h2>
                       <div className="grid grid-cols-2 gap-8 sticky top-0">
                            <div className="bg-primary-50/50 border border-primary-100 p-10 rounded-[40px] space-y-6 group hover:border-primary-300 transition-all">
                                 <div className="bg-primary-600 p-2.5 rounded-xl w-fit text-white">
                                      <Globe className="w-6 h-6" />
                                 </div>
                                 <div className="space-y-3">
                                      <h4 className="text-xl font-bold text-slate-900">Guided Experience</h4>
                                      <p className="text-sm text-slate-500 leading-relaxed font-medium">
                                          Users should never feel lost. Every interaction is mapped to provide clear next steps, reducing cognitive load for busy medical staff.
                                      </p>
                                 </div>
                            </div>
                            <div className="bg-green-50/30 border border-green-100 p-10 rounded-[40px] space-y-6 group hover:border-green-300 transition-all">
                                 <div className="bg-green-500 p-2.5 rounded-xl w-fit text-white">
                                      <Shield className="w-6 h-6" />
                                 </div>
                                 <div className="space-y-3">
                                      <h4 className="text-xl font-bold text-slate-900">Confident Design</h4>
                                      <p className="text-sm text-slate-500 leading-relaxed font-medium">
                                          A UI that radiates stability and trust. Medical decisions require absolute confidence; our interface reflects that responsibility through clean, precise layouts.
                                      </p>
                                 </div>
                            </div>
                       </div>
                  </section>

                  {/* Section: Color Design System */}
                  <section className="space-y-8 text-left">
                       <h2 className="text-2xl font-display font-bold text-slate-900 flex items-center gap-4">
                            <div className="bg-primary-50 p-2.5 rounded-xl text-primary-600"><Palette className="w-6 h-6" /></div>
                            Color Design System
                       </h2>
                       <p className="text-slate-500 font-medium">Our palette is curated to elicit trust, calmness, and professionalism within clinical environments.</p>
                       
                       <div className="space-y-6">
                            <div className="flex bg-white border border-slate-100 rounded-[32px] overflow-hidden card-shadow">
                                 <div className="w-48 h-32 bg-primary-600 flex-shrink-0"></div>
                                 <div className="p-8 flex flex-col justify-center">
                                      <h5 className="font-bold text-slate-900 flex items-center gap-3">
                                          Primary Blue <span className="text-xs font-mono text-slate-400">#0077FF</span>
                                      </h5>
                                      <p className="text-sm text-slate-500 mt-2">Used for primary actions, navigation, and core branding elements. Represents intelligence and stability.</p>
                                 </div>
                            </div>
                            <div className="flex bg-white border border-slate-100 rounded-[32px] overflow-hidden card-shadow">
                                 <div className="w-48 h-32 bg-green-500 flex-shrink-0"></div>
                                 <div className="p-8 flex flex-col justify-center">
                                      <h5 className="font-bold text-slate-900 flex items-center gap-3">
                                          Healthcare Green <span className="text-xs font-mono text-slate-400">#24B276</span>
                                      </h5>
                                      <p className="text-sm text-slate-500 mt-2">Used for status indicators, health-positive metrics, and success states. Represents growth and healing.</p>
                                 </div>
                            </div>
                       </div>
                  </section>

                  {/* Section: Target Users */}
                  <section className="space-y-8 text-left">
                       <h2 className="text-2xl font-display font-bold text-slate-900 flex items-center gap-4">
                            <div className="bg-primary-50 p-2.5 rounded-xl text-primary-600"><Target className="w-6 h-6" /></div>
                            Target Users
                       </h2>
                       <div className="overflow-hidden rounded-[32px] border border-slate-100 card-shadow">
                            <table className="w-full">
                                 <thead className="bg-slate-50/50">
                                      <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-left">
                                           <th className="px-10 py-5">Persona</th>
                                           <th className="px-10 py-5">Primary Goal</th>
                                           <th className="px-10 py-5">Pain Point</th>
                                      </tr>
                                 </thead>
                                 <tbody className="divide-y divide-slate-100">
                                      {[
                                          { p: 'Specialist Doctors', g: 'Rapid access to patient history', pb: 'Fragmented data sources' },
                                          { p: 'Triage Nurses', g: 'Efficient patient processing', pb: 'Time-consuming paperwork' },
                                          { p: 'Care Managers', g: 'Tracking long-term outcomes', pb: 'Poor inter-team tracking' },
                                      ].map((item, i) => (
                                          <tr key={i} className="text-sm font-bold text-slate-800">
                                               <td className="px-10 py-6">{item.p}</td>
                                               <td className="px-10 py-6 text-slate-500 font-medium">{item.g}</td>
                                               <td className="px-10 py-6 text-slate-500 font-medium italic"><span className="text-slate-800 font-bold not-italic">{item.pb.split(' ')[0]}</span> {item.pb.split(' ').slice(1).join(' ')}</td>
                                          </tr>
                                      ))}
                                 </tbody>
                            </table>
                       </div>
                  </section>

                  {/* Footer Credits */}
                  <div className="flex items-center justify-between opacity-30 pt-12 border-t border-slate-100 font-medium text-xs">
                       <p>© 2023 MediLink Healthcare Platform</p>
                       <div className="flex gap-8">
                            <span className="cursor-pointer border-b border-transparent hover:border-slate-900 pb-1 flex items-center gap-1"><Download className="w-3 h-3" /> Download PDF</span>
                            <span className="cursor-pointer border-b border-transparent hover:border-slate-900 pb-1 flex items-center gap-1"><Share2 className="w-3 h-3" /> Share Spec</span>
                       </div>
                  </div>
             </div>
        </main>
      </div>
    </div>
  );
};

export default ProjectSpec;
