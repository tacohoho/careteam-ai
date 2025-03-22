import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import layouts
import MainLayout from './layouts/MainLayout';

// Import pages
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Benefits from './pages/Benefits';
import CopilotChat from './pages/CopilotChat';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="patients" element={<Patients />} />
        <Route path="benefits" element={<Benefits />} />
        <Route path="copilot" element={<CopilotChat />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App; 