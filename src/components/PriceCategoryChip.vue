<template>
  <v-chip class="mr-1" label size="small" density="comfortable">
    {{ getPriceCategoryTagName(priceCategory) }}
  </v-chip>
</template>

<script>
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import utils from '../utils.js'

export default {
  props: {
    priceCategory: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      categoryTags: [],  // see mounted
    }
  },
  computed: {
    ...mapStores(useAppStore),
  },
  mounted() {
    utils.getLocaleCategoryTags(this.appStore.getUserLanguage).then((module) => {
      this.categoryTags = module.default
    })
  },
  methods: {
    getPriceCategoryTagName(categoryId) {
      if (!categoryId || this.categoryTags.length === 0) return ''
      return this.categoryTags.find(lt => lt.id === categoryId).name
    }
  }
}
</script>
