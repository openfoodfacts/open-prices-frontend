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
              <PriceCountChip :count="product.price_count" @click="goToProduct()"></PriceCountChip>
            </span>
            <span v-if="hasProductSource">
              <ProductBrands :productBrands="product.brands" :readonly="readonly"></ProductBrands>
            </span>
            <span v-if="hasProductSource">
              <ProductQuantityChip class="mr-1" :productQuantity="product.product_quantity" :productQuantityUnit="product.product_quantity_unit"></ProductQuantityChip>
            </span>
            <br />
            <span class="mr-1">
              <ProductCategoriesChip :productCategories="product.categories_tags"></ProductCategoriesChip>
            </span>
            <span>
              <ProductLabelsChip :productLabels="product.labels_tags"></ProductLabelsChip>
            </span>
            <br />
            <span>
              <v-chip label size="small" density="comfortable">{{ product.code }}</v-chip>
            </span>
          </p>
        </v-col>
      </v-row>

      <v-sheet v-if="latestPrice">
        <v-divider class="mt-2 mb-2"></v-divider>
        <h4>{{ $t('ProductCard.LatestPrice') }}</h4>
        <PricePrice :price="latestPrice" :productQuantity="product.product_quantity" :productQuantityUnit="product.product_quantity_unit"></PricePrice>
        <PriceFooter :price="latestPrice"></PriceFooter>
      </v-sheet>
    </v-container>
  </v-card>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    'PriceCountChip': defineAsyncComponent(() => import('../components/PriceCountChip.vue')),
    'ProductBrands': defineAsyncComponent(() => import('../components/ProductBrands.vue')),
    'ProductQuantityChip': defineAsyncComponent(() => import('../components/ProductQuantityChip.vue')),
    'ProductCategoriesChip': defineAsyncComponent(() => import('../components/ProductCategoriesChip.vue')),
    'ProductLabelsChip': defineAsyncComponent(() => import('../components/ProductLabelsChip.vue')),
    'PricePrice': defineAsyncComponent(() => import('../components/PricePrice.vue')),
    'PriceFooter': defineAsyncComponent(() => import('../components/PriceFooter.vue')),
  },
  props: {
    'product': null,
    'latestPrice': null,
    'readonly': false
  },
  data() {
    return {
      productImageDefault: 'https://world.openfoodfacts.org/images/icons/dist/packaging.svg',
    }
  },
  mounted() {
  },
  computed: {
    hasProductName() {
      return !!this.product.product_name
    },
    hasProductSource() {
      return !!this.product.source
    },
    hasProductBrands() {
      return !!this.product.brands
    },
    hasProductQuantity() {
      return !!this.product.product_quantity
    },
  },
  methods: {
    getProductTitle() {
      return this.hasProductSource ? (this.product.product_name || this.$t('ProductCard.UnknownProduct')) : this.product.code
    },
    goToProduct() {
      if (this.readonly) {
        return
      }
      this.$router.push({ path: `/products/${this.product.code}` })
    },
  }
}
</script>
