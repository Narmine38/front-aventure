// Importation des dépendances nécessaires
import { defineStore } from 'pinia';
import api from "@/services/api";
import router from "@/router";

// Définition du store d'authentification avec Pinia
export const useAuthStore = defineStore({
    // Identifiant unique pour le store d'authentification
    id: 'auth',

    // Initialisation de l'état avec les données de session existantes ou des valeurs par défaut
    state: () => ({
        user: JSON.parse(sessionStorage.getItem('user')) || null,
        token: sessionStorage.getItem('token') || '',
        roles: JSON.parse(sessionStorage.getItem('roles')) || []
    }),

    // Les getters fournissent une manière réactive d'accéder à des dérivations de l'état du store
    getters: {
        isLoggedIn: (state) => !!state.token, // Renvoie vrai si un token est présent
        isAdmin: (state) => state.roles.includes('admin') // Vérifie si l'utilisateur est un admin
    },

    // Les actions contiennent la logique pour les opérations telles que le login, logout, etc.
    actions: {
        // Définit l'entête d'autorisation pour les requêtes HTTP sortantes
        setAuthorizationHeader() {
            const token = this.token;
            if (token) {
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
        },

        // Prépare les requêtes authentifiées en obtenant un cookie CSRF
        async prepareForAuthRequest() {
            await api.get('/sanctum/csrf-cookie');
        },

        // Gère la logique de connexion de l'utilisateur
        async login(email, password) {
            await this.prepareForAuthRequest(); // Préparation pour la requête CSRF
            try {
                const response = await api.post('/api/login', { email, password });
                // Stockage du token, de l'utilisateur et des rôles dans le state et sessionStorage
                this.token = response.data.access_token;
                this.user = response.data.user;
                this.roles = response.data.roles;
                sessionStorage.setItem('token', this.token);
                sessionStorage.setItem('user', JSON.stringify(this.user));
                sessionStorage.setItem('roles', JSON.stringify(this.roles));

                await router.push('/'); // Redirection à la page d'accueil après le login
            } catch (error) {
                // Affichage et gestion des erreurs de connexion
                console.error('Login error:', error);
            }
        },

        // Gère la logique de déconnexion de l'utilisateur
        async logout() {
            await this.prepareForAuthRequest(); // Même préparation pour la requête CSRF
            this.setAuthorizationHeader();
            try {
                await api.post('/api/logout'); // Appel API pour déconnecter l'utilisateur
                // Nettoyage du state et du sessionStorage
                this.token = '';
                this.user = null;
                this.roles = [];
                sessionStorage.clear(); // Alternative pour supprimer tous les items de session

                delete api.defaults.headers.common['Authorization']; // Suppression de l'entête d'autorisation

                await router.push('/login'); // Redirection vers la page de connexion
            } catch (error) {
                // Affichage et gestion des erreurs de déconnexion
                console.error('Logout error:', error);
            }
        },

        // Gère la logique d'inscription de l'utilisateur
        async register(userData) {
            await this.prepareForAuthRequest(); // Utilise la même préparation pour CSRF que login et logout
            try {
                const response = await api.post('/api/register', userData);
                // Logique après une inscription réussie, peut inclure la configuration de l'état de l'utilisateur si nécessaire
                console.log('Registration successful:', response.data);
                await router.push('/'); // Redirection après inscription
            } catch (error) {
                // Gestion des erreurs d'inscription avec des détails spécifiques
                console.error("Registration error:", error.response.data);
            }
        },
    }
});
