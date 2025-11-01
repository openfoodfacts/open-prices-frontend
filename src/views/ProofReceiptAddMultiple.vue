<template>
  <v-row>
    <v-col cols="12">
      <v-stepper v-model="step" hide-actions disabled>
        <v-stepper-header>
          <v-stepper-item :title="stepItemList[0].title" :value="stepItemList[0].value" :complete="step > 1" />
          <v-divider />
          <v-stepper-item :title="stepItemList[1].title" :value="stepItemList[1].value" :complete="step === 2" />
        </v-stepper-header>
      </v-stepper>
    </v-col>
  </v-row>

  <v-row v-if="step === 1">
    <v-col cols="12" md="6">
      <ProofUploadCard :typeReceiptOnly="true" :hideRecentProofChoice="true" :multiple="true" :assistedByAI="true" @proof="onProofUploaded($event)" @done="proofUploadDone($event)" />
    </v-col>
  </v-row>

  <v-row v-if="step === 2">
    <v-col cols="12">
      <v-alert
        type="success"
        variant="outlined"
        density="compact"
        :text="$t('Common.ProofUploadedCount', { count: proofUploadCount })"
      />
    </v-col>
    <v-col cols="12" sm="6" lg="4">
      <v-card
        :title="$t('Common.AddNewProofs')"
        prepend-icon="mdi-image-plus"
        append-icon="mdi-arrow-right"
        @click="reloadPage"
      />
    </v-col>
    <v-col cols="12" sm="6" lg="4">
      <v-card
        :title="$t('Common.MyDashboard')"
        prepend-icon="mdi-account-circle"
        append-icon="mdi-arrow-right"
        :to="getUserDashboardUrl"
      />
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import constants from '../constants'

export default {
  components: {
    ProofUploadCard: defineAsyncComponent(() => import('../components/ProofUploadCard.vue')),
  },
  data() {
    return {
      step: 1,
      stepItemList: [
        {
          title: this.$t('Common.Upload'),
          value: 1
        },
        {
          title: this.$t('Common.Actions'),
          value: 2
        }
      ],
      firstProofUploaded: null,
      proofUploadCount: 0
    }
  },
  computed: {
    getUserDashboardUrl() {
      const dashboardTab = (this.firstProofUploaded && this.firstProofUploaded.type === constants.PROOF_TYPE_RECEIPT && this.firstProofUploaded.owner_consumption) ? constants.USER_CONSUMPTION.toLowerCase() : constants.USER_COMMUNITY.toLowerCase()
      return `/dashboard?tab=${dashboardTab}`
    }
  },
  methods: {
    onProofUploaded(proof) {
      this.firstProofUploaded = proof
      console.log('Proof uploaded:', proof)
    },
    proofUploadDone(proofUploadCount) {
      this.proofUploadCount = proofUploadCount
      this.step = 2
    },
    reloadPage() {
      window.location.reload()
    }
  }
}
</script>
