<template>
  <h1 class="mb-1">
    <i18n-t keypath="Home.Welcome.Title" tag="span">
      <template #name>{{ APP_NAME }}</template>
    </i18n-t>
  </h1>
  <p>{{ $t('Home.Welcome.Subtitle') }}</p>
  
  <br />

  <v-row>
    <v-col cols="12" sm="6" lg="4">
      <v-card
        :title="$t('Home.SearchProduct')"
        prepend-icon="mdi-magnify"
        height="100%"
        to="/search">
      </v-card>
    </v-col>
    <v-col cols="12" sm="6" lg="4">
      <v-card
        :title="$t('Home.AddPrice')"
        prepend-icon="mdi-plus"
        color="primary"
        variant="outlined"
        elevation="1"
        to="/add">
        <template v-slot:subtitle v-if="!username">
          <i18n-t keypath="Common.SignInOFFAccount" tag="span">
            <template #url>
              <a :href="OFF_URL" target="_blank">{{ OFF_NAME }}</a>
            </template>
          </i18n-t>
        </template>
      </v-card>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" sm="6" lg="4">
      <v-card
        :title="$t('Home.LatestPrices')"
        prepend-icon="mdi-tag-multiple-outline"
        to="/prices">
        <template v-slot:subtitle v-if="!loading">
          <i18n-t keypath="Home.TodayPriceStat" :plural="todayPriceCount" tag="span">
            <template v-slot:todayPriceNumber>
              <span>{{ todayPriceCount }}</span>
            </template>
          </i18n-t>
        </template>
      </v-card>
    </v-col>
  </v-row>

  <v-snackbar
    v-model="settingsSuccessMessage"
    color="success"
    :timeout="2000"
  >{{ $t('Home.SettingsUpdated') }}</v-snackbar>
</template>

<script>
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import constants from '../constants'
import utils from '../utils.js'
import api from '../services/api'

export default {
  data() {
    return {
      APP_NAME: constants.APP_NAME,
      OFF_NAME: constants.OFF_NAME,
      OFF_URL: constants.OFF_URL,
      settingsSuccessMessage: false,
      todayPriceCount: null,
      loading: false
    }
  },
  computed: {
    ...mapStores(useAppStore),
    username() {
      return this.appStore.user.username
    },
  },
  mounted() {
    if (this.$route.query.settingsSuccess === 'true') {
      this.settingsSuccessMessage = true
    }
    this.getTodayPriceCount()
  },
  methods: {
    getTodayPriceCount() {
      this.loading = true
      return api.getPrices({ created__gte: utils.currentStartOfDay(), size: 2 })
        .then((data) => {
          this.todayPriceCount = data.total
          this.loading = false
        })
    },
  }
}
</script>
