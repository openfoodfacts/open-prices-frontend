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
    </v-col>
  </v-row>

  <v-row class="mt-0">
    <v-col v-for="location in locationList" :key="location" cols="12" sm="6" md="4">
      <LocationCard :location="location" :hideLocationOSMID="true" height="100%" />
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
import api from '../services/api'

export default {
  components: {
    LocationCard: defineAsyncComponent(() => import('../components/LocationCard.vue')),
  },
  data() {
    return {
      // data
      locationList: [],
      locationTotal: null,
      locationPage: 0,
      loading: false,
    }
  },
  computed: {},
  mounted() {
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
      return api.getLocations({ order_by: '-price_count', page: this.locationPage })
        .then((data) => {
          this.locationList.push(...data.items)
          this.locationTotal = data.total
          this.loading = false
        })
    },
  }
}
</script>
