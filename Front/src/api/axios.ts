import axios from 'axios';

type Login = {
    email: string;
    password: string;
};

type Register = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

const api = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true,
    withXSRFToken: true,
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

class ApiService {

    async login(data: Login) {
        try {
            await api.get('/sanctum/csrf-cookie');
            const response = await api.post('/login', data);
            console.log('Connexion réussie :', response.data);
            return response.data;
        } catch (error: any) {
            console.error('Erreur login :', error.response?.data || error.message);
            throw error;
        }
    }

    async register(data: Register) {
        try {
            await api.get('/sanctum/csrf-cookie');
            const response = await api.post('/register', data);
            console.log('Inscription réussie :', response.data);
            return response.data;
        } catch (error: any) {
            console.error('Erreur inscription :', error.response?.data || error.message);
            throw error;
        }
    }

    async getUser() {
        try {
            const response = await api.get('/api/user');
            return response.data;
        } catch (error) {

            console.log("Aucun utilisateur connecté.");
            return null;
        }
    }

    async logout() {
        try {
            await api.post('/logout');
            console.log("Déconnexion réussie !");
        } catch (error) {
            console.error("Erreur lors de la déconnexion :", error);
            throw error;
        }
    }

    async getProgrammes() {
        const response = await api.get('/api/programmes');
        return response.data;
    }
    
    async getExercices() {
        const response = await api.get('/api/exercices');
        return response.data;
    }

    async createExercice(data: { nom: string, description: string, programmes: number[] }) {
        const response = await api.post('/api/exercices', data);
        return response.data;
    }

    async deleteExercice(id: number) {
        await api.delete(`/api/exercices/${id}`);
    }
}

export const apiService = new ApiService();