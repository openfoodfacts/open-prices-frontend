<template>
  <a v-if="display === 'link'" :href="getLocationOSMUrl" target="_blank">
    {{ OSM_NAME }}
  </a>
  <v-btn v-if="display === 'button'" size="small" append-icon="mdi-open-in-new" :href="getLocationOSMUrl" target="_blank">
    {{ OSM_NAME }}
  </v-btn>
  <v-list-item v-else-if="display === 'list-item'" :slim="true" append-icon="mdi-open-in-new" :href="getLocationOSMUrl" target="_blank">
    {{ OSM_NAME }}
  </v-list-item>
</template>

<script>
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import constants from '../constants'

export default {
  props: {
    location: {
      type: Object,
      default: null
    },
    display: {
      type: String,
      default: 'link',
      examples: ['link', 'button', 'list-item']
    },
  },
  data() {
    return {
      OSM_NAME: constants.OSM_NAME,
      OSM_URL: constants.OSM_URL,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    getLocationOSMUrl() {
      if (this.location) {
        return `https://www.openstreetmap.org/${this.location.osm_type.toLowerCase()}/${this.location.osm_id}`
      }
      return this.OSM_URL
    }
  },
}
</script>
