<template>
  <div class="d-flex flex-wrap ga-1">
    <v-chip label size="small" density="comfortable">
      <v-icon start icon="mdi-paperclip"></v-icon>
      {{ proofType }}
    </v-chip>
    <PriceCountChip :count="proof.price_count" :withLabel="true"></PriceCountChip>
    <RelativeDateTimeChip :dateTime="proof.created"></RelativeDateTimeChip>
    <ProofDeleteChip v-if="userCanDeleteProof" :proof="proof"></ProofDeleteChip>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    'PriceCountChip': defineAsyncComponent(() => import('../components/PriceCountChip.vue')),
    'RelativeDateTimeChip': defineAsyncComponent(() => import('../components/RelativeDateTimeChip.vue')),
    'ProofDeleteChip': defineAsyncComponent(() => import('../components/ProofDeleteChip.vue'))
  },
  props: {
    'proof': null,
  },
  computed: {
    ...mapStores(useAppStore),
    username() {
      return this.appStore.user.username
    },
    userCanDeleteProof() {
      // user must be proof owner
      // and proof must not have any prices
      return this.username && (this.proof.owner === this.username) && (this.proof.price_count === 0)
    },
    proofType() {
      return this.$t(`ProofCard.${this.proof.type}`)
    }
  }
}
</script>
