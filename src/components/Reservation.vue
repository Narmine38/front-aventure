<template>
  <div>
    <h1>Nouvelle réservation</h1>
    <form @submit.prevent="createReservation">

      <!-- Sélection du lieu -->
      <div>
        <label for="place">Lieu:</label>
        <select id="place" v-model="selectedPlace" @change="loadAccommodationsAndActivities">
          <option value="" disabled selected>Sélectionnez un lieu</option>
          <option v-for="place in placesStore.places" :key="place.id" :value="place.id">{{ place.name }}</option>
        </select>
      </div>

      <!-- Sélection de l'hébergement -->
      <div v-if="selectedPlace">
        <label for="accommodation">Hébergement:</label>
        <select id="accommodation" v-model="newReservation.accommodation_id">
          <option value="" disabled selected>Sélectionnez un hébergement</option>
          <option v-for="accommodation in accommodationsStore.accommodations" :key="accommodation.id" :value="accommodation.id">{{ accommodation.name }}</option>
        </select>
      </div>

      <!-- Sélection de l'activité -->
      <div v-if="newReservation.accommodation_id">
        <label for="activity">Activité:</label>
        <select id="activity" v-model="newReservation.activity_id">
          <option value="" disabled selected>Sélectionnez une activité</option>
          <option v-for="activity in activitiesStore.activites" :key="activity.id" :value="activity.id">{{ activity.name }}</option>
        </select>
      </div>

      <!-- Sélection du personnage -->
      <div v-if="newReservation.activity_id">
        <label for="character">Rencontre avec le personnage:</label>
        <select id="character" v-model="newReservation.character_id">
          <option value="" disabled selected>Sélectionnez un personnage</option>
          <option v-for="character in charactersStore.characters" :key="character.id" :value="character.id">{{ character.name }}</option>
        </select>
      </div>

      <!-- Sélection des dates -->
      <div v-if="newReservation.character_id">
        <label for="arrival_date">Date d'arrivée:</label>
        <input type="date" id="arrival_date" v-model="newReservation.arrival_date" required>

        <label for="departure_date">Date de départ:</label>
        <input type="date" id="departure_date" v-model="newReservation.starting_date" required>
      </div>

      <!-- Sélection du nombre de personnes -->
      <div v-if="newReservation.arrival_date && newReservation.starting_date">
        <label for="number_of_people">Nombre de personnes:</label>
        <input type="number" id="number_of_people" v-model="newReservation.number_of_people" min="1" required>
      </div>

      <!-- Bouton de soumission -->
      <div v-if="newReservation.number_of_people > 0">
        <button type="submit">Créer la réservation</button>
      </div>

    </form>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import { usePlacesStore } from '/src/stores/PlacesStore';
import { useAccommodationStore } from '/src/stores/AccommodationsStore';
import { useActiviteStore } from '/src/stores/ActiviteStore';
import { useReservationStore } from '/src/stores/ReservationsStore';
import { useCharactersStore } from "/src/stores/CharactersStore";
import {useAuthStore} from "/src/stores/authStore";

const authStore = useAuthStore();

const selectedPlace = ref(null);
const newReservation = ref({
  user_id: authStore.user?.id || null,
  place_id: null,
  accommodation_id: null,
  activity_id: null,
  character_id: null,
  arrival_date: '',
  starting_date: '',
  number_of_people: 1,
  statut: 'pending',
});

// Stores
const placesStore = usePlacesStore();
const accommodationsStore = useAccommodationStore();
const activitiesStore = useActiviteStore();
const reservationStore = useReservationStore();
const charactersStore = useCharactersStore();

placesStore.fetchPlaces();
accommodationsStore.fetchAccommodations();
activitiesStore.fetchActivites();
charactersStore.fetchCharaters();

const loadAccommodationsAndActivities = async () => {
  if (selectedPlace.value) {
    newReservation.value.place_id = selectedPlace.value;

    await accommodationsStore.fetchAccommodations();
    accommodationsStore.accommodations = accommodationsStore.accommodations.filter(
        (acc) => acc.place_id === selectedPlace.value
    );

    await activitiesStore.fetchActivites();
    activitiesStore.activites = activitiesStore.activites.filter(
        (act) => act.place_id === selectedPlace.value
    );
  }
};

const createReservation = async () => {
  try {
    await reservationStore.addReservation(newReservation.value);
  } catch (error) {
    console.error("Erreur lors de la création de la réservation", error);
  }
};

</script>

<style scoped>
div {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f9f9f9;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #333;
  text-align: center;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

label {
  margin-bottom: .5rem;
  color: #666;
  font-weight: bold;
}

input[type=date],
input[type=number],
select {
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
}

input[type=date]::placeholder,
input[type=number]::placeholder {
  color: #888;
}

button {
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  background-color: #5cb85c;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #4cae4c;
}

button:active {
  background-color: #449d44;
}

button:focus {
  outline: none;
  box-shadow: 0 0 0 2px #4cae4c;
}

input:focus,
select:focus {
  outline: none;
  border-color: #5cb85c;
  box-shadow: 0 0 0 1px #5cb85c;
}

@media (max-width: 768px) {
  div {
    padding: 15px;
  }
}
</style>
