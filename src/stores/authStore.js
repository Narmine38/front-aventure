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



        setAuthorizationHeader() {
            const token = sessionStorage.getItem('auth_token');
            if (token) {
                api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            }
        },

        async login(credentials) {
            try {
                // Obtention du cookie CSRF pour la sécurité des sessions
                await api.get('/sanctum/csrf-cookie');
                // Tentative de connexion avec les informations d'identification fournies
                const response = await api.post('/api/login', credentials);

                // Vérification de la réponse et mise en place des données d'authentification
                if (response.data.access_token) {
                    // Enregistrement des données d'authentification dans le stockage de session
                    this.sessionStorage.setItem(response.data.user, response.data.roles, response.data.access_token);
                } else {
                    console.error("La connexion a réussi mais aucune donnée d'authentification n'a été reçue.");
                }
            } catch (error) {
                console.error("Erreur lors de la connexion:", error.response.data);
                this.clearAuthData();
            }
        },


        async logout() {
            if (!sessionStorage.getItem('auth_token')) {
                console.warn("No authentication token found. Logging out locally.");
                this.clearAuthData();
                return;
            }

            this.setAuthorizationHeader();
            try {
                // Envoi d'une requête de déconnexion au serveur.
                const response = await api.post('/api/logout');

                // Si la réponse du serveur indique une déconnexion réussie, on efface les données d'authentification.
                if (response.data.message === 'Logged out successfully.') {
                    this.clearAuthData();
                } else {
                    console.warn("Unexpected response during logout:", response.data.message);
                }
            } catch (error) {
                console.error("Error logging out:", error.response.data);
            }
        },


        setAuthData(user, roles, authToken) {
            this.isLoggedIn = true;
            this.userRole = roles;
            this.isAdmin = roles.includes('admin');

            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('auth_token', authToken); // Stockage du token d'authentification
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
