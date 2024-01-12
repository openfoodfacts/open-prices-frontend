<template>
  <v-card>
    <v-container class="pa-2">
      <v-row>
        <v-col style="max-width:25%">
          <v-img v-if="product.image_url" :src="product.image_url" style="max-height:100px;width:100px" @click="goToProduct()"></v-img>
          <v-img v-if="!product.image_url" :src="productImageDefault" style="height:100px;width:100px;filter:invert(.9);"></v-img>
        </v-col>
        <v-col style="max-width:75%">
          <h3 @click="goToProduct()">{{ getProductTitle() }}</h3>

          <p class="mb-2">
            <span>
              <v-chip label size="small" density="comfortable" :color="getProductPriceCountColor" class="mr-1" @click="goToProduct()">
                <v-icon start icon="mdi-tag-outline"></v-icon>
                {{ product.price_count }}
              </v-chip>
            </span>
            <span v-if="hasProductBrands">
              <v-chip v-for="brand in getProductBrandsList" label size="small" density="comfortable" class="mr-1" @click="goToBrand(brand)">
                {{ brand }}
              </v-chip>
            </span>
            <span v-if="hasProductQuantity">
              <v-chip label size="small" density="comfortable" class="mr-1">
                {{ product.product_quantity }} g
              </v-chip>
            </span>
            <span>
              <br />
              <v-chip label size="small" density="comfortable" class="mr-1">{{ product.code }}</v-chip>
            </span>
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
export default {
  props: {
    'product': null,
    'readonly': false
  },
  data() {
    return {
      productImageDefault: 'https://world.openfoodfacts.org/images/icons/dist/packaging.svg',
    }
  },
  mounted() {
    // this.initPriceCard()
  },
  computed: {
    hasProductBrands() {
      return !!this.product.brands
    },
    hasProductQuantity() {
      return !!this.product.product_quantity
    },
    getProductPriceCountColor() {
      if (this.product.price_count === 0) {
        return 'error'
      }
      if (this.product.price_count === 1) {
        return 'warning'
      }
      if (this.product.price_count > 1) {
        return 'success'
      }
    },
    getProductBrandsList() {
      if (this.hasProductBrands) {
        return this.product.brands.split(',')
      }
    }
  },
  methods: {
    getProductTitle() {
      return this.product.product_name || 'Unknown product name'
    },
    goToProduct() {
      if (this.readonly) {
        return
      }
      this.$router.push({ path: `/products/${this.product.code}` })
    },
    goToBrand(brand) {
      if (this.readonly) {
        return
      }
      this.$router.push({ path: `/brands/${brand}` })
    },
  }
}
</script>
