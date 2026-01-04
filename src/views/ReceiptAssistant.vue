<template>
  <v-row>
    <v-col cols="12">
      <v-stepper v-model="step" hide-actions disabled>
        <v-stepper-header>
          <v-stepper-item :title="stepItemList[0].title" :value="stepItemList[0].value" :complete="step > 1" />
          <v-divider />
          <v-stepper-item :title="stepItemList[1].title" :value="stepItemList[1].value" :complete="step > 2" />
          <v-divider />
          <v-stepper-item :title="stepItemList[2].title" :value="stepItemList[2].value" :complete="step === 3" />
        </v-stepper-header>
      </v-stepper>
    </v-col>
  </v-row>

  <v-row v-if="step === 1">
    <v-col cols="12" md="6">
      <ProofUploadCard :typeReceiptOnly="true" :assistedByAI="true" @proof="onProofUploaded($event)" />
    </v-col>
  </v-row>
  
  <v-row v-if="step === 2">
    <v-col v-if="loadingPredictions" cols="12">
      <v-alert class="mb-2" color="primary" variant="outlined" density="compact" icon="mdi-information">
        {{ $t('ReceiptAssistant.WaitForExtraction') }}
        <v-progress-circular indeterminate />
      </v-alert>
    </v-col>
    <v-col v-else-if="!proofHasReceiptPredictionItems" cols="12">
      <v-alert class="mb-2" type="warning" variant="outlined" density="compact">
        {{ $t('ReceiptAssistant.NoItemsFound') }}
      </v-alert>
    </v-col>
    <v-col cols="12" lg="4">
      <ProofCard mode="Uploaded" :proof="proofObject" :hideActionMenuButton="true" :readonly="true" />
    </v-col>
    <v-col v-if="!loadingPredictions" cols="12" lg="8">
      <ReceiptTableCard :proof="proofObject" :receiptItems="receiptItems" :proofPriceExistingList="proofPriceExistingList" @receiptItemsUpdated="receiptItemsUpdated($event)" />
      <v-row>
        <v-col>
          <v-btn v-if="validNewReceiptItems.length !== validReceiptItems.length" class="float-right mt-4 ml-4" color="primary" :block="!$vuetify.display.smAndUp" @click="addPrices(validNewReceiptItems)">
            {{ $t('ReceiptAssistant.UploadOnlyNewPrices', { nbPrices: validNewReceiptItems.length }) }}
          </v-btn>
          <v-btn class="float-right mt-4" color="primary" :block="!$vuetify.display.smAndUp" @click="addPrices(validReceiptItems)">
            {{ $t('ReceiptAssistant.UploadOrUpdateAllValidPrices', { nbPrices: validReceiptItems.length }) }}
          </v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>

  <v-row v-if="step === 3">
    <v-col>
      <v-row>
        <v-col cols="12">
          <v-progress-linear
            v-if="!finishedUploading"
            v-model="numberOfPricesAdded"
            :max="totalNumberOfPricesToAdd"
            :color="totalNumberOfPricesToAdd === numberOfPricesAdded ? 'success' : 'primary'"
            height="25"
            :striped="totalNumberOfPricesToAdd !== numberOfPricesAdded"
            rounded
          />
          <v-alert
            v-if="finishedUploading"
            type="success"
            variant="outlined"
            density="compact"
            :text="$t('Common.PriceAddedCount', { count: numberOfPricesAdded })"
          />
        </v-col>
      </v-row>
      <v-row v-if="finishedUploading">
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
            :title="$t('Common.GoToProof')"
            prepend-icon="mdi-image"
            append-icon="mdi-arrow-right"
            :to="'/proofs/' + proofObject.id"
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
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import api from '../services/api'
import constants from '../constants'

export default {
  components: {
    ProofUploadCard: defineAsyncComponent(() => import('../components/ProofUploadCard.vue')),
    ProofCard: defineAsyncComponent(() => import('../components/ProofCard.vue')),
    ReceiptTableCard: defineAsyncComponent(() => import('../components/ReceiptTableCard.vue')),
  },
  data() {
    return {
      step: 1,
      // stepItemList: [],  // see computed
      proofObject: null,
      numberOfPricesAdded: 0,
      proofPriceExistingList: [],
      receiptItems: [],
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
          title: this.$t('Common.Prices'),
          value: 2
        },
        {
          title: this.$t('Common.Actions'),
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
      if (!this.receiptItems) return []
      const isProductValid = item => this.itemIsCategory(item) ? item.category_tag : item.product_code
      return this.receiptItems.filter(item => item.price && isProductValid(item))
    },
    validNewReceiptItems() {
      return this.validReceiptItems.filter(item => !item.price_id)
    },
    proofHasReceiptPredictionItems() {
      return this.receiptItems && this.receiptItems.length > 0
    },
    finishedUploading() {
      return this.totalNumberOfPricesToAdd === this.numberOfPricesAdded
    },
    getUserDashboardUrl() {
      const dashboardTab = (this.proofObject && this.proofObject.type === constants.PROOF_TYPE_RECEIPT && this.proofObject.owner_consumption) ? constants.USER_CONSUMPTION.toLowerCase() : constants.USER_COMMUNITY.toLowerCase()
      return `/dashboard?tab=${dashboardTab}`
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
        // move to step 2
        this.step = 2
        // fetch the proof & AI predictions
        api.getProofById(proofIds[0]).then(proof => {
          this.onProofUploaded(proof)
        })
      }
    },
    onProofUploaded(proof) {
      // move to step 2
      this.step = 2
      // store the proof
      this.proofObject = proof
      // load the receipt items
      this.loadingPredictions = true
      this.loadProofWithReceiptItems(receiptItems => {
        this.receiptItems = receiptItems
        api.getPrices({proof_id: this.proofObject.id}).then(data => {
          this.loadingPredictions = false
          this.proofPriceExistingList = data.items
        })
      })
    },
    loadProofWithReceiptItems(callback) {
      // Call receipt items API until we have at least one item
      // Question: callback vs Promise ? Neither are really used in the rest of the code base
      let maxTries = 10
      let tries = 0
      const load = () => {
        // Old proof? only try once
        const oneDayInMs = 24 * 60 * 60 * 1000
        const proofCreatedDate = new Date(this.proofObject.created)
        if (proofCreatedDate.getTime() < Date.now() - oneDayInMs) {
          maxTries = 1
        }
        api.getReceiptItems({proof_id: this.proofObject.id}).then(data => {
          const receiptItems = data.items
          if (receiptItems.length) {
            callback(receiptItems)
          } else {
            tries += 1
            if (tries >= maxTries) {
              callback([])
              return
            }
            setTimeout(load, 5000)  // maximum wait time: maxTries * 5s (50s)
          }
        })
      }
      load()
    },
    itemIsCategory(item) {
      return item.type === constants.PRICE_TYPE_CATEGORY
    },
    receiptItemsUpdated(newReceiptItems) {
      this.receiptItems = newReceiptItems
    },
    updateOrAddReceiptItem(receiptItemId, priceId) {
      let receiptItemData = {
        status: 1,  // linked_to_price
        price_id: priceId
      }
      if (receiptItemId != null) {
        api.updateReceiptItem(receiptItemId, receiptItemData)
      } else {
        receiptItemData.proof_id = this.proofObject.id
        receiptItemData.order = 0
        api.createReceiptItem(receiptItemData)
      }
    },
    addPrices(receiptItems) {
      this.step = 3
      this.totalNumberOfPricesToAdd = receiptItems.length
      this.numberOfPricesAdded = 0
      for (let i = 0; i < receiptItems.length; i++) {
        const priceData = {
          ...receiptItems[i],
          origins_tags: receiptItems[i].origins_tags,
          date: this.proofObject.date,
          location_id: this.proofObject.location_id,
          location_osm_id: this.proofObject.location_osm_id,
          location_osm_type: this.proofObject.location_osm_type,
          proof_id: this.proofObject.id,
          currency: this.proofObject.currency,
          price: receiptItems[i].price || receiptItems[i].predicted_data.price,
          product_name: receiptItems[i].product_name || receiptItems[i].predicted_data.product_name
        }
        if (receiptItems[i].price_id) {
          api.updatePrice(receiptItems[i].price_id, priceData).then((price) => {
            this.numberOfPricesAdded += 1
            this.updateOrAddReceiptItem(receiptItems[i].id, price.id)
          })
        } else {
          api.createPrice(priceData, this.$route.path).then((price) => {
            this.numberOfPricesAdded += 1
            this.updateOrAddReceiptItem(receiptItems[i].id, price.id)
          })
        }
      }
    },
    reloadPage() {
      window.location.reload()
    },
  }
}
</script>
