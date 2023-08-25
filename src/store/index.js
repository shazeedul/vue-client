import { createStore } from 'vuex';
import { login, logout, register } from '../services/authService.js'; // Import your login service

export default createStore({
  state: {
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
      localStorage.setItem('token', token);
    },
    setUser(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    clearState(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
  actions: {
    async performLogin({ commit }, { email, password }) {
      try {
        const data = await login(email, password);
        commit('setToken', data.token);
        commit('setUser', data.user);
      } catch (error) {
        console.error('Login error:', error);
        throw error; // Rethrow the error for the component to handle
      }
    },
    async performRegister({ commit }, { username, email, password }) {
      try {
        const data = await register(username, email, password);
        commit('setToken', data.token);
        commit('setUser', data.user);
      } catch (error) {
        console.error('Register error:', error);
        throw error; // Rethrow the error for the component to handle
      }
    },
    performLogout({ commit }) {
      logout();
      commit('clearState');
    },
  },
  getters: {
    isAuthenticated: state => !!state.token,
    user: state => state.user,
  },
});

