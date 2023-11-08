<template>
  <div>
    <AccommodationCard v-for="accommodation in accommodations" :key="accommodation.id" :accommodation="accommodation"/>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import {useAccommodationStore} from "@/stores/AccommodationsStore";
import AccommodationCard from "@/components/AccommodationCard.vue";

const accommodationStore = useAccommodationStore();
const accommodations = ref([]);

onMounted(async () => {
  await accommodationStore.fetchAccommodations();
  accommodations.value = accommodationStore.accommodations;
});
</script>

<style scoped>
</style>
