import { motion } from "framer-motion";
import { cn } from "../utils/cn";

export default function StatCard({
                                     title,
                                     value,
                                     icon: Icon,
                                     delay = 0,
                                     percentage = 0,
                                     lineColor = "bg-black dark:bg-white"
                                 }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: delay }}
            className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/5 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden group hover:border-gray-300 dark:hover:border-white/20 transition-colors"
        >
            <div className="flex justify-between items-start mb-6">
                <h3 className="text-[11px] font-semibold tracking-[0.08em] uppercase text-gray-500 dark:text-gray-400">
                    {title}
                </h3>
                <div className="text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                </div>
            </div>

            <div>
                <p className="text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                    {value}
                </p>
            </div>

            <div className="absolute bottom-0 left-6 right-6 h-[3px] bg-gray-100 dark:bg-white/5 rounded-t-md overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: delay + 0.2, ease: "easeOut" }}
                    className={cn("h-full rounded-t-md opacity-40 dark:opacity-80", lineColor)}
                ></motion.div>
            </div>
        </motion.div>
    );
}