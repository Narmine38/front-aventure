import {defineStore} from 'pinia';
import api from '@/services/api';
import {useAuthStore} from "@/stores/authStore";

export const useCharactersStore = defineStore('characters', {
    state: () => ({
        characters: [],
        archivedCharacters: []
    }),

    actions: {
        async fetchCharaters() {
            const authStore = useAuthStore(); // Accès aux méthodes du store d'authentification
            authStore.setAuthorizationHeader(); // Configuration de l'entête d'autorisation
            try {
                const response = await api.get('/api/characters');
                this.characters = response.data;
            } catch (error) {
                console.error("Erreur lors de la récupération des personnages:", error.response.data);
            }
        },

        async addCharacter(character) {
            const authStore = useAuthStore(); // Accès aux méthodes du store d'authentification
            await authStore.prepareForAuthRequest(); // Préparation de la requête authentifiée
            authStore.setAuthorizationHeader(); // Configuration de l'entête d'autorisation
            try {
                await api.post('/api/character', character);
                await this.fetchCharaters();
            } catch (error) {
                console.error("Erreur lors de l'ajout du personnage:", error.response.data);
            }
        },

        async updateCharacter(id, updatedCharacter) {
            const authStore = useAuthStore(); // Accès aux méthodes du store d'authentification
            await authStore.prepareForAuthRequest(); // Préparation de la requête authentifiée
            authStore.setAuthorizationHeader(); // Configuration de l'entête d'autorisation
            try {
                await api.put(`/api/character/${id}`, updatedCharacter);
                await this.fetchCharaters();
            } catch (error) {
                console.error("Erreur lors de la mise à jour du personnage:", error.response.data);
            }
        },

        async archivedCharacter(id) {
            const authStore = useAuthStore(); // Accès aux méthodes du store d'authentification
            await authStore.prepareForAuthRequest(); // Préparation de la requête authentifiée
            authStore.setAuthorizationHeader(); // Configuration de l'entête d'autorisation
            try {
                await api.post(`/api/character/${id}/archive`);
                await this.fetchCharaters();
            } catch (error) {
                console.error("Erreur lors de l'archivage du personnage:", error.response.data);
            }
        },

        async fetchArchivedCharacters() {
            const authStore = useAuthStore(); // Accès aux méthodes du store d'authentification
            authStore.setAuthorizationHeader(); // Configuration de l'entête d'autorisation
            try {
                const response = await api.get('/api/characters-archived');
                this.archivedCharacters = response.data;
            } catch (error) {
                console.error("Erreur lors de la récupération des personnages archivés:", error.response.data);
            }
        },

        async restoreArchivedCharacter(id) {
            const authStore = useAuthStore(); // Accès aux méthodes du store d'authentification
            await authStore.prepareForAuthRequest(); // Préparation de la requête authentifiée
            authStore.setAuthorizationHeader(); // Configuration de l'entête d'autorisation
            try {
                await api.post(`/api/character/${id}/restore`);
                await this.fetchCharaters();
                await this.fetchArchivedCharacters();
            } catch (error) {
                console.error("Erreur lors de la restauration du personnage archivé:", error.response.data);
            }
        }
    }
});


