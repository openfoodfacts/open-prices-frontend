<template>
  <v-card :id="'price_' + price.id">
    <v-container class="pa-2">
      <v-row>
        <v-col v-if="!hideProductImage" style="max-width:25%">
          <v-img v-if="product && product.image_url" :src="product.image_url" style="max-height:100px;width:100px" @click="goToProduct()"></v-img>
          <v-img v-if="!product || !product.image_url" :src="productImageDefault" style="height:100px;width:100px;filter:invert(.9);"></v-img>
        </v-col>
        <v-col style="max-width:75%">
          <h3 v-if="!hideProductTitle" @click="goToProduct()">{{ getPriceProductTitle() }}</h3>

          <p v-if="!hideProductDetails" class="mb-2">
            <span v-if="hasProductSource">
              <ProductBrands :productBrands="product.brands" :readonly="readonly"></ProductBrands>
            </span>
            <span v-if="hasProductName" class="mr-1">
              <ProductQuantityChip :productQuantity="product.product_quantity" :productQuantityUnit="product.product_quantity_unit"></ProductQuantityChip>
            </span>
            <span v-if="hasPriceOrigin" class="mr-1">
              <PriceOrigins :priceOrigins="price.origins_tags"></PriceOrigins>
            </span>
            <span v-if="hasPriceLabels" class="mr-1">
              <PriceLabels :priceLabels="price.labels_tags"></PriceLabels>
            </span>
          </p>

          <PricePrice v-if="price" :price="price" :productQuantity="product ? product.product_quantity : null" :productQuantityUnit="product ? product.product_quantity_unit : null" :hidePriceDate="hidePriceDate"></PricePrice>
        </v-col>
      </v-row>

      <PriceFooter v-if="price && !hidePriceFooter" :price="price" :hidePriceLocation="hidePriceLocation" :hidePriceProof="hidePriceProof" :readonly="readonly"></PriceFooter>
    </v-container>
  </v-card>
</template>

<script>
import utils from '../utils.js'
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    'ProductBrands': defineAsyncComponent(() => import('../components/ProductBrands.vue')),
    'ProductQuantityChip': defineAsyncComponent(() => import('../components/ProductQuantityChip.vue')),
    'PriceOrigins': defineAsyncComponent(() => import('../components/PriceOrigins.vue')),
    'PriceLabels': defineAsyncComponent(() => import('../components/PriceLabels.vue')),
    'PricePrice': defineAsyncComponent(() => import('../components/PricePrice.vue')),
    'PriceFooter': defineAsyncComponent(() => import('../components/PriceFooter.vue'))
  },
  props: {
    'price': null,
    'product': null,
    'hideProductImage': false,
    'hideProductTitle': false,
    'hideProductDetails': false,
    'hidePriceDate': false,
    'hidePriceFooter': false,
    'hidePriceLocation': false,
    'hidePriceProof': false,
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
    categoryTag() {
      return this.price.category_tag
    },
    hasProduct() {
      return !!this.product
    },
    hasPrice() {
      return !!this.price
    },
    hasCategoryTag() {
      return !!this.categoryTag
    },
    hasProductName() {
      return this.hasProduct && !!this.product.product_name
    },
    hasProductSource() {
      return this.hasProduct && !!this.product.source
    },
    hasProductQuantity() {
      return this.hasProduct && !!this.product.product_quantity
    },
    hasPriceOrigin() {
      return this.hasPrice && !!this.price.origins_tags && this.price.origins_tags.length
    },
    hasPriceLabels() {
      return this.hasPrice && !!this.price.labels_tags && this.price.labels_tags.length
    },
    getPriceCategoryName() {
      if (this.price && this.hasCategoryTag) {
        return utils.getCategoryName(this.price.category_tag)
      }
    },
  },
  methods: {
    getPriceProductTitle() {
      if (this.hasProductName) {
        return this.product.product_name
      } else if (this.hasPrice && this.price.product_code) {
        return this.price.product_code
      } else if (this.hasPrice && this.hasCategoryTag) {
        return this.getPriceCategoryName
      }
      return this.$t('PriceCard.UnknownProduct')
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
