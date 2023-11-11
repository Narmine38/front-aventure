<template>
  <div class="user-management-section">
    <!-- Liste des utilisateurs -->
    <div class="users-list">
      <h3>Utilisateurs</h3>
      <div class="card" v-for="user in adminUsersStore.users" :key="user.id">
        <div class="card-header">
          <div class="user-id">ID: {{ user.id }}</div>
          <div class="user-name">Nom: {{ user.name }}</div>
          <div class="user-email">Email: {{ user.email }}</div>
        </div>
        <div class="card-actions">
          <button @click="archiveUser(user.id)">Archiver</button>
        </div>
      </div>
    </div>

    <!-- Liste des utilisateurs archivés -->
    <div class="archived-users-list" v-if="adminUsersStore.archivedUsers.length">
      <h3>Utilisateurs archivés</h3>
      <div class="card" v-for="user in adminUsersStore.archivedUsers" :key="user.id">
        <div class="card-header">
          <div class="user-id">ID: {{ user.id }}</div>
          <div class="user-name">Nom: {{ user.name }}</div>
          <div class="user-email">Email: {{ user.email }}</div>
        </div>
        <div class="card-actions">
          <button @click="restoreUser(user.id)">Restaurer</button>
          <button @click="destroyUser(user.id)">Supprimer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useAdminUsersStore} from "@/stores/adminUsersStore";

const adminUsersStore = useAdminUsersStore();
adminUsersStore.fetchUsers();
adminUsersStore.fetchArchivedUsers();

const archiveUser = async (id) => {
  try {
    await adminUsersStore.archiveUser(id);
    // Rafraîchir la liste des lieux après l'archivage
    await adminUsersStore.fetchUsers();
    window.location.reload();

  } catch (error) {
    console.error("Erreur lors de l'archivage de l'utilisateur:", error);
  }
};

const restoreUser = async (id) => {
  await adminUsersStore.restoreUser(id);
  window.location.reload();

};

const destroyUser = async (id) => {
  await adminUsersStore.destroyUser(id);
}
</script>

<style scoped>
.user-management-section {
  padding: 20px;
}
.card {
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 20px;
  padding: 20px;
}
.card-header {
  margin-bottom: 15px;
}
.card-actions {
  text-align: right;
}
button {
  padding: 10px 15px;
  margin-right: 10px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  opacity: 0.8;
}
.user-id,
.user-name,
.user-email {
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  .card-actions {
    text-align: center;
  }
  button {
    margin-bottom: 10px;
  }
}
</style>

