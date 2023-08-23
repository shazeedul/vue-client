<template>
    <div>
        <h1>Dashboard</h1>
        <p v-if="userLoaded && user">Welcome, {{ user.name }}</p>
        <p v-else>Loading user data...</p>
    </div>
</template>

<script>
import axios from 'axios';
// import { mapGetters } from "vuex";

export default {
    name: "Dashboard-Component",
    data() {
        return {
        user: null,
        userLoaded: false
        };
    },
    async created() {
        try {
        const response = await axios.get(
            import.meta.env.VITE_BACKEND_URL + "/me",
            {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                dataType: "json"
            }
            }
        );
        this.user = response.data; // Assuming the user data is in the response's data property
        this.userLoaded = true;
        } catch (error) {
        console.error("Error fetching user data:", error);
        }
    }
};
</script>