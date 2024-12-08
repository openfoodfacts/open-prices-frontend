<template>
  <v-card v-if="showCard" class="mb-4" prepend-icon="mdi-tag-check-outline" style="border: 1px solid #4CAF50">
    <template #title>
      <i18n-t keypath="AddPriceMultiple.ProductPriceDetails.AlreadyUploaded" :plural="proofPriceUploadedList.length" tag="span">
        <template #priceAlreadyUploadedNumber>
          <span>{{ proofPriceUploadedList.length }}</span>
        </template>
      </i18n-t>
    </template>
    <template #append>
      <v-icon icon="mdi-checkbox-marked-circle" color="success" />
    </template>

    <v-divider />

    <v-card-text>
      <v-row>
        <v-col v-for="productPriceUploaded in proofPriceUploadedList" :key="productPriceUploaded" cols="12">
          <PriceCard :price="productPriceUploaded" :product="productPriceUploaded.product" :hideProductBarcode="false" :hidePriceFooterRow="true" :readonly="true" />
        </v-col>
      </v-row>
    </v-card-text>

    <v-divider v-if="showCardFooter" />

    <v-card-actions v-if="showCardFooter">
      <v-row>
        <v-col cols="12">
          <ProofReceiptPriceCountChip class="mr-1" :uploadedCount="proofPriceUploadedList.length" :totalCount="proof.receipt_price_count" />
          <ProofReceiptPriceTotalChip :uploadedCount="proofPriceUploadedListSum" :totalCount="proof.receipt_price_total" :currency="proofPriceUploadedList[0].currency" />
        </v-col>
      </v-row>
    </v-card-actions>

    <v-overlay v-model="disableCard" scrim="#E8F5E9" contained persistent />
  </v-card>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import constants from '../constants'

export default {
  components: {
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
  data() {
    return {
      disableCard: true
    }
  },
  computed: {
    showCard() {
      return this.hideCardIfNoProofPriceUploaded && this.proofPriceUploadedList.length > 0
    },
    proofIsTypeReceipt() {
      return this.proof && this.proof.type === constants.PROOF_TYPE_RECEIPT
    },
    showCardFooter() {
      return this.proofIsTypeReceipt && this.proofPriceUploadedList.length > 0
    },
    proofPriceUploadedListSum() {
      return this.proofPriceUploadedList.reduce((acc, priceUploaded) => {
        return acc + parseFloat(priceUploaded.price)
      }, 0)
    }
  },
}
</script>
