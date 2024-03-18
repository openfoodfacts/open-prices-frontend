<template>
  <a v-if="display === 'link'" :href="getOFFUrl()" target="_blank">
    {{ getOFFName() }}
  </a>
  <v-btn v-if="display === 'button'" size="small" append-icon="mdi-open-in-new" :href="getOFFUrl()" target="_blank">
    {{ getOFFName() }}
  </v-btn>
</template>

<script>
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import constants from '../constants'

export default {
  props: {
    display: {
      type: String,
      default: 'link'
    },
    facet: {
      type: String,
      default: null
    },
    value: null,
    action: null
  },
  data () {
    return {
      OFF_NAME: constants.OFF_NAME,
      OFF_URL: constants.OFF_URL,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    getOFFUrlWithLocale() {
      return this.OFF_URL.replace('world', this.appStore.user.language)
    }
  },
  methods: {
    getOFFUrl() {
      if (this.facet && this.value) {
        return `${this.getOFFUrlWithLocale}/${this.facet}/${this.value}`
      }
      return this.getOFFUrlWithLocale
    },
    getOFFName() {
      if (this.action === 'add') {
        return this.$t('Common.AddToOFF', {name: this.OFF_NAME})
      }
      return this.OFF_NAME
    }
  }  
}
</script>
