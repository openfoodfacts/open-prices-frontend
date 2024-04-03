<template>
  <v-row>
    <v-col :cols="userIsProofOwner ? '11' : '12'">
      <ProofTypeChip class="mr-1" :proof="proof"></ProofTypeChip>
      <ProofPrivateChip v-if="proofIsPrivateReceipt" class="mr-1" :proof="proof"></ProofPrivateChip>
      <PriceCountChip :count="proof.price_count" :withLabel="true" @click="goToProof()"></PriceCountChip>
      <RelativeDateTimeChip :dateTime="proof.created"></RelativeDateTimeChip>
    </v-col>
  </v-row>

  <ProofActionMenuButton v-if="!readonly && !hideProofActions && userIsProofOwner" :proof="proof"></ProofActionMenuButton>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'

export default {
  components: {
    'ProofTypeChip': defineAsyncComponent(() => import('../components/ProofTypeChip.vue')),
    'ProofPrivateChip': defineAsyncComponent(() => import('../components/ProofPrivateChip.vue')),
    'PriceCountChip': defineAsyncComponent(() => import('../components/PriceCountChip.vue')),
    'RelativeDateTimeChip': defineAsyncComponent(() => import('../components/RelativeDateTimeChip.vue')),
    'ProofActionMenuButton': defineAsyncComponent(() => import('../components/ProofActionMenuButton.vue'))
  },
  props: {
    'proof': null,
    hideProofActions: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapStores(useAppStore),
    username() {
      return this.appStore.user.username
    },
    userIsProofOwner() {
      return this.username && (this.proof.owner === this.username)
    },
    proofIsReceipt() {
      return this.proof.type === 'RECEIPT'
    },
    proofIsPrivateReceipt() {
      return this.proofIsReceipt && !this.proof.is_public
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
