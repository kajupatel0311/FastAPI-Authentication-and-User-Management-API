import { BrowserRouter, Routes, Route } from "react-router-dom";

import LoginPage from "../pages/Login/LoginPage";
import RegisterPage from "../pages/Register/RegisterPage";
import ForgotPasswordPage from "../pages/ForgotPassword/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPassword/ResetPasswordPage";

import DashboardPage from "../pages/Dashboard/DashboardPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import UsersPage from "../pages/Users/UsersPage";

import NotFoundPage from "../pages/NotFound/NotFoundPage";

import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/layout/Layout";
import SettingsPage from "../pages/Settings/SettingsPage";

function AppRouter() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Public Routes */}

        <Route
          path="/"
          element={<LoginPage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPasswordPage />}
        />

        <Route
          path="/reset-password"
          element={<ResetPasswordPage />}
        />

        {/* Protected Routes */}

        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >

          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />

          <Route
            path="/profile"
            element={<ProfilePage />}
          />

          <Route
            path="/users"
            element={<UsersPage />}
          />
          <Route
            path="/settings"
            element={<SettingsPage />}
          />

        </Route>

        {/* 404 */}

        <Route
          path="*"
          element={<NotFoundPage />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default AppRouter;
