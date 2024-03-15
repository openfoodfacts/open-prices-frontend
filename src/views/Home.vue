<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
      <h1 class="text-h5 mb-1">
        <i18n-t keypath="Home.Welcome.Title" tag="span">
          <template #name>{{ APP_NAME }}</template>
        </i18n-t>
      </h1>
      <p>{{ $t('Home.Welcome.Subtitle') }}</p>

    </v-col>
  </v-row>
  <br /><br />
  <v-row align="center" justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-btn
          block
          height="52"
          variant="elevated"
          to="/search"
          prepend-icon="mdi-magnify">
        {{ $t('Home.SearchProduct') }}
      </v-btn>
    </v-col>
  </v-row>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card>
          <template v-slot:subtitle v-if="!username" >
            <i18n-t keypath="Common.SignInOFFAccount" tag="span">
              <template #url>
                <a href="https://world.openfoodfacts.org" target="_blank">Open Food Facts</a>
              </template>
            </i18n-t>
          </template>
        <v-btn
            block
            height="52"
            prepend-icon="mdi-plus"
            color="primary"
            variant="tonal"
            elevation="1"
            to="/add">
          {{$t('Home.AddPrice')}}
        </v-btn>
      </v-card>
    </v-col>
  </v-row>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card>
        <v-btn
            block
            height="52"
            variant="elevated"
            prepend-icon="mdi-tag-multiple-outline"
            to="/prices">
          {{$t('Home.LatestPrices')}}
        </v-btn>
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
