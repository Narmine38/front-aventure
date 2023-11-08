<template>
  <div class="places-management-section">
    <h2>Gestion des lieux</h2>

    <!-- Liste des lieux -->
    <div class="places-list">
      <h3>Liste des lieux</h3>
      <table>
        <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Description Courte</th>
          <th>Description Long</th>
          <th>Type</th>
          <th>Réstriction</th>
          <th>Conseille</th>
          <th>Anecdote</th>
          <th>Illustration</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="place in placesStore.places" :key="place.id">
          <td>{{ place.id }}</td>
          <td>{{ place.name }}</td>
          <td>{{ place.shortDescription }}</td>
          <td>{{ place.longDescription }}</td>
          <td>{{ place.locationType }}</td>
          <td>{{ place.restrictions }}</td>
          <td>{{ place.travelAdvice }}</td>
          <td>{{ place.story }}</td>
          <td>{{ place.picture }}</td>
          <td>
            <button @click="archivePlace(place.id)">Archiver</button>
            <button @click="selectPlaceForUpdate(place)">Modifier</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Ajouter un nouveau lieu -->
    <div class="add-place">
      <h3>Ajouter un nouveau lieu</h3>
      <form @submit.prevent="addPlace">
        <label>
          Nom:
          <input v-model="newPlace.name" placeholder="Nom du lieu" required/>
        </label>
        <label>
          Description Courte:
          <input v-model="newPlace.shortDescription" placeholder="Description courte du lieu" required/>
        </label>
        <label>
          Description Long:
          <input v-model="newPlace.longDescription" placeholder="Description long du lieu" required/>
        </label>
        <label>
          Type:
          <input v-model="newPlace.locationType" placeholder="Type du lieu" required/>
        </label>
        <label>
          Réstriction:
          <input v-model="newPlace.restrictions" placeholder="Réstriction du lieu" required/>
        </label>
        <label>
          Conseille:
          <input v-model="newPlace.travelAdvice" placeholder="Conseille de lieu" required/>
        </label>
        <label>
          Anecdote:
          <input v-model="newPlace.story" placeholder="Anecdote sur le lieu" required/>
        </label>
        <label>
          URL de l'image:
          <input v-model="newPlace.picture" placeholder="URL de l'image" required/>
        </label>
        <button type="submit">Ajouter</button>
      </form>
    </div>

    <!-- Modifier un lieu existant -->
    <div class="update-place" v-if="selectedPlace">
      <h3>Modifier un lieu existant</h3>
      <form @submit.prevent="updateSelectedPlace">
        <label>
          Nom:
          <input v-model="selectedPlace.name" placeholder="Nom du lieu" required/>
        </label>
        <label>
          Description Courte:
          <input v-model="selectedPlace.shortDescription" placeholder="Description courte du lieu" required/>
        </label>
        <label>
          Description Long:
          <input v-model="newPlace.longDescription" placeholder="Description long du lieu" required/>
        </label>
        <label>
          Type:
          <input v-model="newPlace.locationType" placeholder="Type du lieu" required/>
        </label>
        <label>
          Réstriction:
          <input v-model="newPlace.restrictions" placeholder="Réstriction du lieu" required/>
        </label>
        <label>
          Conseille:
          <input v-model="newPlace.travelAdvice" placeholder="Conseille de lieu" required/>
        </label>
        <label>
          Anecdote:
          <input v-model="newPlace.story" placeholder="Anecdote sur le lieu" required/>
        </label>
        <label>
          URL de l'image:
          <input v-model="newPlace.picture" placeholder="URL de l'image" required/>
        </label>
        <button type="submit">Mettre à jour</button>
      </form>
    </div>

    <!-- Liste des lieux archivés -->
    <div class="archived-places-list" v-if="placesStore.archivedPlaces.length">
      <h3>Lieux archivés</h3>
      <table>
        <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Description Courte</th>
          <th>Description Long</th>
          <th>Type</th>
          <th>Réstriction</th>
          <th>Conseille</th>
          <th>Anecdote</th>
          <th>Illustration</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="place in placesStore.archivedPlaces" :key="place.id">
          <td>{{ place.id }}</td>
          <td>{{ place.name }}</td>
          <td>{{ place.shortDescription }}</td>
          <td>{{ place.longDescription }}</td>
          <td>{{ place.locationType }}</td>
          <td>{{ place.restrictions }}</td>
          <td>{{ place.travelAdvice }}</td>
          <td>{{ place.story }}</td>
          <td>{{ place.picture }}</td>

          <td>
            <button @click="restoreArchivedPlace(place.id)">Restaurer</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script setup>
import {ref} from 'vue';
import {usePlacesStore} from '/src/stores/PlacesStore';

const placesStore = usePlacesStore();
placesStore.fetchPlaces();
placesStore.fetchArchivedPlaces();

const newPlace = ref({
  name: '',
  shortDescription: '',
  longDescription: '',
  locationType: '',
  restrictions: '',
  travelAdvice: '',
  picture: '',
  story: ''
});

const addPlace = async () => {
  await placesStore.addPlace(newPlace.value);
  newPlace.value = {...newPlace.value, name: '', shortDescription: '', picture: ''};
};

const selectedPlace = ref(null);

const selectPlaceForUpdate = (place) => {
  selectedPlace.value = {...place};
};

const updateSelectedPlace = async () => {
  if (!selectedPlace.value || !selectedPlace.value.id) return;
  await placesStore.updatePlace(selectedPlace.value.id, selectedPlace.value);
  selectedPlace.value = null;
};

const archivePlace = async (id) => {
  try {
    await placesStore.archivePlace(id);
    await placesStore.fetchPlaces();
    await placesStore.fetchArchivedPlaces();
  } catch (error) {
    console.error("Erreur lors de l'archivage du lieu:", error);
  }
};

const restoreArchivedPlace = async (id) => {
  try {
    await placesStore.restoreArchivedPlace(id);
  } catch (error) {
    console.error("Erreur lors de la restauration du lieu archivé:", error);
  }
};
</script>

<style scoped>
.places-management-section {
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

.add-place, .update-place {
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
