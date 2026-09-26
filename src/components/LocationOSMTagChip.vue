<template>
  <v-chip label size="small" density="comfortable" title="OpenStreetMap tag">
    <v-icon v-if="tagIcon" :icon="tagIcon" start />
    {{ tag }}
  </v-chip>
</template>

<script>
import constants from '../constants'

export default {
  props: {
    tag: {
      type: String,
      default: null
    }
  },
  computed: {
    tagIcon() {
      const tagObj = constants.LOCATION_TAG_LIST.find(item => item.key === this.tag)
      return tagObj ? tagObj.icon : null
    }
  }
}
</script>
