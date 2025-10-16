<template>
  <PriceCountChip v-if="!hidePriceCount" class="mr-1" :count="product.price_count" @click="goToProduct()" />
  <span v-if="hasProductSource">
    <ProductBrands :productBrands="product.brands" :readonly="readonly" />
    <ProductQuantityChip class="mr-1" :productQuantity="product.product_quantity" :productQuantityUnit="product.product_quantity_unit" />
    <br v-if="!hideCategoriesAndLabels">
    <ProductCategoriesChip v-if="!hideCategoriesAndLabels" class="mr-1" :productCategories="product.categories_tags" />
    <ProductLabelsChip v-if="!hideCategoriesAndLabels" :productLabels="product.labels_tags" />
  </span>
  <ProductMissingChip v-else class="mr-1" />
  <br v-if="showProductBarcode || !hideBarcodeErrors && barcodeTooLong || !hideBarcodeErrors && barcodeInvalid || showProductSource">
  <ProductBarcodeChip v-if="showProductBarcode" :product="product" />
  <ProductBarcodeTooLongChip v-if="!hideBarcodeErrors && barcodeTooLong" class="mr-1" :barcode="product.code" />
  <ProductBarcodeInvalidChip v-if="!hideBarcodeErrors && barcodeInvalid" class="mr-1" />
  <ProductSourceChip v-if="showProductSource" :product="product" />
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
