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

<style>
.v-main{
  background-color: #FFFCF2;
}
a {
  color: #309191;
}
</style>

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
