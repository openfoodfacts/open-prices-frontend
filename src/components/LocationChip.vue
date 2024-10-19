<template>
  <v-chip label size="small" :prepend-icon="getLocationIcon" density="comfortable" :color="locationMissingAndShowError ? 'error' : 'default'" @click="goToLocation()">
    <span v-if="locationNotMissing">{{ getLocationTitle }}</span>
    <span v-if="locationEmoji" style="margin-inline-start:5px">{{ locationEmoji }}</span>
    <span v-else-if="locationMissingAndShowError">
      <i class="text-lowercase">{{ $t('Common.Location') }}</i>
      <v-tooltip activator="parent" open-on-click location="top">
        {{ $t('Common.LocationMissing') }}
      </v-tooltip>
    </span>
  </v-chip>
</template>

<script>
import utils from '../utils.js'

export default {
  props: {
    location: {
      type: Object,
      default: null
    },
    locationId: {
      type: Number,
      default: null
    },
    readonly: {
      type: Boolean,
      default: false
    },
    showErrorIfLocationMissing: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getLocationTitle() {
      if (this.location) {
        if (this.location.type === 'OSM') {
          return utils.getLocationTitle(this.location)
        } else if (this.location.type === 'ONLINE') {
          return this.location.website_url
        }
      }
      return this.locationId
    },
    getLocationIcon() {
      if (this.location) {
        if (this.location.type === 'OSM') {
          return 'mdi-map-marker-outline'
        } else if (this.location.type === 'ONLINE') {
          return 'mdi-web'
        }
      }
      return 'mdi-map-marker-remove-variant'
    },
    locationEmoji() {
      if (this.location) {
        if (this.location.type === 'OSM') {
          return utils.getCountryEmojiFromCode(this.location.osm_address_country_code)
        }
      }
      return null
    },
    locationNotMissing() {
      return this.location || this.locationId
    },
    locationMissingAndShowError() {
      return !this.locationNotMissing && this.showErrorIfLocationMissing
    }
  },
  methods: {
    goToLocation() {
      if (!this.locationId || this.readonly) {
        return
      }
      this.$router.push({ path: `/locations/${this.locationId}` })
    },
  }
}
</script>
