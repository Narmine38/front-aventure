import { defineStore } from 'pinia';
import api from '@/services/api';

export const useUserProfileStore = defineStore('userProfile', {
    state: () => ({
        user: JSON.parse(sessionStorage.getItem('user')) || null,
        userReservations: [],
    }),
    getters: {
        // Définissez ici les getters pour accéder aux états calculés ou filtrés
    },
    actions: {

        async fetchUserProfile(id) {
            this.isLoading = true;
            try {
                const response = await api.get(`/api/users/${id}`);
                this.user = response.data.data;
                sessionStorage.setItem('user', JSON.stringify(this.user));
            } catch (error) {
                this.error = "Erreur lors de la récupération du profil de l'utilisateur";
                // Gérez l'erreur comme il se doit
            }
        },



        async archiveUser(id) {
            try {
                await api.post(`/api/users/${id}/archive`);
                // Gérez la logique après l'archivage, par exemple, déconnexion
            } catch (error) {
                this.error = "Erreur lors de l'archivage de l'utilisateur";
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
