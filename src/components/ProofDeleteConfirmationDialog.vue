<template>
  <v-dialog scrollable max-height="80%" max-width="80%">
    <v-card>
      <v-card-title>
        {{ $t('ProofDelete.Title') }} <v-btn style="float:right;" variant="text" density="compact" icon="mdi-close" @click="closeDialog"></v-btn>
      </v-card-title>

      <v-divider></v-divider>

      <v-card-text>
        <p class="mb-1">{{ $t('ProofDelete.Confirmation') }}</p>
        <ProofCard :proof="proof" :hideProofHeader="true" :hideProofDelete="true" :readonly="true"></ProofCard>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn
          color="error"
          elevation="1"
          prepend-icon="mdi-delete"
          :loading="loading"
          @click="deleteProof"
        >{{ $t('ProofDelete.Delete') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { useAppStore } from '../store'
import api from '../services/api'

export default {
  components: {
    'ProofCard': defineAsyncComponent(() => import('../components/ProofCard.vue'))
  },
  props: {
    'proof': null,
  },
  data() {
    return {
      loading: false,
    }
  },
  emits: ['delete', 'close'],
  computed: {
  },
  methods: {
    deleteProof() {
      this.loading = true
      api
        .deleteProof(this.proof.id)
        .then((response) => {
          // if response.status == 204
          this.loading = false
          this.deleteSuccessMessage = true
          const store = useAppStore()
          store.removeProof(this.proof.id)
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
