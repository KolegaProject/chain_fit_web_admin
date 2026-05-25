// src/pages/Welcome.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Lock, CheckCircle2, Sun, Moon } from "lucide-react";
import { cn } from "../utils/cn";
import ColorBends from "../components/ColorBends";
import Logo from "../components/Logo"; // 1. IMPORT KOMPONEN LOGO BARU

const StatusBar = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 right-8 flex items-center gap-6 text-[11px] tracking-[0.1em] text-gray-500 dark:text-gray-400 uppercase font-mono z-20"
    >
        <div className="flex items-center gap-2">
            <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/30"
            />
            SYSTEM STATUS: OPTIMAL
        </div>
        <div className="w-[1px] h-3 bg-gray-300 dark:bg-gray-800" />
        <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-gray-400 dark:text-gray-500" />
            SSL ENCRYPTED NODE
        </div>
    </motion.div>
);

const Welcome = () => {
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDark]);

    const originalColors = ["#ff5c7a", "#8a5cff", "#00ffd1"];

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 text-gray-900 dark:text-white overflow-hidden bg-gray-50 dark:bg-[#050505] font-sans antialiased transition-colors duration-500">

            {/* 1. ANIMASI (Paling Belakang) */}
            <div className="absolute inset-0 z-0">
                <ColorBends
                    colors={originalColors}
                    rotation={90}
                    speed={0.2}
                    scale={1}
                    frequency={1}
                    warpStrength={1}
                    mouseInfluence={1}
                    noise={0.15}
                    parallax={0.5}
                    iterations={1}
                    intensity={1.5}
                    bandWidth={6}
                    transparent={true}
                    autoRotate={0}
                />
            </div>

            {/* 2. OVERLAY (Penyesuaian Light/Dark) */}
            <div className={cn(
                "absolute inset-0 transition-colors duration-500 z-10 pointer-events-none",
                isDark ? "bg-transparent" : "bg-white/80 backdrop-blur-[1px]"
            )}></div>

            {/* 3. TOMBOL TEMA */}
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

            {/* 4. KONTEN */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center text-center max-w-3xl px-6 relative z-20"
            >
                <div className="mb-6 flex flex-col items-center gap-4">

                    {/* --- GANTI KOTAK SVG LAMA DENGAN KOMPONEN LOGO BARU --- */}
                    {/* Kita berikan ukuran w-40 (160px) agar logonya terlihat megah */}
                    <Logo className="w-40 h-auto mb-2 drop-shadow-md" />

                    <div className="flex items-center gap-2.5 text-[12px] tracking-[0.25em] text-gray-500 uppercase font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        AUTHORIZED ACCESS ONLY
                    </div>
                </div>

                <h1 className="text-[48px] md:text-[60px] leading-[1.05] font-extrabold tracking-[-0.03em] mb-7 text-gray-900 dark:text-white drop-shadow-sm">
                    Manage Gym Verification Efficiently
                </h1>

                <p className="text-[17px] md:text-[19px] text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl mb-12 tracking-wide font-normal">
                    Premium admin platform for approving and managing registered gyms. Streamline your approval workflow with architectural precision and real-time oversight.
                </p>

                <Link
                    to="/login"
                    className={cn(
                        "group relative flex items-center gap-3 px-9 py-4 rounded-full font-semibold transition-all duration-300 active:scale-[0.98]",
                        "bg-black text-white hover:bg-gray-800 shadow-xl",
                        "dark:bg-white dark:text-black dark:hover:bg-gray-200"
                    )}
                >
                    Enter Platform
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
                </Link>
            </motion.div>

            <StatusBar />
        </div>
    );
};

export default Welcome;