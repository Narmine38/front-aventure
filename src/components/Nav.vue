<template>
  <nav class="nav">
    <!-- Logo sur la gauche -->
    <div class="logo">
      <IconCommunity/>
    </div>

    <!-- Dropdown "Mon Compte" sur la droite -->
    <!-- Dropdown "Mon Compte" ou redirection vers "register" -->
    <div v-if="isLoggedIn" class="account-dropdown" @click="toggleDropdown">
      Mon compte
      <div v-if="showDropdown" class="dropdown-content">
        <router-link to="/mon-compte">Profil</router-link>
        <button @click.prevent="logout" class="logout-button">Déconnexion</button>
      </div>
    </div>

    <div v-else class="register-link" @click="goToRegisterOrLogin">
      Mon compte
    </div>
  </nav>
</template>

<script setup>

</script>


<style scoped>

</style>
