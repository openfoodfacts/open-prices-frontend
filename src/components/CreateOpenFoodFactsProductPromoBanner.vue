<template>
  <v-btn 
    block
    variant="outlined"
    color="#f57c00"
    :to="url"
    class="create-prices-btn"
    size="large"
  >
    <template #prepend>
      <v-icon icon="mdi-chart-line" />
    </template>

    {{ $t('create_with_open_prices') }}

    <template #append>
      <v-icon icon="mdi-arrow-right" size="small" />
    </template>
  </v-btn>
</template>

<script>
export default {
  props: {
    productCode: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      url: `/experiments/create-off-product?product_code=${this.productCode}`,
    }
  },
}
</script>

<style scoped>
.create-prices-btn {
  text-transform: none;
  font-weight: 600;
  border-radius: 12px;
  border-width: 2px;
}

.create-prices-btn:hover {
  transform: translateY(-1px);
  background: rgba(245, 124, 0, 0.04);
}
</style>