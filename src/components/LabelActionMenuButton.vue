<template>
  <v-btn :style="style" icon size="small" density="comfortable" variant="text">
    <v-icon>mdi-dots-vertical</v-icon>
    <v-menu activator="parent" scroll-strategy="close" transition="slide-y-transition">
      <v-list>
        <v-list-subheader class="text-uppercase" :slim="true" disabled>
          {{ $t('Common.Label') }}
        </v-list-subheader>
        <v-divider />
        <ShareLink :overrideUrl="getShareLinkUrl" display="list-item" />
        <OpenFoodFactsLink facet="label" :value="label" display="list-item" />
      </v-list>
    </v-menu>
  </v-btn>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    ShareLink: defineAsyncComponent(() => import('../components/ShareLink.vue')),
    OpenFoodFactsLink: defineAsyncComponent(() => import('../components/OpenFoodFactsLink.vue'))
  },
  props: {
    label: {
      type: String,
      default: null
    },
    style: {
      type: String,
      default: 'position:absolute;bottom:6px;right:0;'
    }
  },
  computed: {
    getShareLinkUrl() {
      return `/labels/${this.label}`
    }
  }
}
</script>
