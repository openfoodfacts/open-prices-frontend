<template>
  <v-card v-if="product" :id="'product_' + product.code" :class="isSelected ? 'border-success' : ''" data-name="product-card">
    <v-container class="pa-2" :style="latestPrice ? 'position:relative;' : ''">
      <v-row v-if="product">
        <v-col class="pr-0" style="max-width:20%">
          <v-img v-if="product.image_url" :src="product.image_url" max-height="100px" @click="clickProduct()" />
          <v-img v-if="!product.image_url" :src="productImageDefault" height="100px" width="100px" style="filter:invert(.9);" />
        </v-col>
        <v-col style="max-width:80%;">
          <v-row>
            <v-col :cols="!isSelected ? '12' : '10'">
              <h3 id="product-title" role="link" tabindex="0" @click="clickProduct()" @keydown.enter="clickProduct()">
                {{ getProductTitle() }}
              </h3>
            </v-col>
            <v-col v-if="isSelected" cols="2">
              <v-btn class="float-right" icon="mdi-pencil" size="x-small" density="comfortable" variant="text" :title="$t('Common.Edit')" @click="clickProduct()" />
            </v-col>
          </v-row>

          <ProductDetailsRow class="mt-0" :product="product" :hidePriceCount="hidePriceCount" :hideCategoriesAndLabels="hideCategoriesAndLabels" :hideProductBarcode="hideProductBarcode" :hideBarcodeErrors="false" :hideActionMenuButton="hideActionMenuButton" :readonly="readonly" />
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
    ProductDetailsRow: defineAsyncComponent(() => import('../components/ProductDetailsRow.vue')),
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
    isSelected: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
  },
  emits: ['editProduct'],
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
    clickProduct() {
      if (this.isSelected) {
        this.$emit('editProduct', this.product)
        return
      }
      if (this.readonly) {
        return
      }
      this.$router.push({ path: `/products/${this.product.code}` })
    },
  }
}
</script>
