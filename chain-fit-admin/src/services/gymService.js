import api from '../utils/api';

export const gymService = {
    // Mengambil semua data gym
    getPendingGyms: async () => {
        try {
            const response = await api.get("/api/v1/gym/verified-gym/list");
            return response.data;
        } catch (error) {
            console.error("Error fetching gyms:", error);
            throw error;
        }
    },

    // PERBAIKAN FINAL: Menggunakan method POST seperti kodemu yang asli
    verifyGymStatus: async (gymId, statusAction) => {
        try {
            const response = await api.post(`/api/v1/gym/verified-gym/${gymId}/verify`, {
                status: statusAction
            });
            return response.data;
        } catch (error) {
            console.error(`Error verifying gym ${gymId} with status ${statusAction}:`, error);
            throw error;
        }
    },

    // Mengambil detail gym berdasarkan ID
    getGymById: async (gymId) => {
        try {
            const response = await api.get(`/api/v1/gym/verified-gym/${gymId}`);
            return response.data.data;
        } catch (error) {
            console.error(`Error fetching gym ${gymId}:`, error);
            throw error;
        }
    }
};