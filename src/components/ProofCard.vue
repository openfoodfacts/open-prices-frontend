<template>
  <v-card :id="'proof_' + proof.id" :class="{ 'full-screen-proof-card': isSelected }" @click="selectProof">
    <v-card-text>
      <v-img :src="getProofUrl(proof)"></v-img>
    </v-card-text>
    <v-divider v-if="!isSelected"></v-divider>
    <v-card-text v-if="!isSelected">
      <ProofFooter :proof="proof" :reducedProofFooter="reducedProofFooter"></ProofFooter>
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
    reducedProofFooter: {
      type: Boolean,
      default: false,
    },
    isSelectable: {
      type: Boolean,
      default: false,
    },
    isSelected: {
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

<style scoped>
.highlighted {
  background-color: rgb(0, 255, 64);
}
.full-screen-proof-card {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  object-fit: cover;
}
</style>