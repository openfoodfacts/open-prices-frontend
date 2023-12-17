<template>
  <h1 class="mb-1">Add a price</h1>

  <v-row>
    <v-col cols="12" md="6">
      <v-card
        title="Single product mode"
        subtitle="Get your camera ready :)"
        prepend-icon="mdi-barcode"
        to="/add/single">
      </v-card>
    </v-col>
    <v-col cols="12" md="6">
      <v-card
        title="Receipt mode"
        subtitle="Coming in the v2 (help us!)"
        prepend-icon="mdi-receipt-text-outline"
        link
        disabled></v-card>
    </v-col>
  </v-row>

  <v-snackbar
    v-model="signinSuccessMessage"
    color="success"
    :timeout="2000"
  >Signed in!</v-snackbar>
  <v-snackbar
    v-model="singleSuccessMessage"
    color="success"
    :timeout="2000"
  >Price created!</v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      singleSuccessMessage: false,
      signinSuccessMessage: false,
    }
  },
  mounted() {
    if (this.$route.query.singleSuccess === 'true') {
      this.singleSuccessMessage = true
    }
    if (this.$route.query.signinSuccess === 'true') {
      this.signinSuccessMessage = true
    }
  }
}
</script>
