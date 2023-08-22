<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="loginForm">
        <input type="text" v-model="email" placeholder="Email" />
        <input type="password" v-model="password" placeholder="Password" />
        <button type="submit">Login</button>
        </form>
    </div>
</template>

<script>
import {login} from "../services/authService.js"
export default {
    name: "Login-Component",
    data() {
        return {
            email: "",
            password: ""
        };
    },
    methods: {
        async loginForm() {
            try {
                const data = await login(this.email, this.password);
                // setItem in localStorage
                localStorage.setItem("user", JSON.stringify(data.user));
                // setItem for token
                localStorage.setItem("token", data.token);
                this.$router.push("/dashboard");
            } catch (error) {
                console.error("Login error:", error);
            }
        }
    }
};
</script>
