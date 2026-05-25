// src/layouts/DashboardLayout.jsx
import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
// Tambahkan fungsi untuk menangani form pencarian jika diperlukan
import { Search, Sun, Moon, UserCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DashboardLayout = () => {
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') !== 'light';
        }
        return true;
    });

    // 1. BUAT STATE UNTUK PENCARIAN
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    return (
        <div className="min-h-screen flex flex-col bg-[#fafafa] dark:bg-[#0a0a0a] text-gray-900 dark:text-gray-100 font-sans transition-colors duration-500">

            <header className="h-[72px] border-b border-gray-200 dark:border-white/10 bg-white/50 dark:bg-black/50 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-8">

                <div className="flex items-center">
                    <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        Gym Approval Management
                    </h1>
                </div>

                {/* 2. HUBUNGKAN STATE KE INPUT SEARCH */}
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

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setIsDark(!isDark)}
                        className="p-2.5 rounded-full border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-[#111] transition-colors text-gray-600 dark:text-gray-400"
                    >
                        <AnimatePresence mode="wait">
                            {/* ... (kode icon Sun/Moon sama seperti sebelumnya) ... */}
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

                    <div className="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-white/10 cursor-pointer group">
                        <span className="text-[14px] font-medium text-gray-700 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white transition-colors">Admin</span>
                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                            <UserCircle className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        </div>
                    </div>
                </div>
            </header>

            <main className="flex-1 w-full max-w-7xl mx-auto p-8 overflow-x-hidden">
                {/* 3. KIRIM STATE SEARCHTERM KE HALAMAN BAWAH MELALUI CONTEXT */}
                <Outlet context={{ searchTerm }} />
            </main>
        </div>
    );
};

export default DashboardLayout;