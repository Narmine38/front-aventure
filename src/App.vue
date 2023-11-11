
<script setup>
import { RouterView } from 'vue-router'
import ComponanteNav from "@/components/HeaderComponante.vue";
import 'bootstrap/dist/css/bootstrap.min.css'
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