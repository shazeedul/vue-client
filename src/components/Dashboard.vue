<template>
    <div>
        <h1>Dashboard</h1>
        <p v-if="user">Welcome, {{ user.name }}</p>
        <p v-else>You are not logged in.</p>
    </div>
</template>

<script>
// import { mapGetters } from "vuex";
export default {
    name: "Dashboard-Component",
    computed: {
        // ...mapGetters(["user"])
    }
};
</script>