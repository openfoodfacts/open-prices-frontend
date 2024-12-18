<template>
  <v-row>
    <v-col cols="6">
      <v-text-field
        v-model="proofMetadataForm.date"
        :label="$t('Common.Date')"
        type="date"
        :max="currentDate"
        hide-details="auto"
      />
    </v-col>
    <v-col cols="6">
      <v-select
        v-model="proofMetadataForm.currency"
        :label="$t('Common.Currency')"
        :items="userFavoriteCurrencies"
        hide-details="auto"
      />
    </v-col>
  </v-row>
  <v-row v-if="proofIsTypeReceipt">
    <v-col cols="6">
      <v-text-field
        v-model="proofMetadataForm.receipt_price_count"
        density="compact"
        :label="$t('Common.ReceiptPriceCount')"
        type="text"
        inputmode="numeric"
        :rules="priceCountRules"
        :prepend-inner-icon="PROOF_TYPE_RECEIPT_ICON"
        hide-details="auto"
      />
    </v-col>
    <v-col cols="6">
      <v-text-field
        v-model="proofMetadataForm.receipt_price_total"
        density="compact"
        :label="$t('Common.ReceiptPriceTotal')"
        type="text"
        inputmode="decimal"
        :rules="priceTotalRules"
        :prepend-inner-icon="PROOF_TYPE_RECEIPT_ICON"
        :suffix="proofMetadataForm.currency"
        hide-details="auto"
        @update:modelValue="newValue => proofMetadataForm.receipt_price_total = fixComma(newValue)"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import constants from '../constants'
import utils from '../utils.js'

export default {
  props: {
    proofMetadataForm: {
      type: Object,
      default: () => ({
        date: this.currentDate,
        currency: null,
        receipt_price_count: null,
        receipt_price_total: null
      })
    },
    proofType: {
      type: String,
      default: null
    },
  },
  data() {
    return {
      currentDate: utils.currentDate(),
      PROOF_TYPE_RECEIPT_ICON: constants.PROOF_TYPE_RECEIPT_ICON,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    proofMetadataFormFilled() {
      let keys = ['date', 'currency']
      return Object.keys(this.proofMetadataForm).filter(k => keys.includes(k)).every(k => !!this.proofMetadataForm[k])
    },
    userFavoriteCurrencies() {
      return this.appStore.getUserFavoriteCurrencies
    },
    proofIsTypeReceipt() {
      return this.proofType === constants.PROOF_TYPE_RECEIPT
    },
    priceCountRules() {
      if (!this.proofMetadataForm.receipt_price_count) return [() => true]  // optional field
      return [
        value => !isNaN(value) || this.$t('PriceRules.Number'),
        value => Number(value) >= 1 || this.$t('PriceRules.Positive'),
      ]
    },
    priceTotalRules() {
      if (!this.proofMetadataForm.receipt_price_total) return [() => true]  // optional field
      return [
        value => !!value && !value.trim().match(/ /) || this.$t('PriceRules.NoSpaces'),
        value => !isNaN(value) || this.$t('PriceRules.Number'),
        value => Number(value) >= 0 || this.$t('PriceRules.Positive'),
        value => !value.match(/\.\d{3}/) || this.$t('PriceRules.TwoDecimals'),
      ]
    },
  },
  methods: {
    fixComma(input) {
      return input.replace(/,/g, '.')
    },
  }
}
</script>
