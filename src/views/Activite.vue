<template>
  <div>
    <ActiviteCard v-for="activity in activites" :key="activity.id" v-if="activites.length" :activity="activity"/>
    <div v-else>Chargement des destinations...</div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useActiviteStore } from "/src/stores/ActiviteStore";
import ActiviteCard from "@/components/ActiviteCard.vue";

const activteStore = useActiviteStore();
const activites = ref([]);

onMounted(async () => {
  await activteStore.fetchActivites();
  activites.value = activteStore.activites;
});
</script>

<style scoped>
</style>
