<template>
  <v-btn :style="style" icon size="small" density="comfortable" variant="text">
    <v-icon>mdi-dots-vertical</v-icon>
    <v-menu activator="parent" scroll-strategy="close" transition="slide-y-transition">
      <v-list>
        <PriceAddLink class="mr-2" :productCode="category.id" display="list-item" :disabled="!categoryFound" />
        <ShareLink :overrideUrl="'/products/' + category.id" display="list-item" :disabled="!categoryFound" />
        <v-divider />
        <OpenFoodFactsLink facet="category" :value="category.id" display="list-item" :disabled="!categoryFound" />
      </v-list>
    </v-menu>
  </v-btn>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    PriceAddLink: defineAsyncComponent(() => import('../components/PriceAddLink.vue')),
    ShareLink: defineAsyncComponent(() => import('../components/ShareLink.vue')),
    OpenFoodFactsLink: defineAsyncComponent(() => import('../components/OpenFoodFactsLink.vue'))
  },
  props: {
    category: {
      type: Object,
      default: null
    },
    style: {
      type: String,
      default: 'position:absolute;bottom:6px;right:0;'
    }
  },
  computed: {
    categoryFound() {
      return this.category && !this.category.status
    }
  }
}
</script>
