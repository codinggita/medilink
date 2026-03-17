import React, { useState, useRef, useEffect } from 'react';
import { Mail, Lock, ArrowRight, ShieldCheck, User, Stethoscope, Loader2, UserPlus, AlertCircle, Check, X } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import apiClient from '../api/apiClient';
import { validateEmail, validatePassword, validateName, validateConfirmPassword, validatePasswordStrength } from '../utils/validation';

const Signup = () => {
  const [role, setRole] = useState('patient');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const nameInputRef = useRef(null);

  useEffect(() => {
    if (nameInputRef.current) {
        nameInputRef.current.focus();
    }
  }, []);

  const validateField = (name, value) => {
    switch (name) {
      case 'name': return validateName(value);
      case 'email': return validateEmail(value);
      case 'password': return validatePassword(value);
      case 'confirmPassword': return validateConfirmPassword(formData.password, value);
      default: return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'password') {
      const strength = validatePasswordStrength(value);
      setPasswordStrength(strength);
    }
    
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    
    const nameError = validateName(formData.name);
    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password);
    const confirmError = validateConfirmPassword(formData.password, formData.confirmPassword);
    
    const newErrors = {
      name: nameError,
      email: emailError,
      password: passwordError,
      confirmPassword: confirmError
    };
    
    const allTouched = { name: true, email: true, password: true, confirmPassword: true };
    setTouched(allTouched);
    setErrors(newErrors);
    
    if (nameError || emailError || passwordError || confirmError) {
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await apiClient.post('/auth/register', { ...formData, role });
      login(response.data);
      navigate(role === 'doctor' ? '/doctor' : '/patient');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4 md:p-8 font-sans relative">
      <div className="max-w-md w-full bg-white rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-6 md:p-8 relative z-10">
        <div className="space-y-6">
          <div className="text-center space-y-1">
            <div className="inline-flex bg-primary-100 p-2.5 rounded-2xl text-primary-600 mb-1">
                <UserPlus className="w-7 h-7" />
            </div>
            <h2 className="text-2xl font-display font-bold text-slate-900">Create Account</h2>
            <p className="text-sm text-slate-500">Join MediLink to manage your health records.</p>
          </div>

          <div className="bg-slate-100 p-1.5 rounded-xl flex gap-1">
            <button 
              type="button"
              onClick={() => setRole('patient')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg transition-all ${role === 'patient' ? 'bg-white shadow text-primary-600 font-bold' : 'text-slate-600 hover:bg-slate-200'}`}
            >
              <User className="w-4 h-4" /> Patient
            </button>
            <button 
              type="button"
              onClick={() => setRole('doctor')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg transition-all ${role === 'doctor' ? 'bg-white shadow text-primary-600 font-bold' : 'text-slate-600 hover:bg-slate-200'}`}
            >
              <Stethoscope className="w-4 h-4" /> Doctor
            </button>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 ml-1">Full Name</label>
              <div className="relative group">
                <User className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${touched.name && errors.name ? 'text-red-400' : 'text-slate-400 group-focus-within:text-primary-500'}`} />
                <input 
                  ref={nameInputRef}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text" 
                  placeholder="Enter your name"
                  className={`w-full bg-slate-50 border rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all font-medium ${touched.name && errors.name ? 'border-red-400 focus:ring-red-500/20 focus:border-red-400' : 'border-slate-200 focus:border-primary-500'}`}
                />
              </div>
              {touched.name && errors.name && (
                <div className="flex items-center gap-1 text-red-500 text-xs font-medium ml-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.name}
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${touched.email && errors.email ? 'text-red-400' : 'text-slate-400 group-focus-within:text-primary-500'}`} />
                <input 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="email" 
                  placeholder="name@example.com"
                  className={`w-full bg-slate-50 border rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all font-medium ${touched.email && errors.email ? 'border-red-400 focus:ring-red-500/20 focus:border-red-400' : 'border-slate-200 focus:border-primary-500'}`}
                />
              </div>
              {touched.email && errors.email && (
                <div className="flex items-center gap-1 text-red-500 text-xs font-medium ml-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.email}
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 ml-1">Password</label>
              <div className="relative group">
                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${touched.password && errors.password ? 'text-red-400' : 'text-slate-400 group-focus-within:text-primary-500'}`} />
                <input 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="password" 
                  placeholder="••••••••"
                  className={`w-full bg-slate-50 border rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all font-medium ${touched.password && errors.password ? 'border-red-400 focus:ring-red-500/20 focus:border-red-400' : 'border-slate-200 focus:border-primary-500'}`}
                />
              </div>
              {passwordStrength && formData.password && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 rounded-full ${
                          passwordStrength.strength < 40 ? 'bg-red-500' : 
                          passwordStrength.strength < 80 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${passwordStrength.strength}%` }}
                      />
                    </div>
                    <span className={`text-[10px] font-bold ${
                      passwordStrength.strength < 40 ? 'text-red-500' : 
                      passwordStrength.strength < 80 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {passwordStrength.strength < 40 ? 'Weak' : 
                       passwordStrength.strength < 80 ? 'Medium' : 'Strong'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    {passwordStrength.requirements.map((req, idx) => (
                      <div key={idx} className={`flex items-center gap-1 text-[10px] ${req.passed ? 'text-green-600' : 'text-slate-400'}`}>
                        {req.passed ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                        {req.message}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {touched.password && errors.password && (
                <div className="flex items-center gap-1 text-red-500 text-xs font-medium ml-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.password}
                </div>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 ml-1">Confirm Password</label>
              <div className="relative group">
                <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${touched.confirmPassword && errors.confirmPassword ? 'text-red-400' : 'text-slate-400 group-focus-within:text-primary-500'}`} />
                <input 
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="password" 
                  placeholder="••••••••"
                  className={`w-full bg-slate-50 border rounded-xl py-3.5 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all font-medium ${touched.confirmPassword && errors.confirmPassword ? 'border-red-400 focus:ring-red-500/20 focus:border-red-400' : 'border-slate-200 focus:border-primary-500'}`}
                />
              </div>
              {touched.confirmPassword && errors.confirmPassword && (
                <div className="flex items-center gap-1 text-red-500 text-xs font-medium ml-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.confirmPassword}
                </div>
              )}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-xs font-medium">
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 group transition-all transform active:scale-[0.98] disabled:opacity-70 shadow-lg shadow-primary-600/20"
            >
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Create Account <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></>}
            </button>
          </form>

          <div className="text-center pt-2 border-t border-slate-100">
            <p className="text-sm text-slate-500">
              Already have an account? <Link to="/login" className="text-primary-600 font-bold hover:underline">Sign In</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
