import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Bookings from './components/Bookings';
import Settings from './components/Settings';
import Analytics from './components/Analytics';
import Signup from './components/Auth/Signup';
import AppointmentDashboard from './components/Appointments/Dashboard';
import AppointmentScheduler from './components/Appointments/AppointmentScheduler';
import { BusinessTypeProvider, useBusinessType } from './contexts/BusinessTypeContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { businessType } = useBusinessType();
  
  if (!businessType) {
    return <Navigate to="/signup" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      {children}
    </div>
  );
};

function App() {
  const { businessType } = useBusinessType();

  return (
    <Router>
      <Routes>
        <Route path="/signup/*" element={<Signup />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              {businessType === 'appointments' ? (
                <AppointmentDashboard />
              ) : (
                <Dashboard />
              )}
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/appointments"
          element={
            <ProtectedRoute>
              <AppointmentScheduler />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;