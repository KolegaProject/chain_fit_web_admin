import api from '../utils/api';

export const authService = {
    login: async (identifier, password) => {
        try {
            const response = await api.post('/api/v1/auth/login', {
                username: identifier,
                password: password
            });
            return response.data;
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
    }
};