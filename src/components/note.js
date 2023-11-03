/*
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
 */