import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import PatchManagement from './components/PatchManagement';
import SystemHardening from './components/SystemHardening';
import ComplianceReporting from './components/ComplianceReporting';
import Navbar from './components/Navbar';
import NotificationsPanel from './components/NotificationsPanel';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <Router>
      <AuthProvider>
        <ThemeProvider>
          <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <div className="flex">
                      <Navbar setShowNotifications={setShowNotifications} />
                      <div className="flex-1 p-8">
                        <Routes>
                          <Route path="/" element={<Dashboard />} />
                          <Route path="/patch-management" element={<PatchManagement />} />
                          <Route path="/system-hardening" element={<SystemHardening />} />
                          <Route path="/compliance-reporting" element={<ComplianceReporting />} />
                        </Routes>
                      </div>
                      {showNotifications && <NotificationsPanel onClose={() => setShowNotifications(false)} />}
                    </div>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </ThemeProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;