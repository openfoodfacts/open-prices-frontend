<template>
  <v-card :title="label" prepend-icon="mdi-sticker-text-outline" data-name="label-card">
    <v-card-text>
      <v-row>
        <v-col cols="11">
          <ProductCountChip :count="productCount" :withLabel="true" />
        </v-col>
      </v-row>

      <LabelActionMenuButton v-if="!hideActionMenuButton" :label="label" />
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
    },
    hideActionMenuButton: {
      type: Boolean,
      default: false
    },
  }
}
</script>
