// src/layouts/AuthLayout.jsx
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-brand-light">
            {/* <Outlet /> adalah tempat di mana komponen halaman (seperti Login) akan dirender */}
            <Outlet />
        </div>
    );
};

export default AuthLayout;