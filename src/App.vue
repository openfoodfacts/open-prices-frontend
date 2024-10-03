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

<script setup>
import { useTheme } from 'vuetify'

const theme = useTheme()

const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)')
theme.global.name.value = prefersDarkScheme.matches ? 'dark' : 'light'
prefersDarkScheme.addEventListener('change', (e) => {
  theme.global.name.value = e.matches ? 'dark' : 'light'
})
</script>
<script>
import { defineComponent } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default defineComponent({
  components: {
    Header,
    Footer,
  },
})
</script>
