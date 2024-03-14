<template>
  <v-chip label size="small" density="comfortable" @click="goToLocation()">
    <v-icon start icon="mdi-map-marker-outline"></v-icon>
    {{ priceLocationTitle }}
    <span v-if="priceLocationEmoji" style="margin-inline-start:5px">{{ priceLocationEmoji }}</span>
  </v-chip>
</template>

<script>
import utils from '../utils.js'

export default {
  props: {
    'price': null,
    'readonly': false
  },
  computed: {
    priceLocationTitle() {
      if (this.price.location) {
        return utils.getLocationTitle(this.price.location)
      }
      return this.price.location_id
    },
    priceLocationEmoji() {
      if (this.price && this.price.location) {
        return utils.getCountryEmojiFromName(this.price.location.osm_address_country)
      }
      return null
    }
  },
  methods: {
    goToLocation() {
      if (this.readonly) {
        return
      }
      this.$router.push({ path: `/locations/${this.price.location_id}` })
    },
  }
}
</script>
