<template>
  <v-banner
    icon="mdi-draw"
    bg-color="primary"
    rounded
    density="compact"
    @click="$router.push('/experiments/receipt-assistant')"
  >
    <v-banner-text style="padding-inline-end:10px;">
      {{ $t('ProofAdd.PromoReceiptAssistant') }}
    </v-banner-text>
    <v-spacer /><!-- needed to push v-banner-actions to the right on big screens -->
    <v-banner-actions>
      <v-btn icon="mdi-arrow-right" :aria-label="$t('Common.TryItOut')" to="/experiments/receipt-assistant" />
    </v-banner-actions>
  </v-banner>
</template>
