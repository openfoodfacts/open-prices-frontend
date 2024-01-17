<template>
  <v-row>
    <v-col cols="12" sm="6">
      <v-card
        :title="getLocationTitle(location)"
        :subtitle="location ? location.osm_display_name : ''"
        :prepend-icon="location ? 'mdi-map-marker-outline' : 'mdi-map-marker-remove-variant'">
        <v-card-text>
          <v-chip label size="small" density="comfortable" class="mr-1">
            <v-icon start icon="mdi-tag-outline"></v-icon>
            {{ locationPriceTotal }} prices
          </v-chip>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <v-row class="mt-0" v-if="location">
    <v-col cols="12">
      <v-btn v-if="location.osm_id" size="small" append-icon="mdi-open-in-new" :href="getLocationOSMUrl(location)" target="_blank">
        OpenStreetMap
      </v-btn>
      <p v-if="!location.osm_id" class="text-red">
        <i>{{ $t('LocationDetail.LocationNotFound') }}</i>
      </p>
    </v-col>
  </v-row>

  <br />

  <h2 class="mb-1">
    {{ $t('LocationDetail.LatestPrices') }} <small>{{ locationPriceTotal }}</small>
    <v-progress-circular v-if="loading" indeterminate :size="30"></v-progress-circular>
  </h2>

  <v-row>
    <v-col cols="12" sm="6" md="4" v-for="price in locationPriceList" :key="price">
      <PriceCard :price="price" :product="price.product" :hidePriceLocation="true" elevation="1" height="100%"></PriceCard>
    </v-col>
  </v-row>

  <v-row v-if="locationPriceList.length < locationPriceTotal" class="mb-2">
    <v-col align="center">
      <v-btn size="small" :loading="loading" @click="getLocationPrices">{{ $t('LocationDetail.LoadMore') }}</v-btn>
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
      return api.getLocationById(this.$route.params.id)
        .then((data) => {
          if (data.id) {
            this.location = data
          }
        })
    },
    getLocationPrices() {
      this.loading = true
      this.locationPricePage += 1
      return api.getPrices({ location_id: this.$route.params.id, page: this.locationPricePage })
        .then((data) => {
          this.locationPriceList.push(...data.items)
          this.locationPriceTotal = data.total
          this.loading = false
        })
    },
    getLocationTitle(location) {
      if (location) {
        return utils.getLocationTitle(location, true, false, true, true)
      }
      return this.$route.params.id
    },
    getLocationOSMUrl(location) {
      return `https://www.openstreetmap.org/${location.osm_type.toLowerCase()}/${location.osm_id}`
    }
  }
}
</script>
