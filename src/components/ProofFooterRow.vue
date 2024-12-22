<template>
  <v-row>
    <v-col :cols="userIsProofOwner ? '11' : '12'">
      <ProofChip v-if="showProofChip" class="mr-1" :proof="proof" />
      <ProofTypeChip v-if="!hideProofType" class="mr-1" :proofType="proof.type" />
      <ProofReceiptPriceCountChip v-if="showReceiptPriceCount" class="mr-1" :totalCount="proof.receipt_price_count" />
      <ProofReceiptPriceTotalChip v-if="showReceiptPriceTotal" class="mr-1" :totalCount="proof.receipt_price_total" :currency="proof.currency" />
      <PriceCountChip v-if="!hidePriceCount" class="mr-1" :count="proof.price_count" :withLabel="true" @click="goToProof()" />
      <LocationChip class="mr-1" :location="proof.location" :locationId="proof.location_id" :readonly="readonly" :showErrorIfLocationMissing="true" />
      <DateChip class="mr-1" :date="proof.date" :showErrorIfDateMissing="true" />
      <CurrencyChip class="mr-1" :currency="proof.currency" :showErrorIfCurrencyMissing="true" />
      <UserChip v-if="!hideProofOwner" class="mr-1" :username="proof.owner" :readonly="readonly" />
      <RelativeDateTimeChip :dateTime="proof.created" />
    </v-col>
  </v-row>

  <ProofActionMenuButton v-if="!hideProofActions && userIsProofOwner" :proof="proof" />
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import constants from '../constants'

export default {
  components: {
    ProofChip: defineAsyncComponent(() => import('../components/ProofChip.vue')),
    ProofTypeChip: defineAsyncComponent(() => import('../components/ProofTypeChip.vue')),
    ProofReceiptPriceCountChip: defineAsyncComponent(() => import('../components/ProofReceiptPriceCountChip.vue')),
    ProofReceiptPriceTotalChip: defineAsyncComponent(() => import('../components/ProofReceiptPriceTotalChip.vue')),
    PriceCountChip: defineAsyncComponent(() => import('../components/PriceCountChip.vue')),
    LocationChip: defineAsyncComponent(() => import('../components/LocationChip.vue')),
    DateChip: defineAsyncComponent(() => import('../components/DateChip.vue')),
    CurrencyChip: defineAsyncComponent(() => import('../components/CurrencyChip.vue')),
    UserChip: defineAsyncComponent(() => import('../components/UserChip.vue')),
    RelativeDateTimeChip: defineAsyncComponent(() => import('../components/RelativeDateTimeChip.vue')),
    ProofActionMenuButton: defineAsyncComponent(() => import('../components/ProofActionMenuButton.vue'))
  },
  props: {
    proof: {
      type: Object,
      default: null
    },
    hideProofType: {
      type: Boolean,
      default: false
    },
    hidePriceCount: {
      type: Boolean,
      default: false
    },
    hideProofOwner: {
      type: Boolean,
      default: true
    },
    hideProofActions: {
      type: Boolean,
      default: false,
    },
    showProofChip: {
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
    proofIsTypeReceipt() {
      return this.proof && this.proof.type === constants.PROOF_TYPE_RECEIPT
    },
    showReceiptPriceCount() {
      return this.userIsProofOwner && this.proofIsTypeReceipt && this.proof.receipt_price_count
    },
    showReceiptPriceTotal() {
      return this.userIsProofOwner && this.proofIsTypeReceipt && this.proof.receipt_price_total
    },
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
