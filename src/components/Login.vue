<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="login">
        <input type="text" v-model="email" placeholder="Email" />
        <input type="password" v-model="password" placeholder="Password" />
        <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: "Login-Component",
    data() {
        return {
            email: "",
            password: ""
        };
    },
    methods: {
        ...mapActions(["performLogin"]),
        login() {
            this.performLogin({ email: this.email, password: this.password });
        }
    }
};
</script>
