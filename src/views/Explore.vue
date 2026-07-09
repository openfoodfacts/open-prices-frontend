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
        prepend-icon="mdi-tag-multiple-outline"
        append-icon="mdi-arrow-right"
        to="/prices"
      />
    </v-col>
    <v-col cols="12" sm="6" lg="4">
      <v-card
        :title="$t('Common.LatestProofs')"
        prepend-icon="mdi-image-multiple"
        append-icon="mdi-arrow-right"
        to="/proofs"
      />
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12" sm="6" lg="4">
      <v-card
        :title="$t('Common.TopProducts')"
        prepend-icon="mdi-database-outline"
        append-icon="mdi-arrow-right"
        to="/products"
      />
    </v-col>
    <v-col cols="12" sm="6" lg="4">
      <v-card
        :title="$t('Common.TopCountries')"
        prepend-icon="mdi-earth"
        append-icon="mdi-arrow-right"
        to="/countries"
      />
    </v-col>
    <v-col cols="12" sm="6" lg="4">
      <v-card
        :title="$t('Common.TopLocations')"
        prepend-icon="mdi-map-marker-star-outline"
        append-icon="mdi-arrow-right"
        to="/locations"
      />
    </v-col>
  </v-row>
</template>

<script>
</script>
