<template>
  <v-btn :style="style" icon size="small" density="comfortable" variant="text">
    <v-icon>mdi-dots-vertical</v-icon>
    <v-menu activator="parent" scroll-strategy="close" transition="slide-y-transition">
      <v-list>
        <v-list-subheader class="text-uppercase" :slim="true" disabled>
          {{ $t('Common.Location') }}
        </v-list-subheader>
        <v-divider />
        <ShareLink :overrideUrl="getShareLinkUrl" display="list-item" />
        <OpenStreetMapLink v-if="isTypeOSM" :location="location" display="list-item" />
        <v-list-item v-if="isTypeONLINE" append-icon="mdi-open-in-new" :href="location.website_url" target="_blank" rel="noopener noreferrer">
          {{ $t('Common.Website') }}
        </v-list-item>
      </v-list>
    </v-menu>
  </v-btn>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import constants from '../constants'

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
    isTypeOSM() {
      return this.location.type === constants.LOCATION_TYPE_OSM
    },
    isTypeONLINE() {
      return this.location.type === constants.LOCATION_TYPE_ONLINE
    },
    getShareLinkUrl() {
      return `/locations/${this.location.id}`
    }
  }
}
</script>
