<template>
  <v-dialog scrollable max-height="80%" min-width="50%" width="auto">
    <v-card :title="$t('ProductCard.Categories')">
      <template #append>
        <v-icon icon="mdi-close" @click="close" />
      </template>

      <v-divider />

      <v-card-text>
        <span class="chip-group">
          <CategoryTagChip v-for="category in categories" :key="category" :category="category" />
        </span>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    CategoryTagChip: defineAsyncComponent(() => import('../components/CategoryTagChip.vue')),
  },
  props: {
    categories: {
      type: Array,
      default: () => []
    }
  },
  emits: ['close'],
  methods: {
    getCategoryUrl(category) {
      return `/categories/${category}`
    },
    close() {
      this.$emit('close')
    },
  }
}
</script>
