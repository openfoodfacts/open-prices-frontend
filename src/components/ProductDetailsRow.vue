<template>
  <v-row>
    <v-col :cols="hideActionMenuButton ? '12' : '11'" class="pt-2 pb-2">
      <span class="chip-group">
        <PriceCountChip v-if="!hidePriceCount" :count="product.price_count" @click="goToProduct()" />
        <template v-if="hasProductSource">
          <ProductBrands :productBrands="product.brands" :readonly="readonly" />
          <ProductQuantityChip :productQuantity="product.product_quantity" :productQuantityUnit="product.product_quantity_unit" />
          <template v-if="!hideCategoriesAndLabels">
            <ProductCategoriesChip :productCategories="product.categories_tags" />
            <ProductLabelsChip :productLabels="product.labels_tags" />
          </template>
        </template>
        <ProductMissingChip v-else />
        <ProductBarcodeChip v-if="showProductBarcode" :product="product" />
        <ProductBarcodeTooLongChip v-if="!hideBarcodeErrors && barcodeTooLong" :barcode="product.code" />
        <ProductBarcodeInvalidChip v-if="!hideBarcodeErrors && barcodeInvalid" />
        <ProductSourceChip v-if="showProductSource" :product="product" />
      </span>
    </v-col>
    <v-col v-if="!hideActionMenuButton" cols="1">
      <ProductActionMenuButton :product="product" />
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import barcode_utils from '../utils/barcode.js'

export default {
  components: {
    PriceCountChip: defineAsyncComponent(() => import('../components/PriceCountChip.vue')),
    ProductBrands: defineAsyncComponent(() => import('../components/ProductBrands.vue')),
    ProductQuantityChip: defineAsyncComponent(() => import('../components/ProductQuantityChip.vue')),
    ProductCategoriesChip: defineAsyncComponent(() => import('../components/ProductCategoriesChip.vue')),
    ProductLabelsChip: defineAsyncComponent(() => import('../components/ProductLabelsChip.vue')),
    ProductMissingChip: defineAsyncComponent(() => import('../components/ProductMissingChip.vue')),
    ProductBarcodeChip: defineAsyncComponent(() => import('../components/ProductBarcodeChip.vue')),
    ProductBarcodeTooLongChip: defineAsyncComponent(() => import('../components/ProductBarcodeTooLongChip.vue')),
    ProductBarcodeInvalidChip: defineAsyncComponent(() => import('../components/ProductBarcodeInvalidChip.vue')),
    ProductSourceChip: defineAsyncComponent(() => import('../components/ProductSourceChip.vue')),
    ProductActionMenuButton: defineAsyncComponent(() => import('../components/ProductActionMenuButton.vue')),
  },
  props: {
    product: {
      type: Object,
      default: null
    },
    hidePriceCount: {
      type: Boolean,
      default: false
    },
    hideCategoriesAndLabels: {
      type: Boolean,
      default: false
    },
    hideProductBarcode: {
      type: Boolean,
      default: true
    },
    hideBarcodeErrors: {
      type: Boolean,
      default: true
    },
    hideActionMenuButton: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    ...mapStores(useAppStore),
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
      return !this.hideProductBarcode || this.appStore.user.username && this.appStore.user.product_display_barcode
    },
    barcodeTooLong() {
      return this.product.code && barcode_utils.isBarcodeTooLong(this.product.code)
    },
    barcodeInvalid() {
      return this.product.code && !barcode_utils.isBarcodeValid(this.product.code)
    },
    showProductSource() {
      return this.appStore.user.username && this.appStore.user.product_display_source
    },
  },
  methods: {
    goToProduct() {
      if (this.readonly) {
        return
      }
      this.$router.push({ path: `/products/${this.product.code}` })
    },
  },
}
</script>
