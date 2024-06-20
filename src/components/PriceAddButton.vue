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
    }
  },
  data() {
    return {
      ADD_PRICE_BASE_URL: '/prices/add/single'
    }
  },
  computed: {
    getAddUrl() {
      if (this.proofId) {
        return `${this.ADD_PRICE_BASE_URL}?proof_id=${this.proofId}`
      }
      return `${this.ADD_PRICE_BASE_URL}?code=${this.productCode}`
    }
  }
}
</script>
