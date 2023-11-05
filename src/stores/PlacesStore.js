import { defineStore } from 'pinia';
import api from '@/services/api';
import {useAuthStore} from "/src/stores/authStore";

export const usePlacesStore = defineStore('places', {
    state: () => ({
        places: [],
        archivedPlaces: []
    }),

    actions: {

        async fetchPlaces() {
            const authStore = useAuthStore(); // Accès aux méthodes du store d'authentification
            authStore.setAuthorizationHeader(); // Configuration de l'entête d'autorisation
            try {
                const response = await api.get('/api/place');
                this.places = response.data;
            } catch (error) {
                console.error("Erreur lors de la récupération des lieux:", error.response.data);
            }
        },

        async addPlace(place) {
            const authStore = useAuthStore(); // Accès aux méthodes du store d'authentification
            await authStore.prepareForAuthRequest(); // Préparation de la requête authentifiée
            authStore.setAuthorizationHeader(); // Configuration de l'entête d'autorisation
            try {
                await api.post('/api/place', place);
                await this.fetchPlaces();
            } catch (error) {
                console.error("Erreur lors de l'ajout du lieu:", error.response.data);
            }
        },

        async updatePlace(id, updatedPlace) {
            const authStore = useAuthStore(); // Accès aux méthodes du store d'authentification
            await authStore.prepareForAuthRequest(); // Préparation de la requête authentifiée
            authStore.setAuthorizationHeader(); // Configuration de l'entête d'autorisation
            try {
                await api.put(`/api/place/${id}`, updatedPlace);
                await this.fetchPlaces();
            } catch (error) {
                console.error("Erreur lors de la mise à jour du lieu:", error.response.data);
            }
        },

        async archivePlace(id) {
            const authStore = useAuthStore(); // Accès aux méthodes du store d'authentification
            await authStore.prepareForAuthRequest(); // Préparation de la requête authentifiée
            authStore.setAuthorizationHeader(); // Configuration de l'entête d'autorisation
            try {
                // Utilisez la bonne route d'archivage
                await api.post(`/api/place/${id}/archive`);
                await this.fetchPlaces();
            } catch (error) {
                console.error("Erreur lors de l'archivage du lieu:", error.response.data);
            }
        },

        async fetchArchivedPlaces() {
            const authStore = useAuthStore(); // Accès aux méthodes du store d'authentification
            authStore.setAuthorizationHeader(); // Configuration de l'entête d'autorisation
            try {
                const response = await api.get('/api/archived-place');
                this.archivedPlaces = response.data.data;
            } catch (error) {
                console.error("Erreur lors de la récupération des lieux archivés:", error.response.data);
            }
        },

        async restoreArchivedPlace(id) {
            const authStore = useAuthStore(); // Accès aux méthodes du store d'authentification
            await authStore.prepareForAuthRequest(); // Préparation de la requête authentifiée
            authStore.setAuthorizationHeader(); // Configuration de l'entête d'autorisation
            try {
                await api.post(`/api/place/${id}/restore`);
                await this.fetchPlaces();
                await this.fetchArchivedPlaces();
            } catch (error) {
                console.error("Erreur lors de la restauration du lieu archivé:", error.response.data);
            }
        }
    }
});
