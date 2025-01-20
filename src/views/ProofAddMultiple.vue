<template>
  <v-row>
    <v-col cols="12">
      <v-stepper v-model="step" hide-actions disabled>
        <v-stepper-header>
          <v-stepper-item :title="stepItemList[0].title" :value="stepItemList[0].value" :complete="step === 2" />
          <v-divider />
          <v-stepper-item :title="stepItemList[1].title" :value="stepItemList[1].value" :complete="step === 2" />
        </v-stepper-header>
      </v-stepper>
    </v-col>
  </v-row>

  <v-row v-if="step === 1">
    <v-col cols="12" md="6">
      <ProofUploadCard :typePriceTagOnly="true" :hideRecentProofChoice="true" :multiple="true" @done="proofUploadDone($event)" />
    </v-col>
  </v-row>

  <v-row v-if="step === 2">
    <v-col>
      <v-card
        class="border-success"
        :title="$t('Common.ProofUploadedCount', { count: proofUploadCount })"
        prepend-icon="mdi-image-check"
      >
        <template #append>
          <v-icon icon="mdi-checkbox-marked-circle" color="success" />
        </template>
        <v-divider />
        <v-card-text class="text-center">
          <v-row>
            <v-col cols="12" sm="4">
              <v-btn
                color="primary"
                :block="!$vuetify.display.smAndUp"
                prepend-icon="mdi-image-plus"
                @click="reloadPage"
              >
                {{ $t('Common.AddNewProofs') }}
              </v-btn>
            </v-col>
            <v-col cols="12" sm="4">
              <v-btn
                color="primary"
                :block="!$vuetify.display.smAndUp"
                prepend-icon="mdi-checkbox-marked-circle-plus-outline"
                @click="goToPriceValidation"
              >
                {{ $t('Common.ValidatePrices') }}
              </v-btn>
            </v-col>
            <v-col cols="12" sm="4">
              <v-btn
                color="primary"
                :block="!$vuetify.display.smAndUp"
                prepend-icon="mdi-account-circle"
                @click="goToUserDashboard"
              >
                {{ $t('Common.MyDashboard') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from 'vue'

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
          title: this.$t('Common.Done'),
          value: 2
        }
      ],
      proofUploadCount: 0
    }
  },
  methods: {
    proofUploadDone(proofUploadCount) {
      this.proofUploadCount = proofUploadCount
      this.step = 2
    },
    goToPriceValidation() {
      this.$router.push({ path: '/experiments/price-validation-assistant' })
    },
    reloadPage() {
      window.location.reload()
    },
    goToUserDashboard() {
      this.$router.push({ path: '/dashboard', query: { proofSingleSuccess: 'true' } })
    }
  }
}
</script>
