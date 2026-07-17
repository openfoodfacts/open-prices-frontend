<template>
  <v-chip label size="small" density="comfortable">
    <v-icon start :icon="getKindIcon" />
    <span v-if="withLabel" :id="`${kind}-count`">{{ $t(`Common.${getKindTitlecase}Count`, { count: count }) }}</span>
    <span v-else :id="`${kind}-count`">{{ count }}</span>
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
      examples: ['price', 'product', 'proof', 'location', 'user']
    },
    count: {
      type: Number,
      default: null
    },
    withLabel: {
      type: Boolean,
      default: false
    },
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
