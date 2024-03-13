<template>
  <v-btn v-if="display === 'button'" size="small" append-icon="mdi-open-in-new" :href="getOFFUrl()" target="_blank">
    {{ getOFFName() }}
  </v-btn>
</template>

<script>
import constants from '../constants'

export default {
  props: {
    display: {
      type: string,
      default: 'button'
    },
    facet: {
      type: string,
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
  methods: {
    getOFFUrl() {
      if (this.facet && this.value) {
        return `${this.OFF_URL}/${this.facet}/${this.value}`
      }
      return this.OFF_URL
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
