<template>
  <template v-if="priceCategory">
    <v-chip label size="small" density="comfortable">
      {{ priceCategoryName }}
    </v-chip>
  </template>
</template>

<script>
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import data_utils from '../utils/data.js'

export default {
  props: {
    priceCategory: {
      type: String,
      default: null,
      example: 'en:croissants'
    }
  },
  data() {
    return {
      priceCategoryName: null,  // see mounted
    }
  },
  computed: {
    ...mapStores(useAppStore),
  },
  mounted() {
    this.getPriceCategoryTagName(this.priceCategory)
  },
  methods: {
    getPriceCategoryTagName(categoryId) {
      data_utils.getLocaleCategoryTag(this.appStore.getUserLanguage, categoryId).then((category) => {
        this.priceCategoryName = category.name
      })
    }
  }
}
</script>
