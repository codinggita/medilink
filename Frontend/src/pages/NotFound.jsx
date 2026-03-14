import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 font-sans text-center">
      <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-[32px] card-shadow border border-slate-100 text-center">
        <div className="w-16 h-16 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center mx-auto">
            <AlertCircle className="w-8 h-8" />
        </div>
        <div className="space-y-2">
            <h1 className="text-2xl font-display font-bold text-slate-900">Page Under Construction</h1>
            <p className="text-slate-500 text-sm leading-relaxed">The page you are looking for hasn't been implemented yet, or the link may be broken.</p>
        </div>
        <button 
            onClick={() => navigate(-1)}
            className="w-full py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl flex items-center justify-center gap-2 transition-colors mt-4"
        >
            <ArrowLeft className="w-4 h-4" />
            Go Back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
