<template>
  <v-dialog scrollable max-height="80%" min-width="50%" width="auto">
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
        <LocationInputRow :locationForm="updateProofForm" :currentLocation="proof.location" maxRecentLocations="1" />
        <ProofMetadataInputRow :proofType="updateProofForm.type" :proofMetadataForm="updateProofForm" />
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-btn
          color="success"
          variant="flat"
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
    LocationInputRow: defineAsyncComponent(() => import('../components/LocationInputRow.vue')),
    ProofMetadataInputRow: defineAsyncComponent(() => import('../components/ProofMetadataInputRow.vue')),
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
        location_id: null,
        location_osm_id: null,
        location_osm_type: null,
        date: null,
        currency: null,
        receipt_price_count: null,
        receipt_price_total: null,
      },
      loading: false
    }
  },
  computed: {
    formFilled() {
      let keysOSM = Object.keys(this.updateProofForm).filter(k => !['location_id', 'receipt_price_count', 'receipt_price_total'].includes(k))
      let keysONLINE = Object.keys(this.updateProofForm).filter(k => !['location_osm_id', 'location_osm_type', 'receipt_price_count', 'receipt_price_total'].includes(k))
      return Object.keys(this.updateProofForm).filter(k => keysOSM.includes(k)).every(k => !!this.updateProofForm[k]) || Object.keys(this.updateProofForm).filter(k => keysONLINE.includes(k)).every(k => !!this.updateProofForm[k])
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
