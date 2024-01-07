<template>
  <v-row>
    <v-col cols="12" sm="6">
      <v-card
        :title="getLocationTitle(location)"
        :subtitle="location ? location.osm_display_name : ''"
        :prepend-icon="location ? 'mdi-map-marker-outline' : 'mdi-map-marker-remove-variant'">
      </v-card>
    </v-col>
  </v-row>

  <v-row class="mt-0">
    <v-col cols="12" sm="6">
      <v-btn size="small" append-icon="mdi-open-in-new" :href="getLocationOSMUrl()" target="_blank">
        OpenStreetMap
      </v-btn>
    </v-col>
  </v-row>

  <v-row class="mt-0">
    <v-col cols="12" sm="6">
      <p v-if="!location" class="text-red">
        <i>Location not found in our database...</i>
      </p>
    </v-col>
  </v-row>

  <br />

  <h2 class="mb-1">
    Latest prices
    <small>{{ locationPriceTotal }}</small>
    <v-progress-circular v-if="loading" indeterminate :size="30"></v-progress-circular>
  </h2>

  <v-row>
    <v-col cols="12" sm="6" md="4" v-for="price in locationPriceList" :key="price">
      <PriceCard :price="price" :product="price.product" :hidePriceLocation="true" elevation="1" height="100%"></PriceCard>
    </v-col>
  </v-row>

  <v-row v-if="locationPriceList.length < locationPriceTotal" class="mb-2">
    <v-col align="center">
      <v-btn size="small" @click="getLocationPrices">Load more</v-btn>
    </v-col>
  </v-row>
</template>

<script>
import api from '../services/api'
import utils from '../utils.js'
import PriceCard from '../components/PriceCard.vue'

export default {
  components: {
    PriceCard,
  },
  data() {
    return {
      location: null,
      locationPriceList: [],
      locationPriceTotal: null,
      locationPricePage: 0,
      loading: false,
    }
  },
  mounted() {
    this.getLocation(),
    this.getLocationPrices()
  },
  methods: {
    getLocation() {
      return api.getLocationByOSMTypeAndId(this.$route.params.osmtype, this.$route.params.osmid)
        .then((data) => {
          if (data.id) {
            this.location = data
          }
        })
    },
    getLocationPrices() {
      this.loading = true
      this.locationPricePage += 1
      return api.getPrices({ location_osm_type: this.$route.params.osmtype.toUpperCase(), location_osm_id: this.$route.params.osmid, page: this.locationPricePage })
        .then((data) => {
          this.locationPriceList.push(...data.items)
          this.locationPriceTotal = data.total
          this.loading = false
        })
    },
    getLocationTitle(location) {
      if (location) {
        return utils.getLocationTitle(location, true)
      }
      return `${this.$route.params.osmtype} ${this.$route.params.osmid}`
    },
    getLocationOSMUrl() {
      if (this.location) {
        return `https://www.openstreetmap.org/${this.location.osm_type.toLowerCase()}/${this.location.osm_id}`
      }
      return `https://www.openstreetmap.org/${this.$route.params.osmtype.toLowerCase()}/${this.$route.params.osmid}`
    }
  }
}
</script>
