<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-alert
        class="mb-2"
        type="info"
        variant="outlined"
      >
        <i18n-t keypath="Common.SignInOFFAccount" tag="span">
          <template #url>
            <OpenFoodFactsLink display="link" />
          </template>
        </i18n-t>
      </v-alert>

      <v-form @submit.prevent="signIn">
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="signinForm.username"
              :label="$t('SignIn.UsernameLabel')"
              type="text"
              class="input-lowercase"
              hide-details="auto"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="signinForm.password"
              :label="$t('SignIn.Password')"
              :append-inner-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="passwordVisible ? 'text' : 'password'"
              hide-details="auto"
              @click:append-inner="passwordVisible = !passwordVisible"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn
              type="submit"
              class="float-right"
              color="success"
              :loading="loading"
              :disabled="!formFilled"
            >
              {{ $t('SignIn.Button') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import api from '../services/api'

export default {
  components: {
    OpenFoodFactsLink: defineAsyncComponent(() => import('../components/OpenFoodFactsLink.vue')),
  },
  data() {
    return {
      signinForm: {
        username: '',
        password: '',
      },
      passwordVisible: false,
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
        .signIn(this.signinForm.username.toLowerCase().trim(), this.signinForm.password)
        .then((data) => {
          if (data['access_token']) {
            this.appStore.signIn(data['access_token'])
            this.done()
          } else {
            alert(this.$t('SignIn.WrongCredentials'))
            this.loading = false
          }
        })
        .catch((error) => {  // eslint-disable-line no-unused-vars
          alert(this.$t('SignIn.ServerError'))
          this.loading = false
        })
    },
    done() {
      this.$router.push({ path: '/dashboard', query: { signinSuccess: 'true' } })
    }
  },
};
</script>
