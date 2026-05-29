import api from '../utils/api';

export const gymService = {
    getPendingGyms: async () => {
        try {
            const response = await api.get('/api/v1/gym/verified-gym');
            return response.data.data;
        } catch (error) {
            console.error("Error fetching pending gyms:", error);
            throw error;
        }
    },

    verifyGymStatus: async (gymId, statusAction) => {
        try {
            const response = await api.post(`/api/v1/gym/verified-gym/${gymId}/verify`, {
                status: statusAction
            });
            return response.data;
        } catch (error) {
            console.error(`Error verifying gym ${gymId}:`, error);
            throw error;
        }
    },

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