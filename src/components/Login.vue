<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="email">Email:</label>
        <input id="email" type="email" v-model="email" required>
      </div>
      <div>
        <label for="password">Password:</label>
        <input id="password" type="password" v-model="password" required>
      </div>
      <div>
        <button type="submit">Login</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '/src/stores/authStore';
import router from "@/router";

const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const errorMessage = ref('');


const handleLogin = async () => {
  try {
    await authStore.login(email.value, password.value);
    // Rediriger l'utilisateur vers la page d'accueil après la connexion réussie
    router.push('/');
  } catch (error) {
    // Si la logique de gestion des erreurs est déjà dans le store, vous n'avez pas besoin de la catcher ici.
    // Vous pouvez simplement utiliser une computed property pour réagir aux changements d'état du store.
    errorMessage.value = "Erreur de connexion"; // Message d'erreur générique
  }
};
</script>


<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  background: #fff;
}

.login-container h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  margin-bottom: 5px;
  color: #555;
}

input[type=email],
input[type=password] {
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box; /* Add this to include padding in input width */
}

button {
  padding: 10px;
  background-color: #5cb85c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #4cae4c;
}

p {
  color: #d9534f;
  text-align: center;
}

/* Si vous avez d'autres boutons, donnez-leur un style différent */
button[type=submit] {
  margin-bottom: 10px;
}

/* Un petit style pour le bouton de déconnexion */
button.logout-button {
  background-color: #f0ad4e;
  margin-top: 10px;
}

button.logout-button:hover {
  background-color: #ec971f;
}
</style>

