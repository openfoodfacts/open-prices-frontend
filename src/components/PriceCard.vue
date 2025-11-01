<template>
  <v-card v-if="price" :id="'price_' + price.id" data-name="price-card">
    <v-container class="pa-2">
      <v-row>
        <v-col v-if="!hideProductImage" class="pr-0" style="max-width:20%;">
          <v-img v-if="product && product.image_url" :src="product.image_url" max-height="100px" @click="goToProduct()" />
          <v-img v-else :src="productImageDefault" height="50px" width="50px" style="filter:invert(.9);" />
        </v-col>
        <v-col :style="hideProductImage ? '' : 'max-width:80%'">
          <h3 v-if="!hideProductTitle" @click="goToProduct()" role="link" tabindex="0">
            {{ productTitle }}
          </h3>

          <p v-if="!hideProductDetails">
            <ProductDetails v-if="hasProduct" :product="product" :hideCategoriesAndLabels="true" :hideProductBarcode="hideProductBarcode" :readonly="readonly" />
            <PriceCategoryDetails v-else :price="price" />
          </p>

          <PricePriceRow v-if="price" class="mt-0" :price="price" :productQuantity="product ? product.product_quantity : null" :productQuantityUnit="product ? product.product_quantity_unit : null" :hidePriceReceiptQuantity="hidePriceReceiptQuantity" />
        </v-col>
      </v-row>

      <PriceFooterRow v-if="price && !hidePriceFooterRow" :price="price" :hidePriceProof="hidePriceProof" :hidePriceLocation="hidePriceLocation" :hidePriceOwner="hidePriceOwner" :hidePriceDate="hidePriceDate" :hidePriceCreated="hidePriceCreated" :hideProductDetails="hideProductDetails" :hideActionMenuButton="hideActionMenuButton" :readonly="readonly" />
    </v-container>
  </v-card>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import constants from '../constants'
import utils from '../utils.js'

export default {
  components: {
    ProductDetails: defineAsyncComponent(() => import('../components/ProductDetails.vue')),
    PriceCategoryDetails: defineAsyncComponent(() => import('../components/PriceCategoryDetails.vue')),
    PricePriceRow: defineAsyncComponent(() => import('../components/PricePriceRow.vue')),
    PriceFooterRow: defineAsyncComponent(() => import('../components/PriceFooterRow.vue'))
  },
  props: {
    price: {
      type: Object,
      default: null
    },
    product: {
      type: Object,
      default: null
    },
    hideProductImage: {
      type: Boolean,
      default: false
    },
    hideProductTitle: {
      type: Boolean,
      default: false
    },
    hideProductDetails: {
      type: Boolean,
      default: false
    },
    hideProductBarcode: {
      type: Boolean,
      default: true
    },
    hidePriceReceiptQuantity: {
      type: Boolean,
      default: true
    },
    hidePriceFooterRow: {
      type: Boolean,
      default: false
    },
    hidePriceLocation: {
      type: Boolean,
      default: false
    },
    hidePriceOwner: {
      type: Boolean,
      default: true
    },
    hidePriceDate: {
      type: Boolean,
      default: false
    },
    hidePriceProof: {
      type: Boolean,
      default: false
    },
    hidePriceCreated: {
      type: Boolean,
      default: false
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
      productTitle: null,  // see init
      productImageDefault: constants.PRODUCT_IMAGE_DEFAULT_URL
    }
  },
  computed: {
    ...mapStores(useAppStore),
    hasProduct() {
      return !!this.product
    },
    hasPrice() {
      return !!this.price
    },
    hasCategoryTag() {
      return !!this.price.category_tag
    },
    hasProductId() {
      return this.hasProduct && !!this.product.id
    },
    hasProductCode() {
      return this.hasProduct && !!this.product.code
    },
  },
  mounted() {
    this.getPriceProductTitle()
    // hack: add price.location object to price.proof if missing
    if (this.price && this.price.location && this.price.proof && !this.price.proof.location) {
      if (this.price.location_id === this.price.proof.location_id) {
        this.price.proof.location = this.price.location
      }
    }
  },
  methods: {
    getPriceProductTitle() {
      if (this.hasProductCode) {
        this.productTitle = this.product.product_name || this.price.product_code
      } else if (this.hasPrice && this.hasCategoryTag) {
        utils.getLocaleCategoryTag(this.appStore.getUserLanguage, this.price.category_tag).then((category) => {
          this.productTitle = category.name
        })
      }
    },
    getPriceProductCode() {
      if (this.hasProduct) {
        return this.product.code
      } else if (this.price.product_code) {
        return this.price.product_code
      } else if (this.price.category_tag) {
        return this.price.category_tag
      }
      return 'product code error'
    },
    goToProduct() {
      if (this.readonly) {
        return
      }
      this.$router.push({ path: `/products/${this.getPriceProductCode()}` })
    },
  },
}
</script>
