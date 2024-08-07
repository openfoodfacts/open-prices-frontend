<template>
  <v-card data-name="product-card">
    <v-container class="pa-2">
      <v-row v-if="product">
        <v-col class="pr-0" style="max-width:20%">
          <v-img v-if="product.image_url" :src="product.image_url" style="max-height:100px;" @click="goToProduct()" />
          <v-img v-if="!product.image_url" :src="productImageDefault" style="height:100px;width:100px;filter:invert(.9);" />
        </v-col>
        <v-col style="max-width:80%">
          <h3 id="product-title" @click="goToProduct()">
            {{ getProductTitle() }}
          </h3>

          <p>
            <span>
              <PriceCountChip :count="product.price_count" @click="goToProduct()" />
            </span>
            <span v-if="hasProductSource">
              <ProductBrands :productBrands="product.brands" :readonly="readonly" />
              <ProductQuantityChip class="mr-1" :productQuantity="product.product_quantity" :productQuantityUnit="product.product_quantity_unit" />
              <br>
              <ProductCategoriesChip class="mr-1" :productCategories="product.categories_tags" />
              <ProductLabelsChip :productLabels="product.labels_tags" />
            </span>
            <ProductMissingChip v-else />
            <br v-if="showProductBarcode">
            <ProductBarcodeChip v-if="showProductBarcode" :product="product" />
            <ProductBarcodeInvalidChip v-if="barcodeInvalid" />
          </p>
        </v-col>
      </v-row>

      <v-sheet v-if="latestPrice">
        <v-divider class="mt-2 mb-2" />
        <h4>{{ $t('ProductCard.LatestPrice') }}</h4>
        <PricePriceRow :price="latestPrice" :productQuantity="product.product_quantity" :productQuantityUnit="product.product_quantity_unit" />
        <PriceFooterRow :price="latestPrice" />
      </v-sheet>
    </v-container>
  </v-card>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import utils from '../utils.js'

export default {
  components: {
    PriceCountChip: defineAsyncComponent(() => import('../components/PriceCountChip.vue')),
    ProductBrands: defineAsyncComponent(() => import('../components/ProductBrands.vue')),
    ProductQuantityChip: defineAsyncComponent(() => import('../components/ProductQuantityChip.vue')),
    ProductCategoriesChip: defineAsyncComponent(() => import('../components/ProductCategoriesChip.vue')),
    ProductLabelsChip: defineAsyncComponent(() => import('../components/ProductLabelsChip.vue')),
    ProductMissingChip: defineAsyncComponent(() => import('../components/ProductMissingChip.vue')),
    ProductBarcodeChip: defineAsyncComponent(() => import('../components/ProductBarcodeChip.vue')),
    ProductBarcodeInvalidChip: defineAsyncComponent(() => import('../components/ProductBarcodeInvalidChip.vue')),
    PricePriceRow: defineAsyncComponent(() => import('../components/PricePriceRow.vue')),
    PriceFooterRow: defineAsyncComponent(() => import('../components/PriceFooterRow.vue')),
  },
  props: {
    product: {
      type: Object,
      default: null
    },
    latestPrice: {
      type: Object,
      default: null
    },
    hideProductBarcode: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      productImageDefault: 'https://world.openfoodfacts.org/images/icons/dist/packaging.svg',
    }
  },
  computed: {
    ...mapStores(useAppStore),
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
    showProductBarcode() {
      return !this.hideProductBarcode && this.appStore.user.username && this.appStore.user.product_display_barcode
    },
    barcodeInvalid() {
      return this.product.code && !utils.isValidBarcode(this.product.code)
    }
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
