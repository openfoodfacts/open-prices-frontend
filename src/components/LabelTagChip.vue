<template>
  <v-chip label size="small" density="comfortable" :to="getLabelUrl">
    <v-icon v-if="labelIcon" :icon="labelIcon" start />
    {{ labelLocalizedName || label }}
  </v-chip>
</template>

<script>
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import constants from '../constants'
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
      PRODUCT_LABEL_LIST: constants.PRODUCT_LABEL_LIST,
      labelLocalizedName: null,  // see mounted
      labelIcon: null,  // see mounted
    }
  },
  computed: {
    ...mapStores(useAppStore),
    getLabelUrl() {
      return this.label && !this.readonly ? `/labels/${this.label}` : null
    }
  },
  mounted() {
    this.setLabelLocalizedName(this.label)
    this.setLabelIcon(this.label)
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
    setLabelIcon() {
      const labelObj = this.PRODUCT_LABEL_LIST.find(item => item.key === this.label)
      this.labelIcon = labelObj ? labelObj.icon : null
    }
  }
}
</script>
