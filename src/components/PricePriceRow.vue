<template>
  <v-row style="margin-top:0;">
    <v-col cols="12" class="pt-2 pb-2">
      <span class="mr-1">{{ getPriceValueDisplay(priceValue) }}</span>
      <span v-if="hasProductQuantity" class="mr-1">({{ getPricePerUnit(priceValue) }})</span>
      <span v-if="price.price_is_discounted">
        <v-chip class="mr-1" color="red" variant="outlined" size="small" density="comfortable">
          {{ $t('PriceCard.Discount') }}
          <v-tooltip v-if="priceWithoutDiscountValue" activator="parent" open-on-click location="top">{{ $t('PriceCard.FullPrice') }} {{ getPriceValueDisplay(priceWithoutDiscountValue) }}</v-tooltip>
        </v-chip>
      </span>
      <i18n-t v-if="!hidePriceDate" keypath="PriceCard.PriceDate" tag="span">
        <template #date>
          <i>{{ getDateFormatted(price.date) }}</i>
        </template>
      </i18n-t>
    </v-col>
  </v-row>
</template>

<script>
import constants from '../constants'
import utils from '../utils.js'

export default {
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
    hidePriceDate: {
      type: Boolean,
      default: false
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
    priceValue() {
      return parseFloat(this.price.price)
    },
    priceWithoutDiscountValue() {
      return parseFloat(this.price.price_without_discount)
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
      return priceValue.toLocaleString(navigator.language, {
        style: 'currency',
        currency: priceCurrency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
      })
    },
    getPricePerUnit(price) {
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
      if (this.hasCategoryTag) {
        return this.getPricePerUnit(price)
      }
      return this.getPriceValue(price, this.priceCurrency)
    },
    getDateFormatted(dateString) {
      return utils.prettyDate(dateString)
    },
  }
}
</script>
