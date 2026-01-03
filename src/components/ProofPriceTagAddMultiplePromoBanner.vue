<template>
  <v-banner
    icon="mdi-image-multiple"
    bg-color="primary"
    rounded
    density="compact"
    @click="$router.push(url)"
  >
    <v-banner-text style="padding-inline-end:10px;">
      {{ $t('ProofAdd.PromoProofPriceTagAddMultiple') }}
    </v-banner-text>
    <v-spacer /><!-- needed to push v-banner-actions to the right on big screens -->
    <v-banner-actions>
      <v-btn icon="mdi-arrow-right" :aria-label="$t('Router.AddProofsPriceTags.Title')" :to="url" />
    </v-banner-actions>
  </v-banner>
</template>

<script>
export default {
  data() {
    return {
      url: '/proofs/add/price-tags',
    }
  },
}
</script>
