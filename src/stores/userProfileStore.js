import { defineStore } from 'pinia';
import api from '@/services/api';

export const useUserProfileStore = defineStore('userProfile', {
    state: () => ({
        user: JSON.parse(sessionStorage.getItem('user')) || null,
        users: [],
        archivedUsers: [],
        selectedArchivedUser: null,
        userReservations: [],
        isLoading: false,
        error: null,
    }),
    getters: {
        // Définissez ici les getters pour accéder aux états calculés ou filtrés
    },
    actions: {
        async fetchUsers() {
            this.isLoading = true;
            try {
                const response = await api.get('/api/users');
                this.users = response.data.data;
            } catch (error) {
                this.error = "Erreur lors de la récupération des utilisateurs";
            } finally {
                this.isLoading = false;
            }
        },

        async archiveUser(id) {
            try {
                await api.post(`/api/users/${id}/archive`);
                await this.fetchUsers(); // rafraîchit la liste des utilisateurs
            } catch (error) {
                this.error = "Erreur lors de l'archivage de l'utilisateur";
            }
        },

        async fetchArchivedUsers() {
            try {
                const response = await api.get('/api/archived-users');
                this.archivedUsers = response.data.data;
            } catch (error) {
                this.error = "Erreur lors de la récupération des utilisateurs archivés";
            }
        },

        async viewArchivedUser(id) {
            try {
                const response = await api.get(`/api/archived-users/${id}`);
                this.selectedArchivedUser = response.data;
            } catch (error) {
                this.error = "Erreur lors de la visualisation de l'utilisateur archivé";
            }
        },

        async restoreUser(id) {
            try {
                await api.post(`/api/users/${id}/restore`);
                await this.fetchUsers();
                await this.fetchArchivedUsers();
            } catch (error) {
                this.error = "Erreur lors de la restauration de l'utilisateur";
            }
        },

        async updateUserProfile(updatedUserData) {
            try {
                const response = await api.put(`/api/users/${updatedUserData.id}`, updatedUserData);
                this.user = response.data.data; // Assurez-vous que ceci correspond à l'état déclaré
                sessionStorage.setItem('user', JSON.stringify(this.user));
                return response.data.message;
            } catch (error) {
                this.error = "Erreur lors de la mise à jour du profil de l'utilisateur";
                throw error;
            }
        },

        async fetchUserReservations(userId) {
            try {
                const response = await api.get(`/api/reservations/user/${userId}`);
                if (Array.isArray(response.data)) {
                    this.userReservations = response.data;
                } else {
                    this.error = "Format de données inattendu pour les réservations";
                }
            } catch (error) {
                this.error = "Erreur lors de la récupération des réservations de l'utilisateur";
                if (error.response) {
                    console.error("Détails de l'erreur:", error.response.data);
                }
            }
        },

    }
});
