<template>
  <a v-if="display === 'link'" :to="getAddUrl">
    {{ $t('Common.AddPrice') }}
  </a>
  <v-btn
    v-else-if="display === 'button'"
    size="small"
    color="primary"
    prepend-icon="mdi-tag-plus-outline"
    :to="getAddUrl"
  >
    {{ $t('Common.AddPrice') }}
  </v-btn>
  <v-list-item v-else-if="display === 'list-item'" :slim="true" base-color="primary" prepend-icon="mdi-tag-plus-outline" :to="getAddUrl">
    {{ $t('Common.AddPrice') }}
  </v-list-item>
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
    },
    display: {
      type: String,
      default: 'link',
      examples: ['link', 'button', 'list-item']
    },
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
