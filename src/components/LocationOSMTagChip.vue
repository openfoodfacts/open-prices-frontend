<template>
  <v-chip label size="small" density="comfortable" title="OpenStreetMap tag">
    <v-icon v-if="labelIcon" :icon="labelIcon" start />
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
  data() {
    return {
      LOCATION_TAG_LIST: constants.LOCATION_TAG_LIST,
      labelIcon: null,  // see mounted
    }
  },
  mounted() {
    this.setLabelIcon()
  },
  methods: {
    setLabelIcon() {
      const labelObj = this.LOCATION_TAG_LIST.find(item => item.key === this.tag)
      this.labelIcon = labelObj ? labelObj.icon : null
    }
  }
}
</script>
