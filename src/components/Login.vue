<template>
  <div class="container mt-5">
      <div class="row d-flex justify-content-center">
          <div class="col-md-6">
              <div class="card px-5 py-5" id="form1">
                <b-form @submit.prevent="loginForm" @reset="onReset" v-if="show">
                  <h1>Login</h1>
                    <div class="forms-inputs mb-4"> <span>Email or username</span>
                      <b-form-input
                        id="input-1"
                        v-model="email"
                        type="email"
                        placeholder="Enter email"
                        required
                      ></b-form-input>
                    </div>
                    <div class="forms-inputs mb-4"> <span>Password</span>
                      <b-form-input
                        id="input-2"
                        v-model="password"
                        type="password"
                        placeholder="Enter password"
                        required
                      ></b-form-input>
                    </div>
                    <b-button type="reset" class="mx-2" variant="danger">Reset</b-button>
                    <b-button type="submit" variant="primary">Login</b-button>
                </b-form>
              </div>
            </div>
        </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions(['performLogin']), // Map the login action from Vuex
    async loginForm() {
      try {
        await this.performLogin({ email: this.email, password: this.password });
        
        // Redirect to home page after successful login
        this.$router.push('/');
      } catch (error) {
        console.error('Login error:', error);
      }
    },
    onReset(event) {
      event.preventDefault()
      // Reset our form values
      this.email = ''
      this.password = ''
      // Trick to reset/clear native browser form validation state
      this.show = false
      this.$nextTick(() => {
        this.show = true
      })
    }
  },
  data() {
    return {
      email: '',
      password: '',
      show: true,
    };
  },
};
</script>

