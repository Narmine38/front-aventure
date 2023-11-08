import { defineStore } from 'pinia';
import api from '@/services/api';
import { useAuthStore } from "@/stores/authStore";
import router from "@/router";

export const useUserProfileStore = defineStore('userProfile', {
    state: () => ({
        user: JSON.parse(sessionStorage.getItem('user')) || null,
        userReservations: [],
    }),
    actions: {
        async fetchUserProfile(id) {
            const authStore = useAuthStore();
            authStore.setAuthorizationHeader();
            try {
                const response = await api.get(`/api/users/${id}`);
                this.user = response.data.data;
                sessionStorage.setItem('user', JSON.stringify(this.user));
            } catch (error) {
                this.error = "Erreur lors de la récupération du profil de l'utilisateur";
            }
        },

        async archiveUser(id) {
            const authStore = useAuthStore();
            await authStore.prepareForAuthRequest();
            authStore.setAuthorizationHeader();
            try {
                await api.post(`/api/users/${id}/archive`);
                await authStore.logout();
                await router.push('/connexion');
                window.location.reload();
            } catch (error) {
                this.error = "Erreur lors de l'archivage de l'utilisateur";
            }
        },

        async updateUserProfile(updatedUserData) {
            const authStore = useAuthStore();
            await authStore.prepareForAuthRequest();
            authStore.setAuthorizationHeader();
            try {
                const response = await api.put(`/api/users/${updatedUserData.id}`, updatedUserData);
                this.user = response.data.data;
                sessionStorage.setItem('user', JSON.stringify(this.user));
                return response.data.message;
            } catch (error) {
                this.error = "Erreur lors de la mise à jour du profil de l'utilisateur";
                throw error; // Renvoie l'erreur pour une gestion externe.
            }
        },
    }
});
