<template>
  <v-chip label variant="text" :prepend-icon="getKindIcon">
    {{ $t(`Common.${getKindTitlecase}Count`, { count: count }) }}
  </v-chip>
</template>

<script>
import constants from '../constants'
import utils from '../utils'

export default {
  props: {
    kind: {
      type: String,
      default: null,
      examples: ['price', 'product', 'proof', 'location', 'user', 'currency', 'country', 'challenge', 'badge']
    },
    count: {
      type: Number,
      default: null
    }
  },
  computed: {
    getKindTitlecase() {
      return utils.toTitleCase(this.kind)
    },
    getKindIcon() {
      return constants[`${this.kind.toUpperCase()}_ICON`]
    }
  }
}
</script>
