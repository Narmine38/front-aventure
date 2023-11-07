<template>
  <div class="user-management-section">
    <h2>Mon Compte</h2>
    <form @submit.prevent="updateUser">
      <label>
        Nom:
        <input type="text" v-model="editableUser.name" :placeholder="editableUser.name || 'Nom'" required/>
      </label>

      <label>
        Email:
        <input type="email" v-model="editableUser.email" :placeholder="editableUser.email || 'Email'" required/>
      </label>

      <label>
        Adresse:
        <input type="text" v-model="editableUser.address" :placeholder="editableUser.address || 'Adresse'" required/>
      </label>

      <label>
        Ville:
        <input type="text" v-model="editableUser.city" :placeholder="editableUser.city || 'Ville'" required/>
      </label>

      <label>
        Pays:
        <input type="text" v-model="editableUser.country" :placeholder="editableUser.country || 'Pays'" required/>
      </label>

      <label>
        Code postal:
        <input type="text" v-model="editableUser.postal_code" :placeholder="editableUser.postal_code || 'Code postal'"
               required/>
      </label>

      <label>
        Numéro de téléphone:
        <input type="text" v-model="editableUser.phone_number"
               :placeholder="editableUser.phone_number || 'Numéro de téléphone'" required/>
      </label>

      <label>
        Mot de passe (laissez vide pour ne pas changer):
        <input type="password" v-model="editableUser.password" placeholder="Mot de passe"/>
      </label>

      <button type="submit">Mettre à jour</button>
    </form>

    <button @click="confirmDeleteAccount">Supprimer mon compte</button>
  </div>

  <div class="reservations-section">
    <h3>Mes Réservations</h3>
    <ul>
      <li v-for="reservation in userResevation" :key="reservation.id">
        <!-- Formattez l'affichage de la réservation comme vous le souhaitez ici -->
        <p><strong>Lieu:</strong> {{ reservation.place.name }}</p>
        <p><strong>Activité:</strong> {{ reservation.activity.name }}</p>
        <p><strong>Date d'arrivée:</strong> {{ reservation.arrival_date }}</p>
        <p><strong>Date de départ:</strong> {{ reservation.departure_date }}</p>
        <!-- Ajoutez d'autres détails de réservation que vous souhaitez afficher -->
      </li>
    </ul>
  </div>


</template>

<script setup>
import {computed, ref} from 'vue';
import {useRouter} from 'vue-router';
import {useUserProfileStore} from '@/stores/userProfileStore';
import { useReservationStore } from '/src/stores/ReservationsStore';

const reservationStore = useReservationStore();
const userProfileStore = useUserProfileStore();
const router = useRouter();

const editableUser = computed(() => userProfileStore.user);
const errorMessage = ref(''); // Ajout pour afficher les messages d'erreur
reservationStore.fetchUserReservations();
const userResevation = reservationStore.reservations
const updateUser = async () => {
  try {
    const message = await userProfileStore.updateUserProfile(editableUser.value);
    alert(message); // Vous pourriez vouloir utiliser un système de notifications plus avancé que alert()
    errorMessage.value = '';
  } catch (error) {
    errorMessage.value = 'Erreur lors de la mise à jour du profil.';
  }
};

const confirmDeleteAccount = async () => {
  if (confirm("Êtes-vous sûr de vouloir supprimer votre compte? Cette action est irréversible.")) {
    await archiveAccount();
  }
};

const archiveAccount = async () => {
  try {
    await userProfileStore.archiveUser(editableUser.value.id);
    sessionStorage.clear(); // Utilisez clear() pour supprimer toutes les données de session
    await router.push('/connexion');
  } catch (error) {
    errorMessage.value = 'Erreur lors de la suppression du compte.';
  }
};

/*const cancelReservation = async (reservationId) => {
   try {
    await userProfileStore.cancelUserReservation(reservationId);
    await userProfileStore.fetchUserReservations(editableUser.value.id);
    } catch (error) {
      alert('Erreur lors de l’annulation de la réservation.');
  }};*/
</script>

/*const cancelReservation = async (reservationId) => {

};*/


<style scoped>
.user-management-section {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

label, .reservations-section li {
  display: block;
  margin-bottom: 15px;
}

input {
  padding: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #007BFF;
  outline: none;
}

button {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  background-color: #007BFF;
  color: #ffffff;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3;
}

.reservations-section {
  margin-top: 60px;
}

.reservations-section h3 {
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 10px;
  margin-bottom: 20px;
}

.reservations-section li {
  padding: 10px;
  background-color: #f7f7f7;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.05);
  list-style-type: none;
}

.reservations-section li:not(:last-child) {
  margin-bottom: 15px;
}
</style>
