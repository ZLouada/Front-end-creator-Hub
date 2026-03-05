import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { useAuthContext } from './context/AuthContext';
import AuthModal from './components/auth/AuthModal';
import ForgotPasswordPage from './components/auth/ForgotPasswordPage';
import ResetPasswordPage from './components/auth/ResetPasswordPage';
import DashboardLayout from './components/layout/DashboardLayout';
import AnalyticsDashboard from './app/dashboard/analytics/page';
import SettingsPage from './app/dashboard/settings/page';
import CheckoutPage from './app/checkout/page';
import LandingPage from './components/landing/LandingPage';
import ExplorePage from './components/explore/ExplorePage';
import SubscriberFeed from './components/subscriberDashboard/subscriberDashboard';

function ProtectedRoute({ children }) {
  const { user } = useAuthContext();
  return user ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthModal />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/home" element={<LandingPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/feed" element={<SubscriberFeed />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="analytics" replace />} />
          <Route path="analytics" element={<AnalyticsDashboard />} />
          <Route path="settings"  element={<SettingsPage />} />
          <Route path="checkout"  element={<CheckoutPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;