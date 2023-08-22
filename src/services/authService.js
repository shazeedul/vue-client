import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL;

export async function login(email, password) {
  // use try/catch to handle errors
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(error.response.data.message);
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('The server did not respond. Are you sure you have an internet connection?');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(`Error ${error.message}`);
    }
  }
}
