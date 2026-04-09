<template>
  <template v-if="priceCategory">
    <v-chip label size="small" density="comfortable">
      {{ priceCategoryLocalizedName }}
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
      priceCategoryLocalizedName: null,  // see mounted
    }
  },
  computed: {
    ...mapStores(useAppStore),
  },
  mounted() {
    this.setPriceCategoryLocalizedName(this.priceCategory)
  },
  methods: {
    setPriceCategoryLocalizedName(categoryId) {
      data_utils.getLocaleCategoryTagName(this.appStore.getUserLanguage, categoryId).then((categoryName) => {
        this.priceCategoryLocalizedName = categoryName
      })
    }
  }
}
</script>
