<template>
  <section class="characters-section">
    <h1>Rencontrez les personnages de la Terre du Milieu</h1>
    <div class="characters-container">
      <CharacterCard
          v-for="character in characters" :key="character.id" :character="character"
      />
    </div>
  </section>
</template>

<script setup>
import CharacterCard from "@/components/CharacterCard.vue";
import { ref, onMounted } from 'vue';
import { useCharactersStore } from "/src/stores/CharactersStore";

const charactersStore = useCharactersStore();
const characters = ref([]);

onMounted(async () => {
  await charactersStore.fetchCharaters()
  characters.value = charactersStore.characters;
});
</script>

<style scoped>
.characters-section {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.characters-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}

@media (max-width: 768px) {
  .characters-container {
    flex-direction: column;
    align-items: center;
  }
}
</style>
