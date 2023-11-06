import { defineStore } from 'pinia';
import api from '@/services/api';
import { useAuthStore } from "/src/stores/authStore";

export const useAccommodationStore = defineStore('accommodation', {
    state: () => ({
        accommodations: [],
        archivedAccommodations: []
    }),

    actions: {
        async fetchAccommodations() {
            const authStore = useAuthStore();
            authStore.setAuthorizationHeader();
            try {
                const response = await api.get('/api/accommodation');
                this.accommodations = response.data;
            } catch (error) {
                console.error("Erreur lors de la récupération des hébergements:", error?.response?.data);
            }
        },

        async addAccommodation(accommodation) {
            const authStore = useAuthStore();
            authStore.setAuthorizationHeader();
            try {
                await api.post('/api/accommodation', accommodation);
                await this.fetchAccommodations();
            } catch (error) {
                console.error("Erreur lors de l'ajout de l'hébergement:", error?.response?.data);
            }
        },

        async updateAccommodation(id, updatedAccommodation) {
            const authStore = useAuthStore();
            authStore.setAuthorizationHeader();
            try {
                await api.put(`/api/accommodation/${id}`, updatedAccommodation);
                await this.fetchAccommodations();
            } catch (error) {
                console.error("Erreur lors de la mise à jour de l'hébergement:", error?.response?.data);
            }
        },

        async archiveAccommodation(id) {
            const authStore = useAuthStore();
            authStore.setAuthorizationHeader();
            try {
                await api.post(`/api/accommodation/${id}/archive`);
                await this.fetchAccommodations();
            } catch (error) {
                console.error("Erreur lors de l'archivage de l'hébergement:", error?.response?.data);
            }
        },

        async fetchArchivedAccommodations() {
            const authStore = useAuthStore();
            authStore.setAuthorizationHeader();
            try {
                const response = await api.get('/api/accommodation-archived');
                this.archivedAccommodations = response.data.data;
            } catch (error) {
                console.error("Erreur lors de la récupération des hébergements archivés:", error?.response?.data);
            }
        },

        async restoreArchivedAccommodation(id) {
            const authStore = useAuthStore();
            authStore.setAuthorizationHeader();
            try {
                await api.post(`/api/accommodation/${id}/restore`);
                await this.fetchAccommodations();
                await this.fetchArchivedAccommodations();
            } catch (error) {
                console.error("Erreur lors de la restauration de l'hébergement archivé:", error?.response?.data);
            }
        }
    }
});
