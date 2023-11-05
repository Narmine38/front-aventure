// Importation des dépendances
import { defineStore } from 'pinia';
import { useAuthStore } from "@/stores/authStore"; // Importation du store d'authentification pour utiliser ses méthodes et état
import api from "@/services/api"; // Importation d'une instance axios configurée pour les appels API

// Création d'un store avec Pinia pour gérer les utilisateurs administrés
export const useAdminUsersStore = defineStore('adminUsers', {
    // Déclaration de l'état initial du store
    state: () => ({
        users: [],  // Tableau pour stocker les utilisateurs récupérés depuis l'API
    }),

    // Définition des actions, qui sont des fonctions pour effectuer des opérations asynchrones
    actions: {
        // Récupération de la liste des utilisateurs depuis l'API du serveur
        async fetchUsers() {
            const authStore = useAuthStore(); // Utilisation du store d'authentification pour accéder aux méthodes nécessaires
            authStore.setAuthorizationHeader(); // Configuration de l'entête d'autorisation avant l'appel API
            try {
                const response = await api.get('/api/users'); // Requête GET pour obtenir les utilisateurs
                this.users = response.data.data; // Stockage des utilisateurs dans l'état local du store
            } catch (error) {
                // Affichage des erreurs dans la console si la récupération échoue
                console.error('Error fetching users:', error);
            }
        },

        // Récupération des utilisateurs archivés
        async fetchArchivedUsers() {
            const authStore = useAuthStore();
            authStore.setAuthorizationHeader(); // Configuration de l'entête d'autorisation avec le token JWT
            try {
                const response = await api.get('/api/archived-users'); // Requête GET pour obtenir les utilisateurs archivés
                this.archivedUsers = response.data.data; // Stockage des utilisateurs archivés dans l'état local du store
            } catch (error) {
                // Gestion des erreurs lors de la récupération des utilisateurs archivés
                console.error('Error fetching archived users:', error);
            }
        },

        // Archivage d'un utilisateur spécifique
        async archiveUser(id) {
            const authStore = useAuthStore(); // Accès aux méthodes du store d'authentification
            await authStore.prepareForAuthRequest(); // Préparation de la requête authentifiée
            authStore.setAuthorizationHeader(); // Configuration de l'entête d'autorisation
            try {
                await api.post(`/api/users/${id}/archive`); // Requête POST pour archiver l'utilisateur
                await this.fetchUsers(); // Mise à jour de la liste des utilisateurs
            } catch (error) {
                // Gestion des erreurs d'archivage et propagation pour gestion ultérieure
                console.error('Error archiving user:', error);
                throw error; // Renvoi de l'erreur pour gestion dans le composant
            }
        },

        // Restauration d'un utilisateur archivé
        async restoreUser(id) {
            const authStore = useAuthStore();
            await authStore.prepareForAuthRequest(); // Préparation de la requête CSRF si nécessaire
            authStore.setAuthorizationHeader(); // Configuration de l'entête d'autorisation
            try {
                await api.post(`/api/users/${id}/restore`); // Requête POST pour restaurer l'utilisateur
                await this.fetchArchivedUsers(); // Mise à jour de la liste des utilisateurs archivés
            } catch (error) {
                // Gestion des erreurs de restauration
                console.error('Error restoring user:', error);
            }
        },

        // Suppression définitive d'un utilisateur
        async destroyUser(id) {
            const authStore = useAuthStore();
            await authStore.prepareForAuthRequest(); // Préparation de la requête CSRF si nécessaire
            authStore.setAuthorizationHeader(); // Configuration de l'entête d'autorisation pour la requête

            try {
                // Envoi de la requête DELETE à la route spécifique avec l'ID de l'utilisateur
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
