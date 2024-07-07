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
        <v-row>
          <v-col cols="6">
            <h3 class="mb-1">
              {{ $t('Common.Type') }}
            </h3>
            <v-item-group v-model="updateProofForm.type" class="d-inline" mandatory>
              <v-item v-for="pt in proofTypeList" :key="pt.key" v-slot="{ isSelected, toggle }" :value="pt.key">
                <v-chip class="mr-1" :style="isSelected ? 'border: 1px solid #9E9E9E' : 'border: 1px solid transparent'" @click="toggle">
                  <v-icon start :icon="isSelected ? 'mdi-checkbox-marked-circle' : 'mdi-circle-outline'" />
                  {{ $t('ProofCard.' + pt.value) }}
                </v-chip>
              </v-item>
            </v-item-group>
          </v-col>
        </v-row>
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
import constants from '../constants'

export default {
  components: {
    ProofCard: defineAsyncComponent(() => import('../components/ProofCard.vue')),
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
      proofTypeList: constants.PROOF_TYPE_LIST,
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
