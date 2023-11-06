import {defineStore} from 'pinia';
import api from '@/services/api';
import {useAuthStore} from "@/stores/authStore";

export const useActiviteStore = defineStore('activites', {
    state: () => ({
        activites: [],
        archivedActivites: []
    }),

    actions: {
        async fetchActivites() {
            const authStore = useAuthStore(); // Accès aux méthodes du store d'authentification
            authStore.setAuthorizationHeader(); // Configuration de l'entête d'autorisation
            try {
                const response = await api.get('/api/activities');
                this.activites = response.data;
            } catch (error) {
                console.error("Erreur lors de la récupération des activités:", error.response.data);
            }
        },

        async addActivite(activite) {
            const authStore = useAuthStore(); // Accès aux méthodes du store d'authentification
            await authStore.prepareForAuthRequest(); // Préparation de la requête authentifiée
            authStore.setAuthorizationHeader(); // Configuration de l'entête d'autorisation
            try {
                await api.post('/api/activity', activite);
                await this.fetchActivites();
            } catch (error) {
                console.error("Erreur lors de l'ajout de l'activité:", error.response.data);
            }
        },

        async updateActivite(id, updatedActivite) {
            const authStore = useAuthStore(); // Accès aux méthodes du store d'authentification
            await authStore.prepareForAuthRequest(); // Préparation de la requête authentifiée
            authStore.setAuthorizationHeader(); // Configuration de l'entête d'autorisation
            try {
                await api.put(`/api/activity/${id}`, updatedActivite);
                await this.fetchActivites();
            } catch (error) {
                console.error("Erreur lors de la mise à jour de l'activité:", error.response.data);
            }
        },

        async archiveActivite(id) {
            const authStore = useAuthStore(); // Accès aux méthodes du store d'authentification
            await authStore.prepareForAuthRequest(); // Préparation de la requête authentifiée
            authStore.setAuthorizationHeader(); // Configuration de l'entête d'autorisation
            try {
                await api.post(`/api/activity/${id}/archive`);
                await this.fetchActivites();
            } catch (error) {
                console.error("Erreur lors de l'archivage de l'activité:", error.response.data);
            }
        },

        async fetchArchivedActivites() {
            const authStore = useAuthStore(); // Accès aux méthodes du store d'authentification
            authStore.setAuthorizationHeader(); // Configuration de l'entête d'autorisation
            try {
                const response = await api.get('/api/activities-archived');
                this.archivedActivites = response.data.data;
            } catch (error) {
                console.error("Erreur lors de la récupération des activités archivées:", error.response.data);
            }
        },

        async restoreArchivedActivite(id) {
            const authStore = useAuthStore(); // Accès aux méthodes du store d'authentification
            await authStore.prepareForAuthRequest(); // Préparation de la requête authentifiée
            authStore.setAuthorizationHeader(); // Configuration de l'entête d'autorisation
            try {
                await api.post(`/api/activity/${id}/restore`);
                await this.fetchActivites();
                await this.fetchArchivedActivites();
            } catch (error) {
                console.error("Erreur lors de la restauration de l'activité archivée:", error.response.data);
            }
        }
    }
});
