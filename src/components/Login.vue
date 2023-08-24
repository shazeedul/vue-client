<template>
  <div>
    <b-form @submit.prevent="loginForm">
      <h1>Login</h1>
      <label for="text-email">Email</label>
      <input type="text" v-model="email" placeholder="Email" />
      <label for="text-password">Password</label>
      <input type="password" v-model="password" placeholder="Password" />
      <button type="submit">Login</button>
    </b-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions(['performLogin']), // Map the login action from Vuex
    async loginForm() {
      try {
        await this.performLogin({ email: this.email, password: this.password });
        
        // Redirect to home page after successful login
        this.$router.push('/');
      } catch (error) {
        console.error('Login error:', error);
      }
    },
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
};
</script>

