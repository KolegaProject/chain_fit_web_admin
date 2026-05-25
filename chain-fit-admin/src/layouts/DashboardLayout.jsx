// src/layouts/DashboardLayout.jsx
import { useState, useEffect } from "react";
// Tambahkan useNavigate
import { Outlet, useNavigate } from "react-router-dom";
// Tambahkan icon LogOut
import { Search, Sun, Moon, UserCircle, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DashboardLayout = () => {
    const navigate = useNavigate(); // Inisialisasi navigasi
    const [searchTerm, setSearchTerm] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State untuk Dropdown

    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') !== 'light';
        }
        return true;
    });

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    // FUNGSI LOGOUT
    const handleLogout = () => {
        localStorage.removeItem("isAuthenticated"); // Hapus token/status login
        navigate("/login"); // Arahkan ke halaman login
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#fafafa] dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 font-sans transition-colors duration-500">

            <header className="h-[72px] border-b border-gray-200 dark:border-white/10 bg-white/50 dark:bg-black/50 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-8">

                <div className="flex items-center">
                    <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        Gym Approval Management
                    </h1>
                </div>

                <div className="flex-1 max-w-xl mx-8 hidden md:block relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search gyms..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-gray-100 dark:bg-[#111111] border border-transparent dark:border-white/5 focus:border-gray-300 dark:focus:border-white/20 rounded-full py-2.5 pl-11 pr-4 text-[14px] outline-none transition-all placeholder:text-gray-500 dark:text-gray-200"
                    />
                </div>

                <div className="flex items-center gap-4 relative">

                    <button
                        onClick={() => setIsDark(!isDark)}
                        className="p-2.5 rounded-full border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-[#111] transition-colors text-gray-600 dark:text-gray-400"
                    >
                        <AnimatePresence mode="wait">
                            {isDark ? (
                                <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                    <Sun className="w-[18px] h-[18px]" />
                                </motion.div>
                            ) : (
                                <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                    <Moon className="w-[18px] h-[18px]" />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </button>

                    {/* AREA PROFIL & DROPDOWN */}
                    <div className="relative border-l border-gray-200 dark:border-white/10 pl-4">
                        {/* Tombol Profil */}
                        <div
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-3 cursor-pointer group"
                        >
                            <span className="text-[14px] font-medium text-gray-700 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white transition-colors">Admin</span>
                            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center group-hover:ring-2 ring-gray-300 dark:ring-gray-600 transition-all">
                                <UserCircle className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                            </div>
                        </div>

                        {/* Menu Dropdown Logout Animasi */}
                        <AnimatePresence>
                            {isDropdownOpen && (
                                <>
                                    {/* Invisible Overlay untuk menutup dropdown jika klik di luar area */}
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setIsDropdownOpen(false)}
                                    />

                                    {/* Kotak Dropdown */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute right-0 mt-3 w-48 bg-white dark:bg-[#111] border border-gray-200 dark:border-white/10 rounded-xl shadow-xl z-50 overflow-hidden"
                                    >
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center gap-3 px-4 py-3 text-[14px] font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors text-left"
                                        >
                                            <LogOut className="w-4 h-4" />
                                            Sign Out
                                        </button>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>

                </div>
            </header>

            <main className="flex-1 w-full max-w-7xl mx-auto p-8 overflow-x-hidden">
                <Outlet context={{ searchTerm }} />
            </main>
        </div>
    );
};

export default DashboardLayout;