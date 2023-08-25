<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';
</script>

<template>
  <NavBar/>
  <b-container  class="bv-example-row">

    <RouterView />
  </b-container>
</template>

<style scoped>

</style>
