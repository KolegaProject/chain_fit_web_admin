// src/pages/Dashboard.jsx
import { useState } from "react";
import { ClipboardList, CheckCircle2, XCircle } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import StatCard from "../components/StatCard";
import GymCard from "../components/GymCard";
import ActionModal from "../components/ActionModal"; // Import Modal kita

const DUMMY_GYMS = [
    {
        id: 1,
        name: "Titan Fitness",
        location: "Jakarta",
        email: "contact@titanfitness.id",
        phone: "+62 812-3456-7890",
        status: "PENDING",
        imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Apex Strength",
        location: "Bali",
        email: "hello@apexstrength.com",
        phone: "+62 811-9876-5432",
        status: "PENDING",
        imageUrl: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1470&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Apex Strength",
        location: "Bali",
        email: "hello@apexstrength.com",
        phone: "+62 811-9876-5432",
        status: "PENDING",
        imageUrl: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1470&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Apex Strength",
        location: "Bali",
        email: "hello@apexstrength.com",
        phone: "+62 811-9876-5432",
        status: "PENDING",
        imageUrl: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1470&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Apex Strength",
        location: "Bali",
        email: "hello@apexstrength.com",
        phone: "+62 811-9876-5432",
        status: "PENDING",
        imageUrl: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1470&auto=format&fit=crop"
    }
];

const Dashboard = () => {
    // STATE MANAJEMEN MODAL
    const [modalConfig, setModalConfig] = useState({
        isOpen: false,
        type: null, // 'approve' atau 'reject'
        gymName: "",
    });

    // Fungsi yang dipanggil saat tombol Approve di GymCard diklik
    const handleApprove = (id, name) => {
        setModalConfig({
            isOpen: true,
            type: "approve",
            gymName: name,
        });
    };

    // Fungsi yang dipanggil saat tombol Reject di GymCard diklik
    const handleReject = (id, name) => {
        setModalConfig({
            isOpen: true,
            type: "reject",
            gymName: name,
        });
    };

    // Fungsi untuk menutup Modal
    const closeModal = () => {
        setModalConfig({ ...modalConfig, isOpen: false });
    };

    return (
        <div className="w-full flex flex-col gap-10 pb-10">

            {/* 1. SECTION STATISTIK */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Pending Gym" value="14" icon={ClipboardList} delay={0.1} />
                <StatCard title="Approved Today" value="5" icon={CheckCircle2} delay={0.2} />
                <StatCard title="Rejected Today" value="2" icon={XCircle} delay={0.3} />
            </div>

            {/* 2. SECTION PENDING APPROVALS */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Pending Approvals</h2>
                    <span className="text-[13px] text-gray-500 dark:text-gray-400">Showing latest requests</span>
                </div>

                <div className="flex flex-col gap-4">
                    {DUMMY_GYMS.map((gym) => (
                        <GymCard
                            key={gym.id}
                            gym={gym}
                            // Kita passing id dan name agar nama gym-nya bisa masuk ke modal
                            onApprove={() => handleApprove(gym.id, gym.name)}
                            onReject={() => handleReject(gym.id, gym.name)}
                        />
                    ))}
                </div>
            </div>

            {/* 3. COMPONENT MODAL (Berada di luar flow dokumen biasa) */}
            {/* AnimatePresence wajib ada agar efek exit (menghilang) dari Framer Motion bekerja */}
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