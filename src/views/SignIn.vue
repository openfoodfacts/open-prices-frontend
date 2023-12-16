<template>
  <h1 class="mb-1">Sign in</h1>

  <v-alert
    class="mb-2"
    type="info"
    variant="outlined"
  >Use your <a href="https://world.openfoodfacts.org" target="_blank">Open Food Facts</a> credentials to sign in.</v-alert>

  <v-form @submit.prevent="signIn">
    <v-text-field
      v-model="signinForm.username"
      label="Username"
      type="text"
    ></v-text-field>
    <v-text-field
      v-model="signinForm.password"
      label="Password"
      type="password"
    ></v-text-field>
    <v-btn
      type="submit"
      class="mt-2"
      :loading="loading"
      :disabled="!formFilled"
    >Sign in</v-btn>
  </v-form>
</template>

<script>
import api from '../services/api'

export default {
  data() {
    return {
      signinForm: {
        username: '',
        password: '',
      },
      loading: false,
    };
  },
  computed: {
    formFilled() {
      return Object.values(this.signinForm).every(x => !!x)
    }
  },
  methods: {
    signIn() {
      this.loading = true
      api
        .signIn(this.signinForm.username, this.signinForm.password)
        .then((data) => {
          if (data['access_token']) {
            api.setUsernameCookie(this.signinForm.username)
            api.setTokenCookie(data['access_token'])
            this.$router.push({ path: '/add', query: { signinSuccess: 'true' } })
          } else {
            alert('Error: wrong credentials')
            this.loading = false
          }
        })
        .catch((error) => {
          alert("Error: server error")
          this.loading = false
        });
    },
  },
};
</script>
