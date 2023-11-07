<template>
  <div>
    <h1>Nouvelle réservation</h1>
    <form @submit.prevent="createReservation">
      <!-- Sélection du lieu -->
      <label for="place">Lieu:</label>
      <select id="place" v-model="newReservation.place_id" @change="loadAccommodationsAndActivities">
        <option value="" disabled>Sélectionnez un lieu</option>
        <option v-for="place in placesStore.places" :key="place.id" :value="place.id">{{ place.name }}</option>
      </select>

      <!-- Sélection de l'hébergement -->
      <label for="accommodation">Hébergement:</label>
      <select id="accommodation" v-model="newReservation.accommodation_id">
        <option value="" disabled>Sélectionnez un hébergement</option>
        <option v-for="accommodation in accommodationsStore.accommodations" :key="accommodation.id" :value="accommodation.id">{{ accommodation.name }}</option>
      </select>

      <!-- Sélection de l'activité -->
      <label for="activity">Activité:</label>
      <select id="activity" v-model="newReservation.activity_id">
        <option value="" disabled>Sélectionnez une activité</option>
        <option v-for="activity in activitiesStore.activites" :key="activity.id" :value="activity.id">{{ activity.name }}</option>
      </select>

      <!-- Sélection du personnage -->
      <label for="character">Rencontre avec le personnage:</label>
      <select id="character" v-model="newReservation.character_id">
        <option value="" disabled>Sélectionnez un personnage</option>
        <option v-for="character in charactersStore.characters" :key="character.id" :value="character.id">{{ character.name }}</option>
      </select>

      <!-- Sélection des dates -->
      <label for="arrival_date">Date d'arrivée:</label>
      <input type="date" id="arrival_date" v-model="newReservation.arrival_date" required>

      <label for="departure_date">Date de départ:</label>
      <input type="date" id="departure_date" v-model="newReservation.departure_date" required>

      <!-- Sélection du nombre de personnes -->
      <label for="number_of_people">Nombre de personnes:</label>
      <input type="number" id="number_of_people" v-model="newReservation.number_of_people" min="1" required>

      <button type="submit">Créer la réservation</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { usePlacesStore } from '/src/stores/PlacesStore';
import { useAccommodationStore } from '/src/stores/AccommodationsStore';
import { useActiviteStore } from '/src/stores/ActiviteStore';
import { useReservationStore } from '/src/stores/ReservationsStore';
import { useCharactersStore } from "@/stores/CharactersStore";

// Références réactives pour la sélection de l'utilisateur
const selectedPlace = ref(null);
const newReservation = ref({
  place_id: null,
  accommodation_id: null,
  activity_id: null,
  character_id: null,
  arrival_date: '',
  departure_date: '',
  number_of_people: 1,
});

// Stores
const placesStore = usePlacesStore();
const accommodationsStore = useAccommodationStore();
const activitiesStore = useActiviteStore();
const reservationStore = useReservationStore();
const charactersStore = useCharactersStore();

// Chargement des hébergements et des activités pour un lieu sélectionné
const loadAccommodationsAndActivities = async () => {
  if (selectedPlace.value) {
    newReservation.value.place_id = selectedPlace.value; // Assurez-vous que l'ID du lieu est mis à jour dans newReservation

    // Charger les hébergements pour ce lieu spécifique
    await accommodationsStore.fetchAccommodations();
    // Filtrer les hébergements par lieu
    accommodationsStore.accommodations = accommodationsStore.accommodations.filter(
        (acc) => acc.place_id === selectedPlace.value
    );

    // Charger les activités pour ce lieu spécifique
    await activitiesStore.fetchActivites();
    // Filtrer les activités par lieu
    activitiesStore.activites = activitiesStore.activites.filter(
        (act) => act.place_id === selectedPlace.value
    );
  }
};

// Méthode pour créer une nouvelle réservation
const createReservation = async () => {
  try {
    // Appel API pour créer une réservation
    await reservationStore.addReservation(newReservation.value);
    // Ici, vous pouvez gérer la logique post-création, comme réinitialiser le formulaire ou afficher un message
  } catch (error) {
    console.error("Erreur lors de la création de la réservation", error);
    // Gérer les erreurs ici, comme montrer un message à l'utilisateur
  }
};

</script>
