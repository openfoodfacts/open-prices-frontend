<template>
  <v-dialog scrollable max-height="80%" min-width="50%" width="auto">
    <v-card>
      <v-card-title>
        {{ $t('ProofDelete.Title') }} <v-btn style="float:right;" variant="text" density="compact" icon="mdi-close" @click="closeDialog" />
      </v-card-title>

      <v-divider />

      <v-card-text>
        <p class="mb-1">
          {{ $t('ProofDelete.Confirmation') }}
        </p>
        <ProofCard :proof="proof" :hideProofHeader="true" :hideProofActions="true" :readonly="true" />
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-btn
          color="error"
          elevation="1"
          prepend-icon="mdi-delete"
          :loading="loading"
          @click="deleteProof"
        >
          {{ $t('ProofDelete.Delete') }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import api from '../services/api'

export default {
  components: {
    ProofCard: defineAsyncComponent(() => import('../components/ProofCard.vue'))
  },
  props: {
    proof: {
      type: Object,
      default: null
    },
  },
  emits: ['delete', 'close'],
  data() {
    return {
      loading: false,
    }
  },
  computed: {
  },
  methods: {
    deleteProof() {
      this.loading = true
      api
        .deleteProof(this.proof.id)
        .then((response) => {  // eslint-disable-line no-unused-vars
          // if response.status == 204
          this.loading = false
          this.deleteSuccessMessage = true
          this.$emit('delete')
          this.closeDialog()
        })
    },
    closeDialog() {
      this.$emit('close')
    }
  }
}
</script>
