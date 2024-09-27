<template>
  <a v-if="display === 'link'" :href="getUrl" target="_blank" :disabled="disabled">
    {{ getSourceName }}
  </a>
  <v-list-item v-else-if="display === 'list-item'" :slim="true" :prepend-icon="getSourceIcon" append-icon="mdi-open-in-new" :href="getUrl" target="_blank" :disabled="disabled">
    {{ getSourceName }}
  </v-list-item>
  <v-btn v-else-if="display === 'button'" size="small" :prepend-icon="getSourceIcon" append-icon="mdi-open-in-new" :href="getUrl" target="_blank" :disabled="disabled">
    {{ getSourceName }}
  </v-btn>
</template>

<script>
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import constants from '../constants'

export default {
  props: {
    source: {
      type: String,
      default: null,
      examples: ['off', 'obf', 'opff', 'opf']
    },
    facet: {
      type: String,
      default: null,
      examples: ['category', 'label', 'brand', 'label', 'editor']
    },
    value: {
      type: String,
      default: null
    },
    display: {
      type: String,
      default: 'link',
      examples: ['link', 'list-item', 'button']
    },
    disabled: {
      type: Boolean,
      default: false
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
      return null
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
