<template>
  <v-chip label size="small" prepend-icon="mdi-cash" density="comfortable" :color="currencyMissingAndShowError ? 'error' : 'default'">
    <span v-if="proof.currency">{{ proof.currency }}</span>
    <span v-else-if="currencyMissingAndShowError">
      <i class="text-lowercase">{{ $t('Common.Currency') }}</i>
      <v-tooltip activator="parent" open-on-click location="top">
        {{ $t('Common.CurrencyMissing') }}
      </v-tooltip>
    </span>
  </v-chip>
</template>

<script>
export default {
  props: {
    proof: {
      type: Object,
      default: null
    },
    showErrorIfCurrencyMissing: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currencyMissingAndShowError() {
      return !this.proof.currency && this.showErrorIfCurrencyMissing
    }
  }
}
</script>
