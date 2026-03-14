import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientDashboard from './pages/PatientDashboard';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  
  if (!user) return <Navigate to="/login" replace />;
  
  if (allowedRole && user.role !== allowedRole) {
    const fallbackPath = user.role === 'doctor' ? '/doctor' : user.role === 'patient' ? '/patient' : '/login';
    return <Navigate to={fallbackPath} replace />;
  }
  
  return children;
};

function App() {
  const { user, loading } = useAuth();

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  return (
    <Routes>
      <Route path="/login" element={!user ? <Login /> : <Navigate to={user.role === 'doctor' ? '/doctor' : '/patient'} />} />
      <Route path="/signup" element={!user ? <Signup /> : <Navigate to={user.role === 'doctor' ? '/doctor' : '/patient'} />} />
      
      {/* Doctor Routes */}
      <Route path="/doctor" element={<ProtectedRoute allowedRole="doctor"><DoctorDashboard /></ProtectedRoute>} />
      
      {/* Patient Routes */}
      <Route path="/patient" element={<ProtectedRoute allowedRole="patient"><PatientDashboard /></ProtectedRoute>} />
      <Route path="/patient/settings" element={<ProtectedRoute allowedRole="patient"><Settings /></ProtectedRoute>} />
      
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
