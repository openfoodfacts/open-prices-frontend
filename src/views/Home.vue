<template>
  <h1 class="mb-1">Welcome to Open Prices!</h1>
  <p>An open crowdsourced database of food prices 🏷🍊💲</p>
  <br />
  <v-btn prepend-icon="mdi-plus" to="/add">Add a price</v-btn>

  <v-snackbar
    v-model="settingsSuccessMessage"
    color="success"
    :timeout="2000"
  >Settings updated!</v-snackbar>
</template>

<script>
export default {
  data() {
    return {
      settingsSuccessMessage: false,
    }
  },
  mounted() {
    if (this.$route.query.settingsSuccess === 'true') {
      this.settingsSuccessMessage = true
    }
  }
}
</script>
