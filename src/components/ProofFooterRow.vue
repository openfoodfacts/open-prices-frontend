<template>
  <v-row>
    <v-col :cols="userIsProofOwner ? '11' : '12'">
      <ProofTypeChip class="mr-1" :proof="proof" />
      <v-chip v-if="showReceiptPriceCount" class="mr-1" label size="small" variant="flat" density="comfortable" :title="$t('Common.ReceiptPriceCount')">
        {{ $t('Common.PriceCount', { count: proof.receipt_price_count }) }}
      </v-chip>
      <v-chip v-if="showReceiptPriceTotal" class="mr-1" label size="small" variant="flat" density="comfortable" :title="$t('Common.ReceiptPriceTotal')">
        {{ getPriceValueDisplay(proof.receipt_price_total) }}
      </v-chip>
      <PriceCountChip :count="proof.price_count" :withLabel="true" @click="goToProof()" />
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
import utils from '../utils.js'

export default {
  components: {
    ProofTypeChip: defineAsyncComponent(() => import('../components/ProofTypeChip.vue')),
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
    hideProofOwner: {
      type: Boolean,
      default: true
    },
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
    isTypeReceipt() {
      return this.proof && this.proof.type === constants.PROOF_TYPE_RECEIPT
    },
    showReceiptPriceCount() {
      return this.userIsProofOwner && this.isTypeReceipt && this.proof.receipt_price_count
    },
    showReceiptPriceTotal() {
      return this.userIsProofOwner && this.isTypeReceipt && this.proof.receipt_price_total
    },
  },
  methods: {
    getPriceValue(priceValue, priceCurrency) {
      return utils.prettyPrice(priceValue, priceCurrency)
    },
    getPriceValueDisplay(price) {
      price = parseFloat(price)
      return this.getPriceValue(price, this.proof.currency)
    },
    goToProof() {
      if (this.readonly || !this.userIsProofOwner) {
        return
      }
      this.$router.push({ path: `/proofs/${this.proof.id}` })
    },
  }
}
</script>
