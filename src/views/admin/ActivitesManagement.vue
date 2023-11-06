<template>
  <div class="activites-management-section">
    <h2>Gestion des activités</h2>

    <!-- Liste des activités -->
    <div class="activites-list">
      <h3>Activités</h3>
      <table>
        <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Description</th>
          <th>Lieu</th> <!-- Nouvelle colonne -->
          <th>Type</th> <!-- Nouvelle colonne -->
          <th>age_range</th> <!-- Nouvelle colonne -->
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="activite in activiteStore.activites" :key="activite.id">
          <td>{{ activite.id }}</td>
          <td>{{ activite.name }}</td>
          <td>{{ activite.description }}</td>
          <td>{{ activite.place.name }}</td> <!-- Nouvelle cellule pour afficher le lieu -->
          <td>{{ activite.type }}</td>
          <td>{{ activite.age_range }}</td>

          <td>
            <button @click="archiveActivite(activite.id)">Archiver</button>
            <button @click="selectActiviteForUpdate(activite)">Modifier</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Ajouter une nouvelle activité -->
    <div class="add-activite">
      <h3>Ajouter une activité</h3>
      <form @submit.prevent="addActivite">
        <label>
          Nom:
          <input v-model="newActivite.name" placeholder="Nom de l'activité" required/>
        </label>
        <label>
          Description:
          <input v-model="newActivite.description" placeholder="Description de l'activité" required/>
        </label>
        <label>
          Type:
          <input v-model="newActivite.type" placeholder="Type de l'activité" required/>
        </label>
        <label>
          Tranche age:
          <input v-model="newActivite.age_range" placeholder="Tranche age de l'activité" required/>
        </label>
        <label>
          URL de la photo:
          <input v-model="newActivite.picture" placeholder="URL de la photo" required/>
        </label>
        <label>
          Lieu:
          <select v-model="newActivite.place_id" required>
            <option v-for="place in places" :key="place.id" :value="place.id">{{ place.name }}</option>
          </select>
        </label>
        <button type="submit">Ajouter</button>
      </form>
    </div>

    <!-- Modifier une activité existante -->
    <div class="update-activite" v-if="selectedActivite">
      <h3>Modifier une activité</h3>
      <form @submit.prevent="updateSelectedActivite">
        <label>
          Nom:
          <input v-model="selectActiviteForUpdate.name" placeholder="Nom de l'activité" required/>
        </label>
        <label>
          Description:
          <input v-model="selectActiviteForUpdate.description" placeholder="Description de l'activité" required/>
        </label>
        <label>
          Type:
          <input v-model="selectActiviteForUpdate.type" placeholder="Type de l'activité" required/>
        </label>
        <label>
          Tranche age:
          <input v-model="selectActiviteForUpdate.age_range" placeholder="Tranche age de l'activité" required/>
        </label>
        <label>
          URL de la photo:
          <input v-model="selectActiviteForUpdate.picture" placeholder="URL de la photo" required/>
        </label>
        <label>
          Lieu:
          <select v-model="selectActiviteForUpdate.place_id" required>
            <option v-for="place in places" :key="place.id" :value="place.id">{{ place.name }}</option>
          </select>
        </label>
        <button type="submit">Mettre à jour</button>
      </form>
    </div>

    <!-- Liste des activités archivées -->
    <div class="archived-activites-list" v-if="activiteStore.archivedActivites.length">
      <h3>Activités archivées</h3>
      <table>
        <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Description</th>
          <th>Lieu</th> <!-- Nouvelle colonne -->
          <th>Type</th> <!-- Nouvelle colonne -->
          <th>age_range</th> <!-- Nouvelle colonne -->
          <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="activite in activiteStore.archivedActivites" :key="activite.id">
          <td>{{ activite.id }}</td>
          <td>{{ activite.name }}</td>
          <td>{{ activite.description }}</td>
          <td>{{ activite.place.name }}</td> <!-- Nouvelle cellule pour afficher le lieu -->
          <td>{{ activite.type }}</td>
          <td>{{ activite.age_range }}</td>

          <td>
            <button @click="restoreArchivedActivite(activite.id)">Restaurer</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import {useActiviteStore} from '/src/stores/ActiviteStore';
import {ref} from "vue";
import {usePlacesStore} from "@/stores/PlacesStore";

const places = ref([]);
const activiteStore = useActiviteStore();
activiteStore.fetchActivites();
activiteStore.fetchArchivedActivites();

const newActivite = ref({
  name: '',
  description: '',
  picture: '',   // champ photo ajouté
  type: '',
  age_range: '',
  place_id: ''  // champ lieu_id ajouté
});

const addActivite = async () => {
  await activiteStore.addActivite(newActivite.value);
  newActivite.value = {
    name: '',
    description: '',
    picture: '',   // champ photo ajouté
    type: '',
    age_range: '',
    place_id: ''  // champ lieu_id ajouté
    };
  };

  const selectedActivite = ref(null);

  const selectActiviteForUpdate = (activite) => {
    selectedActivite.value = Object.assign({}, activite);
  };

  const updateSelectedActivite = async () => {
    if (!selectedActivite.value || !selectedActivite.value.id) return;
    await activiteStore.updateActivite(selectedActivite.value.id, selectedActivite.value);
    selectedActivite.value = null;
  };

  const archiveActivite = async (id) => {
    try {
      await activiteStore.archiveActivite(id);
      await activiteStore.fetchActivites();
      window.location.reload();
    } catch (error) {
      console.error("Erreur lors de l'archivage de l'activité:", error);
    }
  };

  const restoreArchivedActivite = async (id) => {
    await activiteStore.restoreArchivedActivite(id);
    await activiteStore.fetchActivites();
    await activiteStore.fetchArchivedActivites();
  };

  const fetchPlaces = async () => {
    const placeStore = usePlacesStore(); // Accès aux méthodes du store d'authentification
    await placeStore.fetchPlaces();
    places.value = placeStore.places; // Assuming 'places' is the array within your store
  };

  fetchPlaces();
</script>

<style scoped>
/* Votre CSS sera probablement similaire à celui de HebergementsManagement. */
.activites-management-section {
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

.add-activite, .update-activite {
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
