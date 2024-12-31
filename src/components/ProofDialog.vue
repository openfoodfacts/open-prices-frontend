<template>
  <v-dialog scrollable :height="dialogHeight" :width="dialogWidth">
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
  computed: {
    dialogHeight() {
      return this.$vuetify.display.smAndUp ? '80%' : '100%'
    },
    dialogWidth() {
      return this.$vuetify.display.smAndUp ? '80%' : '100%'
    },
  },
  methods: {
    close() {
      this.$emit('close')
    },
  }
}
</script>
