<template>
  <v-row>
    <v-col cols="12" sm="6" lg="4">
      <v-card
        :title="$t('Router.AddPriceSingle.Title')"
        prepend-icon="mdi-tag-plus-outline"
        to="/prices/add/single"
      />
    </v-col>
    <v-col cols="12" sm="6" lg="4">
      <v-card
        :title="$t('Router.AddProofSingle.Title')"
        prepend-icon="mdi-image-plus"
        to="/proofs/add/single"
      />
    </v-col>
    <v-col cols="12" sm="6" lg="4">
      <v-card
        :title="$t('Router.AddProofMultiple.Title')"
        prepend-icon="mdi-image-multiple"
        to="/proofs/add/multiple"
      />
    </v-col>
    <v-col cols="12" sm="6" lg="4">
      <v-card
        :title="$t('Router.ProofsOpenForContribution.Title')"
        prepend-icon="mdi-image-search-outline"
        to="/experiments/proofs-open-for-contribution"
      />
    </v-col>
    <v-col cols="12" sm="6" lg="4">
      <v-card
        :title="$t('Router.ContributionAssistant.Title')"
        prepend-icon="mdi-draw"
        to="/experiments/contribution-assistant"
      />
    </v-col>
  </v-row>
</template>

<script>
</script>
