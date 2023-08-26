<template>
  <div class="container mt-5">
      <div class="row d-flex justify-content-center">
          <div class="col-md-6">
              <div class="card px-5 py-5" id="form1">
                    <b-form @submit.prevent="registerForm" @reset="onReset" v-if="show">
                    <h1>Register</h1>
                    <div class="forms-inputs mb-4">
                        <span>Username</span>
                        <b-form-input class=""
                          id="input-1"
                          v-model="username"
                          type="text"
                          placeholder="Enter Username"
                          required
                          ></b-form-input>
                    </div>
                    <div class="forms-inputs mb-4">
                        <span>Email</span>
                        <b-form-input class=""
                          id="input-2"
                          v-model="email"
                          type="email"
                          placeholder="Enter Email"
                          required
                          ></b-form-input>
                    </div>
                    <div class="forms-inputs mb-4">
                        <span>Password</span>
                        <b-form-input class=""
                          id="input-3"
                          v-model="password"
                          type="password"
                          placeholder="Enter Password"
                          required
                          ></b-form-input>
                    </div>
                        <b-button type="reset" class="mx-2" variant="danger">Reset</b-button>
                        <b-button type="submit" variant="primary">Register</b-button>
                    </b-form>
                </div>
            </div>
        </div>
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
            password: "",
            show: true,
        };
    },
    methods: {
        ...mapActions(["performRegister"]),
        async registerForm() {
            try {
                await this.performRegister({ username: this.username, email: this.email, password: this.password });
              
                // Redirect to home page after successful login
                this.$router.push('/');
            } catch(error) {
            console.error('Registration error:', error);
        }
        },
        onReset(event) {
            event.preventDefault()
            // Reset our form values
            this.email = ''
            this.username = ''
            this.password = ''
            // Trick to reset/clear native browser form validation state
            this.show = false
            this.$nextTick(() => {
                this.show = true
            })
        }
    }
};
</script>