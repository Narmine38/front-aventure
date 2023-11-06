<template>
  <div class="accommodation-management-section">
    <!-- Accommodation List -->
    <div class="accommodation-list">
      <h3>Accommodations</h3>
      <table>
        <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Location</th> <!-- Corrected column name -->
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="accommodation in accommodationStore.accommodations" :key="accommodation.id">
          <td>{{ accommodation.id }}</td>
          <td>{{ accommodation.name }}</td>
          <td>{{ accommodation.description }}</td>
          <td>{{ accommodation.place.name }}</td> <!-- Corrected property access -->
          <td>
            <button @click="archiveAccommodation(accommodation.id)">Archive</button>
            <button @click="selectAccommodationForUpdate(accommodation)">Edit</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Add New Accommodation Form -->
    <div class="add-accommodation">
      <h3>Add Accommodation</h3>
      <form @submit.prevent="addAccommodation">
        <!-- Form fields -->
        <label>
          Name:
          <input type="text" v-model="newAccommodation.name" required>
        </label>
        <label>
          Description:
          <textarea v-model="newAccommodation.description" required></textarea>
        </label>
        <label>
          Price:
          <input type="number" v-model.number="newAccommodation.price" required>
        </label>
        <label>
          Photo URL:
          <input type="text" v-model="newAccommodation.photo" required>
        </label>
        <label>
          Place:
          <select v-model="newAccommodation.place_id" required>
            <option v-for="place in places" :value="place.id">{{ place.name }}</option>
          </select>
        </label>
        <button type="submit">Add</button>
      </form>
    </div>

    <!-- Edit Accommodation Form -->
    <div class="edit-accommodation" v-if="selectedAccommodation">
      <h3>Edit Accommodation</h3>
      <form @submit.prevent="updateSelectedAccommodation">
        <label>
          Name:
          <input type="text" v-model="selectedAccommodation.name" required>
        </label>
        <label>
          Description:
          <textarea v-model="selectedAccommodation.description" required></textarea>
        </label>
        <label>
          Price:
          <input type="number" v-model.number="selectedAccommodation.price" required>
        </label>
        <label>
          Photo URL:
          <input type="text" v-model="selectedAccommodation.photo" required>
        </label>
        <label>
          Place:
          <select v-model="selectedAccommodation.place_id" required>
            <option v-for="place in places" :value="place.id">{{ place.name }}</option>
          </select>
        </label>
        <button type="submit">Update</button>
      </form>
    </div>


    <!-- Archived Accommodations List -->
    <div class="archived-accommodations" v-if="accommodationStore.archivedAccommodations.length">
      <h3>Archived Accommodations</h3>
      <table>
        <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Photo</th>
          <th>Place</th>
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="archived in accommodationStore.archivedAccommodations" :key="archived.id">
          <td>{{ archived.id }}</td>
          <td>{{ archived.name }}</td>
          <td>{{ archived.description }}</td>
          <td>{{ archived.price }}</td>
          <td><img :src="archived.photo" alt="Accommodation" class="accommodation-photo"></td>
          <td>{{ findPlaceNameById(archived.place_id) }}</td>
          <td>
            <button @click="restoreArchivedAccommodation(archived.id)">Restore</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script setup>
import { useAccommodationStore } from '/src/stores/AccommodationsStore'; // Corrected the import
import { ref } from 'vue';
import api from "@/services/api";
const places = ref([]);
const accommodationStore = useAccommodationStore();
accommodationStore.fetchAccommodations();
accommodationStore.fetchArchivedAccommodations();

const newAccommodation = ref({
  name: '',
  description: '',
  price: null,
  photo: '',
  place_id: '',
});

const addAccommodation = async () => {
  await accommodationStore.addAccommodation(newAccommodation.value);
  newAccommodation.value = { name: '', description: '', price: null, photo: '', place_id: '' };
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

const archiveAccommodation = async (id) => {
  try {
    await accommodationStore.archiveAccommodation(id);
    await accommodationStore.fetchAccommodations();
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
  try {
    const response = await api.get('/api/places'); // Corrected the endpoint
    places.value = response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des lieux:", error);
  }
};

const findPlaceNameById = (placeId) => {
  const place = places.value.find((p) => p.id === placeId);
  return place ? place.name : 'Unknown';
};

fetchPlaces();
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
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
