<template>
  <v-container>
    <v-tabs v-model="tab">
      <v-tab value="ProofSelect" :disabled="disableProofSelectTab">
        {{ $t('ContributionAssistant.Steps.ProofSelect') }}
      </v-tab>
      <v-tab value="LabelsExtraction" :disabled="disableLabelsExtractionTab">
        {{ $t('ContributionAssistant.Steps.LabelsExtraction') }}
      </v-tab>
      <v-tab value="Cleanup" :disabled="disableCleanupTab">
        {{ $t('ContributionAssistant.Steps.Cleanup') }}
      </v-tab>
      <v-tab value="Summary" :disabled="disableSummaryTab">
        {{ $t('ContributionAssistant.Steps.Summary') }}
      </v-tab>
    </v-tabs>
    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="ProofSelect">
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <ProofUploadCard @proof="onProofUploaded($event)" />
            </v-col>
          </v-row>
        </v-container>
      </v-tabs-window-item>
      <v-tabs-window-item value="LabelsExtraction">
        <v-container>
          <v-alert v-if="drawCanvasLoaded && !boundingBoxesFromServer.length && !proofWithBoundingBoxesLoading" class="mb-2" type="info" variant="outlined" icon="mdi-alert">
            {{ $t('ContributionAssistant.BoundingBoxesFromServerWarning') }}
            <br>
            <v-btn @click="loadProofWithBoundingBoxes(proofObject.id)">
              {{ $t('ContributionAssistant.FindBoundingBoxes') }}
            </v-btn>
          </v-alert>
          <v-alert v-if="drawCanvasLoaded && proofWithBoundingBoxesLoading" class="mb-2" type="info" variant="outlined" icon="mdi-magnify">
            {{ $t('ContributionAssistant.FindBoundingBoxesRunning') }}
            <v-progress-circular indeterminate />
          </v-alert>
          <v-row>
            <v-col cols="12" lg="6">
              <h3 class="mb-4">
                {{ $t('ContributionAssistant.LabelsExtractionSteps.DrawBoundingBoxes') }}
              </h3>
              <v-progress-circular v-if="!drawCanvasLoaded" indeterminate />
              <ContributionAssistantDrawCanvas ref="ContributionAssistantdrawCanvas" :image="image" :boundingBoxesFromServer="boundingBoxesFromServer" @extractedLabels="onExtractedLabels($event)" @loaded="drawCanvasLoaded = true" />
            </v-col>
            <v-col cols="12" lg="6">
              <h3 class="mb-4">
                {{ $t('ContributionAssistant.LabelsExtractionSteps.CheckLabels') }}
              </h3>
              <ContributionAssistantLabelList :labels="extractedLabels" @removeLabel="removeLabel($event)" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <h3 class="mb-4">
                {{ $t('ContributionAssistant.LabelsExtractionSteps.SendLabels') }}
              </h3>
              <v-btn color="success" :disabled="!extractedLabels.length" :loading="processLabelsLoading" @click="processLabels">
                {{ $t('ContributionAssistant.LabelsExtractionSteps.SendLabelsButton') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-tabs-window-item>
      <v-tabs-window-item value="Cleanup">
        <v-container>
          <v-row>
            <v-col
              v-for="(productPriceForm, index) in productPriceForms"
              :key="index"
              cols="12"
              md="6"
              xl="4"
            >
              <ContributionAssistantPriceFormCard :productPriceForm="productPriceForm" @removePriceTag="removePriceTag(index)" />
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-alert
                class="mb-2"
                type="info"
                variant="outlined"
              >
                <p>
                  {{ $t('ContributionAssistant.PriceAddConfirmationMessage', { numberOfPricesAdded: productPriceForms.length, date: proofObject.date, locationName: locationName }) }}
                </p>
              </v-alert>
              <v-btn class="float-right mt-4" color="success" :loading="loading" @click="addPrices">
                {{ $t('Common.UploadMultiplePrices', productPriceForms.length) }}
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-tabs-window-item>
      <v-tabs-window-item value="Summary">
        <v-container>
          <v-row>
            <v-col>
              <h3 class="mb-4">
                {{ $t('ContributionAssistant.WaitForUpload') }}
              </h3>
              <v-progress-linear
                v-model="numberOfPricesAdded"
                :max="productPriceForms.length"
                :color="productPriceForms.length == numberOfPricesAdded ? 'success' : 'info'"
                height="25"
                stripped
              >
                <strong>{{ $t('ContributionAssistant.PriceAddProgress', { numberOfPricesAdded: numberOfPricesAdded, totalNumberOfPrices: productPriceForms.length }) }}</strong>
              </v-progress-linear>
              <v-btn to="/dashboard" class="mt-4" :aria-label="$t('Common.Dashboard')" :disabled="!allDone">
                {{ $t('ContributionAssistant.GoToDashboard') }}
              </v-btn>
              <v-btn :to="'/proofs/' + proofObject.id" class="mt-4 ml-4" :disabled="!allDone">
                {{ $t('ContributionAssistant.GoToProof') }}
              </v-btn>
              <v-btn class="mt-4 ml-4" :disabled="!allDone" @click="reloadPage">
                {{ $t('ContributionAssistant.AddNewProof') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-container>
  <v-snackbar
    v-model="labelProcessingErrorMessage"
    color="error"
    :timeout="5000"
  >
    {{ $t('ContributionAssistant.LabelProcessingErrorMessage') }}
  </v-snackbar>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import api from '../services/api'
import constants from '../constants'
import utils from '../utils.js'

export default {
  components: {
    ContributionAssistantPriceFormCard: defineAsyncComponent(() => import('../components/ContributionAssistantPriceFormCard.vue')),
    ContributionAssistantDrawCanvas: defineAsyncComponent(() => import('../components/ContributionAssistantDrawCanvas.vue')),
    ContributionAssistantLabelList: defineAsyncComponent(() => import('../components/ContributionAssistantLabelList.vue')),
    ProofUploadCard: defineAsyncComponent(() => import('../components/ProofUploadCard.vue')),
  },
  data() {
    return {
      tab: 'ProofSelect',  // ProofSelect, LabelsExtraction, Cleanup, Summary
      drawCanvasLoaded: false,
      boundingBoxesFromServer: [],
      extractedLabels: [],
      productPriceForms: [],
      // proof data
      proofObject: null,
      image: new Image(),
      proofWithBoundingBoxesLoading: false,
      proofSecondCallTimeout: null,
      processLabelsLoading: false,
      loading: false,
      numberOfPricesAdded: 0,
      labelProcessingErrorMessage: false
    }
  },
  computed: {
    ...mapStores(useAppStore),
    locationName() {
      const recentLocations = this.appStore.getRecentLocations()
      const location = recentLocations.find((location) => location.properties.osm_id === this.proofObject.location_osm_id)
      if (location) {
        if (location.type === 'ONLINE') return location.website_url
        return utils.getLocationOSMTitle(location, true, true, true)
      }
      return ''
    },
    disableProofSelectTab() {
      // ProofSelect tab should disabled on summary step
      return this.tab == 'Summary'
    },
    disableLabelsExtractionTab() {
      // LabelsExtraction tab should only be enabled after the proof is selected
      // It should also be disabled on summary step
      return !this.proofObject || this.tab == 'Summary'
    },
    disableCleanupTab() {
      // Cleanup tab should only be enabled after the ai analysis is done
      // It should also be disabled on summary step
      return !this.productPriceForms.length || this.tab == 'Summary'
    },
    allDone() {
      return this.numberOfPricesAdded > 0 && this.productPriceForms.length == this.numberOfPricesAdded
    },
    disableSummaryTab() {
      // Summary tab should be enabled when there are product prices to be added and the add prices process is either running or done
      const enableSummaryTab = this.productPriceForms.length && (this.loading || this.allDone)
      return !enableSummaryTab
    }
  },
  methods: {
    reloadPage(){
      window.location.reload()
    },
    onProofUploaded(proof) {
      // store the proof
      this.proofObject = proof
      // proof image
      const image = new Image()
      // image.src = 'https://prices.openfoodfacts.org/img/0024/tM0NEloNU3.webp'  // barcodes
      // image.src = 'https://prices.openfoodfacts.org/img/0023/f6tJvMcsDk.webp'  // categories
      image.src = `${import.meta.env.VITE_OPEN_PRICES_APP_URL}/img/${proof.file_path}`
      image.crossOrigin = 'Anonymous'
      this.image = image
      // proof labels
      this.extractedLabels = []
      this.productPriceForms = []
      this.tab = 'LabelsExtraction'
      // Try to fetch proof right away (bounding boxes should be available for proofs previously uploaded)
      this.loadProofWithBoundingBoxes(proof.id, true)
      // If no bounding boxes are found right away (new proof), try again after 5 seconds
      this.proofSecondCallTimeout = setTimeout(() => this.loadProofWithBoundingBoxes(proof.id), 5000)
      // If that also fails, user will have to click the button to retry
    },
    loadProofWithBoundingBoxes(proofId, firstCall=false) {
      this.proofWithBoundingBoxesLoading = true
      api.getProofById(proofId).then(proof => {
        if (proof.predictions && proof.predictions.length) {
          for (let prediction of proof.predictions) {
            if (prediction.type === 'OBJECT_DETECTION') {
              this.boundingBoxesFromServer = prediction.data.objects.map(predictionObject => predictionObject.bounding_box)
              if (this.boundingBoxesFromServer.length) {
                clearTimeout(this.proofSecondCallTimeout)
                this.proofWithBoundingBoxesLoading = false
              }
            }
          }
        }
        if (!firstCall) {
          this.proofWithBoundingBoxesLoading = false
        }
      })
    },
    onExtractedLabels(extractedLabels) {
      this.extractedLabels = extractedLabels
    },
    removeLabel(index) {
      this.$refs.ContributionAssistantdrawCanvas.removeBoundingBox(index) // This will trigger onExtractedLabels event
    },
    processLabels() {
      this.processLabelsLoading = true
      this.labelProcessingErrorMessage = false
      api.processWithGemini(this.extractedLabels).then(res => {
        if (res) {
          this.handleGeminiResponse(res)
        } else {
          console.error("Error in gemini response")
          this.labelProcessingErrorMessage = true
        }
        this.processLabelsLoading = false
      })
    },
    handleGeminiResponse(response) {
      console.log('handleGeminiResponse', response)
      if (!response.labels) {
        console.error("No labels found in gemini response")
        this.labelProcessingErrorMessage = true
        return
      }
      this.productPriceForms = []
      for (let i = 0; i < response.labels.length; i++) {
        const label = response.labels[i]
        const barcodeString = label.barcode ? label.barcode.toString().replace(/\s/g, '') : ''
        // TODO: some of these will be None if gemini did not give a proper reply, so detection and error handling is needed
        const productPriceForm = {
          type: barcodeString.length > 10 ? constants.PRICE_TYPE_PRODUCT : constants.PRICE_TYPE_CATEGORY,
          category_tag: label.product,
          origins_tags: [label.origin],
          labels_tags: label.organic ? [constants.PRODUCT_CATEGORY_LABEL_ORGANIC] : [],
          price: label.price.toString(),
          price_per: label.unit,
          price_is_discounted: false,
          currency: this.appStore.getUserLastCurrencyUsed || 'EUR',
          proofImage: this.extractedLabels[i].imageSrc,
          product_code: barcodeString,
          detected_product_code: barcodeString,
          product_name: label.product_name
        }
        this.productPriceForms.push(productPriceForm)
      }
      this.tab = 'Cleanup'
    },
    removePriceTag(index) {
      this.productPriceForms.splice(index, 1)
    },
    addPrices() {
      this.loading = true
      this.numberOfPricesAdded = 0
      this.tab = 'Summary'
      
      for (let i = 0; i < this.productPriceForms.length; i++) {
        const productPriceForm = this.productPriceForms[i]
        let origins_tags = productPriceForm.origins_tags
        if (!Array.isArray(origins_tags)) {
          origins_tags = [origins_tags]
        }
        if (origins_tags[0] == null || origins_tags[0] == 'unknown' || origins_tags[0] == 'other' || origins_tags[0] == '') {
          origins_tags = []
        }
        const priceData = {
          ...productPriceForm,
          origins_tags: origins_tags,
          date: this.proofObject.date,
          location_id: this.proofObject.location_id,
          location_osm_id: this.proofObject.location_osm_id,
          location_osm_type: this.proofObject.location_osm_type,
          proof_id: this.proofObject.id
        }
        api.createPrice(priceData, this.$route.path).then(() => {
          // TODO: error handling
          this.productPriceForms[i].processed = true
          this.numberOfPricesAdded += 1
        })
      }
      this.loading = false
    }
  }
}
</script>
