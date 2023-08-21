<template>
    <div>
        <h1>Register</h1>
        <form @submit.prevent="register">
        <input type="text" v-model="username" placeholder="Username" />
        <input type="email" v-model="email" placeholder="Email" />
        <input type="password" v-model="password" placeholder="Password" />
        <button type="submit">Register</button>
        </form>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    name: "Register-Component",
    data() {
        return {
            username: "",
            email: "",
            password: ""
        };
    },
    methods: {
        ...mapActions(["register"]),
        register() {
            this.register({ username: this.username, email: this.email, password: this.password });
        }
    }
};
</script>