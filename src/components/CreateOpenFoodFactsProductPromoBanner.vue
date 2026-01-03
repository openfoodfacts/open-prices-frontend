<template>
  <v-banner
    icon="mdi-draw"
    bg-color="primary"
    rounded
    density="compact"
    @click="$router.push(url)"
  >
    <v-banner-text style="padding-inline-end:10px;">
      {{ $t('CreateOffProduct.ProductMissingPromoBanner') }}
    </v-banner-text>
    <v-spacer /><!-- needed to push v-banner-actions to the right on big screens -->
    <v-banner-actions>
      <v-btn icon="mdi-arrow-right" :aria-label="$t('Common.TryItOut')" :to="url" />
    </v-banner-actions>
  </v-banner>
</template>

<script>
export default {
  props: {
    productCode: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      url: `/experiments/create-off-product?product_code=${this.productCode}`,
    }
  },
}
</script>
