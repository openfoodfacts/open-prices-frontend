<template>
  <v-card :id="'proof_' + proof.id" @click="selectProof">
    <v-card-text>
      <v-img :src="getProofUrl(proof)"></v-img>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text>
      <ProofFooter :proof="proof" :hideProofDelete="hideProofDelete" :readonly="readonly"></ProofFooter>
    </v-card-text>
  </v-card>
</template>

<script>
import ProofFooter from '../components/ProofFooter.vue'

export default {
  components: {
    ProofFooter,
  },
  props: {
    'proof': null,
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
  },
  data() {
    return {
    }
  },
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
    }
  }
}
</script>
