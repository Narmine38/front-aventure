// adminUsersStore.js
import { defineStore } from 'pinia';
import axios from 'axios';
import { useAuthStore } from "@/stores/authStore";

export const useAdminUsersStore = defineStore('adminUsers', {
    state: () => ({
        users: [],  // Liste des utilisateurs.
        archivedUsers: [],  // Liste des utilisateurs archivés.
        selectedArchivedUser: null,  // Détails d'un utilisateur archivé sélectionné.
    }),

    actions: {
        async fetchUsers() {
            const authStore = useAuthStore();
            authStore.setAuthorizationHeader();
            try {
                const response = await axios.get('https://api.aventure-en-adra.fr/api/users');
                this.users = response.data;
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        },

        async fetchArchivedUsers() {
            const authStore = useAuthStore();
            authStore.setAuthorizationHeader();
            try {
                const response = await axios.get('https://api.aventure-en-adra.fr/api/archived-users');
                this.archivedUsers = response.data;
            } catch (error) {
                console.error('Error fetching archived users:', error);
            }
        },
        async archiveUser(id) {
            const authStore = useAuthStore();
            authStore.setAuthorizationHeader();
            try {
                await axios.post(`https://api.aventure-en-adra.fr/api/users/${id}/archive`);
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
                await axios.post(`https://api.aventure-en-adra.fr/api/users/${id}/restore`);
                await this.fetchArchivedUsers(); // Refresh the archived users list
            } catch (error) {
                console.error('Error restoring user:', error);
            }
        },
    }
});
