import { createStore } from 'vuex';

export default createStore({
  state: {
    token: null,
    user: null,
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    performLogin({ commit }, data) {
      commit('setToken', data.token);
      commit('setUser', data.user);
    },
    logout({ commit }) {
      commit('setToken', null);
    },
  },
  getters: {
    isAuthenticated: state => !!state.token,
    user: state => state.user,

  },
});
