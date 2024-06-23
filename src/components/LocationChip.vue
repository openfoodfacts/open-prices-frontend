<template>
  <v-chip label size="small" density="comfortable" @click="goToLocation()">
    <v-icon start icon="mdi-map-marker-outline" />
    {{ locationTitle }}
    <span v-if="locationEmoji" style="margin-inline-start:5px">{{ locationEmoji }}</span>
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
    }
  },
  methods: {
    goToLocation() {
      if (this.readonly) {
        return
      }
      this.$router.push({ path: `/locations/${this.locationId}` })
    },
  }
}
</script>
