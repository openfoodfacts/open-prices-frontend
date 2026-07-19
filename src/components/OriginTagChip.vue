<template>
  <v-chip label size="small" density="comfortable" :to="getOriginUrl">
    {{ originLocalizedName || origin }}
  </v-chip>
</template>

<script>
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import data_utils from '../utils/data.js'

export default {
  props: {
    origin: {
      type: String,
      default: null,
      example: 'en:france'
    },
    localize: {
      type: Boolean,
      default: false  // open-prices-frontend only has a subset of all origins, see generate_origins_json_per_language.py
    },
    readonly: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      originLocalizedName: null,  // see mounted
    }
  },
  computed: {
    ...mapStores(useAppStore),
    getOriginUrl() {
      return this.origin && !this.readonly ? `/origins/${this.origin}` : null
    },
  },
  mounted() {
    this.setOriginLocalizedName(this.origin)
  },
  methods: {
    setOriginLocalizedName() {
      if (this.origin && this.localize) {
        data_utils.getLocaleOriginTag(this.appStore.getUserLanguage, this.origin).then((origin) => {
          this.originLocalizedName = origin.name
        })
      } else {
        this.originLocalizedName = null
      }
    },
  }
}
</script>
