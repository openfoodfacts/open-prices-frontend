<template>
  <v-dialog scrollable max-height="80%" max-width="80%">
    <v-card>
      <v-card-title>
        {{ $t('ProofEdit.Title') }} <v-btn style="float:right;" variant="text" density="compact" icon="mdi-close" @click="close" />
      </v-card-title>

      <v-divider />

      <v-card-text>
        <ProofCard :proof="proof" :hideProofHeader="true" :hideProofActions="true" :readonly="true" imageHeight="100px" />
      </v-card-text>

      <v-divider />

      <v-card-text>
        <ProofTypeInputRow :proofTypeForm="updateProofForm" />
        <ProofDateCurrencyInputRow :proofDateCurrencyForm="updateProofForm" />
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-btn
          elevation="1"
          :disabled="!formFilled"
          :loading="loading"
          @click="updateProof"
        >
          {{ $t('ProofEdit.Save') }}
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
    ProofCard: defineAsyncComponent(() => import('../components/ProofCard.vue')),
    ProofTypeInputRow: defineAsyncComponent(() => import('../components/ProofTypeInputRow.vue')),
    ProofDateCurrencyInputRow: defineAsyncComponent(() => import('../components/ProofDateCurrencyInputRow.vue')),
  },
  props: {
    proof: {
      type: Object,
      default: null
    },
  },
  emits: ['update', 'close'],
  data() {
    return {
      updateProofForm: {
        type: null,
        date: null,
        currency: null,
      },
      loading: false
    }
  },
  computed: {
    formFilled() {
      return Object.values(this.updateProofForm).every(x => !!x)
    },
  },
  mounted() {
    this.initUpdateProofForm()
  },
  methods: {
    initUpdateProofForm() {
      Object.keys(this.updateProofForm).forEach((key) => {
        this.updateProofForm[key] = this.proof[key]
      })
    },
    updateProof() {
      api
        .updateProof(this.proof.id, this.updateProofForm)
        .then((response) => {
          // if response.status == 204
          this.$emit('update', response.data)
          this.close()
        })
        .catch((error) => {
          console.log(error)
        })
    },
    close() {
      this.$emit('close')
    },
  }
}
</script>
