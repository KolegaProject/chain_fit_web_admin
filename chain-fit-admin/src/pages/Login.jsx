// src/pages/Login.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, Sun, Moon } from "lucide-react";
import BorderGlow from "../components/BorderGlow";
import { cn } from "../utils/cn";

const Login = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    // State untuk Tema (diambil dari localStorage jika ada, default: dark)
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') !== 'light';
        }
        return true;
    });

    // Efek ganti tema
    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    // Di dalam src/pages/Login.jsx
    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            // SIMPAN STATUS LOGIN KE LOCAL STORAGE
            localStorage.setItem("isAuthenticated", "true");
            navigate("/admin/dashboard");
        }, 1000);
    };

    return (
        // Background utama merespon tema
        <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50 dark:bg-[#050505] text-gray-900 dark:text-white relative overflow-hidden font-sans transition-colors duration-500">

            {/* Tombol Theme Switcher (Kanan Atas) */}
            <button
                onClick={() => setIsDark(!isDark)}
                className="absolute top-6 right-8 p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600 transition-colors bg-white/50 dark:bg-black/50 backdrop-blur-md group z-30 shadow-sm"
            >
                <AnimatePresence mode="wait">
                    {isDark ? (
                        <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                            <Sun className="w-5 h-5 text-gray-400 group-hover:text-amber-400" />
                        </motion.div>
                    ) : (
                        <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                            <Moon className="w-5 h-5 text-gray-600 group-hover:text-indigo-600" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </button>

            {/* Efek Cahaya Bias di Background */}
            <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-black/[0.03] dark:bg-white/[0.02] rounded-full blur-[100px] pointer-events-none transition-colors duration-500" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-black/[0.02] dark:bg-white/[0.015] rounded-full blur-[120px] pointer-events-none transition-colors duration-500" />

            {/* Kontainer Form Login - DIPERBESAR */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                // max-w-[420px] diubah menjadi max-w-[480px] agar lebih besar dan luas
                className="w-full max-w-[480px] px-6 relative z-10"
            >
                <BorderGlow className="w-full shadow-2xl dark:shadow-none">
                    {/* px-8 py-10 diubah menjadi px-10 py-12 untuk padding yang lebih lega */}
                    <div className="px-10 py-12 flex flex-col items-center">

                        {/* Logo */}
                        <div className="mb-5 flex items-center justify-center">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-gray-800 dark:text-gray-200 transition-colors duration-500">
                                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>

                        {/* Title & Subtitle */}
                        <h2 className="text-3xl font-bold mb-2 tracking-tight text-gray-900 dark:text-white transition-colors">Chain Fit Admin</h2>
                        <p className="text-[14px] text-gray-500 dark:text-gray-400 mb-10 font-medium transition-colors">Secure access for premium management.</p>

                        {/* Form */}
                        <form onSubmit={handleLogin} className="w-full space-y-5">

                            {/* Input Email */}
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-[18px] w-[18px] text-gray-400 dark:text-gray-500 group-focus-within:text-gray-600 dark:group-focus-within:text-gray-300 transition-colors" />
                                </div>
                                <input
                                    type="email"
                                    placeholder="admin@chainfit.com"
                                    required
                                    // Kelas input disesuaikan agar rapi di Light & Dark Mode
                                    className="w-full bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-200 text-[15px] rounded-xl focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-600 focus:border-gray-400 dark:focus:border-gray-600 block pl-11 py-3.5 transition-all outline-none placeholder:text-gray-400 dark:placeholder:text-gray-600 shadow-sm dark:shadow-none"
                                />
                            </div>

                            {/* Input Password */}
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Lock className="h-[18px] w-[18px] text-gray-400 dark:text-gray-500 group-focus-within:text-gray-600 dark:group-focus-within:text-gray-300 transition-colors" />
                                </div>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    className="w-full bg-gray-50 dark:bg-[#111] border border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-200 text-[15px] rounded-xl focus:ring-1 focus:ring-gray-400 dark:focus:ring-gray-600 focus:border-gray-400 dark:focus:border-gray-600 block pl-11 py-3.5 transition-all outline-none placeholder:text-gray-400 dark:placeholder:text-gray-600 tracking-widest shadow-sm dark:shadow-none"
                                />
                            </div>

                            {/* Remember Me & Forgot Password */}
                            <div className="flex items-center justify-between pt-2 pb-5">
                                <label className="flex items-center gap-2.5 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        // SVG Checkbox hitam untuk Light Mode, Putih untuk Dark Mode
                                        className="w-4 h-4 rounded border-gray-300 dark:border-gray-700 bg-white dark:bg-[#111] checked:bg-black checked:border-black dark:checked:bg-white dark:checked:border-white focus:ring-0 focus:ring-offset-0 cursor-pointer appearance-none
                    checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTQgMTQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTExLjY2NjYgMy41TDUuMjQ5OTIgOS45MTY2N0wyLjMzMzI1IDcuMCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4=')]
                    dark:checked:bg-[url('data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTQgMTQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTExLjY2NjYgMy41TDUuMjQ5OTIgOS45MTY2N0wyLjMzMzI1IDcuMCIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4=')]
                    bg-center bg-no-repeat transition-all"
                                    />
                                    <span className="text-[13px] text-gray-500 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors">Remember me</span>
                                </label>
                                <a href="#" className="text-[13px] text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                                    Forgot password?
                                </a>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={cn(
                                    "w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-[15px] font-semibold transition-all duration-300 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed",
                                    "bg-black text-white hover:bg-gray-800 shadow-md", // Light Mode Button
                                    "dark:bg-white dark:text-black dark:hover:bg-gray-200" // Dark Mode Button
                                )}
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    <>
                                        Login to Admin
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </BorderGlow>

                {/* Footer Text */}
                <div className="mt-8 text-center">
                    <p className="text-[12px] text-gray-400 dark:text-gray-600 font-medium transition-colors">
                        © 2026 Chain Fit. System access is restricted.
                    </p>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;