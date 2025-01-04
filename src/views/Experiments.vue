<template>
  <v-row>
    <v-col cols="12" sm="6" lg="4">
      <v-card
        :title="$t('Router.ProofAddMultiple.Title')"
        prepend-icon="mdi-image-multiple"
        to="/proofs/add/multiple"
      />
    </v-col>
    <v-col cols="12" sm="6" lg="4">
      <v-card
        :title="$t('Router.ContributionAssistant.Title')"
        prepend-icon="mdi-draw"
        to="/experiments/contribution-assistant"
      />
    </v-col>
    <v-col cols="12" sm="6" lg="4">
      <v-card
        :title="$t('Router.PriceValidationAssistant.Title')"
        prepend-icon="mdi-checkbox-marked-circle-plus-outline"
        to="/experiments/price-validation-assistant"
      />
    </v-col>
  </v-row>

  <br>

  <v-row>
    <v-col cols="12" sm="6" lg="4">
      <v-card
        :title="$t('Router.PriceAddSingle.Title')"
        prepend-icon="mdi-tag-plus-outline"
        to="/prices/add/single"
      />
    </v-col>
    <v-col cols="12" sm="6" lg="4">
      <v-card
        :title="$t('Router.ProofAddSingle.Title')"
        prepend-icon="mdi-image-plus"
        to="/proofs/add/single"
      />
    </v-col>
  </v-row>
</template>

<script>
</script>
