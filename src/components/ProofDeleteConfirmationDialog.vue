<template>
  <v-dialog scrollable :height="dialogHeight" :width="dialogWidth">
    <v-card :title="$t('ProofDelete.Title')">
      <template #append>
        <v-icon icon="mdi-close" @click="close" />
      </template>

      <v-divider />

      <v-card-text>
        <p class="mb-1">
          {{ $t('ProofDelete.Confirmation') }}
        </p>
        <ProofCard :proof="proof" :hideProofHeader="true" :hideActionMenuButton="true" :readonly="true" />
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-spacer v-if="$vuetify.display.smAndUp" />
        <v-btn
          color="error"
          variant="flat"
          :block="!$vuetify.display.smAndUp"
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
    dialogHeight() {
      return this.$vuetify.display.smAndUp ? '80%' : '100%'
    },
    dialogWidth() {
      return this.$vuetify.display.smAndUp ? '80%' : '100%'
    },
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
          this.close()
        })
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>
