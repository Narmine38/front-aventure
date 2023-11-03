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

        <div class="reservations-section">
    <h3>Mes réservations</h3>
    <ul v-if="userReservations.length">
      <li v-for="reservation in userReservations" :key="reservation.id">
        ID de réservation: {{ reservation.id }} <br>
        Date d'arrivée: {{ reservation.date_arrivee }} <br>
        Date de départ: {{ reservation.date_depart }} <br>
        Nombre de personnes: {{ reservation.nombre_personnes }} <br>
        Statut: {{ reservation.statut }}
        <button @click="cancelReservation(reservation.id)">Annuler la réservation</button>
      </li>
    </ul>
    <p v-else>Vous n'avez pas encore effectué de réservations.</p>
  </div>

  onMounted(async () => {
  if (!editableUser.value) {
    await router.push('/connexion');
  } else {
    try {
      await userProfileStore.fetchUserReservations(editableUser.value.id);
    } catch (error) {
      errorMessage.value = 'Erreur lors du chargement des réservations.';
    }
  }
});
 */

/* async fetchUserReservations(userId) {
             this.setAuthorizationHeader();
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
         },*/

