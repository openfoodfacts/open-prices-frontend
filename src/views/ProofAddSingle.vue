<template>
  <h1 class="text-h5 mb-1">
    {{ $t('Home.ProofAdd') }}
  </h1>

  <v-form @submit.prevent="createProof">
    <v-row>
      <!-- Step 1: proof type -->
      <v-col cols="12" md="6" lg="4">
        <v-card
          :title="$t('Common.Type')"
          :prepend-icon="(addProofSingleForm.type === 'RECEIPT') ? 'mdi-receipt-text-outline' : 'mdi-library-shelves'"
          height="100%"
          :style="proofTypeFormFilled ? 'border: 1px solid #4CAF50' : 'border: 1px solid transparent'"
        >
          <template v-if="proofTypeFormFilled" #append>
            <v-icon icon="mdi-checkbox-marked-circle" color="success" />
          </template>
          <v-divider />
          <v-card-text>
            <ProofTypeInputRow :proofTypeForm="addProofSingleForm" />
          </v-card-text>
          <v-overlay v-model="disableProofTypeForm" scrim="#E8F5E9" contained persistent />
        </v-card>
      </v-col>
    
      <!-- Step 2: proof image -->
      <v-col cols="12" md="6" lg="4">
        <v-card
          :title="$t('Common.Image')"
          prepend-icon="mdi-image"
          height="100%"
          :style="proofImageFormFilled ? 'border: 1px solid #4CAF50' : 'border: 1px solid transparent'"
        >
          <template v-if="proofImageFormFilled" #append>
            <v-icon icon="mdi-checkbox-marked-circle" color="success" />
          </template>
          <v-divider />
          <v-card-text>
            <ProofInputRow :proofType="addProofSingleForm.type" :proofForm="addProofSingleForm" :hideRecentProofChoice="true" />
          </v-card-text>
          <v-overlay v-model="disableProofImageForm" scrim="#E8F5E9" contained persistent />
        </v-card>
      </v-col>

      <!-- Step 3: date & currency -->
      <v-col cols="12" md="6" lg="4">
        <v-card
          :title="$t('Common.Details')"
          prepend-icon="mdi-cog-outline"
          height="100%"
          :style="proofDetailsFormSuccess ? 'border: 1px solid #4CAF50' : 'border: 1px solid transparent'"
        >
          <template v-if="proofDetailsFormSuccess" #append>
            <v-icon icon="mdi-checkbox-marked-circle" color="success" />
          </template>
          <v-divider />
          <v-card-text>
            <h3 class="mb-1">
              {{ $t('Common.Date') }}
            </h3>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="addProofSingleForm.date"
                  :label="$t('Common.Date')"
                  type="date"
                  hide-details="auto"
                />
              </v-col>
            </v-row>

            <h3 class="mt-4 mb-1">
              {{ $t('Common.Currency') }}
            </h3>
            <v-row>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="addProofSingleForm.currency"
                  :label="$t('Common.Currency')"
                  :items="userFavoriteCurrencies"
                  hide-details="auto"
                />
              </v-col>
            </v-row>
          </v-card-text>
          <v-overlay v-model="disableProofDetailsForm" scrim="#E8F5E9" contained persistent />
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-btn
          type="submit"
          :color="formFilled ? 'success' : ''"
          :loading="loading"
          :disabled="!formFilled"
        >
          {{ $t('AddPriceSingle.Create') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import api from '../services/api'
import utils from '../utils.js'

export default {
  components: {
    ProofTypeInputRow: defineAsyncComponent(() => import('../components/ProofTypeInputRow.vue')),
    ProofInputRow: defineAsyncComponent(() => import('../components/ProofInputRow.vue')),
  },
  data() {
    return {
      addProofSingleForm: {
        type: 'PRICE_TAG',
        proof_id: null,
        date: utils.currentDate(),
        currency: null,
      },
      loading: false,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    proofTypeFormFilled() {
      let keys = ['type']
      return Object.keys(this.addProofSingleForm).filter(k => keys.includes(k)).every(k => !!this.addProofSingleForm[k])
    },
    proofImageFormFilled() {
      let keys = ['proof_id']
      return Object.keys(this.addProofSingleForm).filter(k => keys.includes(k)).every(k => !!this.addProofSingleForm[k])
    },
    proofDetailsFormFilled() {
      let keys = ['date', 'currency']
      return Object.keys(this.addProofSingleForm).filter(k => keys.includes(k)).every(k => !!this.addProofSingleForm[k])
    },
    formFilled() {
      return this.proofTypeFormFilled && this.proofImageFormFilled && this.proofDetailsFormFilled
    },
    proofDetailsFormSuccess() {
      return this.proofDetailsFormFilled && this.proofImageFormFilled
    },
    disableProofTypeForm() {
      return this.proofImageFormFilled
    },
    disableProofImageForm() {
      return !this.proofTypeFormFilled
    },
    disableProofDetailsForm() {
      return !this.proofTypeFormFilled || !this.proofImageFormFilled
    },
    userFavoriteCurrencies() {
      return this.appStore.getUserFavoriteCurrencies
    }
  },
  methods: {
    createProof() {
      this.loading = true
      api.updateProof(this.addProofSingleForm.proof_id, this.addProofSingleForm)
        .then(() => {
          this.done()
        })
        .catch(err => {
          this.$store.app.showError(err)
        })
        .finally(() => {
          this.loading = false
        })
    },
    done() {
      this.$router.push({ path: '/dashboard', query: { proofSingleSuccess: 'true' } })
    }
  }
}
</script>
