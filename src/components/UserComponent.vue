<template>
  <div class="card">
    <div class="card-header">
      <div class="user-id">ID: {{ user.id }}</div>
      <div class="user-name">Nom: {{ user.name }}</div>
      <div class="user-email">Email: {{ user.email }}</div>
    </div>
    <div class="card-actions">
      <button @click="emitAction('archive', user.id)">Archiver</button>
      <button @click="emitAction('restore', user.id)" v-if="user.archived">Restaurer</button>
      <button @click="emitAction('delete', user.id)" v-if="user.archived">Supprimer</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  user: Object
});

const emit = defineEmits(['archive', 'restore', 'delete']);

const emitAction = (action, id) => {
  emit(action, id);
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
