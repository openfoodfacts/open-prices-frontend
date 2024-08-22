<template>
  <v-row>
    <v-col cols="12" sm="6">
      <CountryCard :country="country" :city="countryCity" :locationCount="countryCityLocationTotal" />
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <h2 class="text-h6 d-inline mr-1">
        {{ $t('Common.TopLocations') }}
      </h2>
      <v-progress-circular v-if="loading" indeterminate :size="30" />
      <LoadedCountChip v-if="!loading" :loadedCount="countryCityLocationList.length" :totalCount="countryCityLocationTotal" />
    </v-col>
  </v-row>

  <v-row class="mt-0">
    <v-col v-for="location in countryCityLocationList" :key="location" cols="12" sm="6" md="4">
      <LocationCard :location="location" :hideLocationOSMID="true" height="100%" />
    </v-col>
  </v-row>

  <v-row v-if="countryCityLocationList.length < countryCityLocationTotal" class="mb-2">
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
      countryCity: null,  // see init
      countryCityLocationList: [],
      countryCityLocationTotal: null,
      countryCityLocationPage: 0,
      loading: false,
    }
  },
  computed: {
    getLocationsParams() {
      let defaultParams = { osm_address_country__like: this.country, osm_address_city__like: this.countryCity, order_by: `${this.currentOrder}`, page: this.countryCityLocationPage }
      return defaultParams
    },
  },
  watch: {
    $route (newCountryCity, oldCountryCity) {
      if (oldCountryCity && newCountryCity && newCountryCity.name == 'country-city-detail' && oldCountryCity.fullPath != newCountryCity.fullPath) {
        this.initCountryCity()
      }
    }
  },
  mounted() {
    this.initCountryCity()
  },
  methods: {
    initCountryCity() {
      this.country = this.$route.params.country
      this.countryCity = this.$route.params.city
      this.countryCityLocationList = []
      this.countryCityLocationTotal = null
      this.countryCityLocationPage = 0
      this.getCountryCityLocations()
    },
    getCountryCityLocations() {
      this.loading = true
      this.countryCityLocationPage += 1
      return api.getLocations(this.getLocationsParams)
        .then((data) => {
          this.countryCityLocationList.push(...data.items)
          this.countryCityLocationTotal = data.total
          this.loading = false
        })
    },
  }
}
</script>
