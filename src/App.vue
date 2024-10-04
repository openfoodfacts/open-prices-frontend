<template>
  <v-app>
    <Header />

    <v-main class="d-flex justify-center">
      <v-container>
        <Breadcrumbs />
        <router-view />
      </v-container>
    </v-main>

    <Footer />
  </v-app>
</template>

<script>
import { defineComponent } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Breadcrumbs from './components/Breadcrumbs.vue';

export default defineComponent({
  components: {
    Header,
    Footer,
    Breadcrumbs,
  },
})
</script>
