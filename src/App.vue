<template>
  <v-app>
    <v-layout class="rounded rounded-md">
      <Header />

      <v-main class="d-flex justify-center">
        <v-container>
          <router-view />
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script>
import { defineComponent } from 'vue'
import Header from './components/Header.vue'

export default defineComponent({
  components: {
    Header,
  },
})
</script>
