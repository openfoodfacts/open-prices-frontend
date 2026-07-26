<template>
  <v-row>
    <v-col cols="12" sm="6" lg="4">
      <v-card
        :title="$t('Common.Search')"
        prepend-icon="mdi-magnify"
        append-icon="mdi-arrow-right"
        to="/search"
      />
    </v-col>
    <v-col cols="12" sm="6" lg="4">
      <v-card
        :title="$t('Common.LatestPrices')"
        :prepend-icon="PRICE_ICON"
        append-icon="mdi-arrow-right"
        to="/prices"
      />
    </v-col>
    <v-col cols="12" sm="6" lg="4">
      <v-card
        :title="$t('Common.LatestProofs')"
        :prepend-icon="PROOF_ICON"
        append-icon="mdi-arrow-right"
        to="/proofs"
      />
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" sm="6" lg="4">
      <v-card
        :title="$t('Common.TopProducts')"
        :prepend-icon="PRODUCT_ICON"
        append-icon="mdi-arrow-right"
        to="/products"
      />
    </v-col>
    <v-col cols="12" sm="6" lg="4">
      <v-card
        :title="$t('Common.TopCountries')"
        :prepend-icon="COUNTRY_ICON"
        append-icon="mdi-arrow-right"
        to="/countries"
      />
    </v-col>
    <v-col cols="12" sm="6" lg="4">
      <v-card
        :title="$t('Common.TopLocations')"
        :prepend-icon="LOCATION_ICON"
        append-icon="mdi-arrow-right"
        to="/locations"
      />
    </v-col>
  </v-row>
</template>

<script>
import constants from '../constants'

export default {
  data() {
    return {
      PRICE_ICON: constants.PRICE_ICON,
      PROOF_ICON: constants.PROOF_ICON,
      PRODUCT_ICON: constants.PRODUCT_ICON,
      COUNTRY_ICON: constants.COUNTRY_ICON,
      LOCATION_ICON: constants.LOCATION_ICON,
    }
  },
}
</script>
