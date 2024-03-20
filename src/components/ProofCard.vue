<template>
  <v-card :id="'proof_' + proof.id" @click="selectProof">
    <v-card-title v-if="!hideProofHeader">
      {{ $t('ProofCard.Proof') }} <v-btn style="float:right;" variant="text" density="compact" icon="mdi-close" @click="close"></v-btn>
    </v-card-title>

    <v-divider v-if="!hideProofHeader"></v-divider>

    <v-card-text>
      <v-img :src="getProofUrl(proof)"></v-img>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <ProofFooter :proof="proof" :hideProofDelete="hideProofDelete" :readonly="readonly"></ProofFooter>
    </v-card-actions>
  </v-card>
</template>

<script>
import ProofFooter from '../components/ProofFooter.vue'
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    ProofFooter,
    'ProofEditDialog': defineAsyncComponent(() => import('../components/ProofEditDialog.vue')),
  },
  props: {
    'proof': null,
    hideProofHeader: {
      type: Boolean,
      default: false,
    },
    hideProofDelete: {
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
    isEditable: {
      type: Boolean,
      default: false,
    },
    height: {
      type: String,
      default: 'auto',
    },
  },
  data() {
    return {
      proofEditDialog: false,
    }
  },
  emits: ['proofSelected', 'close'],
  methods: {
    selectProof() {
      if (this.isSelectable) {
        this.$emit('proofSelected', this.proof)
      }
    },
    getProofUrl(proof) {
      return 'https://prices.openfoodfacts.org/img/0002/qU59gK8PQw.webp'
      // return 'https://prices.openfoodfacts.net/img/0001/lZGFga9ZOT.webp'
      return `${import.meta.env.VITE_OPEN_PRICES_APP_URL}/img/${proof.file_path}`
    },
    showProofEditDialog(proof) {
      this.proofEditDialog = true
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>
