<template>
  <h1 class="text-h5 mb-1">
    {{ $t('LocationList.Title') }}
    <v-progress-circular v-if="loading" indeterminate :size="30" />
  </h1>

  <v-row v-if="!loading">
    <v-col>
      <v-chip label variant="text" prepend-icon="mdi-map-marker-outline">
        {{ $t('LocationList.LocationTotal', { count: locationTotal }) }}
      </v-chip>
      <FilterMenu v-if="!loading" kind="location" :currentFilter="currentFilter" @update:currentFilter="toggleLocationFilter($event)" />
    </v-col>
  </v-row>

  <v-row class="mt-0">
    <v-col v-for="location in locationList" :key="location" cols="12" sm="6" md="4">
      <LocationCard :location="location" :hideLocationOSMID="true" :hideCountryCity="true" height="100%" />
    </v-col>
  </v-row>

  <v-row v-if="locationList.length < locationTotal" class="mb-2">
    <v-col align="center">
      <v-btn size="small" :loading="loading" @click="getLocations">
        {{ $t('Common.LoadMore') }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import constants from '../constants'
import api from '../services/api'

export default {
  components: {
    LocationCard: defineAsyncComponent(() => import('../components/LocationCard.vue')),
    FilterMenu: defineAsyncComponent(() => import('../components/FilterMenu.vue')),
  },
  data() {
    return {
      // data
      locationList: [],
      locationTotal: null,
      locationPage: 0,
      loading: false,
      // filter & order
      currentFilter: '',
    }
  },
  computed: {
    getLocationsParams() {
      let defaultParams = { order_by: '-price_count', page: this.locationPage }
      if (this.currentFilter && this.currentFilter === 'hide_price_count_gte_1') {
        defaultParams['price_count'] = 0
      }
      return defaultParams
    },
  },
  watch: {
    $route (newRoute, oldRoute) { // only called when query changes to avoid having an API call when the path changes
      if (oldRoute.path === newRoute.path && JSON.stringify(oldRoute.query) !== JSON.stringify(newRoute.query)) {
        this.initLocationList()
      }
    }
  },
  mounted() {
    this.currentFilter = this.$route.query[constants.FILTER_PARAM] || this.currentFilter
    this.initLocationList()
  },
  methods: {
    initLocationList() {
      this.locationList = []
      this.locationPage = 0
      this.getLocations()
    },
    getLocations() {
      this.loading = true
      this.locationPage += 1
      return api.getLocations(this.getLocationsParams)
        .then((data) => {
          this.locationList.push(...data.items)
          this.locationTotal = data.total
          this.loading = false
        })
    },
    toggleLocationFilter(filterKey) {
      this.currentFilter = this.currentFilter ? '' : filterKey
      this.$router.push({ query: { ...this.$route.query, [constants.FILTER_PARAM]: this.currentFilter } })
      // this.initLocationList() will be called in watch $route
    },
  }
}
</script>
