<template>
  <template v-if="priceOrigins">
    <v-chip v-for="origin in priceOriginsLocalized" :key="origin.id" label size="small" density="comfortable">
      {{ origin.name }}
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
      default: () => [],
      example: ['en:france']
    }
  },
  data() {
    return {
      priceOriginsLocalized: [],  // see mounted
    }
  },
  computed: {
    ...mapStores(useAppStore),
  },
  mounted() {
    this.getOriginTagLocalizedList(this.priceOrigins)
  },
  methods: {
    getOriginTagLocalizedList(originIds) {
      originIds.forEach(originId => {
        data_utils.getLocaleOriginTag(this.appStore.getUserLanguage, originId).then((origin) => {
          this.priceOriginsLocalized.push(origin)
        })
      })
    }
  }
}
</script>
