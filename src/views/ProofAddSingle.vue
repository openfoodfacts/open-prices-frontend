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
            <v-item-group v-model="addProofSingleForm.type" class="d-inline" mandatory>
              <v-item v-for="pt in proofTypeList" :key="pt.key" v-slot="{ isSelected, toggle }" :value="pt.key">
                <v-chip class="mr-1" :style="isSelected ? 'border: 1px solid #9E9E9E' : 'border: 1px solid transparent'" @click="toggle">
                  <v-icon start :icon="isSelected ? 'mdi-checkbox-marked-circle' : 'mdi-circle-outline'" />
                  {{ pt.value }}
                </v-chip>
              </v-item>
            </v-item-group>
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
            <ProofInputRow :proofType="addProofSingleForm.type" :proofForm="addProofSingleForm" :hideRecentProofOption="true" />
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
              {{ $t('AddPriceSingle.WhereWhen.Date') }}
            </h3>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="addProofSingleForm.date"
                  :label="$t('AddPriceSingle.WhereWhen.DateLabel')"
                  type="date"
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
    ProofInputRow: defineAsyncComponent(() => import('../components/ProofInputRow.vue')),
  },
  data() {
    return {
      proofTypeList: [
        {key: 'PRICE_TAG', value: this.$t('AddPriceHome.MultipleProductMode.Title'), icon: 'mdi-library-shelves'},
        {key: 'RECEIPT', value: this.$t('AddPriceHome.ReceiptMode.Title'), icon: 'mdi-receipt-text-outline'}
      ],
      addProofSingleForm: {
        type: 'PRICE_TAG',
        proof_id: null,
        date: utils.currentDate(),
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
      let keys = ['date']
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
    }
  },
  methods: {
    createProof() {
      this.loading = true
      api.updateProof(this.addProofSingleForm.proof_id, this.addProofSingleForm)
        .then(() => {
          this.$router.push({ path: '/', query: { proofSingleSuccess: 'true' } })
        })
        .catch(err => {
          this.$store.app.showError(err)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
