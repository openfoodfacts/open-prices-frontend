<template>
  <v-row>
    <v-col cols="12" sm="6">
      <CountryCard :country="country" :locationCount="countryLocationTotal" />
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <h2 class="text-h6 d-inline mr-1">
        {{ $t('Common.TopLocations') }}
      </h2>
      <v-progress-circular v-if="loading" indeterminate :size="30" />
      <LoadedCountChip v-if="!loading" :loadedCount="countryLocationList.length" :totalCount="countryLocationTotal" />
    </v-col>
  </v-row>

  <v-row class="mt-0">
    <v-col v-for="location in countryLocationList" :key="location" cols="12" sm="6" md="4">
      <LocationCard :location="location" :hideLocationOSMID="true" :hideCountryCity="true" height="100%" />
    </v-col>
  </v-row>

  <v-row v-if="countryLocationList.length < countryLocationTotal" class="mb-2">
    <v-col align="center">
      <v-btn size="small" :loading="loading" @click="getCountryLocations">
        {{ $t('Common.LoadMore') }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import api from '../services/api'

export default {
  components: {
    CountryCard: defineAsyncComponent(() => import('../components/CountryCard.vue')),
    LoadedCountChip: defineAsyncComponent(() => import('../components/LoadedCountChip.vue')),
    LocationCard: defineAsyncComponent(() => import('../components/LocationCard.vue'))
  },
  data() {
    return {
      // filter & order
      currentOrder: '-price_count',
      // data
      country: null,  // see init
      countryLocationList: [],
      countryLocationTotal: null,
      countryLocationPage: 0,
      loading: false,
    }
  },
  computed: {
    getLocationsParams() {
      let defaultParams = { osm_address_country__like: this.country, order_by: `${this.currentOrder}`, page: this.countryLocationPage }
      return defaultParams
    },
  },
  watch: {
    $route (newCountry, oldCountry) {
      if (oldCountry && newCountry && newCountry.name == 'country-detail' && oldCountry.fullPath != newCountry.fullPath) {
        this.initCountry()
      }
    }
  },
  mounted() {
    this.initCountry()
  },
  methods: {
    initCountry() {
      this.country = this.$route.params.country
      this.countryLocationList = []
      this.countryLocationTotal = null
      this.countryLocationPage = 0
      this.getCountryLocations()
    },
    getCountryLocations() {
      this.loading = true
      this.countryLocationPage += 1
      return api.getLocations(this.getLocationsParams)
        .then((data) => {
          this.countryLocationList.push(...data.items)
          this.countryLocationTotal = data.total
          this.loading = false
        })
    },
  }
}
</script>
