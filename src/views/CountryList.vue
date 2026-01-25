<template>
  <v-row>
    <v-col>
      <v-chip label variant="text" prepend-icon="mdi-map-marker-outline">
        {{ $t('Common.CountryCount', { count: countryTotal }) }}
      </v-chip>
      <template v-if="!loading">
        <LoadedCountChip :loadedCount="countryList.length" :totalCount="countryTotal" />
      </template>
    </v-col>
  </v-row>

  <v-row class="mt-0">
    <v-col v-for="country in countryList" :key="country" cols="12" sm="6" md="4" xl="3">
      <CountryCard :country="country.name" :priceCount="country.price_count" :locationCount="country.location_count" height="100%" @click="goToCountry(country)" />
    </v-col>
  </v-row>

  <v-row v-if="loading">
    <v-col align="center">
      <v-progress-circular indeterminate :size="30" />
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import openPricesApi from '../services/openPricesApi'

export default {
  components: {
    LoadedCountChip: defineAsyncComponent(() => import('../components/LoadedCountChip.vue')),
    CountryCard: defineAsyncComponent(() => import('../components/CountryCard.vue')),
  },
  data() {
    return {
      // data
      countryList: [],
      countryTotal: null,
      loading: false,
    }
  },
  mounted() {
    this.initCountryList()
  },
  methods: {
    initCountryList() {
      this.countryList = []
      this.getCountries()
    },
    getCountries() {
      this.loading = true
      return openPricesApi.getCountries()
        .then((data) => {
          this.countryList = data  // all the countries are loaded at once
          this.countryTotal = data.length
          this.loading = false
        })
    },
    goToCountry(country) {
      this.$router.push(`/countries/${country.osm_name}`)
    }
  }
}
</script>
