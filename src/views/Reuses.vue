<template>
  <v-row>
    <v-col v-for="reuse in reusesList" :key="reuse.id" cols="12" sm="6" md="4" xl="3">
      <ReuseCard :reuse="reuse" />
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <ReuseNewFormAlert />
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import Reuses from '../data/reuses.json'

export default {
  components: {
    ReuseCard: defineAsyncComponent(() => import('../components/ReuseCard.vue')),
    ReuseNewFormAlert: defineAsyncComponent(() => import('../components/ReuseNewFormAlert.vue')),
  },
  computed: {
    reusesList() {
      return Reuses.filter(r => r.display)
    },
  }
}
</script>
