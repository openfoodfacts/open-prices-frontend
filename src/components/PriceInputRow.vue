<template>
  <v-row>
    <v-col :cols="priceForm.price_is_discounted ? '6' : '12'" sm="6">
      <v-text-field
        :model-value="priceForm.price"
        :label="priceForm.price_is_discounted ? $t('PriceForm.LabelDiscounted') : $t('PriceForm.Label')"
        type="text"
        inputmode="decimal"
        :rules="priceRules"
        hide-details="auto"
        :suffix="priceForm.currency"
        @update:model-value="newValue => priceForm.price = fixComma(newValue)"
      >
        <template #prepend-inner>
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
        hide-details="auto"
        :suffix="priceForm.currency"
        @update:model-value="newValue => priceForm.price_without_discount = fixComma(newValue)"
      />
    </v-col>
  </v-row>
  <div class="d-inline">
    <v-checkbox v-model="priceForm.price_is_discounted" :label="$t('PriceForm.Discount')" hide-details="auto" />
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

export default {
  components: {
    ChangeCurrencyDialog: defineAsyncComponent(() => import('../components/ChangeCurrencyDialog.vue')),
  },
  props: {
    priceForm: {
      type: Object,
      default: () => ({ price: null, currency: null, price_is_discounted: false, price_without_discount: null })
    },
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
