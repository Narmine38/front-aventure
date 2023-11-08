import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.aventure-en-adra.fr',
    withCredentials: true
});
export default api;





