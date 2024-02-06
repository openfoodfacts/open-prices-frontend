<template>
  <div class="d-flex flex-wrap ga-1">
    <v-chip v-if="!hidePriceLocation" label size="small" density="comfortable" @click="goToLocation()">
      <v-icon start icon="mdi-map-marker-outline"></v-icon>
      {{ getPriceLocationTitle() }}
      <span v-if="priceLocationEmoji" style="margin-inline-start:5px">{{ priceLocationEmoji }}</span>
    </v-chip>

    <v-chip label size="small" density="comfortable" @click="goToUser()">
      <v-icon start icon="mdi-account"></v-icon>
      {{ price.owner }}
    </v-chip>

    <RelativeDateTimeChip :dateTime="price.created"></RelativeDateTimeChip>

    <PriceProof v-if="price.proof && price.proof.is_public" :proof="price.proof"></PriceProof>

    <PriceDeleteChip v-if="userIsPriceOwner" :price="price"></PriceDeleteChip>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import utils from '../utils.js'
import RelativeDateTimeChip from '../components/RelativeDateTimeChip.vue'
import PriceProof from '../components/PriceProof.vue'
import PriceDeleteChip from '../components/PriceDeleteChip.vue'

export default {
  components: {
    RelativeDateTimeChip,
    PriceProof,
    PriceDeleteChip,
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
  computed: {
    ...mapStores(useAppStore),
    username() {
      return this.appStore.user.username
    },
    userIsPriceOwner() {
      return this.username && (this.price.owner === this.username)
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
