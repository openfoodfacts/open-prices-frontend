<template>
  <v-row>
    <v-col cols="12" sm="6" lg="4">
      <v-card
        :title="$t('Router.PriceTagAssistant.Title')"
        prepend-icon="mdi-draw"
        append-icon="mdi-arrow-right"
        to="/experiments/price-tag-assistant"
      />
    </v-col>
    <v-col cols="12" sm="6" lg="4">
      <v-card
        :title="$t('Router.PriceValidationAssistant.Title')"
        prepend-icon="mdi-checkbox-marked-circle-plus-outline"
        append-icon="mdi-arrow-right"
        to="/experiments/price-validation-assistant"
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
  </v-row>

  <br>

  <v-row>
    <v-col cols="12" sm="6" lg="4">
      <v-card
        :title="$t('Router.PriceAddSingle.Title')"
        prepend-icon="mdi-tag-plus-outline"
        append-icon="mdi-arrow-right"
        to="/prices/add/single"
      />
    </v-col>
    <v-col cols="12" sm="6" lg="4">
      <v-card
        :title="$t('Router.ProofAddSingle.Title')"
        prepend-icon="mdi-image-plus"
        append-icon="mdi-arrow-right"
        to="/proofs/add/single"
      />
    </v-col>
  </v-row>
</template>

<script>
</script>
