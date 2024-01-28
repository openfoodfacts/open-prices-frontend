<template>
  <v-btn size="small" append-icon="mdi-open-in-new" :href="getOFFUrl()" target="_blank">
    {{ OFF_NAME }}
  </v-btn>
</template>

<script>
import constants from '../constants'

export default {
  props: {
    type: null,
    value: null,
  },
  data () {
    return {
      OFF_NAME: constants.OFF_NAME,
      OFF_URL: constants.OFF_URL,
    }
  },
  methods: {
    getOFFUrl() {
      return `${this.OFF_URL}/${this.type}/${this.value}`
    },
  }  
}
</script>
