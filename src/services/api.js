import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.aventure-en-adra.fr', // URL de base de votre API Laravel
    withCredentials: true // Important pour envoyer et recevoir des cookies
});

// Fonction pour définir l'en-tête d'autorisation.
function setAuthorizationHeader() {
    const token = sessionStorage.getItem('auth_token');
    if (token) {
        api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
    }
}

// Vous pouvez aussi choisir de définir l'en-tête immédiatement si le token existe déjà
setAuthorizationHeader();

export default api;





