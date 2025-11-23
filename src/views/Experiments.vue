<template>
  <v-row>
    <v-col cols="12" sm="6" lg="4">
      <v-card
        :title="$t('Router.ProofPriceTagAssistant.Title')"
        prepend-icon="mdi-draw"
        append-icon="mdi-arrow-right"
        to="/experiments/proof-price-tag-assistant"
      />
    </v-col>
    <v-col cols="12" sm="6" lg="4">
      <v-card
        :title="$t('Router.ReceiptAssistant.Title')"
        prepend-icon="mdi-receipt-text-outline"
        append-icon="mdi-arrow-right"
        to="/experiments/receipt-assistant"
      />
    </v-col>
    <v-col cols="12" sm="6" lg="4">
      <v-card
        :title="$t('Router.CreateOffProduct.Title')"
        prepend-icon="mdi-plus"
        append-icon="mdi-arrow-right"
        to="/experiments/create-off-product"
      />
    </v-col>
  </v-row>

  <!--
    OLD experiments
    /experiments/challenge (moved to /challenge)
    /experiments/price-validation-assistant (moved to /prices/add/validate)
  -->
</template>

<script>
</script>
