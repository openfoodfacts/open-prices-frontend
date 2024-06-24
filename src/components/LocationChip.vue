<template>
  <v-chip label size="small" prepend-icon="mdi-map-marker-outline" density="comfortable" :color="locationMissingAndShowError ? 'error' : 'default'" @click="goToLocation()">
    <span v-if="locationNotMissing">{{ locationTitle }}</span>
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
    locationTitle() {
      if (this.location) {
        return utils.getLocationTitle(this.location)
      }
      return this.locationId
    },
    locationEmoji() {
      if (this.location) {
        return utils.getCountryEmojiFromCode(this.location.osm_address_country_code)
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
