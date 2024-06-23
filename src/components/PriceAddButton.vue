<template>
  <v-btn
    size="small"
    color="primary"
    prepend-icon="mdi-plus"
    :to="getAddUrl"
  >
    {{ $t('Common.AddPrice') }}
  </v-btn>
</template>

<script>
export default {
  props: {
    productCode: {
      type: String,
      default: null
    },
    proofId: {
      type: Number,
      default: null
    },
    proofType: {
      type: String,
      default: null,
      examples: ['PRICE_TAG', 'RECEIPT']
    }
  },
  data() {
    return {
      ADD_PRICE_SINGLE_BASE_URL: '/prices/add/single',
      ADD_PRICE_MULTIPLE_RECEIPT_BASE_URL: '/prices/add/multiple/receipt',
      ADD_PRICE_MULTIPLE_PRICE_TAG_BASE_URL: '/prices/add/multiple/price-tag',
    }
  },
  computed: {
    getAddUrl() {
      if (this.proofId) {
        if (this.proofType === 'RECEIPT') {
          return `${this.ADD_PRICE_MULTIPLE_RECEIPT_BASE_URL}?proof_id=${this.proofId}`
        }
        return `${this.ADD_PRICE_MULTIPLE_PRICE_TAG_BASE_URL}?proof_id=${this.proofId}`
      }
      return `${this.ADD_PRICE_SINGLE_BASE_URL}?code=${this.productCode}`
    }
  }
}
</script>
