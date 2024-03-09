<template>
    <span v-if="productBrands && productBrands.length">
        <v-chip v-for="brand in getProductBrandsList" :key="brand" label size="small" density="comfortable" class="mr-1" @click="goToBrand(brand)">
            {{ brand }}
        </v-chip>
    </span>
    <v-chip v-if="!productBrands" label size="small" density="comfortable" prepend-icon="mdi-help" color="warning" class="mr-1">
        {{ $t('ProductCard.BrandLower') }}
        <v-tooltip activator="parent" open-on-click location="top">{{ $t('ProductCard.ProductBrandMissing') }}</v-tooltip>
  </v-chip>
</template>

<script>
export default {
  props: {
    productBrands: String,
    readonly: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    getProductBrandsList() {
      return this.productBrands.split(',')
    }
  },
  methods: {
    goToBrand(brand) {
      if (this.readonly) {
        return
      }
      this.$router.push({ path: `/brands/${brand}` })
    },
  }
}
</script>
