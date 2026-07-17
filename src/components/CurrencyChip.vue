<template>
  <v-chip label size="small" :prepend-icon="CURRENCY_ICON" density="comfortable" :color="currencyMissingAndShowError ? 'error' : 'default'" @click="goToCurrency()">
    <span v-if="currency">{{ currency }}</span>
    <span v-else-if="currencyMissingAndShowError">
      <i class="text-lowercase">{{ $t('Common.Currency') }}</i>
      <v-tooltip activator="parent" open-on-click location="top">
        {{ $t('Common.CurrencyMissing') }}
      </v-tooltip>
    </span>
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
    }
  },
  methods: {
    goToCurrency() {
      if (this.readonly || !this.currency) {
        return
      }
      this.$router.push({ path: `/currencies/${this.currency}` })
    },
  }
}
</script>
