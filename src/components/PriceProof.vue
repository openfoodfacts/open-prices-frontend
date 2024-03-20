<template>
  <v-chip
    style="padding-left:5px;padding-right:5px"
    label
    size="small"
    density="comfortable"
    :title="$t('PriceCard.Proof')"
    @click="openDialog">
    <v-icon icon="mdi-image"></v-icon>
  </v-chip>

  <v-dialog scrollable v-model="dialog" max-height="80%" width="80%">
    <ProofCard :proof="proof" :hideProofActions="true" @close="closeDialog"></ProofCard>
  </v-dialog>
</template>

<script>
import ProofCard from '../components/ProofCard.vue'

export default {
  components: {
    ProofCard,
  },
  props: {
    'proof': null,
  },
  data() {
    return {
      dialog: false
    }
  },
  methods: {
    openDialog() {
      this.dialog = true
    },
    closeDialog() {
      this.dialog = false
    }
  }
}
</script>
