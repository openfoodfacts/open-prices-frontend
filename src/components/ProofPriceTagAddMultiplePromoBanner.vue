<template>
  <v-banner
    icon="mdi-image-plus"
    bg-color="info"
    rounded
    density="compact"
    @click="$router.push('/proofs/add/multiple')"
  >
    <v-banner-text style="padding-inline-end:10px;">
      {{ $t('ProofAdd.PromoProofPriceTagAddMultiple') }}
    </v-banner-text>
    <v-banner-actions>
      <v-btn icon="mdi-arrow-right" :aria-label="$t('Router.AddProofMultiple')" to="/proofs/add/multiple" />
    </v-banner-actions>
  </v-banner>
</template>
