import { defineStore } from 'pinia';
import api from "@/services/api";
import router from "@/router";

export const useAuthStore = defineStore({
    id: 'auth',

    state: () => ({
        user: JSON.parse(sessionStorage.getItem('user')) || null,
        token: sessionStorage.getItem('token') || '',
        roles: JSON.parse(sessionStorage.getItem('roles')) || []
    }),

    getters: {
        isLoggedIn: (state) => !!state.token, // Renvoie vrai si un token est stocké, donc l'utilisateur est considéré comme connecté
        isAdmin: (state) => state.roles.includes('admin') // Vérifie si parmi les rôles de l'utilisateur se trouve 'admin'
    },

    actions: {
        setAuthorizationHeader() {
            const token = this.token;
            if (token) {
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
        },

        async prepareForAuthRequest() {
            await api.get('/sanctum/csrf-cookie'); // Obtention du cookie CSRF avant la soumission des données de connexion
        },

        async login(email, password) {
            await this.prepareForAuthRequest();
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
                console.error('Login error:', error);
            }
        },

        async logout() {
            await this.prepareForAuthRequest();
            this.setAuthorizationHeader();
            try {
                await api.post('/api/logout');
                this.token = '';
                this.user = null;
                this.roles = [];
                sessionStorage.clear();

                delete api.defaults.headers.common['Authorization'];

                await router.push('/login');
            } catch (error) {
                console.error('Logout error:', error);
            }
        },

        async register(userData) {
            await this.prepareForAuthRequest();
            try {
                const response = await api.post('/api/register', userData);
                console.log('Registration successful:', response.data);
                await router.push('/');
            } catch (error) {
                console.error("Registration error:", error.response.data);
            }
        },
    }
});
