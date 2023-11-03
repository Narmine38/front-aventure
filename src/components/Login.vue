<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="login">
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
  <button @click="logout">Logout</button>
  <p v-if="message">{{ message }}</p>

</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const email = ref('');
const password = ref('');
const errorMessage = ref('');
const message = ref('');


const login = async () => {
  try {
    const response = await axios.post('https://api.aventure-en-adra.fr/api/login', {
      email: email.value,
      password: password.value,
    });

    console.log(response.data);
    // Stockez le jeton d'accès
    sessionStorage.setItem('token', response.data.access_token);

    // Stockez également les autres informations de l'utilisateur
    const { user, roles } = response.data;
    sessionStorage.setItem('user', JSON.stringify(user));
    sessionStorage.setItem('roles', JSON.stringify(roles));

    // Vous pouvez maintenant rediriger l'utilisateur où vous le souhaitez après une connexion réussie
    // par exemple, router.push('/');
  } catch (error) {
    if (error.response) {
      // Supposons que vous avez un ref errorMessage pour afficher les erreurs de connexion
      errorMessage.value = error.response.data.message || 'Invalid credentials.';
    } else {
      errorMessage.value = 'The login process could not be completed.';
    }
  }
};


const logout = async () => {
  try {
    const response = await axios.post('https://api.aventure-en-adra.fr/api/logout', {}, {
      headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
      }
    });
    message.value = response.data.message;
    sessionStorage.removeItem('token');
    // Rediriger l'utilisateur ou mettre à jour l'état de l'application après la déconnexion
  } catch (error) {
    message.value = 'Failed to logout.';
    console.error('Logout error:', error);
  }
};
</script>

<style scoped>
.login-container {
  /* Same styling as Register.vue */
  /* ... */
}
</style>
