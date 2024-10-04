<template>
  <v-app>
    <Header />

    <v-main class="d-flex justify-center">
      <v-container>
        <router-view />
      </v-container>
    </v-main>

    <Footer />
  </v-app>
</template>

<script>
import { useTheme } from 'vuetify'
import { defineComponent } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { mapStores } from 'pinia'
import { useAppStore } from './store'

export default defineComponent({
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      prefersDarkScheme: window.matchMedia('(prefers-color-scheme: dark)'),
      theme: useTheme(),
    }
  },
  computed: {
    ...mapStores(useAppStore),
  },
  mounted() {
    if (this.appStore.getUserPreferedTheme) {
      this.theme.global.name = this.appStore.getUserPreferedTheme
    } else {
      this.theme.global.name = this.prefersDarkScheme.matches ? 'dark' : 'light'
    }
  }
})
</script>
