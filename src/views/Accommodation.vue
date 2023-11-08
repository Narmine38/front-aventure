<template>
  <div>
    <PlaceCard v-for="accommodation in accommodations" :key="accommodation.id" :place="accommodation" v-if="accommodations.length"/>
    <div v-else>Loading destinations...</div>
  </div>
</template>

<script setup>
import PlaceCard from "@/components/PlaceCard.vue";
import { onMounted, ref } from 'vue';
import {useAccommodationStore} from "@/stores/AccommodationsStore";
const accommodationStore = useAccommodationStore();
const accommodations = ref([]);

onMounted(async () => {
  await accommodationStore.fetchAccommodations();
  accommodations.value = accommodationStore.accommodations;
});
</script>

<style scoped>
</style>
