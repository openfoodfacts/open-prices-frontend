<template>
  <h1 class="mb-1">{{ $t('SignIn.Title') }}</h1>

  <v-alert
    class="mb-2"
    type="info"
    variant="outlined"
  >
    <i18n-t keypath="SignIn.UseOFFCredentials.Text" tag="span">
      <template #url>
        <a href="https://world.openfoodfacts.org" target="_blank">Open Food Facts</a>
      </template>
    </i18n-t>
  </v-alert>
  <v-form @submit.prevent="signIn">
    <v-text-field
      v-model="signinForm.username"
      :label="$t('SignIn.UsernameLabel')"
      type="text"
    ></v-text-field>
    <v-text-field
      v-model="signinForm.password"
      :label="$t('SignIn.Password')"
      type="password"
    ></v-text-field>
    <v-btn
      type="submit"
      class="mt-2"
      :loading="loading"
      :disabled="!formFilled"
    >{{ $t('SignIn.Button') }}</v-btn>
  </v-form>
</template>

<script>
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
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
    ...mapStores(useAppStore),
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
            this.appStore.signIn(this.signinForm.username, data['access_token'])
            this.$router.push({ path: '/add', query: { signinSuccess: 'true' } })
          } else {
            alert(this.$t('SignIn.WrongCredentials'))
            this.loading = false
          }
        })
        .catch((error) => {
          alert(this.$t('SignIn.ServerError'))
          this.loading = false
        });
    },
  },
};
</script>
