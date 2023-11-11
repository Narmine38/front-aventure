
<script setup>
import { RouterView } from 'vue-router'
import ComponanteNav from "@/components/HeaderComponante.vue";
</script>

<template>
  <header>
    <ComponanteNav/>
  </header>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>

</style>