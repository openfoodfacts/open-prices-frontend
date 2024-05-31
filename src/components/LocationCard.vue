<template>
  <v-card
    :title="getLocationTitle(location)"
    :subtitle="location ? location.osm_display_name : ''"
    :prepend-icon="location ? 'mdi-map-marker-outline' : 'mdi-map-marker-remove-variant'"
    @click="goToLocation(location)"
  >
    <v-card-text v-if="location">
      <PriceCountChip :count="location.price_count" :withLabel="true" />
      <v-chip label size="small" density="comfortable" class="mr-1" title="OpenStreetMap tag">
        {{ getLocationCategory(location) }}
      </v-chip>
      <v-chip v-if="showLocationOSMID" label size="small" density="comfortable" class="mr-1" title="OpenStreetMap ID">
        {{ getLocationOSMID(location) }}
      </v-chip>
    </v-card-text>
  </v-card>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import utils from '../utils.js'

export default {
  components: {
    PriceCountChip: defineAsyncComponent(() => import('../components/PriceCountChip.vue')),
  },
  props: {
    location: {
      type: [Object, null],
      required: true
    },
    hideLocationOSMID: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapStores(useAppStore),
    showLocationOSMID() {
      return !this.hideLocationOSMID && this.appStore.user.username && this.appStore.user.location_display_osm_id
    }
  },
  methods: {
    getLocationTitle(location) {
      if (location) {
        return utils.getLocationTitle(location, true, false, true, true)
      }
      return this.$route.params.id
    },
    getLocationCategory(location) {
      return utils.getLocationCategory(location)
    },
    getLocationOSMID(location) {
      return utils.getLocationOSMID(location)
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
