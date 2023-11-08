<template>
  <div class="activity-card">
    <div class="activity-image">
      <!-- Assuming you have a method to get the full URL for the picture -->
      <img :src="activity.picture" :alt="activity.name" />
    </div>
    <div class="activity-info">
      <h3 class="activity-name">{{ activity.name }}</h3>
      <p class="activity-type">{{ activity.type }}</p>
      <p class="activity-description">{{ activity.description }}</p>
      <p class="activity-age-range">Age: {{ activity.age_range }}</p>
    </div>
    <div class="activity-place-info">
      <p class="place-name">{{ activity.place.name }}</p>
      <p class="place-description">{{ activity.place.shortDescription }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';

defineProps({
  activity: {
    type: Object,
    required: true
  }
});


</script>

<style scoped>
.activity-card {
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: box-shadow 0.3s ease;
  background: white;
  margin-bottom: 1rem;
}

.activity-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.activity-image img {
  width: 100%;
  height: auto;
  display: block;
}

.activity-info {
  padding: 1rem;
}

.activity-name {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.activity-type {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.activity-description,
.activity-age-range {
  font-size: 0.8rem;
  margin-bottom: 0.5rem;
}

.activity-place-info {
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
