<template>
  <v-chip
    style="padding-left:5px;padding-right:5px"
    label
    size="small"
    density="comfortable"
    :title="$t('Common.Proof')"
    @click="openDialog"
  >
    <v-icon icon="mdi-image" />
    <v-dialog v-model="dialog" scrollable max-height="80%" width="auto">
      <ProofCard :proof="proof" :hideProofActions="true" @close="closeDialog" />
    </v-dialog>
  </v-chip>
</template>

<script>
import ProofCard from '../components/ProofCard.vue'

export default {
  components: {
    ProofCard,
  },
  props: {
    proof: {
      type: Object,
      default: null
    },
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
