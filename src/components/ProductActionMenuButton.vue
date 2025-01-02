<template>
  <v-btn :style="style" icon size="small" density="comfortable" variant="text">
    <v-icon :icon="ACTION_MENU_ICON" />
    <v-menu activator="parent" scroll-strategy="close" transition="slide-y-transition">
      <v-list>
        <v-list-subheader class="text-uppercase" :slim="true" disabled>
          {{ $t('Common.Product') }}
        </v-list-subheader>
        <v-divider />
        <PriceAddLink :productCode="product.code" display="list-item" />
        <ShareLink :overrideUrl="getShareLinkUrl" display="list-item" />
        <v-list-item :slim="true" prepend-icon="mdi-eye-outline" :to="getProductDetailUrl">
          {{ $t('Common.Details') }}
        </v-list-item>
        <OpenFoodFactsLink :source="product.source" facet="product" :value="product.code" display="list-item" />
      </v-list>
    </v-menu>
  </v-btn>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import constants from '../constants'

export default {
  components: {
    PriceAddLink: defineAsyncComponent(() => import('../components/PriceAddLink.vue')),
    ShareLink: defineAsyncComponent(() => import('../components/ShareLink.vue')),
    OpenFoodFactsLink: defineAsyncComponent(() => import('../components/OpenFoodFactsLink.vue'))
  },
  props: {
    product: {
      type: Object,
      default: null
    },
    style: {
      type: String,
      default: 'position:absolute;bottom:6px;right:0;'
    }
  },
  data() {
    return {
      ACTION_MENU_ICON: constants.ACTION_MENU_ICON
    }
  },
  computed: {
    getProductDetailUrl() {
      return `/products/${this.product.code}`
    },
    getShareLinkUrl() {
      return this.getProductDetailUrl
    },
  }
}
</script>
