<template>
    <div>
        <h1>Dashboard</h1>
        <p v-if="userLoaded && user">Welcome, {{ user.name }}</p>
        <p v-else>Loading user data...</p>
    </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from "vuex";

export default {
    name: "Dashboard-Component",
    data() {
        return {
            user: null,
            userLoaded: false
        };
    },
    methods: {
        ...mapActions(['performLogout']),
    },
    async created() {
        try {
            const APP_URL = import.meta.env.VITE_BACKEND_URL;
            const response = await axios.get(`${APP_URL}/user`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    dataType: "json"
                }
            });
            this.user = response.data.user; // Assuming the user data is in the response's data property
            this.userLoaded = true;
        } catch (error) {
            // if token invalid then
            this.performLogout();
        }
    }
};
</script>