import { defineStore } from 'pinia';
import api from "@/services/api";
import router from "@/router";

export const useAuthStore = defineStore({
    id: 'auth', // Correctement défini pour l'identifiant du store
    state: () => ({
        user: JSON.parse(sessionStorage.getItem('user')) || null,
        token: sessionStorage.getItem('token') || '',
        roles: JSON.parse(sessionStorage.getItem('roles')) || []
    }),
    getters: {
        isLoggedIn: (state) => !!state.token,
        isAdmin: (state) => state.roles.includes('admin')
    },
    actions: {
        setAuthorizationHeader() { // Suppression du mot-clé 'function' dans une action de store
            const token = this.token; // Utilisation de this.token qui est réactif
            if (token) {
                api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            }
        },

        async login(email, password) {


            try {
                const response = await api.post('/api/login', { email, password });
                this.token = response.data.access_token;
                this.user = response.data.user;
                this.roles = response.data.roles;

                sessionStorage.setItem('token', this.token);
                sessionStorage.setItem('user', JSON.stringify(this.user));
                sessionStorage.setItem('roles', JSON.stringify(this.roles));


                await router.push('/');
            } catch (error) {
                // Gérer les erreurs de connexion ici, si nécessaire
                console.error('Login error:', error);
            }
        },

        async logout() {

            this.setAuthorizationHeader();

            try {
                // Appel API pour déconnecter l'utilisateur
                await api.post('/api/logout');

                // Effacer les données d'authentification du state et du sessionStorage
                this.token = '';
                this.user = null;
                this.roles = [];
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('user');
                sessionStorage.removeItem('roles');

                // Suppression de l'entête d'autorisation après la déconnexion
                delete api.defaults.headers.common['Authorization'];

                // Rediriger l'utilisateur après déconnexion, si nécessaire
                // this.router.push('/login');
            } catch (error) {
                // Gérer les erreurs de déconnexion ici, si nécessaire
                console.error('Logout error:', error);
            }
        }
    }
});
