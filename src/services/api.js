import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api', // Ganti dengan URL backend Anda
  headers: {
    'Content-Type': 'application/json',
  },
});

// Contoh endpoint untuk login
api.post('/login', async (credentials) => {
  const response = await axios.post('/login', credentials);
  return response.data;
});

// Contoh endpoint untuk register
api.post('/register', async (credentials) => {
  const response = await axios.post('/register', credentials);
  return response.data;
});

export default api;
