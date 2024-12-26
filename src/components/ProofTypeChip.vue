<template>
  <v-chip label size="small" :prepend-icon="getProofTypeIcon" density="comfortable">
    <span v-if="proofType === PROOF_TYPE_GDPR_REQUEST">
      <a :href="OFF_WIKI_GDPR_REQUEST_URL" target="_blank">
        {{ getProofTypeName }}
        <v-icon size="x-small" icon="mdi-open-in-new" />
      </a>
    </span>
    <span v-else>
      {{ getProofTypeName }}
    </span>
  </v-chip>
</template>

<script>
import constants from '../constants'
import utils from '../utils.js'

export default {
  props: {
    proofType: {
      type: String,
      default: null
    },
  },
  data() {
    return {
      PROOF_TYPE_GDPR_REQUEST: constants.PROOF_TYPE_GDPR_REQUEST,
      OFF_WIKI_GDPR_REQUEST_URL: constants.OFF_WIKI_GDPR_REQUEST_URL,
    }
  },
  computed: {
    getProofTypeIcon() {
      return utils.getProofTypeIcon(this.proofType)
    },
    getProofTypeName() {
      return this.$t(`Common.${this.proofType}`)
    }
  }
}
</script>
