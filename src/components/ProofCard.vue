<template>
  <v-card :id="'proof_' + proof.id" @click="selectProof">
    <v-card-title v-if="!hideProofHeader">
      {{ $t('ProofCard.Proof') }} <v-btn style="float:right;" variant="text" density="compact" icon="mdi-close" @click="close"></v-btn>
    </v-card-title>

    <v-divider v-if="!hideProofHeader"></v-divider>

    <v-card-text>
      <v-img :src="getProofUrl(proof)">
        <v-row justify="end">
          <v-btn
          v-if="proof.type === 'RECEIPT' && isEditable"
            elevation="2"
            style="margin: 15px;"
            icon
            @click="showProofEditDialog(proof)"
          >
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
        </v-row>
      </v-img>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <ProofFooter :proof="proof" :hideProofDelete="hideProofDelete" :readonly="readonly"></ProofFooter>
    </v-card-actions>
  </v-card>
  <ProofEditDialog
    v-if="proofEditDialog"
    :proof="proof"
    v-model="proofEditDialog"
    @proofUpdated="handleProofUpdated"
    @close="proofEditDialog = false"
  ></ProofEditDialog>
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
  emits: ['proofSelected', 'proofUpdated', 'close'],
  methods: {
    selectProof() {
      if (this.isSelectable) {
        this.$emit('proofSelected', this.proof)
      }
    },
    getProofUrl(proof) {
      // return 'https://prices.openfoodfacts.org/img/0002/qU59gK8PQw.webp'
      // return 'https://prices.openfoodfacts.net/img/0001/lZGFga9ZOT.webp'
      return `${import.meta.env.VITE_OPEN_PRICES_APP_URL}/img/${proof.file_path}`
    },
    showProofEditDialog(proof) {
      this.proofEditDialog = true
    },
    handleProofUpdated() {
      this.$emit('proofUpdated')
  },
    close() {
      this.$emit('close')
    }
  }
}
</script>
