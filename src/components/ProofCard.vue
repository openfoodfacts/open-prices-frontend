<template>
  <v-card v-if="proof" :id="'proof_' + proof.id" :class="mode == 'Uploaded' ? 'border-success' : 'border-transparent'" data-name="proof-card" @click="selectProof">
    <template v-if="!hideProofHeader" #title>
      {{ $t('Common.Proof') }}
    </template>
    <template v-if="!hideProofHeader" #prepend>
      <v-icon icon="mdi-image" />
    </template>
    <template v-if="!hideProofHeader" #append>
      <v-icon v-if="mode == 'Display'" icon="mdi-close" @click="close" />
      <v-icon v-else-if="mode == 'Uploaded'" icon="mdi-checkbox-marked-circle" color="success" />
    </template>

    <v-divider v-if="!hideProofHeader" />

    <v-card-text>
      <v-img v-if="proof.file_path" :src="getProofImageFullUrl" :height="imageHeight" />
    </v-card-text>

    <v-divider />

    <v-card-actions>
      <ProofFooterRow :proof="proof" :hideActionMenuButton="hideActionMenuButton" :readonly="readonly" />
    </v-card-actions>
  </v-card>
</template>

<script>
import { defineAsyncComponent } from 'vue'
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
    hideProofHeader: {
      type: Boolean,
      default: false,
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
    imageHeight: {
      type: String,
      default: '100%',
    },
  },
  emits: ['proofSelected', 'close'],
  data() {
    return {
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
