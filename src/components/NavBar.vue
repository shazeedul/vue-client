<script setup>
import { RouterLink } from 'vue-router';
</script>


<template>
  <div>
    <b-navbar class="p-3" toggleable="lg" type="dark" variant="dark">
      <RouterLink class="navbar-brand" to="/">NavBar</RouterLink>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <RouterLink class="nav-link" to="/">Dashboard</RouterLink>
          <RouterLink class="nav-link" to="/about">About</RouterLink>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ms-auto">
                <!-- <RouterLink class="nav-link" to="/profile">Profile</RouterLink> -->
            <RouterLink class="nav-link" to="/login">Login</RouterLink>
            <RouterLink class="nav-link" to="/register">Register</RouterLink>
            <button class="nav-link" @click="logout">Logout</button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
    name: 'NavBar-Component',
    methods: {
        logout() {
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            this.$router.push('/login')
        },
    },
}
</script>

