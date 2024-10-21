<template>
  <v-chip v-if="priceOrigins" label size="small" density="comfortable">
    {{ priceOriginTagName }}
  </v-chip>
</template>

<script>
import OriginTags from '../data/origins-tags.json'

export default {
  props: {
    priceOrigins: {
      type: Array,
      default: () => []
    
    }
  },
  computed: {
    priceOriginTagName() {
      return OriginTags.find(ot => this.priceOrigins[0].includes(ot.id)).name
    },
  }
}
</script>
