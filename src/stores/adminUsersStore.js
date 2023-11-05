// adminUsersStore.js
import { defineStore } from 'pinia';
import { useAuthStore } from "@/stores/authStore";
import api from "@/services/api";

export const useAdminUsersStore = defineStore('adminUsers', {
    state: () => ({
        users: [],  // Liste des utilisateurs.
    }),

    actions: {
        async fetchUsers() {
            const authStore = useAuthStore();
            authStore.setAuthorizationHeader();
            try {
                const response = await api.get('/api/users');
                this.users = response.data.data;
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        },

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
            authStore.setAuthorizationHeader();
            try {
                await api.post(`/api/users/${id}/archive`);
                await this.fetchUsers(); // Refresh the users list
            } catch (error) {
                console.error('Error archiving user:', error);
                throw error; // Rethrow to handle in the component
            }
        },

        async restoreUser(id) {
            const authStore = useAuthStore();
            authStore.setAuthorizationHeader();
            try {
                await api.post(`/api/users/${id}/restore`);
                await this.fetchArchivedUsers(); // Refresh the archived users list
            } catch (error) {
                console.error('Error restoring user:', error);
            }
        },

        async destroyUser(id) {
            const authStore = useAuthStore();
            authStore.setAuthorizationHeader(); // Ceci configure le header d'autorisation pour la requête

            try {
                // Envoi de la requête DELETE à la route spécifique avec l'ID de l'utilisateur
                const response = await api.delete(`/api/users/${id}/destroy`);

                // Traitez la réponse ici, si nécessaire
                console.log(response.data.message); // Affiche le message de réussite
            } catch (error) {
                // Gérez les erreurs ici
                console.error(error.response ? error.response.data : error.message);
            }
        },
    }
});
