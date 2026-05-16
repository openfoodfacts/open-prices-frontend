<template>
  <v-chip label size="small" density="comfortable" @click="goToCategory()">
    {{ categoryLocalizedName || category }}
  </v-chip>
</template>

<script>
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import data_utils from '../utils/data.js'

export default {
  props: {
    category: {
      type: String,
      default: null,
      example: 'en:croissants'
    },
    localize: {
      type: Boolean,
      default: false  // open-prices-frontend only has a subset of all categories, see generate_categories_json_per_language.py
    },
    readonly: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      categoryLocalizedName: null,  // see mounted
    }
  },
  computed: {
    ...mapStores(useAppStore),
  },
  mounted() {
    this.setCategoryLocalizedName(this.category)
  },
  methods: {
    setCategoryLocalizedName() {
      if (this.category && this.localize) {
        data_utils.getLocaleCategoryTagName(this.appStore.getUserLanguage, this.category).then((categoryName) => {
        this.categoryLocalizedName = categoryName
      })
      } else {
        this.categoryLocalizedName = null
      }
    },
    goToCategory() {
      if (this.readonly || !this.category) {
        return
      }
      this.$router.push({ path: `/categories/${this.category}` })
    },
  }
}
</script>
