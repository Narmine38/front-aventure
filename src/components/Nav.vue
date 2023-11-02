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
import {computed, ref} from 'vue';
import {useAuthStore} from '/src/stores/authStore.js';
import {useRouter} from 'vue-router';
import IconCommunity from "@/components/icons/IconCommunity.vue";

const store = useAuthStore();
const router = useRouter();
const showDropdown = ref(false);

const isLoggedIn = computed(() => store.isLoggedIn);
const logout = store.logout

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value;
};

const goToRegisterOrLogin = () => {
  router.push({name: 'Connexion-inscription'});
};


</script>

<style scoped>
.nav {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

.account-dropdown {
  position: relative;
  cursor: pointer;
}

.dropdown-content {
  display: none;
  position: absolute;
  right: 0;
  top: 100%;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  z-index: 1;
}

.account-dropdown:hover .dropdown-content {
  display: block;
}
</style>
