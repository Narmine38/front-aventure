<template>
  <div class="form-container">
    <h2>Inscription</h2>

    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Nom:</label>
        <input type="text" id="name" v-model="user.name" required />
        <div class="error" v-if="errors.name">{{ errors.name[0] }}</div>
      </div>

      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="user.email" required />
        <div class="error" v-if="errors.email">{{ errors.email[0] }}</div>
      </div>

      <div>
        <label for="password">Mot de passe:</label>
        <input type="password" id="password" v-model="user.password" required />
        <div class="error" v-if="errors.password">{{ errors.password[0] }}</div>
      </div>

      <button type="submit">S'inscrire</button>
    </form>

    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useAuthStore } from '/src/stores/authStore'; // Import your auth store

const user = ref({
  name: '',
  email: '',
  password: '',
});
const errors = ref({});
const errorMessage = ref('');

const authStore = useAuthStore(); // Use the auth store

const submitForm = async () => {
  try {
    await authStore.register(user.value); // Use the register action from the auth store
    errorMessage.value = ''; // Reset the error message if successful
  } catch (error) {
    // If the action throws, handle the error here
    if (error.response && error.response.data.errors) {
      errors.value = error.response.data.errors;
    } else {
      errorMessage.value = "Une erreur inattendue s'est produite. Veuillez réessayer plus tard.";
    }
  }
};
</script>




<style scoped>
/* Container style for both login and register */
.form-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  background: #fff;
}

.form-container h2 {
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

input[type=text],
input[type=email],
input[type=password] {
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
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

.error {
  color: #d9534f;
  margin-top: 5px;
  margin-bottom: 15px;
  font-size: 0.9em;
}

/* Reuse this button style for both login and register */
button[type=submit] {
  margin-bottom: 10px;
}
</style>

