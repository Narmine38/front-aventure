import {defineStore} from 'pinia';
import api from '@/services/api';
import {useAuthStore} from "@/stores/authStore";

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
            const authStore = useAuthStore(); // Utilisez authStore ici
            authStore.setAuthorizationHeader();
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
            const authStore = useAuthStore(); // Utilisez authStore ici
            authStore.setAuthorizationHeader();
            try {
                await api.post(`/api/users/${id}/archive`);
                // Gérez la logique après l'archivage, par exemple, déconnexion
            } catch (error) {
                this.error = "Erreur lors de l'archivage de l'utilisateur";
            }
        },


        async updateUserProfile(updatedUserData) {
            const authStore = useAuthStore(); // Utilisez authStore ici
            authStore.setAuthorizationHeader();
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



    }
});
