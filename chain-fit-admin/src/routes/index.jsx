// src/routes/index.jsx
import { createBrowserRouter, Navigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Welcome from "../pages/Welcome";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

// 1. "Middleware" untuk halaman yang butuh Login (Dashboard)
const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

    // Jika belum login, lempar ke halaman login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return children;
};

// 2. "Middleware" untuk halaman Publik (Login & Welcome)
const PublicRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

    // Jika SUDAH login tapi mencoba buka halaman login, lempar ke dashboard
    if (isAuthenticated) {
        return <Navigate to="/admin/dashboard" replace />;
    }
    return children;
};

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                index: true,
                element: <PublicRoute><Welcome /></PublicRoute>,
            },
            {
                path: "login",
                element: <PublicRoute><Login /></PublicRoute>,
            },
        ],
    },
    {
        path: "/admin",
        // Bungkus DashboardLayout dengan ProtectedRoute
        element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
        children: [
            {
                path: "dashboard",
                element: <Dashboard />,
            },
        ],
    },
]);