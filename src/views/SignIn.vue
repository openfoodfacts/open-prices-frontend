<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-row v-if="keycloak">
        <v-col>
          <v-btn
            type="button"
            class="float-left"
            color="primary"
            @click="keycloak.login()"
          >
            {{ $t('SignIn.SignInWithOpenFoodFactsAuth') }}
          </v-btn>
        </v-col>
      </v-row>
      <v-form @submit.prevent="signIn">
        <v-row>
          <v-col>
            <v-alert
              color="primary"
              variant="outlined"
              density="compact"
              icon="mdi-information"
            >
              <i18n-t keypath="Common.SignInOFFAccount" tag="span">
                <template #url>
                  <OpenFoodFactsLink display="link" />
                </template>
              </i18n-t>
            </v-alert>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="signinForm.username"
              :label="$t('SignIn.UsernameLabel')"
              type="text"
              class="input-lowercase"
              autocomplete="username"
              hide-details="auto"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="signinForm.password"
              :label="$t('SignIn.Password')"
              :append-inner-icon="passwordVisible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="passwordVisible ? 'text' : 'password'"
              autocomplete="current-password"
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
              color="primary"
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
import openPricesApi from '../services/openPricesApi'
import keycloakService from '../services/keycloakService'

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
      keycloak: null,
    };
  },
  computed: {
    ...mapStores(useAppStore),
    formFilled() {
      return Object.values(this.signinForm).every(x => !!x)
    }
  },
  mounted() {
    keycloakService.init((keycloak) => {
      if (keycloak !== null) {
        this.keycloak = keycloak
        if (keycloak.authenticated) {
          this.signInWithKeycloak(keycloak.token)
        }
      }
    })
  },
  methods: {
    handleAuthResponse(data) {
      this.loading = false
      if (data['access_token']) {
        this.appStore.signIn(data)
        this.done()
      } else {
        alert(this.$t('SignIn.WrongCredentials'))
      }
    },
    handleAuthError(error) {
      alert(this.$t('Common.ServerError'))
      console.log(error)
      this.loading = false
    },
    signIn() {
      this.loading = true
      openPricesApi
        .signIn(this.signinForm.username.toLowerCase().trim(), this.signinForm.password)
        .then(this.handleAuthResponse)
        .catch(this.handleAuthError)
    },
    signInWithKeycloak(access_token) {
      this.loading = true
      openPricesApi
        .signInWithKeycloak(access_token)
        .then(this.handleAuthResponse)
        .catch(this.handleAuthError)
    },
    done() {
      const path = this.$route.query.next || '/dashboard'
      this.$router.push({ path: path, query: { signinSuccess: 'true' } })
    }
  },
};
</script>
