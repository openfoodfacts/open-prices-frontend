<template>
  <v-chip label size="small" density="comfortable" :color="currencyMissingAndShowError ? 'error' : 'default'" :to="getCurrencyUrl">
    <v-icon :start="!currencyMissingAndShowError" :icon="CURRENCY_ICON" />
    <span v-if="currency" :title="currency">{{ currency }}</span>
    <v-tooltip v-if="currencyMissingAndShowError" activator="parent" open-on-click location="top">
      {{ $t('Common.CurrencyMissing') }}
    </v-tooltip>
  </v-chip>
</template>

<script>
import constants from '../constants'

export default {
  props: {
    currency: {
      type: String,
      default: null
    },
    showErrorIfCurrencyMissing: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      CURRENCY_ICON: constants.CURRENCY_ICON,
    }
  },
  computed: {
    currencyMissingAndShowError() {
      return !this.currency && this.showErrorIfCurrencyMissing
    },
    getCurrencyUrl() {
      return this.currency && !this.readonly ? `/currencies/${this.currency}` : null
    }
  }
}
</script>
