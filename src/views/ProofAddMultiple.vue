<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-card
        :class="proofFormFilled ? 'border-success' : 'border-transparent'"
        :title="$t('Common.Image')"
        prepend-icon="mdi-image-multiple"
        height="100%"
      >
        <template v-if="proofFormFilled" #append>
          <v-icon icon="mdi-checkbox-marked-circle" color="success" />
        </template>
        <v-divider />
        <v-card-text>
          <ProofInputRow :proofForm="addProofForm" :hideRecentProofChoice="true" :multiple="true" />
        </v-card-text>
        <v-overlay v-model="disableProofForm" scrim="#E8F5E9" contained persistent />
      </v-card>
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <v-btn
        class="float-right"
        type="submit"
        :color="proofFormFilled ? 'success' : ''"
        :loading="loading"
        :disabled="!proofFormFilled"
        @click="done"
      >
        {{ $t('Common.Done') }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import utils from '../utils.js'

export default {
  components: {
    ProofInputRow: defineAsyncComponent(() => import('../components/ProofInputRow.vue')),
  },
  data() {
    return {
      // data
      addProofForm: {
        type: null,
        location_id: null,
        location_osm_id: null,
        location_osm_type: '',
        date: utils.currentDate(),
        currency: null,  // see initProofForm
        receipt_price_count: null,
        receipt_price_total: null,
        proof_id: null
      },
      loading: false,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    proofFormFilled() {
      let keys = ['proof_id']
      return Object.keys(this.addProofForm).filter(k => keys.includes(k)).every(k => !!this.addProofForm[k])
    },
    disableProofForm() {
      return this.proofFormFilled
    },
  },
  mounted() {
    this.initProofForm()
  },
  methods: {
    initProofForm() {
      this.addProofForm.currency = this.appStore.getUserLastCurrencyUsed
    },
    done() {
      this.$router.push({ path: '/dashboard', query: { proofSingleSuccess: 'true' } })
    }
  }
}
</script>
