<template>
  <div class="d-flex flex-wrap ga-1">
    <v-chip v-if="!hidePriceLocation" class="mr-1" label size="small" density="comfortable" @click="goToLocation()">
      <v-icon start icon="mdi-map-marker-outline"></v-icon>
      {{ getPriceLocationTitle() }}
      <span v-if="priceLocationEmoji" style="margin-inline-start:5px">{{ priceLocationEmoji }}</span>
    </v-chip>

    <v-chip class="mr-1" label size="small" density="comfortable" @click="goToUser()">
      <v-icon start icon="mdi-account"></v-icon>
      {{ price.owner }}
    </v-chip>

    <v-chip class="mr-1" label size="small" density="comfortable">
      <v-icon start icon="mdi-clock-outline"></v-icon>
      {{ getRelativeDateTimeFormatted(price.created) }}
      <v-tooltip activator="parent" location="top">{{ getDateTimeFormatted(price.created) }}</v-tooltip>
    </v-chip>

    <PriceProof v-if="price.proof && price.proof.is_public" :proof="price.proof"></PriceProof>
  </div>
</template>

<script>
import utils from '../utils.js'
import PriceProof from '../components/PriceProof.vue'

export default {
  components: {
    PriceProof
  },
  props: {
    'price': null,
    'hidePriceLocation': false,
    'readonly': false
  },
  data() {
    return {
      priceLocationEmoji: null
    }
  },
  mounted() {
    this.initPriceFooter()
  },
  methods: {
    initPriceFooter() {
      this.priceLocationEmoji = this.getPriceLocationCountryEmoji()
    },
    getPriceLocationTitle() {
      if (this.price.location) {
        return utils.getLocationTitle(this.price.location)
      }
      return this.price.location_id
    },
    getPriceLocationCountryEmoji() {
      if (this.price && this.price.location) {
        return utils.getCountryEmojiFromName(this.price.location.osm_address_country)
      }
      return null
    },
    getDateTimeFormatted(dateString) {
      return utils.prettyDateTime(dateString)
    },
    getRelativeDateTimeFormatted(dateTimeString) {
      return utils.prettyRelativeDateTime(dateTimeString, 'shortest')
    },
    goToLocation() {
      if (this.readonly) {
        return
      }
      this.$router.push({ path: `/locations/${this.price.location_id}` })
    },
    goToUser() {
      if (this.readonly) {
        return
      }
      this.$router.push({ path: `/users/${this.price.owner}` })
    },
  }
}
</script>
