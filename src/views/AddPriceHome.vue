<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-card
        title="Single product mode"
        subtitle="Get your camera ready :)"
        prepend-icon="mdi-barcode"
        to="/add/single"></v-card>
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
</template>

<script>
export default {}
</script>
