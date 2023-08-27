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
          <RouterLink class="nav-link" to="/form">My Form</RouterLink>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ms-auto">
            <!-- <RouterLink class="nav-link" to="/profile">Profile</RouterLink> -->
            <RouterLink v-if="!isAuthenticated" class="nav-link" to="/login">Login</RouterLink>
            <RouterLink v-if="!isAuthenticated" class="nav-link" to="/register">Register</RouterLink>
            <button v-if="isAuthenticated" class="nav-link" @click="logout">Logout</button>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters(['isAuthenticated']), // Map the isAuthenticated getter
  },
  methods: {
    ...mapActions(['performLogout']), // Map the logout action
    logout() {
      this.performLogout(); // Dispatch the Vuex logout action
      this.$router.push('/login'); // Redirect to login page after logout
    },
  },
};
</script>

