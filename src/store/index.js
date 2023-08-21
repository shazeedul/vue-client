import { createStore } from 'vuex';

export default createStore({
  state: {
    token: null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    performLogin({ commit }, token) {
      commit('setToken', token);
    },
    logout({ commit }) {
      commit('setToken', null);
    },
  },
  getters: {
    isAuthenticated: state => !!state.token,
  },
});
