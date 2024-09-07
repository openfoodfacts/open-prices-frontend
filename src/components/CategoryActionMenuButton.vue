<template>
  <v-btn :style="style" icon size="small" density="comfortable" variant="text">
    <v-icon>mdi-dots-vertical</v-icon>
    <v-menu activator="parent" scroll-strategy="close" transition="slide-y-transition">
      <v-list>
        <v-list-subheader class="text-uppercase" :slim="true" disabled>
          {{ $t('Common.Category') }}
        </v-list-subheader>
        <v-divider />
        <PriceAddLink v-if="!hidePriceAddLink" class="mr-2" :productCode="category.id" display="list-item" :disabled="!categoryFound" />
        <ShareLink :overrideUrl="getShareLinkUrl" display="list-item" :disabled="!categoryFound" />
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
    source: {
      type: String,
      default: 'category',
      examples: ['category', 'product']
    },
    style: {
      type: String,
      default: 'position:absolute;bottom:6px;right:0;'
    }
  },
  computed: {
    categoryFound() {
      return this.category && !this.category.status
    },
    hidePriceAddLink() {
      return this.source === 'category'
    },
    getShareLinkUrl() {
      if (this.source === 'category') {
        return `/categories/${this.category.id}`
      }
      return `/products/${this.category.id}`
    }
  }
}
</script>
