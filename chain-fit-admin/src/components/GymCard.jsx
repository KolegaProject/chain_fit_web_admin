import { MapPin, Mail, Phone, Check, X } from "lucide-react";
import { cn } from "../utils/cn";

export default function GymCard({ gym, onApprove, onReject }) {
    const isPending = gym.status === "PENDING";
    const isApproved = gym.status === "APPROVED";

    return (
        <div className="bg-white dark:bg-[#111111] border border-gray-200 dark:border-white/10 rounded-2xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-gray-300 dark:hover:border-white/20 transition-colors group relative">

            {/* Bagian Info Gym & Gambar */}
            <div className="flex items-center gap-5 w-full md:w-auto">
                <div className="w-24 h-16 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800 shrink-0">
                    <img
                        src={gym.imageUrl}
                        alt={gym.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
                <div className="flex flex-col">
                    <h3 className="text-[16px] font-semibold text-gray-900 dark:text-white mb-1">
                        {gym.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="text-[13px]">{gym.location}</span>
                    </div>
                </div>
            </div>

            {/* Bagian Kontak */}
            <div className="hidden md:flex flex-col gap-1.5 border-l border-gray-100 dark:border-white/5 pl-8 w-64">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Mail className="w-3.5 h-3.5" />
                    <span className="text-[13px] truncate">{gym.email}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Phone className="w-3.5 h-3.5" />
                    <span className="text-[13px]">{gym.phone}</span>
                </div>
            </div>

            {/* Bagian Status & Tombol Aksi */}
            <div className="flex flex-col items-end justify-center w-full md:w-auto mt-4 md:mt-0 pt-4 md:pt-0 border-t border-gray-100 dark:border-none gap-2">

                {isPending ? (
                    <>
                        {/* Tampilan Jika Masih Pending */}
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                            <span className="text-[10px] font-bold tracking-widest text-gray-500 dark:text-gray-400 uppercase">
                                PENDING
                            </span>
                        </div>

                        <div className="flex items-center gap-2 w-full md:w-auto mt-1">
                            <button
                                onClick={() => onReject(gym.id, gym.name)}
                                className="flex-1 md:flex-none px-5 py-2 rounded-lg text-[13px] font-medium border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-500 hover:border-red-200 dark:hover:border-red-500/30 transition-all"
                            >
                                Reject
                            </button>
                            <button
                                onClick={() => onApprove(gym.id, gym.name)}
                                className="flex-1 md:flex-none px-5 py-2 rounded-lg text-[13px] font-medium bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all shadow-sm"
                            >
                                Approve
                            </button>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Tampilan Jika Sudah Approved / Rejected */}
                        <div className={cn(
                            "flex items-center gap-1.5 px-3 py-1 mb-1 rounded-full border text-[10px] font-bold tracking-widest uppercase",
                            isApproved
                                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                : "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400"
                        )}>
                            <div className={cn("w-1.5 h-1.5 rounded-full", isApproved ? "bg-emerald-500" : "bg-red-500")} />
                            {gym.status}
                        </div>

                        {/* Tombol Pintasan (Swap Status) */}
                        {isApproved ? (
                            <button
                                onClick={() => onReject(gym.id, gym.name)}
                                className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-[13px] font-medium border border-gray-200 dark:border-white/10 text-gray-600 hover:text-red-600 hover:bg-red-50 hover:border-red-200 dark:hover:bg-red-500/10 dark:hover:text-red-400 transition-all"
                            >
                                <X className="w-3.5 h-3.5" />
                                Ubah ke Reject
                            </button>
                        ) : (
                            <button
                                onClick={() => onApprove(gym.id, gym.name)}
                                className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-[13px] font-medium border border-gray-200 dark:border-white/10 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 hover:border-emerald-200 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-400 transition-all"
                            >
                                <Check className="w-3.5 h-3.5" />
                                Ubah ke Approve
                            </button>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}