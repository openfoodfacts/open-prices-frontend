<template>
  <v-row>
    <v-col :cols="priceForm.price_is_discounted ? '6' : '12'" sm="6">
      <v-text-field
        :model-value="priceForm.price"
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
    <v-col v-if="priceForm.price_is_discounted" cols="6">
      <v-text-field
        :model-value="priceForm.price_without_discount"
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
  <div class="d-inline">
    <v-switch v-model="priceForm.price_is_discounted" :label="$t('Common.Discount')" color="success" hide-details="auto" />
  </div>

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
import utils from '../utils.js'

export default {
  components: {
    ChangeCurrencyDialog: defineAsyncComponent(() => import('../components/ChangeCurrencyDialog.vue')),
  },
  props: {
    priceForm: {
      type: Object,
      default: () => ({
        price: null,
        currency: null,
        price_is_discounted: false,
        price_without_discount: null
      })
    },
    hideCurrencyChoice: {
      type: Boolean,
      default: false
    },
    product: {
      type: Object,
      default: null
    }
  },
  emits: ['filled'],
  data() {
    return {
      // currency selection
      changeCurrencyDialog: false,
    }
  },
  computed: {
    priceRules() {
      return [
        value => !!value && !!value.trim() || this.$t('PriceRules.AmountRequired'),
        value => !value.trim().match(/ /) || this.$t('PriceRules.NoSpaces'),
        value => !isNaN(value) || this.$t('PriceRules.Number'),
        value => Number(value) >= 0 || this.$t('PriceRules.Positive'),
        value => !value.match(/\.\d{3}/) || this.$t('PriceRules.TwoDecimals'),
      ];
    },
    priceFormFilled() {
      let keys = ['price', 'currency']
      return Object.keys(this.priceForm).filter(k => keys.includes(k)).every(k => !!this.priceForm[k])
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
      return input.replace(/,/g, '.');
    },
    getPriceValue(priceValue, priceCurrency) {
      return utils.prettyPrice(priceValue, priceCurrency)
    },
    getPricePerUnit(price) {
      if (price) {
        price = parseFloat(price)
        if (this.priceForm.category_tag) {
          if (this.priceForm.price_per === 'UNIT') {
            return this.$t('PriceCard.PriceValueDisplayUnit', [this.getPriceValue(price, this.priceForm.currency)])
          }
          // default to 'KILOGRAM'
          return this.$t('PriceCard.PriceValueDisplayKilogram', [this.getPriceValue(price, this.priceForm.currency)])
        }
        if (this.product && this.product.product_quantity) {
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
