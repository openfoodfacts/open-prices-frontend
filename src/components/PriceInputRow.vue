<template>
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
      <div class="text-body-2 required">
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
      />
    </v-col>
    <v-col v-if="priceForm.price_is_discounted" cols="6" class="pb-0">
      <div class="text-body-2">
        {{ $t('PriceForm.LabelFull') }}
      </div>
      <v-text-field
        :model-value="priceForm.price_without_discount"
        density="compact"
        variant="outlined"
        type="text"
        inputmode="decimal"
        :rules="priceRulesOptional"
        :suffix="priceForm.currency"
        :hint="getPricePerUnit(priceForm.price_without_discount)"
        persistent-hint
        @update:modelValue="newValue => priceForm.price_without_discount = replaceCommaWithDot(newValue)"
      />
    </v-col>
  </v-row>
  <v-row class="mt-0">
    <v-col cols="6" class="pb-1">
      <v-switch
        v-model="priceForm.price_is_discounted"
        density="compact"
        color="success"
        :true-value="true"
        hide-details="auto"
      >
        <template #label>
          <span class="text-body-2">{{ $t('Common.Discount') }}</span>
        </template>
      </v-switch>
    </v-col>
    <v-col v-if="priceForm.price_is_discounted" cols="6">
      <div class="text-body-2">
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
      <div class="text-body-2">
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
  <v-row class="mt-0">
    <v-col v-if="!displayOwnerCommentField" cols="12">
      <a class="fake-link text-body-2" role="link" tabindex="0" @click="displayOwnerCommentField = true" @keydown.enter="displayOwnerCommentField = true">
        {{ $t('Common.AddComment') }}
      </a>
    </v-col>
    <v-col v-else cols="12">
      <div class="text-body-2">
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
</template>

<script>
import constants from '../constants'
import price_utils from '../utils/price.js'
import utils from '../utils.js'

export default {
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
      CATEGORY_PRICE_PER_LIST: [
        {key: 'KILOGRAM', value: this.$t('AddPriceSingle.CategoryPricePer.PerKg'), icon: 'mdi-weight-kilogram'},
        {key: 'UNIT', value: this.$t('AddPriceSingle.CategoryPricePer.PerUnit'), icon: 'mdi-numeric-1-circle'}
      ],
      priceDiscountTypeSelectorDisplayList: constants.PRICE_DISCOUNT_TYPE_SELECTOR_DISPLAY_LIST,
      PROOF_TYPE_RECEIPT_ICON: constants.PROOF_TYPE_RECEIPT_ICON,
    }
  },
  computed: {
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
    priceRulesOptional() {
      if (!this.priceForm.price_without_discount) return [() => true]  // optional field
      return [
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
    productPriceFormFilled() {
      let keys = ['price', 'currency']
      return Object.keys(this.priceForm).filter(k => keys.includes(k)).every(k => !!this.priceForm[k])
    },
    categoryPriceFormFilled() {
      let keys = ['price_per', 'price', 'currency']
      return Object.keys(this.priceForm).filter(k => keys.includes(k)).every(k => !!this.priceForm[k])
    },
    priceFormFilled() {
      return this.productIsTypeCategory ? this.categoryPriceFormFilled : this.productPriceFormFilled
    },
  },
  watch: {
    priceFormFilled: {
      handler(newPriceFormFilled, oldPriceFormFilled) {  // eslint-disable-line no-unused-vars
        this.$emit('filled', newPriceFormFilled)
      },
      immediate: true
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
    getPricePerUnit(price) {
      if (price && this.priceForm.currency) {
        price = parseFloat(price)
        if (this.priceForm.category_tag) {
          return price_utils.priceCategoryPerUnit(price, this.priceForm.currency, this.priceForm.price_per)
        }
        if (this.product.product_quantity) {
          return price_utils.priceProductPerUnit(price, this.priceForm.currency, this.product.product_quantity, this.product.product_quantity_unit)
        }
      }
      return null
    }
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
