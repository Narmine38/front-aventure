<template>
  <nav class="navbar">
    <div class="nav-logo">
      <IconCommunity />
    </div>
    <div class="nav-items">
      <button @click="isLoggedIn ? toggleDropdown() : goToLogin()" class="dropdown-button">
        Mon Compte
      </button>
      <div v-if="isLoggedIn && isDropdownOpen" class="dropdown-content">
        <a href="/mon-compte">Profil</a>
        <a href="/administration" v-if="isAdmin">Administration</a>
        <button @click="logout">Déconnexion</button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '/src/stores/authStore';
import IconCommunity from "@/components/icons/IconCommunity.vue";
import router from "@/router";

const authStore = useAuthStore();
const isDropdownOpen = ref(false);

const isLoggedIn = computed(() => authStore.isLoggedIn);
const isAdmin = computed(() => authStore.isAdmin);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const goToLogin = () => {
  router.push('/LoginRegister');
};

const logout = async () => {
  await authStore.logout();
  await router.push('/');
};
</script>

<style>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.nav-logo img {
  height: 50px;
}

.nav-items {
  position: relative;
}

.dropdown-button {
  background: none;
  border: none;
  color: #ffffff;
  padding: 0.5rem 1rem;
  cursor: pointer;
}

.dropdown-content {
  display: block;
  position: absolute;
  right: 0;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: #ddd;
}
</style>
