// src/App.tsx

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import LoginPage from "./Pages/Auth/LoginPage";
import RegisterPage from "./Pages/Auth/RegisterPage";
import ChatPage from "./Pages/Chat/ChatPage";
import DashboardPage from "./Pages/Dashboard/DashboardPage";
import ProfilePage from "./Pages/Dashboard/ProfilePage";
import NotFoundPage from "./Pages/NotFound/NotFoundPage";
import WelcomePage from "./Pages/Welcome/WelcomePage";

import Loader from "./Components/Common/Loader";
import PageWrapper from "./Components/Common/PageWrapper";
import ForgotPassword from "./Pages/ForgetPassword/ForgetPassword";
import ResetPassword from "./Pages/ForgetPassword/ResetPassword";

// React Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    },
  },
});

// Helper function
const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

// Protected Route
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Public Route
interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  if (isAuthenticated()) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

function App() {

  // Global startup loader
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // loader duration

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AnimatePresence mode="wait">

          <Routes>

            {/* Welcome Page */}
            <Route
              path="/welcome"
              element={
                <PageWrapper>
                  <WelcomePage />
                </PageWrapper>
              }
            />

            {/* Public Routes */}
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <PageWrapper>
                    <LoginPage />
                  </PageWrapper>
                </PublicRoute>
              }
            />

            <Route
              path="/register"
              element={
                <PublicRoute>
                  <PageWrapper>
                    <RegisterPage />
                  </PageWrapper>
                </PublicRoute>
              }
            />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <PageWrapper>
                    <DashboardPage />
                  </PageWrapper>
                </ProtectedRoute>
              }
            />

            <Route
              path="/forgot-password"
              element={
                <PublicRoute>
                  <PageWrapper>
                    <ForgotPassword />
                  </PageWrapper>
                </PublicRoute>
              }
            />

            <Route
              path="/reset-password/:token"
              element={
                <PublicRoute>
                  <PageWrapper>
                    <ResetPassword />
                  </PageWrapper>
                </PublicRoute>
              }
            />

            <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <PageWrapper>
                    <ChatPage />
                  </PageWrapper>
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <PageWrapper>
                    <ProfilePage />
                  </PageWrapper>
                </ProtectedRoute>
              }
            />

            {/* Root Route */}
            <Route
              path="/"
              element={
                isAuthenticated()
                  ? <Navigate to="/dashboard" replace />
                  : <Navigate to="/welcome" replace />
              }
            />

            {/* Not Found */}
            <Route
              path="*"
              element={
                <PageWrapper>
                  <NotFoundPage />
                </PageWrapper>
              }
            />

          </Routes>

        </AnimatePresence>
      </Router>
    </QueryClientProvider>
  );
}

export default App;