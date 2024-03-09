<template>
    <span v-if="productBrands.length">
        <v-chip v-for="brand in getProductBrandsList" :key="brand" label size="small" density="comfortable" class="mr-1" @click="goToBrand(brand)">
        {{ brand }}
        </v-chip>
    </span>
</template>

<script>
export default {
  props: {
    productBrands: {
        type: String,
        default: ''
    },
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
