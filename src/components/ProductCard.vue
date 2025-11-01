<template>
  <v-card v-if="product" :id="'product_' + product.code" data-name="product-card">
    <v-container class="pa-2" :style="latestPrice ? 'position:relative;' : ''">
      <v-row v-if="product">
        <v-col class="pr-0" style="max-width:20%">
          <v-img v-if="product.image_url" :src="product.image_url" max-height="100px" @click="goToProduct()" />
          <v-img v-if="!product.image_url" :src="productImageDefault" height="100px" width="100px" style="filter:invert(.9);" />
        </v-col>
        <v-col style="max-width:80%;">
          <h3 id="product-title" @click="goToProduct()" role="link" tabindex="0">
            {{ getProductTitle() }}
          </h3>

          <p>
            <ProductDetails :product="product" :hidePriceCount="hidePriceCount" :hideCategoriesAndLabels="hideCategoriesAndLabels" :hideProductBarcode="hideProductBarcode" :hideBarcodeErrors="false" :readonly="readonly" />
            <ProductActionMenuButton v-if="hasProductSource && !hideActionMenuButton" :product="product" />
          </p>
        </v-col>
      </v-row>
    </v-container>

    <v-divider v-if="latestPrice" />
    <v-container v-if="latestPrice" class="pa-2">
      <h4>{{ $t('ProductCard.LatestPrice') }}</h4>
      <PricePriceRow class="mt-0" :price="latestPrice" :productQuantity="product.product_quantity" :productQuantityUnit="product.product_quantity_unit" />
      <PriceFooterRow :price="latestPrice" />
    </v-container>
  </v-card>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import constants from '../constants'

export default {
  components: {
    ProductDetails: defineAsyncComponent(() => import('../components/ProductDetails.vue')),
    ProductActionMenuButton: defineAsyncComponent(() => import('../components/ProductActionMenuButton.vue')),
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
    hideActionMenuButton: {
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
      productImageDefault: constants.PRODUCT_IMAGE_DEFAULT_URL,
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
  },
  methods: {
    getProductTitle() {
      return this.product.product_name || this.product.code
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
