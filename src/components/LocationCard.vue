<template>
  <v-card
    :title="getLocationTitle(location)"
    :subtitle="location ? location.osm_display_name : ''"
    :prepend-icon="location ? 'mdi-map-marker-outline' : 'mdi-map-marker-remove-variant'"
    @click="goToLocation(location)">
    <v-card-text v-if="location">
      <PriceCountChip :count="location.price_count" :withLabel="true"></PriceCountChip>
    </v-card-text>
  </v-card>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import utils from '../utils.js'

export default {
  components: {
    'PriceCountChip': defineAsyncComponent(() => import('../components/PriceCountChip.vue')),
  },
  props: {
    location: {
      type: Object,
      required: true
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getLocationTitle(location) {
      if (location) {
        return utils.getLocationTitle(location, true, false, true, true)
      }
      return this.$route.params.id
    },
    goToLocation(location) {
      if (this.readonly) {
        return
      }
      this.$router.push({ path: `/locations/${location.id}` })
    },
  }
}
</script>
