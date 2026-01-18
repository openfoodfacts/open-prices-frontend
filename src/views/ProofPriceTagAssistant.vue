<template>
  <v-row>
    <v-col cols="12">
      <v-stepper v-model="step" hide-actions editable>
        <v-stepper-header>
          <v-stepper-item :title="stepItemList[0].title" :value="stepItemList[0].value" :complete="step > 1" :disabled="disableProofSelectStep" />
          <v-divider />
          <v-stepper-item :title="stepItemList[1].title" :value="stepItemList[1].value" :complete="step > 2" :disabled="disableLabelsExtractionStep" />
          <v-divider />
          <v-stepper-item :title="stepItemList[2].title" :value="stepItemList[2].value" :complete="step > 3" :disabled="disableCleanupStep" />
          <v-divider />
          <v-stepper-item :title="stepItemList[3].title" :value="stepItemList[3].value" :complete="step > 4" :disabled="disableSummaryStep" />
        </v-stepper-header>
      </v-stepper>
    </v-col>
  </v-row>

  <template v-if="step === 1">
    <v-row>
      <v-col cols="12" md="6">
        <ProofUploadCard :typePriceTagOnly="true" @proof="onProofUploaded($event)" />
      </v-col>
    </v-row>
  </template>
  
  <template v-if="step === 2">
    <v-row>
      <v-col cols="12">
        <v-alert v-if="drawCanvasLoaded && !boundingBoxesFromServer.length && !proofWithBoundingBoxesLoading" class="mb-2" type="warning" variant="outlined" density="compact">
          {{ $t('ContributionAssistant.BoundingBoxesFromServerWarning') }}
        </v-alert>
        <v-alert v-if="drawCanvasLoaded && proofWithBoundingBoxesLoading" class="mb-2" color="primary" variant="outlined" density="compact" icon="mdi-information">
          {{ $t('ContributionAssistant.FindBoundingBoxesRunning') }}
          <v-progress-circular indeterminate />
        </v-alert>
        <v-row>
          <v-col cols="12" lg="6">
            <h3 class="mb-4">
              {{ $t('ContributionAssistant.LabelsExtractionSteps.DrawBoundingBoxes') }}
            </h3>
            <v-card>
              <v-card-text>
                <v-progress-circular v-if="!drawCanvasLoaded" indeterminate />
                <ContributionAssistantDrawCanvas ref="ContributionAssistantDrawCanvas" :key="proofObject.id" :imageSrc="imageSrc" :boundingBoxesFromServer="boundingBoxesFromServer" @extractedLabels="onExtractedLabels($event)" @loaded="drawCanvasLoaded = true" />
              </v-card-text>
              <v-divider />
              <v-card-actions>
                <ProofFooterRow :proof="proofObject" :hideActionMenuButton="true" :readonly="true" />
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="12" lg="6">
            <h3 class="mb-4">
              {{ $t('ContributionAssistant.LabelsExtractionSteps.CheckLabels') }}
            </h3>
            <v-row>
              <v-col v-for="(label, index) in extractedLabels" :key="index" cols="6" md="6" xl="4">
                <ContributionAssistantLabelCard :label="label" @removeLabel="removeLabel(index)" />
              </v-col>
            </v-row>
            <h3 class="mt-4 mb-4">
              {{ $t('ContributionAssistant.LabelsExtractionSteps.SendLabels') }}
            </h3>
            <v-btn class="float-right" color="primary" :block="!$vuetify.display.smAndUp" :disabled="!extractedLabels.length" :loading="processLabelsLoading" @click="processLabels">
              {{ $t('ContributionAssistant.LabelsExtractionSteps.SendLabelsButton') }}
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </template>

  <template v-if="step === 3">
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col
            v-for="(productPriceForm, index) in productPriceFormsWithoutPriceIdAndWithProductOrCategoryAndNoError"
            :key="productPriceForm.id"
            cols="12"
            md="6"
            xl="4"
          >
            <ContributionAssistantPriceFormCard
              :class="productPriceForm.id === lastUpdatedPriceTagId ? 'border-success border-dashed' : ''"
              height="100%"
              :productPriceForm="productPriceForm"
              :hideProductBarcodeScannerTab="true"
              :hideProofDetails="true"
              :hideUploadAction="true"
              @updatePriceTagStatus="updatePriceTagStatus($event, productPriceForm)"
              @validatePriceTag="validatePriceTag(index)"
            />
          </v-col>
        </v-row>
        <h3 v-if="productPriceFormsWithoutProductOrCategoryAndNoError.length" class="mt-4 mb-4">
          {{ $t('ContributionAssistant.PricesWithoutProductOrCategory') }}
        </h3>
        <v-row v-if="productPriceFormsWithoutProductOrCategoryAndNoError.length">
          <v-col
            v-for="productPriceForm in productPriceFormsWithoutProductOrCategoryAndNoError"
            :key="productPriceForm.id"
            cols="12"
            md="6"
            xl="4"
          >
            <ContributionAssistantPriceFormCard
              :class="productPriceForm.id === lastUpdatedPriceTagId ? 'border-success border-dashed' : ''"
              height="100%"
              :productPriceForm="productPriceForm"
              :hideProductBarcodeScannerTab="true"
              :hideProofDetails="true"
              :hideUploadAction="true"
              @updatePriceTagStatus="updatePriceTagStatus($event, productPriceForm)"
            />
          </v-col>
        </v-row>
        <h3 v-if="productPriceFormsMarkedAsError.length" class="mt-4 mb-4">
          {{ $t('ContributionAssistant.PricesMarkedAsError') }}
        </h3>
        <v-row v-if="productPriceFormsMarkedAsError.length">
          <v-col
            v-for="productPriceForm in productPriceFormsMarkedAsError"
            :key="productPriceForm.id"
            cols="12"
            md="6"
            xl="4"
          >
            <ContributionAssistantPriceFormCard
              :class="productPriceForm.id === lastUpdatedPriceTagId ? 'border-success border-dashed' : ''"
              height="100%"
              :productPriceForm="productPriceForm"
              :hideProductBarcodeScannerTab="true"
              :hideProofDetails="true"
              :hideUploadAction="true"
              @updatePriceTagStatus="updatePriceTagStatus($event, productPriceForm)"
            />
          </v-col>
        </v-row>
        <h3 v-if="productPriceFormsWithPriceId.length" class="mt-4 mb-4">
          {{ $t('ContributionAssistant.PricesAlreadyAdded') }}
        </h3>
        <v-row v-if="productPriceFormsWithPriceId.length">
          <v-col
            v-for="(productPriceForm, index) in productPriceFormsWithPriceId"
            :key="index"
            cols="12"
            md="6"
            xl="4"
          >
            <ContributionAssistantPriceFormCard
              height="100%"
              :productPriceForm="productPriceForm"
              :hideProductBarcodeScannerTab="true"
              :hideProofDetails="true"
              :hideActions="true"
              :disabled="true"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-alert
              class="mb-2"
              color="primary"
              variant="outlined"
              density="compact"
              icon="mdi-information"
            >
              <p>
                {{ $t('ContributionAssistant.PriceAddConfirmationMessage', { numberOfPricesAdded: productPriceFormsWithoutPriceIdAndWithProductOrCategoryAndNoError.length, date: proofObject.date, locationName: locationName }) }}
              </p>
            </v-alert>
            <v-btn class="float-right mt-4" color="primary" :block="!$vuetify.display.smAndUp" :loading="loading" @click="addPrices">
              {{ $t('Common.UploadMultiplePrices', productPriceFormsWithoutPriceIdAndWithProductOrCategoryAndNoError.length) }}
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </template>

  <!-- Step 4: actions -->
  <template v-if="step === 4">
    <v-row>
      <v-col cols="12">
        <v-progress-linear
          v-if="!finishedUploading"
          v-model="numberOfPricesAdded"
          :max="productPriceFormsWithoutPriceIdAndWithProductOrCategoryAndNoError.length"
          :color="productPriceFormsWithoutPriceIdAndWithProductOrCategoryAndNoError.length === numberOfPricesAdded ? 'success' : 'primary'"
          height="25"
          :striped="productPriceFormsWithoutPriceIdAndWithProductOrCategoryAndNoError.length !== numberOfPricesAdded"
          rounded
        >
          <strong>{{ $t('Common.PriceAddProgress', { numberOfPricesAdded: numberOfPricesAdded, totalNumberOfPrices: productPriceFormsWithoutPriceIdAndWithProductOrCategoryAndNoError.length }) }}</strong>
        </v-progress-linear>
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
      <v-col v-if="proofIdsFromQueryParam && proofIdsFromQueryParam.length > 1" cols="12" sm="6" lg="4">
        <v-card
          :title="$t('Common.NextProof')"
          prepend-icon="mdi-image"
          append-icon="mdi-arrow-right"
          @click="nextProof"
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
    <v-row v-if="finishedUploading && nextProofSuggestions.length">
      <v-col>
        <h3 class="mb-4">
          {{ $t('ContributionAssistant.ChooseNextProof') }}
        </h3>
        <v-row v-if="nextProofSuggestions.length">
          <v-col v-for="proof in nextProofSuggestions" :key="proof" cols="12" md="6" lg="4">
            <ProofCard :proof="proof" :hideProofHeader="true" :hideActionMenuButton="true" :readonly="true" :isSelectable="true" @proofSelected="selectProof" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </template>

  <v-snackbar
    v-model="labelProcessingErrorMessage"
    color="error"
    :timeout="5000"
  >
    {{ $t('ContributionAssistant.LabelProcessingErrorMessage') }}
  </v-snackbar>
</template>

<script>
import { mapStores } from 'pinia'
import { defineAsyncComponent } from 'vue'
import constants from '../constants.js'
import openPricesApi from '../services/openPricesApi'
import { useAppStore } from '../store.js'
import geo_utils from '../utils/geo.js'
import proof_utils from '../utils/proof.js'

export default {
  components: {
    ContributionAssistantDrawCanvas: defineAsyncComponent(() => import('../components/ContributionAssistantDrawCanvas.vue')),
    ProofFooterRow: defineAsyncComponent(() => import('../components/ProofFooterRow.vue')),
    ContributionAssistantLabelCard: defineAsyncComponent(() => import('../components/ContributionAssistantLabelCard.vue')),
    ContributionAssistantPriceFormCard: defineAsyncComponent(() => import('../components/ContributionAssistantPriceFormCard.vue')),
    ProofUploadCard: defineAsyncComponent(() => import('../components/ProofUploadCard.vue')),
    ProofCard: defineAsyncComponent(() => import('../components/ProofCard.vue')),
  },
  data() {
    return {
      step: 1,
      // stepItemList: [],  // see computed
      // data
      drawCanvasLoaded: false,
      boundingBoxesFromServer: [],
      extractedLabels: [],
      priceTags: [],
      productPriceForms: [],
      // proof data
      proofObject: null,
      imageSrc: null,
      proofWithBoundingBoxesLoading: false,
      processLabelsLoading: false,
      loading: false,
      numberOfPricesAdded: 0,
      labelProcessingErrorMessage: false,
      nextProofSuggestions: [],
      lastUpdatedPriceTagId: null,
      proofPriceExistingList: []
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
          title: this.$vuetify.display.smAndUp ? this.$t('Common.ValidatePrices') : this.$t('Common.Validate'),
          value: 3
        },
        {
          title: this.$t('Common.Actions'),
          value: 4
        }
      ]
    },
    locationName() {
      const recentLocations = this.appStore.getRecentLocations()
      const location = recentLocations.find((location) => location.properties.osm_id === this.proofObject.location_osm_id)
      if (location) {
        if (location.type === 'ONLINE') return location.website_url
        return geo_utils.getLocationOSMTitle(location, true, true, false, true)
      }
      return ''
    },
    disableProofSelectStep() {
      // ProofSelect tab should be disabled on summary step
      return this.step === 4
    },
    disableLabelsExtractionStep() {
      // LabelsExtraction tab should only be enabled after the proof is selected
      // It should also be disabled on summary step
      return !this.proofObject || this.step === 4
    },
    disableCleanupStep() {
      // Cleanup tab should only be enabled after the ai analysis is done
      // It should also be disabled on summary step
      return !this.productPriceFormsWithoutPriceIdAndWithProductOrCategoryAndNoError.length || this.step === 4
    },
    finishedUploading() {
      return this.productPriceFormsWithoutPriceIdAndWithProductOrCategoryAndNoError.length === this.numberOfPricesAdded
    },
    allDone() {
      return this.numberOfPricesAdded > 0 && this.finishedUploading
    },
    disableSummaryStep() {
      // Summary tab should be enabled when there are product prices to be added and the add prices process is either running or done
      const enableSummaryStep = this.productPriceFormsWithoutPriceIdAndWithProductOrCategoryAndNoError.length && (this.loading || this.allDone)
      return !enableSummaryStep
    },
    proofIdsFromQueryParam() {
      if (!this.$route.query.proof_ids) return null
      return this.$route.query.proof_ids.split(',')
    },
    productPriceFormsWithPriceId() {
      return this.productPriceForms.filter(productPriceForm => productPriceForm.price_id)
    },
    productPriceFormsWithoutProductOrCategoryAndNoError() {
      return this.productPriceForms.filter(productPriceForm => ((productPriceForm.type === constants.PRICE_TYPE_PRODUCT && !productPriceForm.product_code) || (productPriceForm.type === constants.PRICE_TYPE_CATEGORY && !productPriceForm.category_tag)) && productPriceForm.status <= 1)
    },
    productPriceFormsMarkedAsError() {
      return this.productPriceForms.filter(productPriceForm => productPriceForm.status > 1)
    },
    productPriceFormsWithoutPriceIdAndWithProductOrCategoryAndNoError() {
      return this.productPriceForms.filter(productPriceForm => !productPriceForm.price_id && (productPriceForm.type === constants.PRICE_TYPE_PRODUCT && productPriceForm.product_code || (productPriceForm.type === constants.PRICE_TYPE_CATEGORY && productPriceForm.category_tag)) && productPriceForm.status <= 1)
    },
    getUserDashboardUrl() {
      const dashboardTab = constants.USER_COMMUNITY.toLowerCase()  // default on this page
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
        openPricesApi.getProofById(proofIds[0]).then(proof => {
          this.onProofUploaded(proof)
        })
      }
    },
    getExistingProofPrices(proofId) {
      openPricesApi.getPrices({proof_id: proofId}).then(data => {
        this.proofPriceExistingList = data.items
      })
    },
    onProofUploaded(proof) {
      // move to step 2
      this.step = 2
      // store the proof
      this.proofObject = proof
      // A new proof was selected by the user, or loaded from the query param
      this.extractedLabels = []
      this.productPriceForms = []
      this.boundingBoxesFromServer = []
      // proof image
      this.imageSrc = proof_utils.getImageFullUrl(proof.file_path)

      if (proof.type === constants.PROOF_TYPE_RECEIPT) {
        // No need to check for price tags on receipts
        this.priceTags = []
        this.boundingBoxesFromServer = []
      } else {
        this.proofWithBoundingBoxesLoading = true
        // Try to load any automatically detected price tags on proof upload
        this.loadPriceTagsWithPredictions(1, false, priceTags => {
          this.priceTags = priceTags
          this.boundingBoxesFromServer = this.priceTags.map(priceTag => {
            return {boundingBox: priceTag.bounding_box, id: priceTag.id, status: priceTag.status, created_by: priceTag.created_by}
          })
          this.proofWithBoundingBoxesLoading = false
        })
      }
      this.getExistingProofPrices(this.proofObject.id)
    },
    loadPriceTagsWithPredictions(minNumberOfPriceTagWithPredictions, forceLoad, callback) {
      // Call price tag API until we have at least minNumberOfPriceTagWithPredictions
      // Question: callback vs Promise ? Neither are really used in the rest of the code base
      let maxTries = 10
      let tries = 0
      const load = () => {
        // Old proof? only try once
        const oneDayInMs = 24 * 60 * 60 * 1000
        const proofCreatedDate = new Date(this.proofObject.created)
        if (proofCreatedDate.getTime() < Date.now() - oneDayInMs) {
          // forceLoad is true when coming from processLabels (to fetch any new user-created priceTags)
          maxTries = forceLoad ? maxTries : 1
        }
        openPricesApi.getPriceTags({proof_id: this.proofObject.id, size: 100}).then(data => {
          const priceTagsWithPredictions = data.items.filter(priceTag => priceTag.predictions && priceTag.predictions.length)
          if (priceTagsWithPredictions.length >= minNumberOfPriceTagWithPredictions) {
            callback(priceTagsWithPredictions)
          } else {
            tries += 1
            if (tries >= maxTries) {
              callback([])
              return
            }
            setTimeout(load, 5000)  //   // maximum wait time: maxTries * 5s (50s)
          }
        })
      }
      load()
    },
    onExtractedLabels(extractedLabels) {
      // Called every time a label is drawn on the canvas
      this.extractedLabels = extractedLabels
    },
    removeLabel(index) {
      this.$refs.ContributionAssistantDrawCanvas.removeBoundingBox(index) // This will trigger onExtractedLabels event
    },
    processLabels() {
      // User is done drawing labels and has pressed the "Send labels" button
      // If new labels were drawn, we have to create the corresponding price tags on the server, and wait for ml processing
      // Otherwise, we can move on to the Cleanup step right away
      let newLabelsAddedWithCanvas = this.extractedLabels.filter(label => label.status === -1)
      if (newLabelsAddedWithCanvas.length) {
        // Send new price tags to server and load them after ml processing
        this.processLabelsLoading = true
        this.labelProcessingErrorMessage = false
        const expectedNumberOfPriceTagsWithPredictions = this.priceTags.length + newLabelsAddedWithCanvas.length
        let newPriceTagIds = []
        newLabelsAddedWithCanvas.forEach(label => {
          openPricesApi.createPriceTag({
            bounding_box: label.boundingBox,
            proof_id: this.proofObject.id
          }).then(priceTag => {
            newPriceTagIds.push(priceTag.id)
          })
        })
        this.loadPriceTagsWithPredictions(expectedNumberOfPriceTagsWithPredictions, true, priceTags => {
          this.processLabelsLoading = false
          if (!priceTags.length) {
            this.labelProcessingErrorMessage = true
          } else {
            // Only keep price tags that were selected by the user
            // Note: should we also update ignored price tags to a status of error ?
            this.priceTags = priceTags.filter(priceTag => this.extractedLabels.find(label => label.id === priceTag.id) || newPriceTagIds.includes(priceTag.id))
            this.priceTags.forEach(priceTag => {
              this.handlePriceTag(priceTag)
            })
          }
          this.step = 3
        })
      } else {
        // No new labels were drawn, we already have all the price tags data loaded

        // Only keep price tags that were selected by the user
        // Note: should we also update ignored price tags to a status of error ?
        this.priceTags = this.priceTags.filter(priceTag => this.extractedLabels.find(label => label.id === priceTag.id))
        this.priceTags.forEach(priceTag => {
          this.handlePriceTag(priceTag)
        })
        this.step = 3
      }

      
    },
    handlePriceTag(priceTag) {
      let productPriceForm = proof_utils.handlePriceTag(priceTag)
      if (productPriceForm.price_id) {
        const proofPriceExisting = this.proofPriceExistingList.find(price => price.id === productPriceForm.price_id)
        if (proofPriceExisting) {
          productPriceForm = Object.assign(productPriceForm, proofPriceExisting)
        }
      }
      this.productPriceForms.push(productPriceForm)
    },
    updatePriceTagStatus(status, productPriceForm) {
      // Called when the user deletes a price during the cleanup step
      this.lastUpdatedPriceTagId = productPriceForm.id
      this.productPriceForms[this.productPriceForms.indexOf(productPriceForm)].status = status
      this.updatePriceTag(productPriceForm.id, status)
    },
    updatePriceTag(priceTagId, status, priceId) {
      return openPricesApi
        .updatePriceTag(priceTagId, { status: status, price_id: priceId })
        .then((response) => {
          // if response.status == 204
          return response
        })
        .catch((error) => {
          console.log(error)
        })
    },
    addPrices() {
      // Last step, create prices and match them to the corresponding price tags
      this.loading = true
      this.numberOfPricesAdded = 0
      this.step = 4
      
      for (let i = 0; i < this.productPriceFormsWithoutPriceIdAndWithProductOrCategoryAndNoError.length; i++) {
        const productPriceForm = this.productPriceFormsWithoutPriceIdAndWithProductOrCategoryAndNoError[i]
        const priceData = {
          ...productPriceForm,
          origins_tags: productPriceForm.origins_tags,
          date: this.proofObject.date,
          location_id: this.proofObject.location_id,
          location_osm_id: this.proofObject.location_osm_id,
          location_osm_type: this.proofObject.location_osm_type,
          proof_id: this.proofObject.id
        }
        openPricesApi.createPrice(priceData, this.$route.path).then((price) => {
          // TODO: error handling
          this.numberOfPricesAdded += 1
          this.updatePriceTag(productPriceForm.id, 1, price.id)
        })
      }
      this.loading = false
      this.getNextProofSuggestions()
    },
    reloadPage() {
      window.location.reload()
    },
    getNextProofSuggestions() {
      const params = {
        owner: this.appStore.user.username,
        ready_for_price_tag_validation: true,
        price_count: 0
      }
      openPricesApi.getProofs(params)
        .then(proofs => {
          this.nextProofSuggestions = proofs.items.filter(proof => proof.id != this.proofObject.id)
        })
    },
    nextProof() {
      // Remove the first proof from the list and go back to the initial step with the next one
      const proofIds = this.proofIdsFromQueryParam
      proofIds.shift()
      // This only changes the url, in case of refresh, since the path stays the same, no reload is triggered
      this.$router.push({ path: '/experiments/proof-price-tag-assistant', query: { proof_ids: proofIds.join(',') } })
      this.initWithProofIds(proofIds)
    },
    selectProof(proof) {
      this.$router.push({ path: '/experiments/proof-price-tag-assistant', query: { proof_ids: proof.id } })
      this.initWithProofIds([proof.id])
    }
  }
}
</script>
