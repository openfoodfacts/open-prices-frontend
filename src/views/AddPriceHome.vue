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

  <v-snackbar
    v-model="signinSuccessMessage"
    color="success"
    :timeout="2000"
  >
    {{ $t('AddPriceHome.SignedIn') }}
  </v-snackbar>
  <v-snackbar
    v-model="singleSuccessMessage"
    color="success"
    :timeout="2000"
  >
    {{ $t('AddPriceHome.PriceCreated') }}
  </v-snackbar>
  <v-snackbar
    v-model="multipleSuccessMessage"
    color="success"
    :timeout="2000"
  >
    {{ $t('AddPriceHome.Thanks') }}
  </v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      signinSuccessMessage: false,
      singleSuccessMessage: false,
      multipleSuccessMessage: false,
    }
  },
  mounted() {
    if (this.$route.query.signinSuccess === 'true') {
      this.signinSuccessMessage = true
    }
    if (this.$route.query.singleSuccess === 'true') {
      this.singleSuccessMessage = true
    }
    if (this.$route.query.multipleSuccess === 'true') {
      this.multipleSuccessMessage = true
    }
  }
}
</script>
