<template>
  <div class="d-flex flex-wrap ga-1">
    <PriceLocationChip v-if="!hidePriceLocation" :price="price" :readonly="readonly"></PriceLocationChip>

    <v-chip label size="small" density="comfortable" @click="goToUser()">
      <v-icon start icon="mdi-account"></v-icon>
      {{ price.owner }}
    </v-chip>

    <RelativeDateTimeChip :dateTime="price.created"></RelativeDateTimeChip>

    <PriceProof v-if="price.proof && price.proof.is_public && !hidePriceProof" :proof="price.proof"></PriceProof>

    <PriceDeleteChip v-if="userIsPriceOwner" :price="price"></PriceDeleteChip>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import utils from '../utils.js'
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    'PriceLocationChip': defineAsyncComponent(() => import('../components/PriceLocationChip.vue')),
    'RelativeDateTimeChip': defineAsyncComponent(() => import('../components/RelativeDateTimeChip.vue')),
    'PriceProof': defineAsyncComponent(() => import('../components/PriceProof.vue')),
    'PriceDeleteChip': defineAsyncComponent(() => import('../components/PriceDeleteChip.vue'))
  },
  props: {
    'price': null,
    'hidePriceLocation': false,
    'hidePriceProof': false,
    'readonly': false
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
  methods: {
    goToUser() {
      if (this.readonly) {
        return
      }
      this.$router.push({ path: `/users/${this.price.owner}` })
    },
  }
}
</script>
