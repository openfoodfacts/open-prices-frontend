<template>
  <v-btn
    size="small"
    color="primary"
    prepend-icon="mdi-plus"
    :to="'/add/single?code=' + product.code">
    {{ $t('ProductDetail.AddPrice') }}
  </v-btn>
</template>

<script>
export default {
  props: {
    product: Object,
    required: true
  }
}
</script>
