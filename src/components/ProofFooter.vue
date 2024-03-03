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
    <PriceCountChip :count="proof.price_count" :withLabel="true" @click="goToProof()"></PriceCountChip>
    <RelativeDateTimeChip :dateTime="proof.created"></RelativeDateTimeChip>
    <ProofIsPublicChip v-if="proof.type === 'RECEIPT'" :proof="proof"></ProofIsPublicChip>
    <ProofDeleteChip v-if="!hideProofDelete && userCanDeleteProof" :proof="proof"></ProofDeleteChip>

  </div>
</template>

<script>
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import constants from '../constants'
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    'PriceCountChip': defineAsyncComponent(() => import('../components/PriceCountChip.vue')),
    'RelativeDateTimeChip': defineAsyncComponent(() => import('../components/RelativeDateTimeChip.vue')),
    'ProofDeleteChip': defineAsyncComponent(() => import('../components/ProofDeleteChip.vue')),
    'ProofIsPublicChip': defineAsyncComponent(() => import('../components/ProofisPublicChip.vue'))

  },
  props: {
    'proof': null,
    hideProofDelete: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
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
    isProofOwner() {
      return this.username && (this.proof.owner === this.username)
    },
    userCanDeleteProof() {
      // user must be proof owner
      // and proof must not have any prices
      return this.isProofOwner && (this.proof.price_count === 0)
    },
    proofType() {
      return this.$t(`ProofCard.${this.proof.type}`)
    }
  },
  methods: {
    goToProof() {
      if (this.readonly || !this.isProofOwner) {
        return
      }
      this.$router.push({ path: `/proofs/${this.proof.id}` })
    },
  }
}
</script>
