import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import layouts
import MainLayout from './layouts/MainLayout';

// Import pages
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import BenefitFinder from './pages/BenefitFinder';
import CopilotChat from './pages/CopilotChat';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<BenefitFinder />} />
        <Route path="patients" element={<Patients />} />
        <Route path="benefits" element={<Dashboard />} />
        <Route path="copilot" element={<CopilotChat />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App; 