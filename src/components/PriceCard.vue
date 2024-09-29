<template>
  <v-card v-if="price" :id="'price_' + price.id" data-name="price-card">
    <v-container class="pa-2">
      <v-row>
        <v-col v-if="!hideProductImage" class="pr-0" style="max-width:20%;">
          <v-img v-if="product && product.image_url" :src="product.image_url" style="max-height:100px;" @click="goToProduct()" />
          <v-img v-else :src="productImageDefault" style="height:50px;width:50px;filter:invert(.9);" />
        </v-col>
        <v-col :style="hideProductImage ? '' : 'max-width:80%'">
          <h3 v-if="!hideProductTitle" @click="goToProduct()">
            {{ productTitle }}
          </h3>

          <p v-if="!hideProductDetails">
            <span v-if="hasProduct">
              <PriceCountChip :count="product.price_count" @click="goToProduct()" />
              <span v-if="hasProductSource">
                <ProductBrands :productBrands="product.brands" :readonly="readonly" />
                <ProductQuantityChip class="mr-1" :productQuantity="product.product_quantity" :productQuantityUnit="product.product_quantity_unit" />
                <br v-if="showProductBarcode">
                <ProductBarcodeChip v-if="showProductBarcode" :product="product" />
              </span>
              <ProductMissingChip v-else />
            </span>
            <span v-else>
              <PriceOrigins v-if="hasPriceOrigin" class="mr-1" :priceOrigins="price.origins_tags" />
              <PriceLabels v-if="hasPriceLabels" class="mr-1" :priceLabels="price.labels_tags" />
            </span>
          </p>

          <PricePriceRow v-if="price" :price="price" :productQuantity="product ? product.product_quantity : null" :productQuantityUnit="product ? product.product_quantity_unit : null" />
        </v-col>
      </v-row>

      <PriceFooterRow v-if="price && !hidePriceFooterRow" :price="price" :hidePriceLocation="hidePriceLocation" :hidePriceOwner="hidePriceOwner" :hidePriceDate="hidePriceDate" :hidePriceProof="hidePriceProof" :hidePriceCreated="hidePriceCreated" :hideProductDetails="hideProductDetails" :readonly="readonly" />
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
    ProductBarcodeChip: defineAsyncComponent(() => import('../components/ProductBarcodeChip.vue')),
    ProductMissingChip: defineAsyncComponent(() => import('../components/ProductMissingChip.vue')),
    PriceOrigins: defineAsyncComponent(() => import('../components/PriceOrigins.vue')),
    PriceLabels: defineAsyncComponent(() => import('../components/PriceLabels.vue')),
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
      default: true
    },
    readonly: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      productTitle: null,  // see init
      productImageDefault: 'https://world.openfoodfacts.org/images/icons/dist/packaging.svg',
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
    hasProductName() {
      return this.hasProduct && !!this.product.product_name
    },
    hasProductSource() {
      return this.hasProduct && !!this.product.source
    },
    hasPriceOrigin() {
      return this.hasPrice && !!this.price.origins_tags && this.price.origins_tags.length
    },
    hasPriceLabels() {
      return this.hasPrice && !!this.price.labels_tags && this.price.labels_tags.length
    },
    showProductBarcode() {
      return !this.hideProductBarcode
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
