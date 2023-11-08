<template>
  <div class="character-card">
    <div class="character-image">
      <img :src="character.picture" :alt="character.name" />
    </div>
    <div class="character-info">
      <h3 class="character-name">{{ character.name }}</h3>
      <p class="character-story">{{ character.story }}</p>
    </div>
    <div class="character-place-info">
      <p class="place-name">{{ character.place.name }}</p>
      <p class="place-description">{{ character.place.shortDescription }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  character: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.character-card {
  width: 100%;
  max-width: 800px;
  margin: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  overflow: hidden;
  border-radius: 8px;
  background: white;
}

.character-card:hover {
  transform: translateY(-10px);
}

.character-image img {
  width: 100%;
  height: 600px;
  object-fit: cover;
}

.character-info {
  padding: 1rem;
}

.character-name {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.character-story {
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.character-place-info {
  padding: 0 1rem 1rem;
  background: #f8f8f8;
  border-top: 1px solid #eee;
}

.place-name {
  font-weight: bold;
  color: #333;
}

.place-description {
  font-size: 1.5rem;
  color: #666;
}
</style>
