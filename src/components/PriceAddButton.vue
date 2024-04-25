<template>
  <v-btn
    size="small"
    color="primary"
    prepend-icon="mdi-plus"
    :to="getAddUrl">
    {{ $t('Common.AddPrice') }}
  </v-btn>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: null
    },
    proof: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      ADD_PRICE_BASE_URL: '/add/single'
    }
  },
  computed: {
    getAddUrl() {
      if (this.proof) {
        return `${this.ADD_PRICE_BASE_URL}?proof=${this.proof.id}`
      }
      return `${this.ADD_PRICE_BASE_URL}?code=${this.product.code}`
    }
  }
}
</script>
