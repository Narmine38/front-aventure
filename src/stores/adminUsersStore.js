// adminUsersStore.js
import { reactive, toRefs } from 'vue';
import axios from 'axios';
import {useAuthStore} from "@/stores/authStore";

export function useAdminUsersStore() {
    // State
    const state = reactive({
        users: [],
        archivedUsers: [],
    });

    // Actions
    const fetchUsers = async () => {
        const authStore = useAuthStore(); // Utilisez authStore ici
        authStore.setAuthorizationHeader();
        try {
            const response = await axios.get('https://api.aventure-en-adra.fr/api/users');
            state.users = response.data;
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const fetchArchivedUsers = async () => {
        const authStore = useAuthStore(); // Utilisez authStore ici
        authStore.setAuthorizationHeader();
        try {
            const response = await axios.get('https://api.aventure-en-adra.fr/api/users/archived');
            state.archivedUsers = response.data;
        } catch (error) {
            console.error('Error fetching archived users:', error);
        }
    };

    const archiveUser = async (id) => {
        const authStore = useAuthStore(); // Utilisez authStore ici
        authStore.setAuthorizationHeader();
        try {
            await axios.post(`https://api.aventure-en-adra.fr/api/users/${id}/archive`);
            await fetchUsers(); // Refresh the users list
        } catch (error) {
            console.error('Error archiving user:', error);
            throw error; // Rethrow to handle in the component
        }
    };

    const restoreUser = async (id) => {
        const authStore = useAuthStore(); // Utilisez authStore ici
        authStore.setAuthorizationHeader();
        try {
            await axios.post(`https://api.aventure-en-adra.fr/api/users/${id}/restore`);
            await fetchArchivedUsers(); // Refresh the archived users list
        } catch (error) {
            console.error('Error restoring user:', error);
        }
    };

    // Expose state and actions
    return {
        ...toRefs(state),
        fetchUsers,
        fetchArchivedUsers,
        archiveUser,
        restoreUser,
    };
}
