<template>
  <v-btn :style="style" icon size="small" density="comfortable" variant="text">
    <v-icon>mdi-dots-vertical</v-icon>
    <v-menu activator="parent" scroll-strategy="close" transition="slide-y-transition">
      <v-list>
        <ShareLink :overrideUrl="getShareLinkUrl" display="list-item" />
        <v-divider />
        <OpenStreetMapLink :location="location" display="list-item" />
      </v-list>
    </v-menu>
  </v-btn>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    ShareLink: defineAsyncComponent(() => import('../components/ShareLink.vue')),
    OpenStreetMapLink: defineAsyncComponent(() => import('../components/OpenStreetMapLink.vue'))
  },
  props: {
    location: {
      type: Object,
      default: null
    },
    style: {
      type: String,
      default: 'position:absolute;bottom:6px;right:0;'
    }
  },
  computed: {
    getShareLinkUrl() {
      return `/locations/${this.location.id}`
    }
  }
}
</script>
