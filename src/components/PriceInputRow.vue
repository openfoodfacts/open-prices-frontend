<template>
  <v-row v-if="mode === 'edit' && productIsTypeCategory">
    <v-col>
      <v-item-group v-model="priceForm.price_per" class="d-inline" mandatory>
        <v-item v-for="cpp in CATEGORY_PRICE_PER_LIST" :key="cpp.key" v-slot="{ isSelected, toggle }" :value="cpp.key">
          <v-chip class="mr-1" :class="isSelected ? 'border-success' : ''" variant="outlined" density="comfortable" @click="toggle">
            {{ cpp.value }}
            <v-icon end :icon="isSelected ? 'mdi-checkbox-marked-circle' : 'mdi-circle-outline'" :color="isSelected ? 'green' : ''" />
          </v-chip>
        </v-item>
      </v-item-group>
    </v-col>
  </v-row>
  <v-row v-if="mode === 'edit'" class="mt-0">
    <v-col :cols="priceForm.price_is_discounted ? '6' : '12'" class="pb-0">
      <div class="text-subtitle-2 required">
        {{ priceForm.price_is_discounted ? $t('PriceForm.LabelDiscounted') : $t('PriceForm.Label') }}
      </div>
      <v-text-field
        :model-value="priceForm.price"
        :class="priceForm.price && priceForm.currency ? 'outline-border-success' : 'outline-border-error'"
        density="compact"
        variant="outlined"
        type="text"
        inputmode="decimal"
        :rules="priceRules"
        :suffix="priceForm.currency"
        :hint="getPricePerUnit(priceForm.price)"
        persistent-hint
        @update:modelValue="newValue => priceForm.price = replaceCommaWithDot(newValue)"
      >
        <template v-if="!hideCurrencyChoice" #prepend-inner>
          <!-- image from https://www.svgrepo.com/svg/32717/currency-exchange -->
          <img src="/currency-exchange-svgrepo-com.svg" class="icon-info-currency" alt="Currency Exchange icon" @click="changeCurrencyDialog = true" role="button" tabindex="0" />
        </template>
      </v-text-field>
    </v-col>
    <v-col v-if="priceForm.price_is_discounted" cols="6" class="pb-0">
      <div class="text-subtitle-2">
        {{ $t('PriceForm.LabelFull') }}
      </div>
      <v-text-field
        :model-value="priceForm.price_without_discount"
        density="compact"
        variant="outlined"
        type="text"
        inputmode="decimal"
        :rules="priceRules"
        :suffix="priceForm.currency"
        :hint="getPricePerUnit(priceForm.price_without_discount)"
        persistent-hint
        @update:modelValue="newValue => priceForm.price_without_discount = replaceCommaWithDot(newValue)"
      />
    </v-col>
  </v-row>
  <v-row v-if="mode === 'edit'" class="mt-0">
    <v-col cols="6" class="pb-1">
      <v-switch
        v-model="priceForm.price_is_discounted"
        density="compact"
        color="success"
        :label="$t('Common.Discount')"
        :true-value="true"
        hide-details="auto"
      />
    </v-col>
    <v-col v-if="priceForm.price_is_discounted" cols="6">
      <div class="text-subtitle-2">
        {{ $t('Common.DiscountType') }}
      </div>
      <v-select
        v-model="priceForm.discount_type"
        density="compact"
        variant="outlined"
        :items="priceDiscountTypeSelectorDisplayList"
        :item-title="item => item.value ? $t('Common.' + item.value) : ''"
        :item-value="item => item.key"
        hide-details="auto"
      />
    </v-col>
    <v-col v-if="proofIsTypeReceipt" cols="6" :class="priceForm.price_is_discounted ? 'offset-6' : ''">
      <div class="text-subtitle-2">
        <v-icon size="small" :icon="PROOF_TYPE_RECEIPT_ICON" /> {{ $t('Common.QuantityBought') }}
      </div>
      <v-text-field
        v-model="priceForm.receipt_quantity"
        density="compact"
        variant="outlined"
        type="text"
        inputmode="decimal"
        :rules="receiptQuantityRules"
        :suffix="receiptQuantitySuffix"
        hide-details="auto"
        @update:modelValue="newValue => priceForm.receipt_quantity = replaceCommaWithDot(newValue)"
      />
    </v-col>
  </v-row>
  <v-row v-if="mode === 'edit'" class="mt-0">
    <v-col v-if="!displayOwnerCommentField" cols="12">
      <a class="fake-link" @click="displayOwnerCommentField = true" role="link" tabindex="0">
        {{ $t('Common.AddComment') }}
      </a>
    </v-col>
    <v-col v-else cols="12">
      <div class="text-subtitle-2">
        {{ $t('Common.Comment') }}
      </div>
      <v-textarea
        v-model="priceForm.owner_comment"
        rows="2"
        density="compact"
        variant="outlined"
        type="text"
        hide-details="auto"
        clearable
      />
    </v-col>
  </v-row>
  <v-row v-else-if="mode === 'display'">
    <v-col cols="12">
      <v-alert
        icon="mdi-currency-usd"
        density="compact"
      >
        <PricePriceRow :price="priceForm" />
      </v-alert>
    </v-col>
  </v-row>

  <ChangeCurrencyDialog
    v-if="changeCurrencyDialog"
    v-model="changeCurrencyDialog"
    @newCurrencySelected="setCurrencyData($event)"
    @close="changeCurrencyDialog = false"
  />
</template>

<script>
import { defineAsyncComponent } from 'vue'
import constants from '../constants'
import price_utils from '../utils/price.js'
import utils from '../utils.js'

export default {
  components: {
    PricePriceRow: defineAsyncComponent(() => import('../components/PricePriceRow.vue')),
    ChangeCurrencyDialog: defineAsyncComponent(() => import('../components/ChangeCurrencyDialog.vue')),
  },
  props: {
    priceForm: {
      type: Object,
      default: () => ({
        type: null,  // 'CATEGORY' or 'PRODUCT'  // transform into productType prop ?
        price: null,
        price_per: null,
        price_is_discounted: false,
        price_without_discount: null,
        discount_type: null,
        currency: null,
        receipt_quantity: null,
      })
    },
    mode: {
      type: String,
      default: constants.PRICE_FORM_DISPLAY_LIST[1].key,  // 'edit'
    },
    hideCurrencyChoice: {
      type: Boolean,
      default: false
    },
    product: {
      type: Object,
      default: null
    },
    proofType: {
      type: String,
      default: null
    },
  },
  emits: ['filled'],
  data() {
    return {
      displayOwnerCommentField: null,  // see mounted
      changeCurrencyDialog: false,
      CATEGORY_PRICE_PER_LIST: [
        {key: 'KILOGRAM', value: this.$t('AddPriceSingle.CategoryPricePer.PerKg'), icon: 'mdi-weight-kilogram'},
        {key: 'UNIT', value: this.$t('AddPriceSingle.CategoryPricePer.PerUnit'), icon: 'mdi-numeric-1-circle'}
      ],
      priceDiscountTypeSelectorDisplayList: constants.PRICE_DISCOUNT_TYPE_SELECTOR_DISPLAY_LIST,
      PROOF_TYPE_RECEIPT_ICON: constants.PROOF_TYPE_RECEIPT_ICON,
    }
  },
  computed: {
    categoryTag() {
      return this.priceForm.category_tag
    },
    hasCategoryTag() {
      return !!this.categoryTag
    },
    productIsTypeCategory() {
      return this.priceForm && (this.priceForm.type === constants.PRICE_TYPE_CATEGORY)
    },
    proofIsTypeReceipt() {
      return this.proofType === constants.PROOF_TYPE_RECEIPT
    },
    priceRules() {
      return [
        value => !!value && !!value.toString().trim() || this.$t('PriceRules.AmountRequired'),
        value => !value.toString().trim().match(/ /) || this.$t('PriceRules.NoSpaces'),
        value => !isNaN(value) || this.$t('PriceRules.Number'),
        value => Number(value) >= 0 || this.$t('PriceRules.Positive'),
        value => !value.toString().match(/\.\d{3}/) || this.$t('PriceRules.TwoDecimals'),
        value => !!value && !!this.priceForm.currency || this.$t('Common.CurrencyMissing'),
      ]
    },
    receiptQuantityRules() {
      if (!this.priceForm.receipt_quantity) return [() => true]  // optional field
      return [
        value => !value.toString().trim().match(/ /) || this.$t('PriceRules.NoSpaces'),
        value => !isNaN(value) || this.$t('PriceRules.Number'),
        value => Number(value) >= 0 || this.$t('PriceRules.Positive'),
        value => !value.toString().match(/\.\d{4}/) || this.$t('PriceRules.ThreeDecimals'),
      ]
    },
    receiptQuantitySuffix() {
      if (this.proofIsTypeReceipt) {
        if (this.priceForm.price_per === 'KILOGRAM') {
          return this.$t('Common.UnitKilogram')
        }
      }
      return null
    },
    priceFormFilled() {
      let keysProduct = ['price', 'currency']
      let keysCategory = ['price_per', 'price', 'currency']
      return this.productIsTypeCategory ? Object.keys(this.priceForm).filter(k => keysCategory.includes(k)).every(k => !!this.priceForm[k]) : Object.keys(this.priceForm).filter(k => keysProduct.includes(k)).every(k => !!this.priceForm[k])
    },
  },
  watch: {
    priceFormFilled(newPriceFormFilled, oldPriceFormFilled) {  // eslint-disable-line no-unused-vars
      this.$emit('filled', newPriceFormFilled)
    }
  },
  mounted() {
    this.displayOwnerCommentField = !!this.priceForm.owner_comment
  },
  methods: {
    setCurrencyData(currency) {
      this.priceForm.currency = currency
    },
    replaceCommaWithDot(input) {
      return utils.replaceCommaWithDot(input)
    },
    getPriceValue(priceValue, priceCurrency) {
      return price_utils.prettyPrice(priceValue, priceCurrency)
    },
    getPricePerUnit(price) {
      if (price && this.priceForm.currency) {
        price = parseFloat(price)
        if (this.priceForm.type === 'CATEGORY' && this.priceForm.category_tag) {
          if (this.priceForm.price_per === 'UNIT') {
            return this.$t('PriceCard.PriceValueDisplayUnit', [this.getPriceValue(price, this.priceForm.currency)])
          }
          // default to 'KILOGRAM'
          return this.$t('PriceCard.PriceValueDisplayKilogram', [this.getPriceValue(price, this.priceForm.currency)])
        }
        else if (this.priceForm.type === 'PRODUCT' && this.product && this.product.product_quantity) {
          const pricePerUnit = (price / this.product.product_quantity) * 1000
          if (this.product.product_quantity_unit === constants.PRODUCT_QUANTITY_UNIT_ML) {
            return this.$t('PriceCard.PriceValueDisplayLitre', [this.getPriceValue(pricePerUnit, this.priceForm.currency)])
          }
          return this.$t('PriceCard.PriceValueDisplayKilogram', [this.getPriceValue(pricePerUnit, this.priceForm.currency)])
        }
      }
      return null
    },
  }
}
</script>

<style scoped>
.icon-info-currency {
  cursor: pointer;
  width: 24px;
  height: 24px;
}
</style>
