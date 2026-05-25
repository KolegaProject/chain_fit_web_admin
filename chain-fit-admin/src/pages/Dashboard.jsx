// src/pages/Dashboard.jsx
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { ClipboardList, CheckCircle2, XCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import StatCard from "../components/StatCard";
import GymCard from "../components/GymCard";
import ActionModal from "../components/ActionModal";
import { cn } from "../utils/cn";

// Data Awal
const INITIAL_DUMMY_DATA = [
    { id: 1, name: "Titan Fitness", location: "Jakarta", email: "contact@titanfitness.id", phone: "+62 812-3456-7890", status: "PENDING", imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop" },
    { id: 2, name: "Apex Strength", location: "Bali", email: "hello@apexstrength.com", phone: "+62 811-9876-5432", status: "PENDING", imageUrl: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1470&auto=format&fit=crop" },
    { id: 3, name: "Goliath Gym", location: "Surabaya", email: "info@goliathgym.co.id", phone: "+62 813-1122-3344", status: "APPROVED", imageUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1470&auto=format&fit=crop" },
    { id: 4, name: "Iron Sanctuary", location: "Bandung", email: "admin@ironsanctuary.com", phone: "+62 819-9988-7766", status: "REJECTED", imageUrl: "https://images.unsplash.com/photo-1570829460005-c840387bb1ea?q=80&w=1470&auto=format&fit=crop" }
];

const FilterPill = ({ label, active, dotColor, onClick }) => (
    <button
        onClick={onClick}
        className={cn(
            "px-4 py-1.5 rounded-full text-[13px] font-medium flex items-center gap-2 transition-all duration-300 border",
            active ? "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white shadow-sm" : "bg-transparent text-gray-600 border-gray-300 hover:border-gray-400 dark:text-gray-400 dark:border-white/10 dark:hover:border-white/30"
        )}
    >
        {dotColor && <div className={cn("w-2 h-2 rounded-full", dotColor)} />}
        {label}
    </button>
);

const Dashboard = () => {
    const { searchTerm } = useOutletContext();

    // 1. UBAH DATA DUMMY MENJADI STATE AGAR BISA DIUBAH SECARA REAL-TIME
    const [gyms, setGyms] = useState(INITIAL_DUMMY_DATA);

    const [filter, setFilter] = useState("All");
    const [modalConfig, setModalConfig] = useState({ isOpen: false, type: null, gymName: "" });

    // 2. FUNGSI UNTUK MENGUBAH STATUS (UPDATE STATE)
    const handleApprove = (id, name) => {
        // Munculkan Modal
        setModalConfig({ isOpen: true, type: "approve", gymName: name });
        // Ubah status gym di dalam state menjadi APPROVED
        setGyms((prev) => prev.map(gym => gym.id === id ? { ...gym, status: "APPROVED" } : gym));
    };

    const handleReject = (id, name) => {
        // Munculkan Modal
        setModalConfig({ isOpen: true, type: "reject", gymName: name });
        // Ubah status gym di dalam state menjadi REJECTED
        setGyms((prev) => prev.map(gym => gym.id === id ? { ...gym, status: "REJECTED" } : gym));
    };

    const handleEdit = (id) => {
        // Kembalikan status gym menjadi PENDING
        setGyms((prev) => prev.map(gym => gym.id === id ? { ...gym, status: "PENDING" } : gym));
    };

    const closeModal = () => setModalConfig({ ...modalConfig, isOpen: false });

    // 3. LOGIKA FILTERING (Sekarang mengambil dari state 'gyms' bukan data statis)
    const filteredGyms = gyms.filter((gym) => {
        const matchStatus = filter === "All" || gym.status.toUpperCase() === filter.toUpperCase();
        const searchLower = searchTerm.toLowerCase();
        const matchSearch = gym.name.toLowerCase().includes(searchLower) || gym.location.toLowerCase().includes(searchLower);
        return matchStatus && matchSearch;
    });

    // Hitung jumlah statistik secara dinamis berdasarkan State
    const pendingCount = gyms.filter(g => g.status === "PENDING").length;
    const approvedCount = gyms.filter(g => g.status === "APPROVED").length;
    const rejectedCount = gyms.filter(g => g.status === "REJECTED").length;

    return (
        <div className="w-full flex flex-col gap-10 pb-10">

            {/* SECTION STATISTIK DINAMIS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Pending Gym" value={pendingCount} icon={ClipboardList} delay={0.1} />
                <StatCard title="Approved Today" value={approvedCount} icon={CheckCircle2} delay={0.2} />
                <StatCard title="Rejected Today" value={rejectedCount} icon={XCircle} delay={0.3} />
            </div>

            {/* SECTION LIST & FILTER */}
            <div className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight mb-1">
                            Application Results
                        </h2>
                        <span className="text-[14px] text-gray-500 dark:text-gray-400">
              {searchTerm ? `Searching for "${searchTerm}" in ${filter} status` : `Showing results for "${filter}" status`}
            </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                        <FilterPill label="All" active={filter === "All"} onClick={() => setFilter("All")} />
                        <FilterPill label="Pending" dotColor="bg-amber-500" active={filter === "Pending"} onClick={() => setFilter("Pending")} />
                        <FilterPill label="Approved" dotColor="bg-emerald-500" active={filter === "Approved"} onClick={() => setFilter("Approved")} />
                        <FilterPill label="Rejected" dotColor="bg-red-500" active={filter === "Rejected"} onClick={() => setFilter("Rejected")} />
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <AnimatePresence mode="popLayout">
                        {filteredGyms.length > 0 ? (
                            filteredGyms.map((gym, index) => (
                                <motion.div
                                    key={gym.id}
                                    layout // Ini membuat animasi pergeseran saat status berubah
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.4, delay: index * 0.05 }}
                                >
                                    <GymCard
                                        gym={gym}
                                        onApprove={handleApprove}
                                        onReject={handleReject}
                                        onEdit={handleEdit}
                                    />
                                </motion.div>
                            ))
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="py-12 flex flex-col items-center justify-center text-center border border-dashed border-gray-300 dark:border-white/10 rounded-2xl"
                            >
                                <p className="text-gray-500 dark:text-gray-400">
                                    {searchTerm ? `No gyms found matching "${searchTerm}".` : "No gyms found for this status."}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* MODAL */}
            <AnimatePresence>
                {modalConfig.isOpen && (
                    <ActionModal
                        isOpen={modalConfig.isOpen}
                        type={modalConfig.type}
                        gymName={modalConfig.gymName}
                        onClose={closeModal}
                    />
                )}
            </AnimatePresence>

        </div>
    );
};

export default Dashboard;