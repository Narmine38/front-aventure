<template>
  <div class="accommodation-card">
    <div class="card-image">
      <img :src="accommodation.picture" :alt="accommodation.name" />
    </div>
    <div class="card-info">
      <h2 class="card-name">{{ accommodation.name }}</h2>
      <p class="card-type">{{ accommodation.type }}</p>
      <p class="card-price">{{ accommodation.price }}</p>
      <p class="card-description">{{ accommodation.description }} </p>
      <p class="card-story">{{ accommodation.story }}</p>
      <p class="card-place-name">{{ accommodation.place.name }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

// Declare the props the component expects
defineProps({
  accommodation: {
    type: Object,
    required: true
  }
});

</script>

<style scoped>
.accommodation-card {
  width: 100%;
  max-width: 700px;
  margin: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  overflow: hidden;
  border-radius: 8px;
  background: white;
}

.accommodation-card:hover {
  transform: translateY(-10px);
}

.card-image img {
  width: 100%;
  height: 400px;
  object-fit: cover;
}

.card-info {
  padding: 1rem;
}

.card-name {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
}

.card-type,
.card-price,
.card-description,
.card-story,
.card-place-name {
  color: #666;
  font-size: 1rem;
  margin-top: 0.25rem;
}

.card-price {
  color: #e8554e;
  font-weight: bold;
}

.card-description {
  color: #333;
  margin: 0.5rem 0;
}

.card-story {
  font-style: italic;
  margin-top: 1rem;
}

@media (max-width: 400px) {
  .accommodation-card {
    width: 100%;
    max-width: 400px;
    margin: 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease-in-out;
    overflow: hidden;
    border-radius: 8px;
    background: white;
  }

  .card-image img {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }

}
</style>
