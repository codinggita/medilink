import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, ShieldCheck, CheckCircle2, User, Stethoscope, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import apiClient from '../api/apiClient';
import { validateEmail, validatePassword } from '../utils/validation';

const Login = () => {
  const [role, setRole] = useState('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const validateField = (name, value) => {
    if (name === 'email') return validateEmail(value);
    if (name === 'password') return validatePassword(value);
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') setEmail(value);
    if (name === 'password') setPassword(value);
    
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const newErrors = { email: emailError, password: passwordError };
    const allTouched = { email: true, password: true };
    setTouched(allTouched);
    setErrors(newErrors);
    
    if (emailError || passwordError) {
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await apiClient.post('/auth/login', { email, password, role });
      login(response.data);
      navigate(role === 'doctor' ? '/doctor' : '/patient');
    } catch (err) {
      if (!err.response) {
        setError('Server connection failed. Please ensure the backend server is running (port 5000).');
      } else {
        setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 md:p-8 font-sans relative">
      <div className="max-w-5xl w-full flex bg-white rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] min-h-[640px] max-h-[90vh] my-auto relative z-10">
        
        {/* Left Side - Blue Branding */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-primary-600 to-blue-600 p-10 flex-col justify-between relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-[-50px] right-[-50px] opacity-10">
            <svg viewBox="0 0 200 200" width="300" height="300" fill="white">
                <path d="M100 0 L120 80 L200 100 L120 120 L100 200 L80 120 L0 100 L80 80 Z" />
            </svg>
          </div>

          <div className="space-y-12 relative z-10">
            <div className="flex items-center gap-3 text-white">
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <span className="text-2xl font-display font-bold">MediLink</span>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl font-display font-bold text-white leading-tight">
                Your health data, secured and accessible.
              </h1>
              <p className="text-primary-100 text-xl leading-relaxed max-w-sm">
                Connect with your healthcare providers, manage appointments, and access medical records in one secure portal.
              </p>
            </div>
          </div>

          <div className="bg-white/10 border border-white/20 rounded-2xl p-6 flex items-start gap-4 backdrop-blur-sm relative z-10">
            <div className="bg-blue-400/20 p-2 rounded-lg">
                <CheckCircle2 className="text-blue-200 w-6 h-6" />
            </div>
            <div>
              <p className="text-white font-semibold">HIPAA Compliant</p>
              <p className="text-primary-100 text-sm">End-to-end encrypted medical data</p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-center bg-white">
          <div className="max-w-md mx-auto w-full space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-display font-bold text-slate-900">Welcome back</h2>
              <p className="text-slate-500">Please select your portal and enter your credentials.</p>
            </div>

            {/* Role Toggle */}
            <div className="bg-slate-100 p-1.5 rounded-xl flex gap-1">
              <button 
                onClick={() => setRole('patient')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg transition-all ${role === 'patient' ? 'bg-white shadow text-primary-600 font-medium' : 'text-slate-600 hover:bg-slate-200'}`}
              >
                <User className="w-4 h-4" />
                Patient
              </button>
              <button 
                onClick={() => setRole('doctor')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg transition-all ${role === 'doctor' ? 'bg-white shadow text-primary-600 font-medium' : 'text-slate-600 hover:bg-slate-200'}`}
              >
                <Stethoscope className="w-4 h-4" />
                Doctor
              </button>
            </div>

            <form className="space-y-6" onSubmit={handleSignIn}>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${touched.email && errors.email ? 'text-red-400' : 'text-slate-400 group-focus-within:text-primary-500'}`} />
                  <input 
                    type="email" 
                    name="email"
                    value={email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="name@hospital.com"
                    className={`w-full bg-slate-50 border rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all dark:bg-slate-800 dark:border-slate-700 ${touched.email && errors.email ? 'border-red-400 focus:ring-red-500/20 focus:border-red-400' : 'border-slate-200 focus:border-primary-500'}`}
                  />
                </div>
                {touched.email && errors.email && (
                  <div className="flex items-center gap-1 text-red-500 text-xs font-medium ml-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.email}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <label className="text-sm font-semibold text-slate-700">Password</label>
                  <button type="button" className="text-sm font-bold text-primary-600 hover:text-primary-700">Forgot?</button>
                </div>
                <div className="relative group">
                  <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${touched.password && errors.password ? 'text-red-400' : 'text-slate-400 group-focus-within:text-primary-500'}`} />
                  <input 
                    type="password" 
                    name="password"
                    value={password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="••••••••"
                    className={`w-full bg-slate-50 border rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all dark:bg-slate-800 dark:border-slate-700 ${touched.password && errors.password ? 'border-red-400 focus:ring-red-500/20 focus:border-red-400' : 'border-slate-200 focus:border-primary-500'}`}
                  />
                </div>
                {touched.password && errors.password && (
                  <div className="flex items-center gap-1 text-red-500 text-xs font-medium ml-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.password}
                  </div>
                )}
              </div>

              <div className="bg-primary-50 border border-primary-100 rounded-xl p-4 flex gap-3 items-start">
                <div className="bg-primary-100 p-1 rounded-md mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-600" />
                </div>
                <div className="space-y-1">
                  <p className="text-[13px] text-primary-800 leading-snug">
                    <span className="font-bold">Two-Factor Authentication:</span> One-time code required for access.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-bold">
                    <button 
                      type="button"
                      onClick={() => {
                        setEmail('doctor@medilink.com');
                        setPassword('password123');
                        setRole('doctor');
                      }}
                      className="px-2 py-1 bg-white border border-primary-200 rounded-md hover:bg-primary-50 transition-colors text-primary-600"
                    >
                      Demo Doctor
                    </button>
                    <button 
                      type="button"
                      onClick={() => {
                        setEmail('patient@medilink.com');
                        setPassword('password123');
                        setRole('patient');
                      }}
                      className="px-2 py-1 bg-white border border-primary-200 rounded-md hover:bg-primary-50 transition-colors text-primary-600"
                    >
                      Demo Patient
                    </button>
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm font-medium">
                  {error}
                </div>
              )}

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 group transition-all transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Secure Sign In
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            <div className="text-center pt-4">
              <p className="text-slate-500">
                Don't have an account? <Link to="/signup" className="text-primary-600 font-bold hover:underline">Register your clinic</Link>
              </p>
            </div>

            <div className="flex justify-center items-center gap-8 pt-6 opacity-40 grayscale">
               <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                  <ShieldCheck className="w-4 h-4" />
                  SSL Secure
               </div>
               <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400">
                  <div className="w-4 h-4 border-2 border-slate-400 rounded flex items-center justify-center font-bold">H</div>
                  HIPAA
               </div>
            </div>
          </div>
        </div>
      </div>
      {/* Footer Links */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-6 text-[11px] md:text-xs text-slate-400 font-bold uppercase tracking-wider">
        <button className="hover:text-primary-600 transition-colors">Privacy</button>
        <button className="hover:text-primary-600 transition-colors">Terms</button>
        <button className="hover:text-primary-600 transition-colors">Support</button>
      </div>
    </div>
  );
};

export default Login;
