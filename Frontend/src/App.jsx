import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DoctorDashboard from './pages/DoctorDashboard';
import Patients from './pages/Patients';
import Schedule from './pages/Schedule';
import MedicalReport from './pages/MedicalReport';
import PatientDashboard from './pages/PatientDashboard';
import MyRecords from './pages/MyRecords';
import ProjectSpec from './pages/ProjectSpec';
import DoctorProfile from './pages/DoctorProfile';
import NotFound from './pages/NotFound';
import MyDoctors from './pages/MyDoctors';
import PatientFiles from './pages/PatientFiles';
import PatientProfile from './pages/PatientProfile';
import Settings from './pages/Settings';

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  
  if (!user) return <Navigate to="/login" replace />;
  
  if (allowedRole && user.role !== allowedRole) {
    const fallbackPath = user.role === 'doctor' ? '/doctor' : user.role === 'patient' ? '/patient' : '/login';
    if (fallbackPath === '/login') {
       // Clear user if they have an invalid role
       return <Navigate to="/login" replace />;
    }
    return <Navigate to={fallbackPath} replace />;
  }
  
  return children;
};

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
          <p className="text-slate-500 font-medium animate-pulse">Initializing MediLink...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={!user ? <Login /> : <Navigate to={user.role === 'doctor' ? '/doctor' : user.role === 'patient' ? '/patient' : '/'} />} />
      <Route path="/signup" element={!user ? <Signup /> : <Navigate to={user.role === 'doctor' ? '/doctor' : user.role === 'patient' ? '/patient' : '/'} />} />
      
      {/* Doctor Routes */}
      <Route path="/doctor" element={<ProtectedRoute allowedRole="doctor"><DoctorDashboard /></ProtectedRoute>} />
      <Route path="/doctor/patients" element={<ProtectedRoute allowedRole="doctor"><Patients /></ProtectedRoute>} />
      <Route path="/doctor/schedule" element={<ProtectedRoute allowedRole="doctor"><Schedule /></ProtectedRoute>} />
      <Route path="/doctor/profile" element={<ProtectedRoute allowedRole="doctor"><DoctorProfile /></ProtectedRoute>} />
      
      {/* Patient Routes */}
      <Route path="/patient" element={<ProtectedRoute allowedRole="patient"><PatientDashboard /></ProtectedRoute>} />
      <Route path="/patient/doctors" element={<ProtectedRoute allowedRole="patient"><MyDoctors /></ProtectedRoute>} />
      <Route path="/patient/files" element={<ProtectedRoute allowedRole="patient"><PatientFiles /></ProtectedRoute>} />
      <Route path="/patient/records" element={<ProtectedRoute allowedRole="patient"><MyRecords /></ProtectedRoute>} />
      <Route path="/patient/profile" element={<ProtectedRoute allowedRole="patient"><PatientProfile /></ProtectedRoute>} />
      <Route path="/patient/settings" element={<ProtectedRoute allowedRole="patient"><Settings /></ProtectedRoute>} />
      
      <Route path="/docs" element={<ProjectSpec />} />
      <Route path="/report/:id" element={<ProtectedRoute><MedicalReport /></ProtectedRoute>} />
      
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
