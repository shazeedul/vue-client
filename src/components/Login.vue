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
import { login } from '../services/authService.js'
export default {
  name: 'Login-Component',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async loginForm() {
      try {
        const data = await login(this.email, this.password)
        // setItem in localStorage
        localStorage.setItem('user', JSON.stringify(data.user))
        // setItem for token
        localStorage.setItem('token', data.token)
        this.$router.push('/')
      } catch (error) {
        console.error('Login error:', error)
      }
    }
  }
}
</script>
