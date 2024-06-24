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
        <h3 class="mb-1">
          {{ $t('Common.Date') }}
        </h3>
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="updateProofForm.date"
              :label="$t('Common.Date')"
              type="date"
            />
          </v-col>
        </v-row>
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-btn
          elevation="1"
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
import { useAppStore } from '../store'
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
  emits: ['update', 'close'],
  data() {
    return {
      updateProofForm: {
        type: null,
        currency: null,
        date: null,
      },
      loading: false
    }
  },
  computed: {
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
          const store = useAppStore()
          store.updateProof(this.proof.id, this.updateProofForm)
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
