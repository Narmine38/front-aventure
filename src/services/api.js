import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.aventure-en-adra.fr/', // URL de base de votre API Laravel
    withCredentials: true // Important pour envoyer et recevoir des cookies
});

export default instance;
