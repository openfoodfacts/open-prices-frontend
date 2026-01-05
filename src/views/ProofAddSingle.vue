<template>
  <v-row>
    <v-col cols="12">
      <v-stepper v-model="step" hide-actions disabled>
        <v-stepper-header>
          <v-stepper-item :title="stepItemList[0].title" :value="stepItemList[0].value" :complete="step > 1" />
          <v-divider />
          <v-stepper-item :title="stepItemList[1].title" :value="stepItemList[1].value" :complete="step > 2" />
        </v-stepper-header>
      </v-stepper>
    </v-col>
  </v-row>

  <v-row>
    <v-col cols="12">
      <DeprecatedAlert />
    </v-col>
  </v-row>

  <!-- Step 1: proof upload -->
  <template v-if="step === 1">
    <v-row>
      <v-col cols="12" md="6">
        <ProofUploadCard :hideRecentProofChoice="true" @done="proofUploadDone($event)" />
      </v-col>
    </v-row>
  </template>

  <!-- Step 2: actions -->
  <template v-if="step === 2">
    <v-row>
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
          :title="$t('Common.AddNewProof')"
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
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    DeprecatedAlert: defineAsyncComponent(() => import('../components/DeprecatedAlert.vue')),
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
      proofUploadCount: 0
    }
  },
  computed: {
    getUserDashboardUrl() {
      return '/dashboard?proofSingleSuccess=true'
    }
  },
  methods: {
    proofUploadDone(proofUploadCount) {
      this.proofUploadCount = proofUploadCount
      this.step = 2
    },
    reloadPage() {
      window.location.reload()
    },
  }
}
</script>
