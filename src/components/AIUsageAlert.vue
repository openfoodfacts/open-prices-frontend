<template>
  <v-alert v-if="source === 'proof_price_tag'" data-name="ai-usage-proof-price-tag-alert" color="primary" density="compact" variant="outlined" icon="mdi-information">
    {{ $t('ProofAdd.PriceTagAIWarning') }}
  </v-alert>
  <v-alert v-else-if="source === 'proof_receipt'" data-name="ai-usage-proof-receipt-alert" color="primary" density="compact" variant="outlined" icon="mdi-information">
    {{ $t('ProofAdd.ReceiptAIWarning') }}
  </v-alert>
</template>

<script>
export default {
  props: {
    source: {
      type: String,
      default: '',
      examples: ['proof_price_tag', 'proof_receipt']
    },
  }
}
</script>
