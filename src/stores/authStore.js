import api from "@/services/api";
import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', {
    id: 'auth',

    state: () => ({
        isLoggedIn: !!sessionStorage.getItem('isLoggedIn'),
        isAdmin: sessionStorage.getItem('isAdmin') === 'true',
        userRole: JSON.parse(sessionStorage.getItem('userRole')) || []
    }),

    actions: {
        async login(credentials) {
            try {
                await api.get('/sanctum/csrf-cookie');
                const response = await api.post('/api/login', credentials);

                if (response.data.message === 'Connexion réussie!') {
                    this.setAuthData(response.data.user, response.data.roles);
                }
            } catch (error) {
                console.error("Erreur lors de la connexion:", error.response.data);
                this.clearAuthData();
            }
        },

        async logout() {
            try {
                const response = await api.post('/api/logout');

                if (response.data.message === 'Déconnexion réussie.') {
                    this.clearAuthData();
                } else {
                    console.warn("Réponse inattendue lors de la déconnexion:", response.data.message);
                }
            } catch (error) {
                console.error("Erreur lors de la déconnexion:", error.response.data);
            }
        },

        setAuthData(user, roles) {
            this.isLoggedIn = true;
            this.userRole = roles;
            this.isAdmin = roles.includes('admin');

            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('userData', JSON.stringify(user));
            sessionStorage.setItem('userRole', JSON.stringify(roles));
            sessionStorage.setItem('isAdmin', this.isAdmin ? 'true' : 'false');
        },

        clearAuthData() {
            this.isLoggedIn = false;
            this.isAdmin = false;
            this.userRole = [];

            sessionStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('userData');
            sessionStorage.removeItem('isAdmin');
            sessionStorage.removeItem('userRole');

            // Supprimez le cookie CSRF
            document.cookie = 'XSRF-TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        }
    }
});
