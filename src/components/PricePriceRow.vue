<template>
  <v-row>
    <v-col cols="12" class="pt-2 pb-2">
      <span class="mr-1">{{ getPriceValueDisplay(price.price) }}</span>
      <span v-if="showPriceProductPerUnit" class="mr-1">({{ getPricePerUnit(price.price) }})</span>
      <PriceDiscountChip v-if="hasDiscount" class="ml-1 mr-1" :price="price" />
      <PriceQuantityPurchasedChip v-if="showReceiptQuantity" class="ml-1" :priceQuantityPurchased="price.receipt_quantity" />
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import constants from '../constants'
import price_utils from '../utils/price.js'

export default {
  components: {
    PriceDiscountChip: defineAsyncComponent(() => import('../components/PriceDiscountChip.vue')),
    PriceQuantityPurchasedChip: defineAsyncComponent(() => import('../components/PriceQuantityPurchasedChip.vue')),
  },
  props: {
    price: {
      type: Object,
      default: null
    },
    productQuantity: {
      type: Number,
      default: null
    },
    productQuantityUnit: {
      type: String,
      default: constants.PRODUCT_QUANTITY_UNIT_G
    },
    hidePriceReceiptQuantity: {
      type: Boolean,
      default: true
    },
  },
  computed: {
    showPriceProductPerUnit() {
      return this.price && this.productQuantity
    },
    hasDiscount() {
      return this.price && this.price.price_is_discounted
    },
    showReceiptQuantity() {
      return this.price && this.price.receipt_quantity && !this.hidePriceReceiptQuantity
    },
  },
  methods: {
    getPriceValue(priceValue, priceCurrency) {
      return price_utils.prettyPrice(priceValue, priceCurrency)
    },
    getPricePerUnit(price) {
      if (this.price.category_tag) {
        return price_utils.priceCategoryPerUnit(price, this.price.currency, this.price.price_per)
      }
      if (this.productQuantity) {
        return price_utils.priceProductPerUnit(price, this.price.currency, this.productQuantity, this.productQuantityUnit)
      }
    },
    getPriceValueDisplay(price) {
      price = parseFloat(price)
      if (this.price.category_tag) {
        return this.getPricePerUnit(price)
      }
      return this.getPriceValue(price, this.price.currency)
    },
  }
}
</script>
