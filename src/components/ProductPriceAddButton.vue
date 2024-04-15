<template>
  <v-btn
    size="small"
    color="primary"
    prepend-icon="mdi-plus"
    :to="getAddUrl">
    {{ $t('ProductDetail.AddPrice') }}
  </v-btn>
</template>

<script>
export default {
  props: {
    product: Object,
    required: true
  },
  computed: {
    getAddUrl() {
      return `/add/single?code=${this.product.code}`
    }
  }
}
</script>
