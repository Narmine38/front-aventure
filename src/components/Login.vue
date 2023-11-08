<template>
  <div class="login-container">
    <h2>Connectez-vous</h2>
    <h3>en utilisant votre e-mail</h3>
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
        <button type="submit">Connexion</button>
      </div>
      <div class="registration-prompt">
        <h4>Pas encore de compte ?</h4>
        <button type="button" @click="redirectToRegister">Je créé mon compte</button>
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
    await router.push('/');
  } catch (error) {
    errorMessage.value = "Erreur de connexion";
  }
};

const redirectToRegister = () => {
  router.push('/register');
};
</script>


<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1); /* Plus subtile shadow */
  background: #fff;
  border: 1px solid #eaeaea; /* Light border for some definition */
}

.login-container h2,
.login-container h3,
.registration-prompt h4 {
  text-align: center;
  color: #333;
}

.login-container h2 {
  margin-bottom: 0.5rem;
}

.login-container h3 {
  font-weight: normal;
  color: #777;
  margin-bottom: 1.5rem;
}

.registration-prompt h4 {
  margin-top: 2rem; /* More space before "Pas encore de compte?" */
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #666;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
  color: #555;
}

input[type=email],
input[type=password] {
  width: 100%;
  padding: 10px;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  transition: border-color 0.3s; /* Smooth transition for the border */
}

input[type=email]:focus,
input[type=password]:focus {
  border-color: #3C54B4; /* Highlight color when focused */
  outline: none; /* Remove default focus outline */
}

button {
  width: 100%;
  padding: 12px;
  background-color: #3C54B4; /* Button color */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s; /* Smooth color transition and transform */
}

button:hover,
button:focus {
  background-color: #2a3c8b; /* Darker color on hover */
  transform: translateY(-2px); /* Slight raise effect on hover */
}

@media (max-width: 992px) {
  .login-container {
    max-width: none;
    width: 80%;
    margin: 30px auto;
  }
}

@media (max-width: 768px) {
  .login-container {
    width: 90%;
    margin: 20px auto;
  }

  label, input[type=email], input[type=password], button {
    font-size: 14px; /* Adjust font size */
    padding: 8px; /* Adjust padding */
  }

  button {
    padding: 12px; /* Larger padding for better touch interaction */
  }
}

@media (max-width: 576px) {
  .login-container {
    width: 95%;
  }

  label {
    font-size: 1rem; /* Adjust label size for smaller devices */
  }
}
</style>



