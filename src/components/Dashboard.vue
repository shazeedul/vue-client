<template>
    <div>
        <h1>Dashboard</h1>
        <p v-if="user">Welcome, {{ user.name }}</p>
        <p v-else>You are not logged in.</p>
    </div>
</template>

<script>
import axios from 'axios';
// import { mapGetters } from "vuex";

export default {
    name: "Dashboard-Component",
    computed: {
        // ...mapGetters(["user"])
        // get userInformation from localStorage
        user() {
            // get userInformation from axios
            return axios.get(import.meta.env.VITE_BACKEND_URL+"/me", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    dataType: "json"
                }
            });

            // return JSON.parse(localStorage.getItem("user"));
        }
    }
};
</script>