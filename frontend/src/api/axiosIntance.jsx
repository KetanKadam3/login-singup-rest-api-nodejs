// src/axiosInstance.js
import axios from 'axios';

export const axiosIntance = axios.create({
    baseURL: 'https://login-singup-rest-api-nodejs.onrender.com', // Replace with your API's base URL
    headers: { 'Content-Type': 'application/json' } // Optional: sets default headers
});
