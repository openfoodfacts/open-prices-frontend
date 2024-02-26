<template>
  <v-app>
    <Header />

    <body
    :style="{width: '100vw', height:'100%', backgroundColor: isDark ? '#393939' : '#e4e4e4', color: isDark ? '#fff' : '#000' }">
      <v-main class="d-flex justify-center">
        <v-container>
          <router-view />
        </v-container>
      </v-main>
    </body>

    <Footer />
  </v-app>
</template>

<script>
import { defineComponent } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import { useAppStore } from './store'
import { mapStores } from 'pinia'

export default defineComponent({
  components: {
    Header,
    Footer,
  },
  computed: {
    ...mapStores(useAppStore),
    formFilled() {
      return Object.values(this.userSettingsForm).every(x => !!x)
    },
    isDark() {
      return this.appStore.getDarkMode;
    },
  },
})
</script>
