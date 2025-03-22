import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Import layouts
import MainLayout from './layouts/MainLayout';

// Import pages
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Benefits from './pages/Benefits';
import CopilotChat from './pages/CopilotChat';
import NotFound from './pages/NotFound';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';

// Import auth components
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          {/* Simple dashboard page */}
          <Route path="/dashboard" element={<DashboardPage />} />
          
          {/* Main application layout with all features */}
          <Route path="/main" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="patients" element={<Patients />} />
            <Route path="benefits" element={<Benefits />} />
            <Route path="copilot" element={<CopilotChat />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App; 