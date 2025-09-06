import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import Login from './pages/login';
import SystemAdministration from './pages/system-administration';
import GeologicalDataAnalysis from './pages/geological-data-analysis';
import AlertManagement from './pages/alert-management';
import Register from './pages/register';
import RealTimeDashboard from './pages/real-time-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AlertManagement />} />
        <Route path="/login" element={<Login />} />
        <Route path="/system-administration" element={<SystemAdministration />} />
        <Route path="/geological-data-analysis" element={<GeologicalDataAnalysis />} />
        <Route path="/alert-management" element={<AlertManagement />} />
        <Route path="/register" element={<Register />} />
        <Route path="/real-time-dashboard" element={<RealTimeDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
