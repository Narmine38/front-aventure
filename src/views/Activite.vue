<template>
  <div>
    <ActiviteCard v-for="activty in activites" :key="activty.id" v-if="activites.length" activity="activty"/>
    <div v-else>Loading destinations...</div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import {useActiviteStore} from "/src/stores/ActiviteStore";
import ActiviteCard from "@/components/ActiviteCard.vue";
const activtie = useActiviteStore();
const activites = ref([]);

onMounted(async () => {
  await activtie.fetchActivites();
  activites.value = activtie.activites;
});
</script>

<style scoped>
</style>
