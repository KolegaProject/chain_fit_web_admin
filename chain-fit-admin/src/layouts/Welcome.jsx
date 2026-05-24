// src/pages/Welcome.jsx
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const Welcome = () => {
    return (
        <div className="text-center flex flex-col items-center max-w-md px-6">
            <div className="w-16 h-16 bg-brand-dark text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <span className="text-2xl font-bold">CF</span>
            </div>
            <h1 className="text-4xl font-extrabold text-brand-dark mb-4 tracking-tight">
                Chain Fit Admin
            </h1>
            <p className="text-brand-gray mb-8 text-lg">
                Platform manajemen pusat untuk mengontrol dan menyetujui pendaftaran gym baru secara terpusat.
            </p>

            {/* Tombol Navigasi ke Login */}
            <Link
                to="/login"
                className="group flex items-center gap-2 bg-brand-dark text-white px-6 py-3 rounded-lg font-medium hover:bg-black transition-all duration-300"
            >
                Masuk ke Dashboard
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>
    );
};

export default Welcome;