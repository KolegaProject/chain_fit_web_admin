// src/layouts/DashboardLayout.jsx
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
    return (
        <div className="min-h-screen flex bg-brand-light">
            {/* Sidebar Placeholder */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:block">
                <div className="p-4 border-b border-gray-200">
                    <h2 className="text-xl font-bold">Chain Fit</h2>
                </div>
                <nav className="p-4">Menu Sidebar di sini</nav>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                {/* Topbar Placeholder */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6">
                    <span>Topbar Header</span>
                </header>

                {/* Dynamic Content */}
                <main className="flex-1 p-6 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;