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

      <div class="password-rules">
        <ul>
          <li v-if="!validations.minChar">Utilisez au moins 8 caractères</li>
          <li v-if="!validations.lowercase">Utilisez au moins 1 caractère minuscule</li>
          <li v-if="!validations.uppercase">Utilisez au moins 1 caractère majuscule</li>
          <li v-if="!validations.digit">Utilisez au moins 1 chiffre</li>
          <li v-if="!validations.specialChar">Utilisez au moins 1 caractère spécial</li>
        </ul>
      </div>

      <button type="submit">S'inscrire</button>

      <div class="login-prompt">
        <h4>Déjà un compte ?</h4>
        <button type="button" @click="redirectToLogin">Je me connecte</button>
      </div>
    </form>

    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
  </div>
</template>

<script setup>
import {computed, ref} from 'vue';
import { useAuthStore } from '/src/stores/authStore';
import router from "@/router"; // Import your auth store

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

const passwordRules = {
  minChar: /.{8,}/,
  lowercase: /[a-z]/,
  uppercase: /[A-Z]/,
  digit: /[0-9]/,
  specialChar: /[\^$*.\[\]{}()?\-"!@#%&/,><':;|_~`]/
};

const validations = computed(() => {
  return {
    minChar: passwordRules.minChar.test(user.value.password),
    lowercase: passwordRules.lowercase.test(user.value.password),
    uppercase: passwordRules.uppercase.test(user.value.password),
    digit: passwordRules.digit.test(user.value.password),
    specialChar: passwordRules.specialChar.test(user.value.password),
  };
});

const redirectToLogin = () => {
  router.push('/Login');
};
</script>




<style scoped>
.form-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
  background: #fff;
  border: 1px solid #eaeaea;
}

.form-container h2 {
  text-align: center;
  color: #333;
  margin-bottom: 1rem;
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

input[type=text],
input[type=email],
input[type=password] {
  width: 100%;
  padding: 10px;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
  transition: border-color 0.3s;
}

input[type=text]:focus,
input[type=email]:focus,
input[type=password]:focus {
  border-color: #3C54B4;
  outline: none;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #3C54B4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

button:hover,
button:focus {
  background-color: #2a3c8b;
  transform: translateY(-2px);
}

.login-prompt h4 {
  text-align: center;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #666;
}

.login-prompt button {
  background-color: #5cb85c; /* Different color to distinguish actions */
  margin-top: 1rem;
  /* Rest of the button styles */
}

.error {
  color: #d9534f;
  margin-top: 5px;
  margin-bottom: 15px;
  font-size: 0.9em;
}

.password-rules {
  margin-top: 10px;
  list-style-type: none;
  padding: 0;
}

.password-rules li {
  color: #d9534f;
  font-size: 0.85em;
}

/* Styles for responsive design */
@media (max-width: 992px) {
  .form-container {
    max-width: none; /* Allow the container to be wider on medium screens */
    width: 80%; /* Width based on viewport size */
  }
}

@media (max-width: 768px) {
  .form-container {
    width: 90%; /* Allow the container to fill more space on small screens */
    margin: 20px auto; /* Adjust margin for smaller screens */
  }

  label, input[type=text], input[type=email], input[type=password], button {
    font-size: 14px; /* Smaller font size for small screens */
  }

  input[type=text], input[type=email], input[type=password] {
    margin-bottom: 15px; /* Less space below inputs on small screens */
  }

  button {
    padding: 12px; /* Larger padding for easier clicking on touch devices */
  }
}

@media (max-width: 576px) {
  /* Adjustments for extra small screens */
  .form-container {
    width: 95%; /* Fill even more space for very small screens */
  }
}
</style>


