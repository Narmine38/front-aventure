<template>
  <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
    <div class="card h-100">
      <img class="card-img-top" :src="place.picture" :alt="place.name" />
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">{{ place.name }}</h5>
        <h6 class="card-subtitle mb-2 text-muted">{{ place.locationType }}</h6>
        <p class="card-text flex-grow-1">{{ place.shortDescription }}</p>
        <p class="text-muted">{{ place.longDescription }}</p>
        <!-- Utilisez les badges de Bootstrap pour les restrictions pour une meilleure visibilité -->
        <p v-if="place.restrictions" class="text-wrap mt-auto">
          <span class="badge bg-danger">{{ place.restrictions }}</span>
        </p>
        <p class="fst-italic mt-auto">{{ place.travelAdvice }}</p>
        <p class="border-top pt-3 mt-auto">{{ place.story }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  place: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
/* Responsive image height adjustment */
.card-img-top {
  height: 200px; /* Set a fixed height for consistency */
  object-fit: cover; /* Ensure images cover the area well */
}
</style>