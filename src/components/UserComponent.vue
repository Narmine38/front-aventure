<template>
  <div class="card">
    <div class="card-header">
      <div class="user-id">ID: {{ user.id }}</div>
      <div class="user-name">Nom: {{ user.name }}</div>
      <div class="user-email">Email: {{ user.email }}</div>
    </div>
    <div class="card-actions">
      <!-- Les actions sont émises à la vue parente via des événements -->
      <button @click="emitAction('archive', user.id)">Archiver</button>
      <button @click="emitAction('restore', user.id)" v-if="user.archived">Restaurer</button>
      <button @click="emitAction('delete', user.id)" v-if="user.archived">Supprimer</button>
    </div>
  </div>
</template>

<script setup>
// props et emit sont importés depuis Vue
import { defineProps, emit } from 'vue';

// Définir les props attendues par ce composant
const props = defineProps({
  user: Object,
});

// Émettre une action basée sur le type et l'ID de l'utilisateur
const emitAction = (actionType, userId) => {
  emit(actionType, userId);
};
</script>

<style scoped>
/* Styles internes pour UserComponent */
.card {
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 20px;
  padding: 20px;
}
/* ... autres styles ... */
</style>
