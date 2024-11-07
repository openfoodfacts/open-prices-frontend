<template>
  <v-row>
    <v-col cols="6">
      <h3 class="required mb-1">
        {{ $t('Common.Date') }}
      </h3>
      <v-text-field
        v-model="proofMetadataForm.date"
        :label="$t('Common.Date')"
        type="date"
        :max="currentDate"
        hide-details="auto"
      />
    </v-col>
    <v-col cols="6">
      <h3 class="required mb-1">
        {{ $t('Common.Currency') }}
        <span class="text-caption font-weight-regular">
          <a href="#">{{ $t('Common.Help') }}</a>
          <v-tooltip activator="parent" open-on-click location="top">
            {{ $t('ChangeCurrencyDialog.AddCurrencies') }}
          </v-tooltip>
        </span>
      </h3>
      <v-select
        v-model="proofMetadataForm.currency"
        :label="$t('Common.Currency')"
        :items="userFavoriteCurrencies"
        hide-details="auto"
      />
    </v-col>
  </v-row>
  <v-row v-if="isTypeReceipt">
    <v-col class="pb-0" cols="12">
      <h3 class="mb-1">
        {{ $t('Common.AdditionalInfo') }}
      </h3>
    </v-col>
  </v-row>
  <v-row v-if="isTypeReceipt" class="mt-0">
    <v-col cols="6">
      <v-text-field
        v-model="proofMetadataForm.receipt_price_count"
        :label="$t('Common.ReceiptPriceCount')"
        type="text"
        inputmode="numeric"
        hide-details="auto"
      />
    </v-col>
    <v-col cols="6">
      <v-text-field
        v-model="proofMetadataForm.receipt_price_total"
        :label="$t('Common.ReceiptPriceTotal')"
        type="text"
        inputmode="decimal"
        :rules="priceRules"
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
    proofType: {
      type: String,
      default: null
    },
    proofMetadataForm: {
      type: Object,
      default: () => ({
        date: this.currentDate,
        currency: null,
        receipt_price_count: null,
        receipt_price_total: null
      })
    },
  },
  data() {
    return {
      currentDate: utils.currentDate(),
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
    isTypeReceipt() {
      return this.proofType === constants.PROOF_TYPE_RECEIPT
    },
    priceRules() {
      return [
        // value => !!value && !!value.trim() || this.$t('PriceRules.AmountRequired'),
        value => !!value && !value.trim().match(/ /) || this.$t('PriceRules.NoSpaces'),
        value => !isNaN(value) || this.$t('PriceRules.Number'),
        value => Number(value) >= 0 || this.$t('PriceRules.Positive'),
        value => !value.match(/\.\d{3}/) || this.$t('PriceRules.TwoDecimals'),
      ];
    },
  },
  methods: {
    fixComma(input) {
      return input.replace(/,/g, '.');
    },
  }
}
</script>
