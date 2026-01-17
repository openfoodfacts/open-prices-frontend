<template>
  <v-row>
    <v-col cols="12" sm="6">
      <LocationCard v-if="location" :location="location" readonly />
    </v-col>
  </v-row>

  <v-row v-if="!loading && locationNotFound" class="mt-0">
    <v-col cols="12">
      <v-alert data-name="location-not-found-alert" type="error" variant="outlined" density="compact">
        {{ $t('Common.LocationNotFound') }}
      </v-alert>
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
import api from '../services/api'

export default {
  components: {
    LocationCard: defineAsyncComponent(() => import('../components/LocationCard.vue')),
  },
  data() {
    return {
      locationOsmType: this.$route.params.osmType,
      locationOsmId: this.$route.params.osmId,
      // data
      location: null,
      loading: false,
    }
  },
  computed: {
    locationNotFound() {
      return this.location === null || (this.location && !this.location.id)
    },
  },
  mounted() {
    this.getLocation()
  },
  methods: {
    getLocation() {
      return api.getLocationByOsmTypeAndId(this.locationOsmType, this.locationOsmId)
        .then((data) => {
          if (data.id) {
            this.$router.replace({ name: 'location-detail', params: { id: data.id } })
          } else {
            this.location = {
              osm_type: this.locationOsmType,
              osm_id: this.locationOsmId,
            }
          }
        })
    },
  }
}
</script>
