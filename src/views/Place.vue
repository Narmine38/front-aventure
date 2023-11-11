<template>
  <div>
    <PlaceCard v-for="place in places" :key="place.id" :place="place" v-if="places.length"/>
    <div v-else>Loading destinations...</div>
  </div>
</template>

<script setup>
import PlaceCard from "@/components/PlaceCard.vue";
import {onMounted, ref} from 'vue';
import {usePlacesStore} from "@/stores/PlacesStore";

const placesStore = usePlacesStore();
const places = ref([]);

onMounted(async () => {
  await placesStore.fetchPlaces();
  places.value = placesStore.places;
});
</script>

<style scoped>

</style>
