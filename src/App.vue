<script setup>
import { RouterView } from 'vue-router'
import Header from "@/components/Header.vue";
</script>

<template>
    <Header/>

  <RouterView />
</template>

<style scoped>


@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
}
</style>
