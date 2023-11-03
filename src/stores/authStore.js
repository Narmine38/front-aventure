import { defineStore } from 'pinia';
import api from '@/services/api';

export const useAuthStore = defineStore('auth', {
    id: 'auth',
    state: () => ({
        isLoggedIn: !!sessionStorage.getItem('auth_token'),
        isAdmin: sessionStorage.getItem('isAdmin') === 'true',
        userRole: JSON.parse(sessionStorage.getItem('userRole')) || [],
        errorMessage: '',
        message: '',
    }),
    actions: {
        setAuthorizationHeader() {
            const token = sessionStorage.getItem('auth_token');
            if (token) {
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
        },

        async login(email, password) {
            try {
                // Obtention du cookie CSRF pour la sécurité des sessions
                await api.get('/sanctum/csrf-cookie');
                // Tentative de connexion avec les informations d'identification fournies
                const response = await api.post('/api/login', { email, password });

                // Vérification de la réponse et mise en place des données d'authentification
                if (response.data.access_token) {
                    // Enregistrement des données d'authentification dans le stockage de session
                    this.setAuthData(response.data.user, response.data.roles, response.data.access_token);
                    this.errorMessage = '';
                    // Redirection ou mise à jour de l'interface utilisateur
                } else {
                    this.errorMessage = "La connexion a réussi mais aucune donnée d'authentification n'a été reçue.";
                }
            } catch (error) {
                this.errorMessage = error.response?.data?.error || 'Erreur lors de la connexion';
                this.clearAuthData();
            }
        },

        async logout() {
            if (!this.isLoggedIn) {
                this.errorMessage = "No authentication token found. Logging out locally.";
                this.clearAuthData();
                return;
            }
            this.setAuthorizationHeader();
            try {
                // Envoi d'une requête de déconnexion au serveur
                const response = await api.post('/api/logout');
                // Si la réponse du serveur indique une déconnexion réussie, on efface les données d'authentification
                if (response.data.message === 'Logged out successfully.') {
                    this.clearAuthData();
                    this.message = response.data.message;
                } else {
                    this.errorMessage = "Unexpected response during logout: " + response.data.message;
                }
            } catch (error) {
                this.errorMessage = 'Error logging out: ' + error.response.data;
            }
        },

        setAuthData(user, roles, authToken) {
            this.isLoggedIn = true;
            this.userRole = roles;
            this.isAdmin = roles.includes('admin');
            sessionStorage.setItem('auth_token', authToken);
            sessionStorage.setItem('userData', JSON.stringify(user));
            sessionStorage.setItem('userRole', JSON.stringify(roles));
            sessionStorage.setItem('isAdmin', this.isAdmin ? 'true' : 'false');
        },

        clearAuthData() {
            this.isLoggedIn = false;
            this.isAdmin = false;
            this.userRole = [];
            sessionStorage.clear();
            // Suppression du cookie CSRF
            document.cookie = 'XSRF-TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        }
    }
});
