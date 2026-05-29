/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import { ClipboardList, CheckCircle2, XCircle, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import StatCard from "../components/StatCard";
import GymCard from "../components/GymCard";
import ActionModal from "../components/ActionModal";
import FilterPill from "../components/FilterPill";
import { gymService } from "../services/gymService";

const Dashboard = () => {
    const { searchTerm } = useOutletContext();

    const [gyms, setGyms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState("All");
    const [modalConfig, setModalConfig] = useState({ isOpen: false, type: null, gymName: "" });

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchGyms = async () => {
            setIsLoading(true);
            try {
                const data = await gymService.getPendingGyms();
                const formattedData = data.map(gym => ({
                    id: gym.id,
                    name: gym.name,
                    location: gym.address || "Lokasi tidak diketahui",
                    email: gym.email || "No email provided",
                    phone: gym.phone || "No phone provided",
                    status: gym.status || "PENDING",
                    imageUrl: gym.imageUrl || "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop"
                }));

                setGyms(formattedData);
            } catch (error) {
                console.error("Gagal mengambil data gym:", error);
                alert("Gagal mengambil data gym. Silakan coba lagi.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchGyms();
    }, []);

    // Reset pagination when filter or search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [filter, searchTerm]);

    const handleApprove = useCallback(async (id, name) => {
        try {
            await gymService.verifyGymStatus(id, "APPROVED");
            setModalConfig({ isOpen: true, type: "approve", gymName: name });
            setGyms((prev) => prev.map(gym => gym.id === id ? { ...gym, status: "APPROVED" } : gym));
        } catch {
            alert("Gagal melakukan Approve. Silakan coba lagi.");
        }
    }, []);

    const handleReject = useCallback(async (id, name) => {
        try {
            await gymService.verifyGymStatus(id, "REJECTED");
            setModalConfig({ isOpen: true, type: "reject", gymName: name });
            setGyms((prev) => prev.map(gym => gym.id === id ? { ...gym, status: "REJECTED" } : gym));
        } catch {
            alert("Gagal melakukan Reject. Silakan coba lagi.");
        }
    }, []);

    const handleEdit = (id) => {
        setGyms((prev) => prev.map(gym => gym.id === id ? { ...gym, status: "PENDING" } : gym));
    };

    const closeModal = () => setModalConfig({ ...modalConfig, isOpen: false });

    const filteredGyms = gyms.filter((gym) => {
        const matchStatus = filter === "All" || gym.status.toUpperCase() === filter.toUpperCase();
        const searchLower = searchTerm.toLowerCase();
        const matchSearch = gym.name.toLowerCase().includes(searchLower) || gym.location.toLowerCase().includes(searchLower);
        return matchStatus && matchSearch;
    });

    const totalPages = Math.ceil(filteredGyms.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentGyms = filteredGyms.slice(indexOfFirstItem, indexOfLastItem);

    const totalGyms = gyms.length;
    const pendingCount = gyms.filter(g => g.status === "PENDING").length;
    const approvedCount = gyms.filter(g => g.status === "APPROVED").length;
    const rejectedCount = gyms.filter(g => g.status === "REJECTED").length;
    const getPercentage = (count) => totalGyms === 0 ? 0 : (count / totalGyms) * 100;

    return (
        <div className="w-full flex flex-col gap-10 pb-10">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Pending Gym" value={pendingCount} icon={ClipboardList} delay={0.1} percentage={getPercentage(pendingCount)} />
                <StatCard title="Approved" value={approvedCount} icon={CheckCircle2} delay={0.2} percentage={getPercentage(approvedCount)} />
                <StatCard title="Rejected" value={rejectedCount} icon={XCircle} delay={0.3} percentage={getPercentage(rejectedCount)} lineColor="bg-red-500" />
            </div>

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
                        {isLoading ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="py-20 flex flex-col items-center justify-center text-center border border-dashed border-gray-300 dark:border-white/10 rounded-2xl"
                            >
                                <Loader2 className="w-8 h-8 text-gray-400 animate-spin mb-3" />
                                <p className="text-gray-500 dark:text-gray-400">Mengambil data dari server...</p>
                            </motion.div>
                        ) : currentGyms.length > 0 ? (
                            currentGyms.map((gym, index) => (
                                <motion.div
                                    key={gym.id}
                                    layout
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

                    {!isLoading && totalPages > 1 && (
                        <div className="flex items-center justify-between mt-4 pt-6 border-t border-gray-200 dark:border-white/10">
              <span className="text-[13px] text-gray-500 dark:text-gray-400 font-medium">
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredGyms.length)} of {filteredGyms.length} entries
              </span>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[13px] font-medium border border-gray-200 dark:border-white/10 bg-white dark:bg-[#111] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                    Prev
                                </button>
                                <span className="text-[13px] font-medium text-gray-700 dark:text-gray-300 px-2">
                  Page {currentPage} of {totalPages}
                </span>
                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-[13px] font-medium border border-gray-200 dark:border-white/10 bg-white dark:bg-[#111] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>

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