<template>
  <div class="d-flex flex-wrap ga-1">
    <v-chip label size="small" density="comfortable">
      <v-icon start icon="mdi-paperclip"></v-icon>
      <span v-if="proof.type === 'GDPR_REQUEST'">
        <a :href="OFF_WIKI_GDPR_REQUEST_URL" target="_blank">
          {{ proofType }}
          <v-icon size="x-small" icon="mdi-open-in-new"></v-icon>
        </a>
      </span>
      <span v-if="proof.type !== 'GDPR_REQUEST'">
        {{ proofType }}
      </span>
      
    </v-chip>
    <PriceCountChip :count="proof.price_count" :withLabel="true"></PriceCountChip>
    <RelativeDateTimeChip :dateTime="proof.created"></RelativeDateTimeChip>
    <ProofDeleteChip v-if="userCanDeleteProof" :proof="proof"></ProofDeleteChip>
  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import constants from '../constants'
import PriceCountChip from '../components/PriceCountChip.vue'
import RelativeDateTimeChip from '../components/RelativeDateTimeChip.vue'
import ProofDeleteChip from '../components/ProofDeleteChip.vue'

export default {
  components: {
    PriceCountChip,
    RelativeDateTimeChip,
    ProofDeleteChip
  },
  props: {
    'proof': null,
  },
  data() {
    return {
      OFF_WIKI_GDPR_REQUEST_URL: constants.OFF_WIKI_GDPR_REQUEST_URL,
    }
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
