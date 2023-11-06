<template>
  <div class="hebergements-management-section">
    <h2>Gestion des hébergements</h2>

    <!-- Liste des hébergements -->
    <div class="hebergements-list">
      <h3>Hébergements</h3>
      <table>
        <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Description</th>
          <th>Lieu</th> <!-- Nouvelle colonne -->
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="accommodation in accommodationStore.accommodations" :key="accommodation.id">
          <td>{{ accommodation.id }}</td>
          <td>{{ accommodation.name }}</td>
          <td>{{ accommodation.description }}</td>
          <td>{{ accommodation.place.name }}</td> <!-- Nouvelle cellule pour afficher le lieu -->

          <td>
            <button @click="archiveAccomodation(accommodation.id)">Archiver</button>
            <button @click="selectAccommodationForUpdate(accommodation)">Modifier</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Ajouter un nouvel hébergement -->
    <div class="add-hebergement">
      <h3>Ajouter un hébergement</h3>
      <form @submit.prevent="addAccommodation">
        <label>
          Nom:
          <input v-model="newAccommodation.name" placeholder="Nom de l'hébergement" required/>
        </label>
        <label>
          Description:
          <input v-model="newAccommodation.description" placeholder="Description de l'hébergement" required/>
        </label>
        <label>
          Prix:
          <input type="number" v-model="newAccommodation.price" placeholder="Prix de l'hébergement" required/>
        </label>
        <label>
          URL de la photo:
          <input v-model="newAccommodation.picture" placeholder="URL de la photo" required/>
        </label>
        <label>
          Lieu:
          <select v-model="newAccommodation.place_id" required>
            <option v-for="place in places" :key="place.id" :value="place.id">{{ place.nom }}</option>
          </select>
        </label>
        <button type="submit">Ajouter</button>
      </form>
    </div>

    <!-- Modifier un hébergement existant -->
    <div class="update-hebergement" v-if="selectedAccommodation">
      <h3>Modifier un hébergement</h3>
      <form @submit.prevent="updateSelectedAccommodation">
        <label>
          Nom:
          <input v-model="selectedAccommodation.name" placeholder="Nom de l'hébergement" required/>
        </label>
        <label>
          Description:
          <input v-model="selectedAccommodation.description" placeholder="Description de l'hébergement" required/>
        </label>
        <label>
          Prix:
          <input type="number" v-model="selectedAccommodation.price" placeholder="Prix de l'hébergement" required/>
        </label>
        <label>
          URL de la photo:
          <input v-model="selectedAccommodation.picture" placeholder="URL de la photo" required/>
        </label>
        <label>
          Lieu:
          <select v-model="selectedAccommodation.place_id" required>
            <option v-for="place in places" :key="place.id" :value="place.id">{{ place.name }}</option>
          </select>
        </label>

        <button type="submit">Mettre à jour</button>
      </form>
    </div>

    <!-- Liste des hébergements archivés -->
    <div class="archived-hebergements-list" v-if="accommodationStore.archivedAccommodations.length">
      <h3>Hébergements archivés</h3>
      <table>
        <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Description</th>
          <th>Lieu</th> <!-- Ajouté pour afficher le lieu -->
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="accommodation in accommodationStore.archivedAccommodations" :key="accommodation.id">
          <td>{{ accommodation.id }}</td>
          <td>{{ accommodation.name }}</td>
          <td>{{ accommodation.description }}</td>
          <td>{{ accommodation.place.name }}</td> <!-- Affiche le nom du lieu associé -->
          <td>
            <button @click="restoreArchivedAccommodation(accommodation.id)">Restaurer</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import {useAccommodationStore} from '/src/stores/AccommodationsStore';
import {ref} from 'vue';
import {usePlacesStore} from "/src/stores/PlacesStore";

const places = ref([]);
const accommodationStore = useAccommodationStore();
accommodationStore.fetchAccommodations();
accommodationStore.fetchArchivedAccommodations();

const newAccommodation = ref({
  name: '',
  description: '',
  price: null,
  picture: ''
});

const addAccommodation = async () => {
  await accommodationStore.addAccommodation(newAccommodation.value);
  newAccommodation.value = {
    name: '',
    description: '',
    price: null,
    picture: ''
  };
};

const selectedAccommodation = ref(null);

const selectAccommodationForUpdate = (accommodation) => {
  selectedAccommodation.value = Object.assign({}, accommodation);
};

const updateSelectedAccommodation = async () => {
  if (!selectedAccommodation.value || !selectedAccommodation.value.id) return;
  await accommodationStore.updateAccommodation(selectedAccommodation.value.id, selectedAccommodation.value);
  selectedAccommodation.value = null;
};

const archiveAccomodation = async (id) => {
  try {
    await accommodationStore.archiveAccommodation(id);
    await accommodationStore.fetchAccommodations();
    window.location.reload();
  } catch (error) {
    console.error("Erreur lors de l'archivage de l'hébergement:", error);
  }
};

const restoreArchivedAccommodation = async (id) => {
  await accommodationStore.restoreArchivedAccommodation(id);
  await accommodationStore.fetchAccommodations();
  await accommodationStore.fetchArchivedAccommodations();
};

const fetchPlaces = async () => {
  const PlaceStore = usePlacesStore(); // Accès aux méthodes du store d'authentification
  await PlaceStore.fetchPlaces();
};

fetchPlaces();
</script>

<style scoped>
/* Votre CSS sera probablement similaire à celui de PlaceManagement. */
.hebergements-management-section {
  padding: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
}

.add-hebergement, .update-hebergement {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
}

label {
  display: block;
  margin-bottom: 10px;
}

input {
  padding: 8px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  width: 100%;
  box-sizing: border-box;
}
</style>
