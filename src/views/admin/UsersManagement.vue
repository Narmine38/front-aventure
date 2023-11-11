<template>
  <div class="user-management-section">
    <!-- Liste des utilisateurs -->
    <div class="users-list">
      <h3>Utilisateurs</h3>
      <UserComponent
          v-for="user in adminUsersStore.users"
          :key="user.id"
          :user="user"
          @archive="archiveUser"
          @restore="restoreUser"
          @delete="destroyUser"
      />
    </div>

    <!-- Liste des utilisateurs archivés -->
    <div class="archived-users-list" v-if="adminUsersStore.archivedUsers.length">
      <h3>Utilisateurs archivés</h3>
      <UserComponent
          v-for="user in adminUsersStore.archivedUsers"
          :key="user.id"
          :user="{...user, archived: true}"
          @archive="archiveUser"
          @restore="restoreUser"
          @delete="destroyUser"
      />
    </div>
  </div>
</template>

<script setup>
import {useAdminUsersStore} from "@/stores/adminUsersStore";
import UserComponent from "@/components/UserComponent.vue";

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
</style>

