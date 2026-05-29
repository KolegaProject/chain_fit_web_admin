import { cn } from "../utils/cn";

export default function FilterPill({ label, active, dotColor, onClick }) {
    return (
        <button
            onClick={onClick}
            className={cn(
                "px-4 py-1.5 rounded-full text-[13px] font-medium flex items-center gap-2 transition-all duration-300 border",
                active
                    ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white shadow-sm"
                    : "bg-transparent text-gray-600 border-gray-300 hover:border-gray-400 dark:text-gray-400 dark:border-white/10 dark:hover:border-white/30"
            )}
        >
            {dotColor && <div className={cn("w-2 h-2 rounded-full", dotColor)} />}
            {label}
        </button>
    );
}

