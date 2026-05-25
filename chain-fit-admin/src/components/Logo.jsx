// src/components/Logo.jsx
import React from 'react';
import { cn } from "../utils/cn";

// Import kedua versi logo dari folder assets
import logoWhite from '../assets/logo-light-bg.png'; // Teks Putih
import logoBlack from '../assets/logo-dark-bg.png'; // Teks Hitam

const Logo = ({ className = "w-32" }) => {
    return (
        <div className={cn("relative flex items-center justify-center", className)}>

            {/* 1. Logo untuk Light Mode (Teks Hitam) */}
            {/* Muncul secara default, tapi sembunyi saat mode dark aktif (dark:hidden) */}
            <img
                src={logoBlack}
                alt="Chain Fit Logo"
                className="block dark:hidden w-full h-auto object-contain transition-opacity duration-500"
            />

            {/* 2. Logo untuk Dark Mode (Teks Putih) */}
            {/* Sembunyi secara default, tapi muncul saat mode dark aktif (dark:block) */}
            <img
                src={logoWhite}
                alt="Chain Fit Logo"
                className="hidden dark:block w-full h-auto object-contain transition-opacity duration-500"
            />

        </div>
    );
};

export default Logo;