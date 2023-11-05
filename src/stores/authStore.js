// Importation des dépendances nécessaires
import { defineStore } from 'pinia';
import api from "@/services/api"; // API pour les requêtes HTTP
import router from "@/router"; // Router pour la navigation

// Définition du store d'authentification avec Pinia
export const useAuthStore = defineStore({
    // Identifiant unique pour le store d'authentification
    id: 'auth',

    // Initialisation de l'état avec les données de session existantes ou des valeurs par défaut
    state: () => ({
        user: JSON.parse(sessionStorage.getItem('user')) || null, // L'utilisateur actuellement connecté
        token: sessionStorage.getItem('token') || '', // Token d'authentification
        roles: JSON.parse(sessionStorage.getItem('roles')) || [] // Rôles de l'utilisateur
    }),

    // Les getters fournissent une manière réactive d'accéder à des dérivations de l'état du store
    getters: {
        isLoggedIn: (state) => !!state.token, // Renvoie vrai si un token est stocké, donc l'utilisateur est considéré comme connecté
        isAdmin: (state) => state.roles.includes('admin') // Vérifie si parmi les rôles de l'utilisateur se trouve 'admin'
    },

    // Les actions contiennent la logique pour les opérations telles que le login, logout, etc.
    actions: {
        // Définit l'entête d'autorisation pour les requêtes HTTP sortantes avec le token JWT
        setAuthorizationHeader() {
            const token = this.token;
            if (token) {
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`; // Ajout du token au header par défaut pour toutes les requêtes suivantes
            }
        },

        // Prépare les requêtes authentifiées en obtenant un cookie CSRF (nécessaire pour la protection contre les attaques CSRF)
        async prepareForAuthRequest() {
            await api.get('/sanctum/csrf-cookie'); // Obtention du cookie CSRF avant la soumission des données de connexion
        },

        // Gère la logique de connexion de l'utilisateur
        async login(email, password) {
            await this.prepareForAuthRequest(); // Préparation pour la requête CSRF
            try {
                const response = await api.post('/api/login', { email, password }); // Tentative de connexion avec email et mot de passe
                // En cas de réussite, mise à jour du state et de sessionStorage avec le token, l'utilisateur et ses rôles
                this.token = response.data.access_token;
                this.user = response.data.user;
                this.roles = response.data.roles;
                sessionStorage.setItem('token', this.token); // Stockage du token en session pour une utilisation ultérieure
                sessionStorage.setItem('user', JSON.stringify(this.user)); // Stockage de l'utilisateur en session
                sessionStorage.setItem('roles', JSON.stringify(this.roles)); // Stockage des rôles en session

                await router.push('/'); // Redirection à la page d'accueil après le login
            } catch (error) {
                // En cas d'erreur, un message est affiché dans la console
                console.error('Login error:', error);
            }
        },

        // Gère la logique de déconnexion de l'utilisateur
        async logout() {
            await this.prepareForAuthRequest(); // Même préparation pour la requête CSRF
            this.setAuthorizationHeader(); // Configuration de l'entête d'autorisation avec le token actuel
            try {
                await api.post('/api/logout'); // Appel API pour déconnecter l'utilisateur
                // Réinitialisation du state et du sessionStorage
                this.token = '';
                this.user = null;
                this.roles = [];
                sessionStorage.clear(); // Efface tous les items enregistrés dans le sessionStorage

                delete api.defaults.headers.common['Authorization']; // Suppression de l'entête d'autorisation

                await router.push('/login'); // Redirection vers la page de connexion
            } catch (error) {
                // En cas d'erreur de déconnexion, un message est affiché dans la console
                console.error('Logout error:', error);
            }
        },

        // Gère la logique d'inscription de l'utilisateur
        async register(userData) {
            await this.prepareForAuthRequest(); // Utilise la même préparation pour CSRF que login et logout
            try {
                const response = await api.post('/api/register', userData); // Envoi des données d'inscription à l'API
                // Traitement après une inscription réussie
                console.log('Registration successful:', response.data);
                await router.push('/'); // Redirection à la page d'accueil ou au tableau de bord de l'utilisateur
            } catch (error) {
                // En cas d'erreur d'inscription, affiche les détails spécifiques dans la console
                console.error("Registration error:", error.response.data);
            }
        },
    }
});
