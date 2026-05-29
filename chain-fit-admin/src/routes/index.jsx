import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Welcome from "../pages/Welcome";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import { ProtectedRoute, PublicRoute } from "./RouteGuards";

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
        element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
        children: [
            {
                path: "dashboard",
                element: <Dashboard />,
            },
        ],
    },
]);