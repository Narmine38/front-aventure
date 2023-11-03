<template>
  <nav class="navbar">
    <div class="nav-logo">
      <IconCommunity/>
    </div>
    <div class="nav-items">
      <!-- Ici, nous utilisons une condition pour vérifier si l'utilisateur est connecté -->
      <button @click="isLoggedIn ? toggleDropdown() : goToLogin()" class="dropdown-button">
        Mon Compte
      </button>
      <!-- Le menu déroulant ne s'affiche que si l'utilisateur est connecté -->
      <div v-if="isLoggedIn && isDropdownOpen" class="dropdown-content">
        <a href="/profile">Profil</a>
        <a href="/settings">Paramètres</a>
        <a href="/logout">Déconnexion</a>
      </div>
    </div>
  </nav>
</template>

<script>
import {ref, computed} from 'vue';
import {useAuthStore} from '/src/stores/authStore';
import IconCommunity from "@/components/icons/IconCommunity.vue";
import router from "@/router"; // Importez votre store d'authentification

export default {
  components: {IconCommunity},
  setup() {
    const authStore = useAuthStore(); // Utilisez le store d'authentification
    const isDropdownOpen = ref(false);

    // Computed property pour déterminer si l'utilisateur est connecté
    const isLoggedIn = computed(() => authStore.isLoggedIn);

    function toggleDropdown() {
      isDropdownOpen.value = !isDropdownOpen.value;
    }

    function goToLogin() {
      // Redirigez l'utilisateur vers la page de connexion
      router.push('/LoginRegister')
    }

    return {isLoggedIn, isDropdownOpen, toggleDropdown, goToLogin};
  },
};
</script>

<style>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.5rem 1rem;
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
  color: black;
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
