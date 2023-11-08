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
  max-width: 340px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  margin: 1rem;
  background: white;
}

.character-card:hover {
  transform: translateY(-10px);
}

.character-image img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.character-info {
  padding: 1rem;
}

.character-name {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.character-story {
  font-size: 0.9rem;
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
  font-size: 0.8rem;
  color: #666;
}
</style>
