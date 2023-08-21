import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL;

export async function login(email, password) {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data.token;
}
