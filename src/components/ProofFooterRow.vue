<template>
  <v-row>
    <v-col :cols="hideActionMenuButton ? '12' : '11'" class="pt-2 pb-2">
      <ProofChip v-if="showProofChip" class="mr-1" :proof="proof" :withLabel="showProofChip" :readonly="true" />
      <ProofTypeChip v-if="!hideProofType" class="mr-1" :proofType="proof.type" />
      <ProofUserConsumptionChip v-if="showReceiptOwnerConsumption" class="mr-1" />
      <ProofReceiptPriceCountChip v-if="showReceiptPriceCount" class="mr-1" :totalCount="proof.receipt_price_count" />
      <ProofReceiptPriceTotalChip v-if="showReceiptPriceTotal" class="mr-1" :totalCount="proof.receipt_price_total" :currency="proof.currency" />
      <ProofReceiptOnlineDeliveryCostsChip v-if="showReceiptOnlineDeliveryCosts" class="mr-1" :price="proof.receipt_online_delivery_costs" :currency="proof.currency" />
      <PriceCountChip v-if="!hidePriceCount" class="mr-1" :count="proof.price_count" :withLabel="true" source="proof" @click="goToProof()" />
      <LocationChip class="mr-1" :location="proof.location" :locationId="proof.location_id" :readonly="readonly" :showErrorIfLocationMissing="true" />
      <DateChip class="mr-1" :date="proof.date" :showErrorIfDateMissing="true" :readonly="readonly" />
      <CurrencyChip class="mr-1" :currency="proof.currency" :showErrorIfCurrencyMissing="true" :readonly="readonly" />
      <UserChip v-if="!hideProofOwner" class="mr-1" :username="proof.owner" :readonly="readonly" />
      <UserCommentChip v-if="proof.owner_comment" class="mr-1" :comment="proof.owner_comment" />
      <RelativeDateTimeChip :dateTime="proof.created" />
    </v-col>
    <v-col v-if="!hideActionMenuButton" cols="1">
      <ProofActionMenuButton :proof="proof" />
    </v-col>
  </v-row>
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
    ProofUserConsumptionChip: defineAsyncComponent(() => import('../components/ProofUserConsumptionChip.vue')),
    ProofReceiptPriceCountChip: defineAsyncComponent(() => import('../components/ProofReceiptPriceCountChip.vue')),
    ProofReceiptPriceTotalChip: defineAsyncComponent(() => import('../components/ProofReceiptPriceTotalChip.vue')),
    ProofReceiptOnlineDeliveryCostsChip: defineAsyncComponent(() => import('../components/ProofReceiptOnlineDeliveryCostsChip.vue')),
    PriceCountChip: defineAsyncComponent(() => import('../components/PriceCountChip.vue')),
    LocationChip: defineAsyncComponent(() => import('../components/LocationChip.vue')),
    DateChip: defineAsyncComponent(() => import('../components/DateChip.vue')),
    CurrencyChip: defineAsyncComponent(() => import('../components/CurrencyChip.vue')),
    UserChip: defineAsyncComponent(() => import('../components/UserChip.vue')),
    UserCommentChip: defineAsyncComponent(() => import('../components/UserCommentChip.vue')),
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
    hideActionMenuButton: {
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
      return this.username && this.proof && (this.proof.owner === this.username)
    },
    proofIsTypeReceipt() {
      return this.proof && (this.proof.type === constants.PROOF_TYPE_RECEIPT)
    },
    showReceiptOwnerConsumption() {
      return this.userIsProofOwner && this.proofIsTypeReceipt && this.proof.owner_consumption
    },
    showReceiptPriceCount() {
      return this.userIsProofOwner && this.proofIsTypeReceipt && this.proof.receipt_price_count
    },
    showReceiptPriceTotal() {
      return this.userIsProofOwner && this.proofIsTypeReceipt && this.proof.receipt_price_total
    },
    showReceiptOnlineDeliveryCosts() {
      return this.userIsProofOwner && this.proofIsTypeReceipt && this.proof.receipt_online_delivery_costs
    },
  },
  methods: {
    goToProof() {
      if (this.readonly) {
        return
      }
      this.$router.push({ path: `/proofs/${this.proof.id}` })
    },
  }
}
</script>
