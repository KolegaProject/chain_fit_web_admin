import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

export default function ActionModal({ isOpen, type, gymName, onClose }) {
    if (!isOpen) return null;

    const isApprove = type === "approve";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-[4px]">

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 cursor-pointer"
                onClick={onClose}
            />

            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 10 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-[360px] bg-[#111111] border border-[#222] rounded-2xl p-8 flex flex-col items-center text-center shadow-2xl z-10"
            >
                <div
                    className={`w-[52px] h-[52px] rounded-full flex items-center justify-center mb-5 border 
          ${isApprove
                        ? 'border-gray-500 bg-[#1a1a1a] shadow-[0_0_30px_rgba(255,255,255,0.15)]'
                        : 'border-red-900/60 bg-[#1a1a1a] shadow-[0_0_30px_rgba(239,68,68,0.15)]'
                    }`}
                >
                    {isApprove ? (
                        <Check className="w-6 h-6 text-white" strokeWidth={3} />
                    ) : (
                        <X className="w-5 h-5 text-red-400" strokeWidth={2.5} />
                    )}
                </div>

                <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">
                    {isApprove ? "Success!" : "Application Rejected"}
                </h2>

                <p className="text-[14px] text-gray-400 leading-relaxed mb-8">
                    {isApprove ? (
                        <>
                            The gym application for <span className="text-white font-semibold">'{gymName}'</span> has been successfully approved.
                        </>
                    ) : (
                        <>
                            The gym application for <span className="text-white font-semibold">{gymName}</span> has been rejected and the owner has been notified.
                        </>
                    )}
                </p>

                <button
                    onClick={onClose}
                    className="w-full bg-white text-black font-semibold py-3.5 rounded-xl text-[14px] hover:bg-gray-200 transition-all active:scale-[0.98]"
                >
                    Done
                </button>
            </motion.div>
        </div>
    );
}