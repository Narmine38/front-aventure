// auth.js
import { defineStore } from 'pinia';
import axios from 'axios';
import api from "@/services/api";

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        // État initial
        user: JSON.parse(sessionStorage.getItem('user')) || null,
        roles: JSON.parse(sessionStorage.getItem('roles')) || [],
        token: sessionStorage.getItem('token') || '',
        errorMessage: '',
        message: ''
    }),
    getters: {
        // Getters pour accéder à l'état du store
        isAuthenticated: (state) => !!state.token
    },
    actions: {

        // Actions pour mettre à jour l'état
        async login(email, password) {
            try {
                const response = await api.post('/api/login', {
                    email,
                    password,
                });

                // Stockez le jeton d'accès et d'autres informations dans le sessionStorage
                this.token = response.data.access_token;
                this.user = response.data.user;
                this.roles = response.data.roles;
                sessionStorage.setItem('token', this.token);
                sessionStorage.setItem('user', JSON.stringify(this.user));
                sessionStorage.setItem('roles', JSON.stringify(this.roles));

                // Vous pouvez maintenant rediriger l'utilisateur où vous le souhaitez après une connexion réussie
                // par exemple, this.router.push('/');
            } catch (error) {
                this.errorMessage = error.response?.data.message || 'Invalid credentials.';
            }
        },

        async logout() {
            try {
                await api.post('/api/logout', {}, {
                    headers: {
                        'Authorization': `Bearer ${this.token}`
                    }
                });

                // Nettoyez le sessionStorage et l'état du store
                this.token = '';
                this.user = null;
                this.roles = [];
                sessionStorage.removeItem('token');
                sessionStorage.removeItem('user');
                sessionStorage.removeItem('roles');

                // Rediriger l'utilisateur ou mettre à jour l'état de l'application après la déconnexion
                // par exemple, this.router.push('/login');
            } catch (error) {
                this.message = 'Failed to logout.';
                console.error('Logout error:', error);
            }
        }
    }
});
