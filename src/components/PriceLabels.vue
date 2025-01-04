<template>
  <span v-if="priceLabels">
    <v-chip v-for="label in priceLabels" :key="label" class="mr-1" label size="small" density="comfortable">
      {{ getPriceLabelTagName(label) }}
      <v-icon v-if="label == 'en:organic'" icon="mdi-leaf-circle-outline" end />
    </v-chip>
  </span>
</template>

<script>
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import utils from '../utils.js'

export default {
  props: {
    priceLabels: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      labelTags: [],  // see mounted
    }
  },
  computed: {
    ...mapStores(useAppStore),
  },
  mounted() {
    utils.getLocaleLabelTags(this.appStore.getUserLanguage).then((module) => {
      this.labelTags = module.default
    })
  },
  methods: {
    getPriceLabelTagName(labelId) {
      if (this.labelTags.length === 0) return ''
      return this.labelTags.find(lt => lt.id === labelId).name
    }
  }
}
</script>
