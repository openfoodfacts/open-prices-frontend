<template>
  <v-alert v-if="source === 'proof_price_tag'" type="info" density="compact" variant="outlined">
    {{ $t('ProofAdd.PriceTagAIWarning') }}
  </v-alert>
  <v-alert v-else-if="source === 'proof_receipt'" type="info" density="compact" variant="outlined">
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
