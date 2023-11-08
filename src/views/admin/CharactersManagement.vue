<template>
  <div class="personnages-management-section">
    <h2>Gestion des personnages</h2>

    <!-- Liste des personnages -->
    <div class="personnages-list">
      <h3>Personnages</h3>
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
        <tr v-for="character in characterStore.characters" :key="character.id">
          <td>{{ character.id }}</td>
          <td>{{ character.name }}</td>
          <td>{{ character.story }}</td>

          <td>{{ character.picture }}</td>

          <td>
            <button @click="archiveCharacter(character.id)">Archiver</button>
            <button @click="selectCharacterForUpdate(character)">Modifier</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <!-- Ajouter un nouveau personnage -->
    <div class="add-personnage">
      <h3>Ajouter un personnage</h3>
      <form @submit.prevent="addCharacter">
        <label>
          Nom:
          <input v-model="newCharacter.name" placeholder="Nom du personnage" required />
        </label>
        <label>
          Histoire:
          <input v-model="newCharacter.story" placeholder="Histoire du personnage" required />
        </label>
        <label>
          URL de la photo:
          <input v-model="newCharacter.picture" placeholder="URL de la photo" required />
        </label>
        <label>
          Lieu:
          <select v-model="newCharacter.place_id" required>
            <option v-for="place in places" :key="place.id" :value="place.id">{{ place.name }}</option>
          </select>
        </label>
        <button type="submit">Ajouter</button>
      </form>
    </div>

    <!-- Modifier un personnage existant -->
    <div class="update-personnage" v-if="selectedCharacter">
      <h3>Modifier un personnage</h3>
      <form @submit.prevent="updateSelectedCharacter">
        <label>
          Nom:
          <input v-model="selectedCharacter.name" placeholder="Nom du personnage" required />
        </label>
        <label>
          Histoire:
          <input v-model="selectedCharacter.story" placeholder="Histoire du personnage" required />
        </label>
        <label>
          URL de la photo:
          <input v-model="selectedCharacter.picture" placeholder="URL de la photo" required />
        </label>
        <label>
          Lieu:
          <select v-model="selectedCharacter.place_id" required>
            <option v-for="place in places" :key="place.id" :value="place.id">{{ place.name }}</option>
          </select>
        </label>
        <button type="submit">Mettre à jour</button>
      </form>
    </div>

    <!-- Liste des personnages archivés -->
    <div class="archived-personnages-list" v-if="characterStore.archivedCharacters.length">
      <h3>Personnages archivés</h3>
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
        <tr v-for="character in characterStore.archivedCharacters" :key="character.id">
          <td>{{ character.id }}</td>
          <td>{{ character.name }}</td>
          <td>{{ character.story }}</td>
          <td>
            <button @click="restoreArchivedCharacter(character.id)">Restaurer</button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import {useCharactersStore} from "/src/stores/CharactersStore";
import {usePlacesStore} from "@/stores/PlacesStore";
const places = ref([]);

const characterStore = useCharactersStore();
characterStore.fetchCharaters();
characterStore.fetchArchivedCharacters();

const newCharacter = ref({
  name: '',
  story: '',
  picture: '',   // champ photo ajouté
  place_id: ''  // champ lieu_id ajouté
});

const addCharacter = async () => {
  await characterStore.addCharacter(newCharacter.value);
  newCharacter.value = {
    name: '',
    story: '',
    picture: '',   // champ photo ajouté
    place_id: ''  // champ lieu_id ajouté
  };
};

const selectedCharacter = ref(null);

const selectCharacterForUpdate = (character) => {
  selectedCharacter.value = Object.assign({}, character);
};

const updateSelectedCharacter = async () => {
  if (!selectedCharacter.value || !selectedCharacter.value.id) return;
  await characterStore.updateCharacter(selectedCharacter.value.id, selectedCharacter.value);
  selectedCharacter.value = null;
};

const archiveCharacter = async (id) => {
  try {
    await characterStore.archivedCharacter(id);
    await characterStore.fetchCharaters();
    window.location.reload();
  } catch (error) {
    console.error("Erreur lors de l'archivage du personnage:", error);
  }
};

const restoreArchivedCharacter = async (id) => {
  await characterStore.restoreArchivedCharacter(id);
  await characterStore.fetchCharaters();
  await characterStore.fetchArchivedCharacters();
};

const fetchPlaces = async () => {
  const placeStore = usePlacesStore(); // Accès aux méthodes du store d'authentification
  await placeStore.fetchPlaces();
  places.value = placeStore.places;

};

fetchPlaces();
</script>

<style scoped>
/* Les styles CSS seront probablement similaires à ceux des autres composants de gestion. */
.personnages-management-section {
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
.add-personnage, .update-personnage {
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
