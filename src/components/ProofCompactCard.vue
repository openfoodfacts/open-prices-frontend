<template>
  <v-card v-if="proof" :id="'proof_' + proof.id" :class="mode == 'Uploaded' ? 'border-success' : 'border-transparent'" data-name="proof-card" @click="selectProof">
    <v-card-text class="pa-2">
      <v-row>
        <v-col class="pr-0" style="max-width:20%;">
          <v-img v-if="proof.file_path" :src="getProofImageFullUrl" max-height="100px" />
          <v-img v-else :src="productImageDefault" height="50px" width="50px" style="filter:invert(.9);" />
        </v-col>
        <v-col style="max-width:80%;">
          <ProofFooterRow :proof="proof" :hideActionMenuButton="hideActionMenuButton" :readonly="readonly" />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import constants from '../constants'
import proof_utils from '../utils/proof.js'

export default {
  components: {
    ProofFooterRow: defineAsyncComponent(() => import('../components/ProofFooterRow.vue')),
  },
  props: {
    proof: {
      type: Object,
      default: null
    },
    mode: {
      type: String,
      default: 'Display'  // or 'Uploaded'
    },
    showImageThumb: {
      type: Boolean,
      default: false,
    },
    hideActionMenuButton: {
      type: Boolean,
      default: false,
    },
    isSelectable: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['proofSelected', 'close'],
  data() {
    return {
      productImageDefault: constants.PRODUCT_IMAGE_DEFAULT_URL,
      proofEditDialog: false,
    }
  },
  computed: {
    getProofImageFullUrl() {
      if (this.proof.image_thumb_path && this.showImageThumb) {
        return proof_utils.getProofImageFullUrl(this.proof, true)
      }
      return proof_utils.getProofImageFullUrl(this.proof)
    },
  },
  methods: {
    selectProof() {
      if (this.isSelectable) {
        this.$emit('proofSelected', this.proof)
      }
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>
