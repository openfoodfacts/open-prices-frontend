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

  <v-row class="mt-0" v-if="location">
    <v-col cols="12" sm="6" v-if="location.osm_id">
      <v-btn size="small" append-icon="mdi-open-in-new" :href="getLocationOSMUrl(location)" target="_blank">
        OpenStreetMap
      </v-btn>
      <p v-if="!location.osm_id" class="text-red">
        <i>Location not found in OpenStreetMap... Don't hesitate to add it :)</i>
      </p>
    </v-col>
  </v-row>

  <br />

  <h2 class="mb-1">
    Latest prices
    <small>{{ locationPriceCount }}</small>
    <v-progress-circular v-if="loading" indeterminate :size="30"></v-progress-circular>
  </h2>

  <v-row>
    <v-col cols="12" sm="6" md="4" v-for="price in locationPriceList" :key="price">
      <PriceCard :price="price" :product="price.product" :hidePriceLocation="true" elevation="1" height="100%"></PriceCard>
    </v-col>
  </v-row>
</template>

<script>
import api from '../services/api'
import PriceCard from '../components/PriceCard.vue'

export default {
  components: {
    PriceCard,
  },
  data() {
    return {
      location: null,
      locationPriceList: [],
      locationPriceCount: null,
      loading: false,
    }
  },
  mounted() {
    this.getLocation(),
    this.getLocationPrices()
  },
  methods: {
    getLocation() {
      this.loading = true
      return api.getLocationById(this.$route.params.id)
        .then((data) => {
          if (data.id) {
            this.location = data
            this.loading = false
          }
        })
    },
    getLocationPrices() {
      this.loading = true
      return api.getPrices({ location_id: this.$route.params.id, order_by: '-created' })
        .then((data) => {
          this.locationPriceList = data.items
          this.locationPriceCount = data.total
          this.loading = false
        })
    },
    getLocationTitle(location) {
      if (location) {
        return `${location.osm_name}, ${location.osm_address_city}`
      }
      return this.$route.params.id
    },
    getLocationOSMUrl(location) {
      return `https://www.openstreetmap.org/${location.osm_type.toLowerCase()}/${location.osm_id}`
    }
  }
}
</script>
