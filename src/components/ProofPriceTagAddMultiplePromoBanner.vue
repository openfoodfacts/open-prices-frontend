<template>
  <v-banner
    icon="mdi-image-multiple"
    bg-color="primary"
    rounded
    density="compact"
    @click="$router.push('/proofs/add/price-tags')"
  >
    <v-banner-text style="padding-inline-end:10px;">
      {{ $t('ProofAdd.PromoProofPriceTagAddMultiple') }}
    </v-banner-text>
    <v-banner-actions>
      <v-btn icon="mdi-arrow-right" :aria-label="$t('Router.AddProofsPriceTags.Title')" to="/proofs/add/multiple-price-tags" />
    </v-banner-actions>
  </v-banner>
</template>
