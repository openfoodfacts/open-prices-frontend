<template>
  <h1 class="mb-1">{{ $t('Home.Welcome.Title') }}</h1>
  <p>{{ $t('Home.Welcome.Subtitle') }}</p>
  <br />
  <v-btn color="primary" prepend-icon="mdi-plus" to="/add">{{ $t('Home.AddPrice') }}</v-btn>

  <v-snackbar
    v-model="settingsSuccessMessage"
    color="success"
    :timeout="2000"
  >{{ $t('Home.SettingsUpdated') }}</v-snackbar>
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
