<template>
    <div class="content">
      <CharacterCard
          v-for="character in characters" :key="character.id" :character="character"
      />
    </div>

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
.content{
  display: flex;
  justify-content: center}
</style>
