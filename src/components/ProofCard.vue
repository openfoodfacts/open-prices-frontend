<template>
  <v-card v-if="proof" :id="'proof_' + proof.id" data-name="proof-card" @click="selectProof">
    <v-card-title v-if="!hideProofHeader">
      {{ $t('Common.Proof') }} <v-btn style="float:right;" variant="text" density="compact" icon="mdi-close" @click="close" />
    </v-card-title>

    <v-divider v-if="!hideProofHeader" />

    <v-card-text>
      <v-img v-if="proof.file_path" :src="getProofUrl" :style="'max-height:' + imageHeight" />
    </v-card-text>

    <v-divider />

    <v-card-actions>
      <ProofFooterRow :proof="proof" :hideProofActions="hideProofActions" :readonly="readonly" />
    </v-card-actions>
  </v-card>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    ProofFooterRow: defineAsyncComponent(() => import('../components/ProofFooterRow.vue')),
  },
  props: {
    proof: {
      type: Object,
      default: null
    },
    hideProofHeader: {
      type: Boolean,
      default: false,
    },
    showImageThumb: {
      type: Boolean,
      default: false,
    },
    hideProofActions: {
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
    getProofUrl() {
      // return 'https://prices.openfoodfacts.org/img/0002/qU59gK8PQw.400.webp'  // PRICE_TAG
      // return 'https://prices.openfoodfacts.net/img/0001/lZGFga9ZOT.webp'  // RECEIPT
      if (this.proof.image_thumb_path && this.showImageThumb) {
        return `${import.meta.env.VITE_OPEN_PRICES_APP_URL}/img/${this.proof.image_thumb_path}`
      }
      return `${import.meta.env.VITE_OPEN_PRICES_APP_URL}/img/${this.proof.file_path}`
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
