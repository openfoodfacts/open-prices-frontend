<template>
  <h1 class="text-h5 mb-1">
    {{ $t('AddPriceHome.Title') }}
  </h1>

  <v-row>
    <v-col cols="12" sm="6" lg="4">
      <v-card
        :title="$t('AddPriceHome.MultipleProductMode.Title')"
        :subtitle="$t('AddPriceHome.MultipleProductMode.Subtitle')"
        prepend-icon="mdi-library-shelves"
        to="/prices/add/multiple/price-tag"
      />
    </v-col>
    <v-col cols="12" sm="6" lg="4">
      <v-card
        :title="$t('AddPriceHome.ReceiptMode.Title')"
        :subtitle="$t('AddPriceHome.ReceiptMode.Subtitle')"
        prepend-icon="mdi-receipt-text-outline"
        to="/prices/add/multiple/receipt"
      />
    </v-col>
  </v-row>
</template>
