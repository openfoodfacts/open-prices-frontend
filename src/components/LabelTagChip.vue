<template>
  <v-chip label size="small" density="comfortable" @click="goToLabel()">
    {{ labelLocalizedName || label }}
    <v-icon v-if="label === 'en:organic'" icon="mdi-leaf-circle-outline" end />
  </v-chip>
</template>

<script>
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import data_utils from '../utils/data.js'

export default {
  props: {
    label: {
      type: String,
      default: null,
      example: 'en:organic'
    },
    localize: {
      type: Boolean,
      default: false  // open-prices-frontend only has a subset of all labels, see generate_labels_json_per_language.py
    },
    readonly: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      labelLocalizedName: null,  // see mounted
    }
  },
  computed: {
    ...mapStores(useAppStore),
  },
  mounted() {
    this.setLabelLocalizedName(this.label)
  },
  methods: {
    setLabelLocalizedName() {
      if (this.label && this.localize) {
        data_utils.getLocaleLabelTag(this.appStore.getUserLanguage, this.label).then((label) => {
          this.labelLocalizedName = label.name
        })
      } else {
        this.labelLocalizedName = null
      }
    },
    goToLabel() {
      if (this.readonly || !this.label) {
        return
      }
      this.$router.push({ path: `/labels/${this.label}` })
    },
  }
}
</script>
