// src/routes/index.jsx
import { createBrowserRouter } from "react-router-dom"; // Hapus Navigate karena sudah tidak dipakai
import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Welcome from "../pages/Welcome"; // Import page baru
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AuthLayout />, // Kita pakai AuthLayout agar posisinya di tengah layar
        children: [
            {
                index: true, // index: true berarti ini adalah halaman default untuk path "/"
                element: <Welcome />,
            },
            {
                path: "login",
                element: <Login />,
            },
        ],
    },
    {
        path: "/admin",
        element: <DashboardLayout />,
        children: [
            {
                path: "dashboard",
                element: <Dashboard />,
            },
        ],
    },
]);