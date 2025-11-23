<template>
  <v-row>
    <v-col cols="12" class="pt-2 pb-2">
      <span class="mr-1">{{ getPriceValueDisplay(price.price) }}</span>
      <span v-if="hasProductQuantity" class="mr-1">({{ getPricePerUnit(price.price) }})</span>
      <span v-if="price.price_is_discounted">
        <v-chip class="ml-1 mr-1" color="red" variant="outlined" size="small" density="comfortable">
          {{ $t('PriceCard.Discount') }}
          <v-tooltip v-if="price.price_without_discount" activator="parent" open-on-click location="top">{{ $t('PriceCard.FullPrice') }} {{ getPriceValueDisplay(price.price_without_discount) }}</v-tooltip>
        </v-chip>
      </span>
      <span v-if="!hidePriceReceiptQuantity && price.receipt_quantity" class="ml-1">
        <PriceQuantityPurchasedChip :priceQuantityPurchased="price.receipt_quantity" />
      </span>
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import constants from '../constants'
import date_utils from '../utils/date.js'
import price_utils from '../utils/price.js'

export default {
  components: {
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
  data() {
    return {}
  },
  computed: {
    categoryTag() {
      return this.price.category_tag
    },
    hasCategoryTag() {
      return !!this.categoryTag
    },
    hasProductQuantity() {
      return !!this.productQuantity
    },
    priceCurrency() {
      return this.price.currency
    },
    pricePricePer() {
      return this.price.price_per
    },
  },
  methods: {
    getPriceValue(priceValue, priceCurrency) {
      return price_utils.prettyPrice(priceValue, priceCurrency)
    },
    getPricePerUnit(price) {
      price = parseFloat(price)
      if (this.hasCategoryTag) {
        if (this.pricePricePer === 'UNIT') {
          return this.$t('PriceCard.PriceValueDisplayUnit', [this.getPriceValue(price, this.priceCurrency)])
        }
        // default to 'KILOGRAM'
        return this.$t('PriceCard.PriceValueDisplayKilogram', [this.getPriceValue(price, this.priceCurrency)])
      }
      if (this.hasProductQuantity) {
        const pricePerUnit = (price / this.productQuantity) * 1000
        if (this.productQuantityUnit === constants.PRODUCT_QUANTITY_UNIT_ML) {
          return this.$t('PriceCard.PriceValueDisplayLitre', [this.getPriceValue(pricePerUnit, this.priceCurrency)])
        }
        return this.$t('PriceCard.PriceValueDisplayKilogram', [this.getPriceValue(pricePerUnit, this.priceCurrency)])
      }
    },
    getPriceValueDisplay(price) {
      price = parseFloat(price)
      if (this.hasCategoryTag) {
        return this.getPricePerUnit(price)
      }
      return this.getPriceValue(price, this.priceCurrency)
    },
    getDateFormatted(dateString) {
      return date_utils.prettyDate(dateString)
    },
  }
}
</script>
