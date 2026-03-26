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
            await api.get('/sanctum/csrf-cookie'); // Très important avant le login !
            const response = await api.post('/login', data); // ✅ DATA AJOUTÉ ICI !
            console.log('Connexion réussie :', response.data);
            return response.data;
        } catch (error: any) {
            console.error('Erreur login :', error.response?.data || error.message);
            throw error; // ✅ INDISPENSABLE pour que Login.tsx puisse afficher l'erreur
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
            throw error; // ✅ INDISPENSABLE ICI AUSSI
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
}

export const apiService = new ApiService();