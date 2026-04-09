<template>
  <template v-if="priceLabels">
    <v-chip v-for="label in priceLabelsLocalized" :key="label.id" label size="small" density="comfortable">
      {{ label.name }}
      <v-icon v-if="label.id == 'en:organic'" icon="mdi-leaf-circle-outline" end />
    </v-chip>
  </template>
</template>

<script>
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import data_utils from '../utils/data.js'

export default {
  props: {
    priceLabels: {
      type: Array,
      default: () => [],
      example: ['en:organic']
    }
  },
  data() {
    return {
      priceLabelsLocalized: [],  // see mounted
    }
  },
  computed: {
    ...mapStores(useAppStore),
  },
  mounted() {
    this.getLabelTagLocalizedList(this.priceLabels)
  },
  methods: {
    getLabelTagLocalizedList(labelIds) {
      labelIds.forEach(labelId => {
        data_utils.getLocaleLabelTag(this.appStore.getUserLanguage, labelId).then((label) => {
          this.priceLabelsLocalized.push(label)
        })
      })
    }
  }
}
</script>
