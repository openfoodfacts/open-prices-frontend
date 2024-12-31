<template>
  <v-dialog scrollable max-height="80%" min-width="50%" width="auto">
    <ProofCard :proof="proof" :hideProofActions="true" :readonly="readonly" @close="close" />
  </v-dialog>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    ProofCard: defineAsyncComponent(() => import('../components/ProofCard.vue')),
  },
  props: {
    proof: {
      type: Object,
      default: null
    },
    readonly: {
      type: Boolean,
      default: false,
    }
  },
  emits: ['close'],
  methods: {
    close() {
      this.$emit('close')
    },
  }
}
</script>
