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
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '/src/stores/authStore'; // Importez votre store Pinia

const authStore = useAuthStore(); // Utilisez votre store Pinia

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const message = ref('');

// Fonction pour gérer la connexion
const handleLogin = async () => {
  try {
    await authStore.login(email.value, password.value);
    message.value = "Logged in successfully!";
    // Rediriger l'utilisateur ou mettre à jour l'état de l'application après la connexion
    // par exemple, router.push('/');
  } catch (error) {
    errorMessage.value = error.message || 'Failed to login.';
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

