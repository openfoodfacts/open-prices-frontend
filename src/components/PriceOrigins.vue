<template>
  <template v-if="priceOrigins">
    <v-chip v-for="origin in priceOrigins" :key="origin" label size="small" density="comfortable">
      {{ getPriceOriginTagName(origin) }}
    </v-chip>
  </template>
</template>

<script>
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import data_utils from '../utils/data.js'

export default {
  props: {
    priceOrigins: {
      type: Array,
      default: () => []
    
    }
  },
  data() {
    return {
      originTags: [],  // see mounted
    }
  },
  computed: {
    ...mapStores(useAppStore),
  },
  mounted() {
    data_utils.getLocaleOriginTags(this.appStore.getUserLanguage).then((module) => {
      this.originTags = module.default
    })
  },
  methods: {
    getPriceOriginTagName(originId) {
      if (this.originTags.length === 0) return ''
      return this.originTags.find(ot => ot.id === originId).name
    }
  }
}
</script>
