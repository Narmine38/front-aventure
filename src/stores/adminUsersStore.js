import { defineStore } from 'pinia';
import { useAuthStore } from "@/stores/authStore";
import api from "@/services/api";

export const useAdminUsersStore = defineStore('adminUsers', {
    // Déclaration de l'état initial du store
    state: () => ({
        users: [],
    }),

    actions: {
        async fetchUsers() {
            const authStore = useAuthStore(); // Utilisation du store d'authentification pour accéder aux méthodes nécessaires
            authStore.setAuthorizationHeader(); // Configuration de l'entête d'autorisation avant l'appel API
            try {
                const response = await api.get('/api/users');
                this.users = response.data.data;
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        },

        // Récupération des utilisateurs archivés
        async fetchArchivedUsers() {
            const authStore = useAuthStore();
            authStore.setAuthorizationHeader();
            try {
                const response = await api.get('/api/archived-users');
                this.archivedUsers = response.data.data;
            } catch (error) {
                console.error('Error fetching archived users:', error);
            }
        },

        async archiveUser(id) {
            const authStore = useAuthStore();
            await authStore.prepareForAuthRequest();
            authStore.setAuthorizationHeader();
            try {
                await api.post(`/api/users/${id}/archive`);
                await this.fetchUsers();
            } catch (error) {

                console.error('Error archiving user:', error);
                throw error;
            }
        },

        async restoreUser(id) {
            const authStore = useAuthStore();
            await authStore.prepareForAuthRequest();
            authStore.setAuthorizationHeader();
            try {
                await api.post(`/api/users/${id}/restore`);
                await this.fetchArchivedUsers();
            } catch (error) {
                console.error('Error restoring user:', error);
            }
        },

        async destroyUser(id) {
            const authStore = useAuthStore();
            await authStore.prepareForAuthRequest();
            authStore.setAuthorizationHeader();
            try {
                const response = await api.delete(`/api/users/${id}/destroy`);

                // Affichage du message de succès de la suppression dans la console
                console.log(response.data.message);
            } catch (error) {
                // Gestion des erreurs lors de la tentative de suppression
                console.error(error.response ? error.response.data : error.message);
            }
        },
    }
});
