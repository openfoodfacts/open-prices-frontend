<template>
  <v-row style="margin-top:0;">
    <v-col :cols="userIsProofOwner ? '11' : '12'">
      <v-chip class="mr-1" label size="small" density="comfortable">
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
    </v-col>
  </v-row>

  <ProofActionMenuButton v-if="!readonly && userIsProofOwner" :proof="proof"></ProofActionMenuButton>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import constants from '../constants'

export default {
  components: {
    'PriceCountChip': defineAsyncComponent(() => import('../components/PriceCountChip.vue')),
    'RelativeDateTimeChip': defineAsyncComponent(() => import('../components/RelativeDateTimeChip.vue')),
    'ProofActionMenuButton': defineAsyncComponent(() => import('../components/ProofActionMenuButton.vue'))
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
    userIsProofOwner() {
      return this.username && (this.proof.owner === this.username)
    },
    proofType() {
      return this.$t(`ProofCard.${this.proof.type}`)
    }
  },
  methods: {
    goToProof() {
      if (this.readonly || !this.userIsProofOwner) {
        return
      }
      this.$router.push({ path: `/proofs/${this.proof.id}` })
    },
  }
}
</script>
