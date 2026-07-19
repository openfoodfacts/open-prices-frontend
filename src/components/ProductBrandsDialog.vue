<template>
  <v-dialog scrollable max-height="80%" min-width="50%" width="auto">
    <v-card :title="$t('ProductCard.Brands')">
      <template #append>
        <v-icon icon="mdi-close" @click="close" />
      </template>

      <v-divider />

      <v-card-text>
        <BrandChip v-for="brand in brands" :key="brand" class="mr-2 mb-2" :brand="brand" :readonly="readonly" />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    BrandChip: defineAsyncComponent(() => import('../components/BrandChip.vue')),
  },
  props: {
    brands: {
      type: Array,
      default: () => []
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  methods: {
    close() {
      this.$emit('close')
    },
  }
}
</script>
