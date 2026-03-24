<template>
  <v-card :title="brand" prepend-icon="mdi-factory" data-name="brand-card">
    <v-card-text>
      <v-row>
        <v-col :cols="hideActionMenuButton ? '12' : '11'">
          <ProductCountChip :count="productCount" :withLabel="true" />
        </v-col>
        <v-col v-if="!hideActionMenuButton" cols="1">
          <BrandActionMenuButton :brand="brand" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    ProductCountChip: defineAsyncComponent(() => import('../components/ProductCountChip.vue')),
    BrandActionMenuButton: defineAsyncComponent(() => import('../components/BrandActionMenuButton.vue'))
  },
  props: {
    brand: {
      type: String,
      default: null
    },
    productCount: {
      type: Number,
      default: 0
    },
    hideActionMenuButton: {
      type: Boolean,
      default: false
    },
  }
}
</script>
