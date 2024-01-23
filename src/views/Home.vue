<template>
  <h1 class="mb-1">{{ $t('Home.Welcome.Title') }}</h1>
  <p>{{ $t('Home.Welcome.Subtitle') }}</p>
  <br />
  <v-btn class="mb-2" prepend-icon="mdi-magnify" to="/search">{{ $t('Home.SearchProduct') }}</v-btn>
  <br />
  <v-btn color="primary" prepend-icon="mdi-plus" to="/add">{{ $t('Home.AddPrice') }}</v-btn>

  <br />
  <br />

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

  <v-snackbar
    v-model="settingsSuccessMessage"
    color="success"
    :timeout="2000"
  >{{ $t('Home.SettingsUpdated') }}</v-snackbar>
</template>

<script>
import utils from '../utils.js'
import api from '../services/api'

export default {
  data() {
    return {
      settingsSuccessMessage: false,
      todayPriceCount: null,
      loading: false
    }
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
      return api.getPrices({ date: utils.currentDate(), size: 1 })
        .then((data) => {
          this.todayPriceCount = data.total
          this.loading = false
        })
    },
  }
}
</script>
