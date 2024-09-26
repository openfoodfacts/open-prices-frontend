<template>
  <v-card :title="label" prepend-icon="mdi-sticker-text-outline" data-name="label-card">
    <v-card-text>
      <ProductCountChip :count="productCount" :withLabel="true" />
      <LabelActionMenuButton :label="label" />
    </v-card-text>
  </v-card>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    ProductCountChip: defineAsyncComponent(() => import('../components/ProductCountChip.vue')),
    LabelActionMenuButton: defineAsyncComponent(() => import('../components/LabelActionMenuButton.vue'))
  },
  props: {
    label: {
      type: String,
      default: null
    },
    productCount: {
      type: Number,
      default: 0
    }
  }
}
</script>
