<template>
  <div class="place-card">
    <div class="card-image">
      <img :src="place.picture" :alt="place.name" />
    </div>
    <div class="card-content">
      <h2 class="card-title">{{ place.name }}</h2>
      <p class="card-type">{{ place.locationType }}</p>
      <p class="card-description">{{ place.shortDescription }}</p>
      <p class="card-long-description">{{ place.longDescription }}</p>
      <p class="card-restrictions">{{ place.restrictions }}</p>
      <p class="card-travel-advice">{{ place.travelAdvice }}</p>
      <p class="card-story">{{ place.story }}</p>
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
.place-card {
  width: 100%;
  max-width: 800px;
  margin: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  overflow: hidden;
  border-radius: 8px;
  background: white;
}

.place-card:hover {
  transform: translateY(-10px);
}

.card-image img {
  width: 100%;
  height: 600px;
  object-fit: cover;
}

.card-content {
  padding: 1rem;
}

.card-title {
  margin: 0;
  padding: 0;
  font-size: 2rem;
  font-weight: bold;
  color: #333;
}

.card-type {
  font-size: 0.9rem;
  color: #666;
  margin-top: 0.5rem;
}

.card-description {
  font-size: 1.5rem;
  margin-top: 0.5rem;
  color: #333;
}

.card-story {
  font-size: 1.5rem;
  margin-top: 0.5rem;
  color: #333;
  border-top: 1px solid #eee;
  padding-top: 0.5rem;
}

.card-long-description,
.card-restrictions,
.card-travel-advice {
  font-size: 1.5rem;
  margin-top: 0.5rem;
  color: #333;
}

.card-restrictions {
  color: #e3342f;
}

.card-travel-advice {
  font-style: italic;
}
</style>
