<template>
  <v-app>
    <v-layout class="rounded rounded-md">
      <Header />

      <v-main class="d-flex justify-center">
        <v-container>
          <Breadcrumbs />
          <router-view />
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
</template>

<script>
import { defineComponent } from 'vue'
import Header from './components/Header.vue'
import Breadcrumbs from './components/Breadcrumbs.vue'

export default defineComponent({
  components: {
    Header,
    Breadcrumbs,
  },
})
</script>
