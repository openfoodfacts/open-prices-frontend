<template>
  <v-row v-if="priceExample">
    <v-col>
      <h2 class="text-h6 mb-1">
        A good example of proof to photograph
      </h2>
      <v-img :src="priceExample.proofUrl" style="max-height: 200px" />
    </v-col>
    <v-col>
      <h2 class="text-h6 mb-1">
        A good example of price to add
      </h2>
      <PriceCard :price="priceExample" :product="priceExample.product" elevation="1" />
    </v-col>
  </v-row>
</template>
  
<script>
import { defineAsyncComponent } from 'vue'
import api from '../services/api.js'

export default {
  components: {
    PriceCard: defineAsyncComponent(() => import('./PriceCard.vue')),
  },
  props: {
    exampleId: {
      type: Number,
      default: () => {}
    }
  },
  data() {
    return {
      priceExample: null
    }
  },
  mounted() {
    api.getPriceById(this.exampleId)
    .then((data) => {
      data.proofUrl = `${import.meta.env.VITE_OPEN_PRICES_APP_URL}/img/${data.proof.file_path}`
      this.priceExample = data
    })
  }
}
</script>
  