import { defineStore } from 'pinia';
import api from '@/services/api';
import { useAuthStore } from "@/stores/authStore";
import router from "@/router";

export const useUserProfileStore = defineStore('userProfile', {
    state: () => ({
        // L'état 'user' stocke les informations de l'utilisateur actuellement connecté.
        // Il tente de récupérer ces informations du sessionStorage lors de l'initialisation.
        user: JSON.parse(sessionStorage.getItem('user')) || null,
        // L'état 'userReservations' pour stocker les réservations de l'utilisateur.
        userReservations: [],
    }),
    getters: {
        // Définissez ici les getters si vous avez besoin d'accéder à des états calculés basés sur l'état actuel.
    },
    actions: {
        // Action pour récupérer le profil de l'utilisateur en fonction de l'ID.
        // Il met à jour l'état 'user' et stocke les informations dans sessionStorage.
        async fetchUserProfile(id) {
            const authStore = useAuthStore(); // Utilisation du store d'authentification pour les actions nécessitant une authentification.
            authStore.setAuthorizationHeader(); // Définit le header d'autorisation pour les requêtes API suivantes.
            try {
                // Effectue une requête GET pour récupérer le profil utilisateur.
                const response = await api.get(`/api/users/${id}`);
                this.user = response.data.data; // Met à jour les données de l'utilisateur dans le state.
                // Sauvegarde les données de l'utilisateur dans sessionStorage pour un accès rapide et persistant.
                sessionStorage.setItem('user', JSON.stringify(this.user));
            } catch (error) {
                // En cas d'erreur, l'état 'error' est mis à jour avec un message d'erreur.
                this.error = "Erreur lors de la récupération du profil de l'utilisateur";
            }
        },

        // Action pour archiver un utilisateur et déconnecter la session.
        async archiveUser(id) {
            const authStore = useAuthStore();
            await authStore.prepareForAuthRequest(); // Préparation pour une requête authentifiée si nécessaire.
            authStore.setAuthorizationHeader();
            try {
                // Requête POST pour archiver un utilisateur.
                await api.post(`/api/users/${id}/archive`);
                await authStore.logout(); // Déconnecte l'utilisateur après l'archivage.
                await router.push('/connexion'); // Redirige vers la page de connexion.
                window.location.reload(); // Recharge la fenêtre pour nettoyer l'état de l'application.
            } catch (error) {
                // Gestion des erreurs lors de l'archivage de l'utilisateur.
                this.error = "Erreur lors de l'archivage de l'utilisateur";
            }
        },

        // Action pour mettre à jour le profil utilisateur avec de nouvelles données.
        async updateUserProfile(updatedUserData) {
            const authStore = useAuthStore();
            await authStore.prepareForAuthRequest();
            authStore.setAuthorizationHeader();
            try {
                // Requête PUT pour mettre à jour les informations de l'utilisateur.
                const response = await api.put(`/api/users/${updatedUserData.id}`, updatedUserData);
                this.user = response.data.data; // Met à jour l'état 'user' avec les nouvelles informations.
                // Met à jour sessionStorage avec les nouvelles données utilisateur.
                sessionStorage.setItem('user', JSON.stringify(this.user));
                // Retourne un message de réussite de la mise à jour.
                return response.data.message;
            } catch (error) {
                // Lance une exception en cas d'erreur lors de la mise à jour des données de l'utilisateur.
                this.error = "Erreur lors de la mise à jour du profil de l'utilisateur";
                throw error; // Renvoie l'erreur pour une gestion externe.
            }
        },
    }
});
