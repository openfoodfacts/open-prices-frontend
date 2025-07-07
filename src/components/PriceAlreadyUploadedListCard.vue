<template>
  <v-card v-if="showCard" class="border-success mb-4" prepend-icon="mdi-tag-check-outline">
    <template #title>
      {{ $t('Common.PricesAlreadyUploaded') }}
      <LoadedCountChip :totalCount="proofPriceUploadedList.length" />
    </template>
    <template #append>
      <v-icon icon="mdi-checkbox-marked-circle" color="success" />
    </template>

    <v-divider />

    <v-card-text>
      <v-row>
        <v-col v-for="productPriceUploaded in proofPriceUploadedList" :key="productPriceUploaded" cols="12">
          <PriceCard :price="productPriceUploaded" :product="productPriceUploaded.product" :hideProductBarcode="false" :hidePriceReceiptQuantity="false" :hidePriceFooterRow="true" :readonly="true" />
        </v-col>
      </v-row>
    </v-card-text>

    <v-divider v-if="showCardFooter" />

    <v-card-actions v-if="showCardFooter">
      <v-row>
        <v-col cols="12">
          <ProofReceiptPriceCountChip class="mr-1" :uploadedCount="proofPriceUploadedList.length" :totalCount="proof.receipt_price_count" />
          <ProofReceiptPriceTotalChip :uploadedCount="proofPriceUploadedListSum" :totalCount="proof.receipt_price_total" :currency="proof.currency" />
        </v-col>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import constants from '../constants'
import utils from '../utils.js'

export default {
  components: {
    LoadedCountChip: defineAsyncComponent(() => import('../components/LoadedCountChip.vue')),
    PriceCard: defineAsyncComponent(() => import('../components/PriceCard.vue')),
    ProofReceiptPriceCountChip: defineAsyncComponent(() => import('../components/ProofReceiptPriceCountChip.vue')),
    ProofReceiptPriceTotalChip: defineAsyncComponent(() => import('../components/ProofReceiptPriceTotalChip.vue')),
  },
  props: {
    proof: {
      type: Object,
      default: null
    },
    proofPriceUploadedList: {
      type: Array,
      default: () => []
    },
    hideCardIfNoProofPriceUploaded: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    showCard() {
      return this.hideCardIfNoProofPriceUploaded && (this.proofPriceUploadedList.length > 0)
    },
    proofIsTypeReceipt() {
      return this.proof && (this.proof.type === constants.PROOF_TYPE_RECEIPT)
    },
    showCardFooter() {
      return this.proofIsTypeReceipt && (this.proofPriceUploadedList.length > 0)
    },
    proofPriceUploadedListSum() {
      return utils.priceSum(this.proofPriceUploadedList)
    }
  },
}
</script>
