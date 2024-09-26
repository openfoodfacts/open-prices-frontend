<template>
  <h1 class="text-h5 mb-1">
    <i18n-t keypath="Home.Welcome.Title" tag="span">
      <template #name>
        {{ APP_NAME }}
      </template>
    </i18n-t>
  </h1>
  <p>{{ $t('Home.Welcome.Subtitle') }}</p>
  
  <br>

  <v-row>
    <v-col cols="12" sm="8" md="6" lg="4">
      <v-card
        :title="$t('Home.SearchProduct')"
        prepend-icon="mdi-magnify"
        height="100%"
        to="/search"
      />
    </v-col>
    <v-col cols="12" sm="8" md="6" lg="4">
      <v-card
        :title="$t('Home.LatestPrices')"
        prepend-icon="mdi-tag-multiple-outline"
        to="/prices"
      >
        <template v-if="!loading" #subtitle>
          <i18n-t keypath="Home.TodayPriceStat" :plural="todayPriceCount" tag="span">
            <template #todayPriceNumber>
              <span id="price-count">{{ todayPriceCount }}</span>
            </template>
          </i18n-t>
        </template>
      </v-card>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" sm="8" md="6" lg="4">
      <v-card
        :title="$t('Home.AddPrice')"
        prepend-icon="mdi-tag-plus-outline"
        color="primary"
        variant="outlined"
        elevation="1"
        to="/prices/add"
      >
        <template v-if="!username" #subtitle>
          <i18n-t keypath="Common.SignInOFFAccount" tag="span">
            <template #url>
              <OpenFoodFactsLink display="link" />
            </template>
          </i18n-t>
        </template>
      </v-card>
    </v-col>
  </v-row>

  <v-snackbar
    v-model="proofSingleSuccessMessage"
    color="success"
    :timeout="2000"
  >
    {{ $t('ProofCreate.Success') }}
  </v-snackbar>
  <v-snackbar
    v-model="settingsSuccessMessage"
    color="success"
    :timeout="2000"
  >
    {{ $t('Home.SettingsUpdated') }}
  </v-snackbar>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import api from '../services/api'
import constants from '../constants'
import utils from '../utils.js'

export default {
  components: {
    OpenFoodFactsLink: defineAsyncComponent(() => import('../components/OpenFoodFactsLink.vue')),
  },
  data() {
    return {
      APP_NAME: constants.APP_NAME,
      todayPriceCount: null,
      loading: false,
      // success messages
      proofSingleSuccessMessage: false,
      settingsSuccessMessage: false,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    username() {
      return this.appStore.user.username
    },
  },
  mounted() {
    if (this.$route.query.proofSingleSuccess === 'true') {
      this.proofSingleSuccessMessage = true
    }
    if (this.$route.query.settingsSuccess === 'true') {
      this.settingsSuccessMessage = true
    }
    this.getTodayPriceCount()
  },
  methods: {
    getTodayPriceCount() {
      this.loading = true
      return api.getPrices({ created__gte: utils.currentStartOfDay(), size: 1 })
        .then((data) => {
          this.todayPriceCount = data.total
          this.loading = false
        })
    },
  }
}
</script>
