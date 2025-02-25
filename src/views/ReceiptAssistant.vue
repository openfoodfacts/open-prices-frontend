<template>
  <v-row>
    <v-col cols="12">
      <v-stepper v-model="step" hide-actions editable>
        <v-stepper-header>
          <v-stepper-item :title="stepItemList[0].title" :value="stepItemList[0].value" :complete="step > 1" />
          <v-divider />
          <v-stepper-item :title="stepItemList[1].title" :value="stepItemList[1].value" :complete="step > 2" />
          <v-divider />
          <v-stepper-item :title="stepItemList[2].title" :value="stepItemList[2].value" :complete="step == 3" />
        </v-stepper-header>
      </v-stepper>
    </v-col>
  </v-row>

  <v-row v-if="step === 1">
    <v-col cols="12" md="6">
      <ProofUploadCard :typeReceiptOnly="true" @proof="onProofUploaded($event)" />
    </v-col>
  </v-row>
  
  <v-row v-if="step === 2">
    <v-col cols="12">
      <v-row>
        <v-col cols="12">
          <v-alert v-if="!loadingPredictions && !proofHasReceiptPredictionItems" class="mb-2" type="warning" variant="outlined">
            {{ $t('ReceiptAssistant.NoItemsFound') }}
          </v-alert>
          <v-alert v-if="loadingPredictions" class="mb-2" type="info" variant="outlined">
            {{ $t('ReceiptAssistant.WaitForExtraction') }}
            <v-progress-circular indeterminate />
          </v-alert>
        </v-col>
        <v-col cols="12" lg="4">
          <ProofCard :proof="proofObject" :hideProofHeader="true" :hideActionMenuButton="true" :readonly="true" />
        </v-col>
        <v-col cols="12" lg="8">
          <ReceiptTableCard :proof="proofObject" :proofPriceExistingList="proofPriceExistingList" @receiptItemsUpdated="receiptItemsUpdated($event)" />
          <v-row>
            <v-col>
              <v-btn class="float-right mt-4 ml-4" color="primary" :block="!$vuetify.display.smAndUp" @click="addPrices(validNewReceiptItems)">
                {{ $t('ReceiptAssistant.UploadOnlyNewPrices', {nbPrices: validNewReceiptItems.length}) }}
              </v-btn>
              <v-btn class="float-right mt-4" color="primary" :block="!$vuetify.display.smAndUp" @click="addPrices(validReceiptItems)">
                {{ $t('ReceiptAssistant.UploadAllValidPrices', {nbPrices: validReceiptItems.length}) }}
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
  </v-row>

  <v-row v-if="step === 3">
    <v-col cols="12">
      <v-row>
        <v-col>
          <h3 class="mb-4">
            {{ $t('ContributionAssistant.WaitForUpload') }}
          </h3>
          <v-progress-linear
            v-model="numberOfPricesAdded"
            :max="totalNumberOfPricesToAdd"
            :color="totalNumberOfPricesToAdd === numberOfPricesAdded ? 'success' : 'primary'"
            height="25"
            :striped="totalNumberOfPricesToAdd !== numberOfPricesAdded"
            rounded
          >
            <strong>{{ $t('ContributionAssistant.PriceAddProgress', { numberOfPricesAdded: numberOfPricesAdded, totalNumberOfPrices: totalNumberOfPricesToAdd }) }}</strong>
          </v-progress-linear>
        </v-col>
      </v-row>
      <v-row class="text-center">
        <v-col>
          <v-btn color="primary" :block="!$vuetify.display.smAndUp" :to="'/proofs/' + proofObject.id" :disabled="totalNumberOfPricesToAdd !== numberOfPricesAdded">
            {{ $t('ContributionAssistant.GoToProof') }}
          </v-btn>
        </v-col>
        <v-col>
          <v-btn color="primary" :block="!$vuetify.display.smAndUp" :disabled="totalNumberOfPricesToAdd !== numberOfPricesAdded" @click="reloadPage">
            {{ $t('ContributionAssistant.AddNewProof') }}
          </v-btn>
        </v-col>
        <v-col>
          <v-btn color="primary" :block="!$vuetify.display.smAndUp" :aria-label="$t('Common.MyDashboard')" to="/dashboard" :disabled="totalNumberOfPricesToAdd !== numberOfPricesAdded">
            {{ $t('ContributionAssistant.GoToDashboard') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import api from '../services/api'

export default {
  components: {
    ProofUploadCard: defineAsyncComponent(() => import('../components/ProofUploadCard.vue')),
    ProofCard: defineAsyncComponent(() => import('../components/ProofCard.vue')),
    ReceiptTableCard: defineAsyncComponent(() => import('../components/ReceiptTableCard.vue')),
  },
  data() {
    return {
      step: 1,
      proofObject: null,
      receiptItems: [],
      numberOfPricesAdded: 0,
      proofPriceExistingList: [],
      totalNumberOfPricesToAdd: 0,
      loadingPredictions: false,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    stepItemList() {
      return [
        {
          title: this.$t('Common.Proof'),
          value: 1
        },
        {
          title: this.$vuetify.display.smAndUp ? this.$t('ContributionAssistant.Steps.LabelsExtraction') : this.$t('Common.Labels'),
          value: 2
        },
        {
          title: this.$t('Common.Done'),
          value: 3
        }
      ]
    },
    proofIdsFromQueryParam() {
      if (!this.$route.query.proof_ids) return null
      return this.$route.query.proof_ids.split(',')
    },
    validReceiptItems() {
      // Should I use item.product_code or item.productFound ?
      // item.product_code means any typed product_code would work, including ones with no product associated
      // item.productFound means the product was explicitly selected by the user
      return this.receiptItems.filter(item => item.price && (item.product_code || item.category_tag))
    },
    validNewReceiptItems() {
      return this.validReceiptItems.filter(item => !item.existingPrice)
    },
    proofHasReceiptPredictionItems() {
      const receiptPrediction = this.proofObject?.predictions?.find(predication => predication.type === 'RECEIPT_EXTRACTION')
      if (!receiptPrediction) return false
      let receiptPredictionsItems = receiptPrediction.data.items
      return receiptPredictionsItems.length > 0
    }
  },
  mounted() {
    if (this.$route.query.proof_ids) {
      // When a query param proof_ids=1,2 is passed, we load the first proof and skip the proof selection step
      this.initWithProofIds(this.proofIdsFromQueryParam)
    }
  },
  methods: {
    initWithProofIds(proofIds) {
      if (proofIds.length) {
        this.onProofUploaded({id: proofIds[0]})
      }
    },
    onProofUploaded(proof) {
      this.step = 2
      this.loadingPredictions = true
      this.loadProofWithPredictions(proof.id, 5, proof => {
        api.getPrices({proof_id: proof.id}).then(data => {
          this.loadingPredictions = false
          this.proofPriceExistingList = data.items
          this.proofObject = proof
        })
      })
    },
    loadProofWithPredictions(proofId, maxTries, callback) {
      let tries = 0
      const load = () => {
        api.getProofById(proofId).then(proof => {
          const receiptPrediction = proof?.predictions?.find(predication => predication.type === 'RECEIPT_EXTRACTION')
          const oneDayInMs = 24 * 60 * 60 * 1000
          const proofCreatedDate = new Date(proof.created)
          if (proofCreatedDate.getTime() < Date.now() - oneDayInMs) {
            // Only try once on old proofs
            maxTries = 1
          }
          if (receiptPrediction) {
            callback(proof)
          } else {
            tries += 1
            if (tries >= maxTries) {
              callback(proof)
              return
            }
            setTimeout(load, 3000)
          }
        })
      }
      load()
    },
    receiptItemsUpdated(newReceiptItems) {
      this.receiptItems = newReceiptItems
    },
    addPrices(prices) {
      this.step = 3
      this.totalNumberOfPricesToAdd = prices.length
      this.numberOfPricesAdded = 0
      for (let i = 0; i < prices.length; i++) {
        const productPriceForm = prices[i]
        const priceData = {
          ...productPriceForm,
          origins_tags: productPriceForm.origins_tags,
          date: this.proofObject.date,
          location_id: this.proofObject.location_id,
          location_osm_id: this.proofObject.location_osm_id,
          location_osm_type: this.proofObject.location_osm_type,
          proof_id: this.proofObject.id,
          currency: this.proofObject.currency
        }
        api.createPrice(priceData, this.$route.path).then(() => {
          this.numberOfPricesAdded += 1
        })
      }
    },
    reloadPage() {
      window.location.reload()
    },
  }
}
</script>
