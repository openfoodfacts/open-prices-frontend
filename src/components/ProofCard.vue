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

    <v-card-text class="pa-2">
      <ContributionAssistantDrawCanvas
        v-if="canDisplayPriceTagsBoundingBoxes"
        :imageSrc="getProofImageFullUrl"
        :boundingBoxesFromServer="proof.priceTagsBoundingBoxes"
        :preventDrawing="true"
        :forceFullImageHeight="true"
      />
      <v-img v-else-if="proof.file_path" :src="getProofImageFullUrl" :height="imageHeight" :width="imageWidth" />
    </v-card-text>

    <v-divider v-if="showPriceFooterRow" />

    <v-card-actions v-if="showPriceFooterRow">
      <ProofFooterRow 
        :proof="proof" 
        :hideActionMenuButton="hideActionMenuButton" 
        :readonly="readonly"
        :showPriceTagsBoundingBoxes="showPriceTagsBoundingBoxes"
        @update:showPriceTagsBoundingBoxes="showPriceTagsBoundingBoxes = $event"
      />
    </v-card-actions>
  </v-card>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import proof_utils from '../utils/proof.js'

export default {
  components: {
    ProofFooterRow: defineAsyncComponent(() => import('../components/ProofFooterRow.vue')),
    ContributionAssistantDrawCanvas: defineAsyncComponent(() => import('../components/ContributionAssistantDrawCanvas.vue')),
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
    hideProofFooterRow: {
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
    imageWidth: {
      type: String,
      default: '100%',
    },
  },
  emits: ['proofSelected', 'close'],
  data() {
    return {
      proofEditDialog: false,
      showPriceTagsBoundingBoxes: false, // updated by Proof action menu
    }
  },
  computed: {
    ...mapStores(useAppStore),
    getProofImageFullUrl() {
      if (this.proof.image_thumb_path && this.showImageThumb) {
        return proof_utils.getImageFullUrl(this.proof.image_thumb_path)
      }
      return proof_utils.getImageFullUrl(this.proof.file_path)
    },
    canDisplayPriceTagsBoundingBoxes() {
      return this.showPriceTagsBoundingBoxes && this.proof?.priceTagsBoundingBoxes?.length > 0
    },
    showPriceFooterRow() {
      return !this.hideProofFooterRow
    }
  },
  mounted() {
    this.showPriceTagsBoundingBoxes = this.appStore?.user?.display_price_tags_bounding_boxes || false
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
