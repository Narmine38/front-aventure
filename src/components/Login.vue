<template>
  <div>
    <input v-model="email" placeholder="Email">
    <input v-model="password" placeholder="Password" type="password">
    <button @click="attemptLogin">Login</button>
    <p v-if="authStore.errorMessage">{{ authStore.errorMessage }}</p>
  </div>
</template>

<script setup>
import {ref, watchEffect} from 'vue';
import { useAuthStore } from '@/stores/authStore';
import router from "@/router";

const authStore = useAuthStore();
const email = ref('');
const password = ref('');

const attemptLogin = async () => {
  await authStore.login(email.value, password.value);
  if (authStore.isLoggedIn) {
    await router.push("/");
  }
};

// Réagir aux changements de l'état d'authentification
watchEffect(() => {
  if (authStore.isLoggedIn) {
    router.push('/').catch(err => {});
  }
});
</script>

<style scoped>
/* Styles existants */
/* ... */
</style>
