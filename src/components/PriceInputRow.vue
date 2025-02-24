<template>
  <v-row v-if="mode === 'edit'">
    <v-col cols="12">
      <v-row v-if="productIsTypeCategory">
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
      <v-row class="mt-0">
        <v-col :cols="priceForm.price_is_discounted ? '6' : '12'" class="pb-0">
          <v-text-field
            :model-value="priceForm.price"
            density="comfortable"
            :label="priceForm.price_is_discounted ? $t('PriceForm.LabelDiscounted') : $t('PriceForm.Label')"
            type="text"
            inputmode="decimal"
            :rules="priceRules"
            :suffix="priceForm.currency"
            :hint="getPricePerUnit(priceForm.price)"
            persistent-hint
            @update:modelValue="newValue => priceForm.price = fixComma(newValue)"
          >
            <template v-if="!hideCurrencyChoice" #prepend-inner>
              <!-- image from https://www.svgrepo.com/svg/32717/currency-exchange -->
              <img src="/currency-exchange-svgrepo-com.svg" class="icon-info-currency" @click="changeCurrencyDialog = true">
            </template>
          </v-text-field>
        </v-col>
        <v-col v-if="priceForm.price_is_discounted" cols="6" class="pb-0">
          <v-text-field
            :model-value="priceForm.price_without_discount"
            density="comfortable"
            :label="$t('PriceForm.LabelFull')"
            type="text"
            inputmode="decimal"
            :rules="priceRules"
            :suffix="priceForm.currency"
            :hint="getPricePerUnit(priceForm.price_without_discount)"
            persistent-hint
            @update:modelValue="newValue => priceForm.price_without_discount = fixComma(newValue)"
          />
        </v-col>
      </v-row>
      <v-row class="mt-0">
        <v-col cols="6" class="pb-0">
          <v-checkbox
            v-model="priceForm.price_is_discounted"
            density="compact"
            :label="$t('Common.Discount')"
            :true-value="true"
            hide-details="auto"
          />
        </v-col>
        <v-col v-if="priceForm.price_is_discounted" cols="6">
          <v-select
            v-model="priceForm.discount_type"
            density="compact"
            :label="$t('Common.DiscountType')"
            :items="priceDiscountTypeSelectorDisplayList"
            :item-title="item => item.value ? $t('Common.' + item.value) : ''"
            :item-value="item => item.key"
            hide-details="auto"
          />
        </v-col>
        <v-col v-if="proofIsTypeReceipt" cols="6" :class="priceForm.price_is_discounted ? 'offset-6' : ''">
          <v-text-field
            v-model="priceForm.receipt_quantity"
            density="compact"
            :label="$t('Common.QuantityBought')"
            type="text"
            inputmode="decimal"
            :rules="receiptQuantityRules"
            :prepend-inner-icon="PROOF_TYPE_RECEIPT_ICON"
            hide-details="auto"
          />
        </v-col>
      </v-row>
    </v-col>

    <ChangeCurrencyDialog
      v-if="changeCurrencyDialog"
      v-model="changeCurrencyDialog"
      @newCurrencySelected="setCurrencyData($event)"
      @close="changeCurrencyDialog = false"
    />
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
</template>

<script>
import { defineAsyncComponent } from 'vue'
import constants from '../constants'
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
    priceRules() {
      return [
        value => !!value && !!value.trim() || this.$t('PriceRules.AmountRequired'),
        value => !value.trim().match(/ /) || this.$t('PriceRules.NoSpaces'),
        value => !isNaN(value) || this.$t('PriceRules.Number'),
        value => Number(value) >= 0 || this.$t('PriceRules.Positive'),
        value => !value.match(/\.\d{3}/) || this.$t('PriceRules.TwoDecimals'),
      ]
    },
    receiptQuantityRules() {
      if (!this.priceForm.receipt_quantity) return [() => true]  // optional field
      return [
        value => !isNaN(value) || this.$t('PriceRules.Number'),
        value => Number(value) >= 0 || this.$t('PriceRules.Positive'),
        value => !value.match(/\.\d{3}/) || this.$t('PriceRules.TwoDecimals'),
      ]
    },
    productIsTypeCategory() {
      return this.priceForm && this.priceForm.type === constants.PRICE_TYPE_CATEGORY
    },
    proofIsTypeReceipt() {
      return this.proofType === constants.PROOF_TYPE_RECEIPT
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
  methods: {
    setCurrencyData(currency) {
      this.priceForm.currency = currency
    },
    fixComma(input) {
      return input.replace(/,/g, '.')
    },
    getPriceValue(priceValue, priceCurrency) {
      return utils.prettyPrice(priceValue, priceCurrency)
    },
    getPricePerUnit(price) {
      if (price) {
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
    getPriceValueDisplay(price) {
      if (price) {
        price = parseFloat(price)
        if (this.hasCategoryTag) {
          return this.getPricePerUnit(price)
        }
        return this.getPriceValue(price, this.priceForm.currency)
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
