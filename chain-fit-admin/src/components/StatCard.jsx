// src/components/StatCard.jsx
import { motion } from "framer-motion";

export default function StatCard({ title, value, icon: Icon, delay = 0 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: delay }}
            className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/5 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group hover:border-gray-300 dark:hover:border-white/20 transition-colors"
        >
            {/* Bagian Atas: Judul dan Icon */}
            <div className="flex justify-between items-start mb-6">
                <h3 className="text-[11px] font-semibold tracking-[0.08em] uppercase text-gray-500 dark:text-gray-400">
                    {title}
                </h3>
                <div className="text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
            </div>

            {/* Bagian Bawah: Angka Value */}
            <div>
                <p className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                    {value}
                </p>
            </div>

            {/* Dekorasi Garis Bawah (Progress Bar Aesthetic dari desain) */}
            <div className="absolute bottom-0 left-6 right-6 h-[3px] bg-gray-100 dark:bg-white/5 rounded-t-md overflow-hidden">
                <div className="h-full bg-black dark:bg-white w-1/3 rounded-t-md opacity-20 dark:opacity-40"></div>
            </div>
        </motion.div>
    );
}