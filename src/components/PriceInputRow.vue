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
      />
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
    <v-switch v-model="priceForm.price_is_discounted" :label="$t('Common.Discount')" color="success" hide-details="auto" />
  </div>

  <v-row v-if="!showEditCurrencies">
    <v-col>
      <v-select 
        v-model="priceForm.currency" 
        :disabled="userFavoriteCurrencies.length <= 1" 
        :label="$t('ChangeCurrencyDialog.Currency')" 
        :items="userFavoriteCurrencies" 
      />
    </v-col>
    <v-col>
      <v-btn 
        size="small" 
        icon="mdi-pencil" 
        aria-label="Edit currencies" 
        @click="openEditCurrencies" 
      />
    </v-col>
  </v-row>
  <v-row v-else>
    <v-col>
      <v-autocomplete 
        v-model="userFavoriteCurrencies"
        :label="$t('UserSettings.CurrencyLabel')"
        :items="currencyList"
        :rules="[v => !!(v && v.length) || $t('UserSettings.CurrencyRequired')]"
        chips
        closable-chips
        multiple
        hide-details="auto"
      />
    </v-col>
    <v-col>
      <v-btn 
        size="small" 
        :disabled="userFavoriteCurrencies.length === 0" 
        icon="mdi-check" 
        aria-label="Save currencies" 
        @click="closeEditCurrencies" 
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import countryData from '../i18n/data/countries.json'

export default {
  props: {
    priceForm: {
      type: Object,
      default: () => ({ price: null, currency: null, price_is_discounted: false, price_without_discount: null })
    },
  },
  emits: ['filled'],
  data() {
    return {
      showEditCurrencies: false,
      userFavoriteCurrencies: [],
      currencyList: [],
    }
  },
  computed: {
    ...mapStores(useAppStore),

    priceRules() {
      return [
        value => !!value && !!value.trim() || this.$t('PriceRules.AmountRequired'),
        value => !value.trim().match(/ /) || this.$t('PriceRules.NoSpaces'),
        value => !isNaN(value) || this.$t('PriceRules.Number'),
        value => Number(value) >= 0 || this.$t('PriceRules.Positive'),
        value => !value.match(/\.\d{3}/) || this.$t('PriceRules.TwoDecimals'),
      ];
  }},
  watch: {
    priceFormFilled(newPriceFormFilled, oldPriceFormFilled) {  // eslint-disable-line no-unused-vars
      this.$emit('filled', newPriceFormFilled)
    }
  },
  mounted(){
    this.initCurrencies()
  },
    priceFormFilled() {
      let keys = ['price', 'currency']
      return Object.keys(this.priceForm).filter(k => keys.includes(k)).every(k => !!this.priceForm[k])
    },
  methods: {
    initCurrencies() {
      const appStore = useAppStore();
    this.userFavoriteCurrencies = appStore.getUserFavoriteCurrencies;

    const currencies = countryData
      .flatMap(country => country.currency)
      .filter(currency => currency !== null && currency.length > 0);
    
    this.currencyList = [...new Set(currencies)];
    },
    openEditCurrencies() {
      this.showEditCurrencies = true
    },
    closeEditCurrencies(){
      if (!this.userFavoriteCurrencies.length) return
      
      // prevent from being out of sync
      if (!this.userFavoriteCurrencies.includes(this.priceForm.currency)) {
        const newUserCurrency  = this.userFavoriteCurrencies[0]
        this.priceForm.currency = newUserCurrency
        this.appStore.setLastCurrencyUsed(newUserCurrency)
      }

      this.showEditCurrencies = false
      this.appStore.setFavoriteCurrencies(this.userFavoriteCurrencies)
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
