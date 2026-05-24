// src/pages/Dashboard.jsx
import { ClipboardList, CheckCircle2, XCircle } from "lucide-react";
import StatCard from "../components/StatCard";
import GymCard from "../components/GymCard";

// 1. BUAT DATA DUMMY (Sesuai dengan gambar desain)
const DUMMY_GYMS = [
    {
        id: 1,
        name: "Titan Fitness",
        location: "Jakarta",
        email: "contact@titanfitness.id",
        phone: "+62 812-3456-7890",
        status: "PENDING",
        // Menggunakan placeholder image realistis dari Unsplash
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
    }
];

const Dashboard = () => {

    // Fungsi sementara untuk menangani klik tombol (Nanti akan memunculkan Modal)
    const handleApprove = (id) => {
        console.log("Approve Gym ID:", id);
        alert(`Mencoba Approve Gym ID: ${id}`);
    };

    const handleReject = (id) => {
        console.log("Reject Gym ID:", id);
        alert(`Mencoba Reject Gym ID: ${id}`);
    };

    return (
        <div className="w-full flex flex-col gap-10 pb-10">

            {/* 1. SECTION STATISTIK */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard title="Total Pending Gym" value="14" icon={ClipboardList} delay={0.1} />
                <StatCard title="Approved Today" value="5" icon={CheckCircle2} delay={0.2} />
                <StatCard title="Rejected Today" value="2" icon={XCircle} delay={0.3} />
            </div>

            {/* 2. SECTION PENDING APPROVALS (List Data Dummy) */}
            <div className="flex flex-col gap-4">
                {/* Header List */}
                <div className="flex items-center justify-between mb-2">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Pending Approvals</h2>
                    <span className="text-[13px] text-gray-500 dark:text-gray-400">Showing latest requests</span>
                </div>

                {/* Render List Menggunakan Mapping */}
                <div className="flex flex-col gap-4">
                    {DUMMY_GYMS.map((gym) => (
                        <GymCard
                            key={gym.id}
                            gym={gym}
                            onApprove={handleApprove}
                            onReject={handleReject}
                        />
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Dashboard;