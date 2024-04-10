<template>
  <a v-if="display === 'link'" :href="getUrl" target="_blank">
    {{ getSourceName }}
  </a>
  <v-btn v-else-if="display === 'button'" size="small" :prepend-icon="getSourceIcon" append-icon="mdi-open-in-new" :href="getUrl" target="_blank">
    {{ getSourceName }}
  </v-btn>
</template>

<script>
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import constants from '../constants'

export default {
  props: {
    display: {
      // link, button
      type: String,
      default: 'link'
    },
    source: {
      // off, obf, opff, opf
      type: String,
      default: null
    },
    facet: {
      // category, label, brand...
      type: String,
      default: null
    },
    value: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      OFF_NAME: constants.OFF_NAME,
      OFF_URL: constants.OFF_URL,
      OFF_ICON: constants.OFF_ICON,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    getSourceIcon() {
      if (this.source) {
        return constants[`${this.source.toUpperCase()}_ICON`]
      }
      return 'mdi-open-in-new'
    },
    getSourceUrl() {
      if (this.source) {
        return constants[`${this.source.toUpperCase()}_URL`]
      }
      return this.OFF_URL
    },
    getUrlWithLocale() {
      return this.getSourceUrl.replace('world', this.appStore.user.language)
    },
    getUrl() {
      if (this.facet && this.value) {
        return `${this.getUrlWithLocale}/${this.facet}/${this.value}`
      }
      return this.getUrlWithLocale
    },
    getSourceName() {
      if (this.source) {
        return constants[`${this.source.toUpperCase()}_NAME`]
      }
      return this.OFF_NAME
    },
  },
}
</script>
