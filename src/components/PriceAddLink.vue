<template>
  <a v-if="display === 'link'" :to="getUrl" :disabled="disabled">
    {{ getText }}
  </a>
  <v-btn
    v-else-if="display === 'button'"
    size="small"
    color="primary"
    :prepend-icon="getIcon"
    :to="getUrl"
    :disabled="disabled"
  >
    {{ getText }}
  </v-btn>
  <v-list-item v-else-if="display === 'list-item'" :slim="true" :prepend-icon="getIcon" :to="getUrl" :disabled="disabled">
    {{ getText }}
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
    display: {
      type: String,
      default: 'link',
      examples: ['link', 'button', 'list-item']
    },
    target: {
      type: String,
      default: 'prices-add-multiple'  // 'prices-add-single', 'contribution-assistant', 'receipt-assistant'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ADD_PRICE_SINGLE_BASE_URL: '/prices/add/single',
      ADD_PRICE_MULTIPLE_BASE_URL: '/prices/add/multiple',
      CONTRIBUTION_ASSISTANT_BASE_URL: '/experiments/proof-price-tag-assistant',
      RECEIPT_ASSISTANT_BASE_URL: '/experiments/receipt-assistant'
    }
  },
  computed: {
    getText() {
      if (['contribution-assistant', 'receipt-assistant'].includes(this.target)) {
        return this.$t('Common.OpenWithTheAssistant')
      }
      else if (this.target === 'prices-add-single') {
        return this.$t('Common.AddPrice')
      }
      return this.$t('Common.AddPrices')
    },
    getUrl() {
      if (this.proofId) {
        if (this.target === 'contribution-assistant') {
          return `${this.CONTRIBUTION_ASSISTANT_BASE_URL}?proof_ids=${this.proofId}`
        }
        else if (this.target === 'receipt-assistant') {
          return `${this.RECEIPT_ASSISTANT_BASE_URL}?proof_ids=${this.proofId}`
        }
        return `${this.ADD_PRICE_MULTIPLE_BASE_URL}?proof_id=${this.proofId}`
      }
      return `${this.ADD_PRICE_SINGLE_BASE_URL}?code=${this.productCode}`
    },
    getIcon() {
      if (['contribution-assistant', 'receipt-assistant'].includes(this.target)) {
        return 'mdi-draw'
      }
      return 'mdi-tag-plus-outline'
    }
  }
}
</script>
