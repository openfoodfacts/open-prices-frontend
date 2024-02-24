<template>
  <v-card :id="'proof_' + proof.id" :class="{ 'highlighted': isSelected }" @click="selectProof">
    <v-card-text>
      <v-img :src="getProofUrl(proof)"></v-img>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-text v-if="showProofFooter">
      <ProofFooter :proof="proof"></ProofFooter>
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
    showProofFooter: {
      type: Boolean,
      default: true,
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
</style>