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
              <ProofUploadCard v-if="!proofObject" @proof="onProofUploaded($event)" />
              <ProofCard v-else :proof="proofObject" mode="Uploaded" :hideProofActions="true" :readonly="true" />
            </v-col>
          </v-row>
        </v-container>
      </v-tabs-window-item>
      <v-tabs-window-item value="LabelsExtraction">
        <v-container>
          <v-alert v-if="drawCanvasLoaded && !boundingBoxesFromServer.length && !proofWithBoundingBoxesLoading" class="mb-2" type="info" variant="outlined" icon="mdi-alert">
            {{ $t('ContributionAssistant.BoundingBoxesFromServerWarning') }}
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
              <ContributionAssistantDrawCanvas ref="ContributionAssistantDrawCanvas" :key="proofObject.id" :image="image" :boundingBoxesFromServer="boundingBoxesFromServer" @extractedLabels="onExtractedLabels($event)" @loaded="drawCanvasLoaded = true" />
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
              v-for="(productPriceForm, index) in productPriceFormsWithoutPriceId"
              :key="index"
              cols="12"
              md="6"
              xl="4"
            >
              <ContributionAssistantPriceFormCard :productPriceForm="productPriceForm" @removePriceTag="removePriceTag($event, productPriceForm)" />
            </v-col>
          </v-row>
          <v-row v-if="productPriceFormsWithPriceId.length">
            <h3 class="mb-4">
              {{ $t('ContributionAssistant.PricesAlreadyAdded') }}
            </h3>
          </v-row>
          <v-row v-if="productPriceFormsWithPriceId.length">
            <v-col
              v-for="(productPriceForm, index) in productPriceFormsWithPriceId"
              :key="index"
              cols="12"
              md="6"
              xl="4"
            >
              <ContributionAssistantPriceFormCard :productPriceForm="productPriceForm" :disabled="!!productPriceForm.price_id" />
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
                  {{ $t('ContributionAssistant.PriceAddConfirmationMessage', { numberOfPricesAdded: productPriceFormsWithoutPriceId.length, date: proofObject.date, locationName: locationName }) }}
                </p>
              </v-alert>
              <v-btn class="float-right mt-4" color="success" :loading="loading" @click="addPrices">
                {{ $t('Common.UploadMultiplePrices', productPriceFormsWithoutPriceId.length) }}
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
                :max="productPriceFormsWithoutPriceId.length"
                :color="productPriceFormsWithoutPriceId.length == numberOfPricesAdded ? 'success' : 'info'"
                height="25"
                stripped
              >
                <strong>{{ $t('ContributionAssistant.PriceAddProgress', { numberOfPricesAdded: numberOfPricesAdded, totalNumberOfPrices: productPriceFormsWithoutPriceId.length }) }}</strong>
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
              <v-btn v-if="proofIdsFromQueryParam" class="mt-4 ml-4" :disabled="!allDone" @click="nextProof">
                {{ $t('ContributionAssistant.NextProof') }}
              </v-btn>
            </v-col>
          </v-row>
          <v-row v-if="nextProofSuggestions.length">
            <v-col>
              <h3>
                {{ $t('ContributionAssistant.ChooseNextProof') }}
              </h3>
            </v-col>
          </v-row>
          <v-row v-if="nextProofSuggestions.length">
            <v-col v-for="proof in nextProofSuggestions" :key="proof" cols="12" md="6" lg="4">
              <ProofCard :proof="proof" :hideProofHeader="true" :hideProofActions="true" :readonly="true" :isSelectable="true" @proofSelected="selectProof" />
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
    ProofCard: defineAsyncComponent(() => import('../components/ProofCard.vue')),
  },
  data() {
    return {
      tab: 'ProofSelect',  // ProofSelect, LabelsExtraction, Cleanup, Summary
      drawCanvasLoaded: false,
      boundingBoxesFromServer: [],
      extractedLabels: [],
      priceTags: [],
      productPriceForms: [],
      // proof data
      proofObject: null,
      image: new Image(),
      proofWithBoundingBoxesLoading: false,
      processLabelsLoading: false,
      loading: false,
      numberOfPricesAdded: 0,
      labelProcessingErrorMessage: false,
      nextProofSuggestions: []
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
      return !this.productPriceFormsWithoutPriceId.length || this.tab == 'Summary'
    },
    allDone() {
      return this.numberOfPricesAdded > 0 && this.productPriceFormsWithoutPriceId.length == this.numberOfPricesAdded
    },
    disableSummaryTab() {
      // Summary tab should be enabled when there are product prices to be added and the add prices process is either running or done
      const enableSummaryTab = this.productPriceFormsWithoutPriceId.length && (this.loading || this.allDone)
      return !enableSummaryTab
    },
    proofIdsFromQueryParam() {
      if (!this.$route.query.proof_ids) return null
      return this.$route.query.proof_ids.split(',')
    },
    productPriceFormsWithPriceId() {
      return this.productPriceForms.filter(productPriceForm => productPriceForm.price_id)
    },
    productPriceFormsWithoutPriceId() {
      return this.productPriceForms.filter(productPriceForm => !productPriceForm.price_id)
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
        api.getProofById(proofIds[0]).then(proof => {
          this.onProofUploaded(proof)
        })
      }
    },
    onProofUploaded(proof) {
      // A new proof was selected by the user, or loaded from the query param
      this.extractedLabels = []
      this.productPriceForms = []
      this.boundingBoxesFromServer = []

      // store the proof
      this.proofObject = proof

      // proof image
      const image = new Image()
      // image.src = 'https://prices.openfoodfacts.org/img/0024/tM0NEloNU3.webp'  // barcodes
      // image.src = 'https://prices.openfoodfacts.org/img/0023/f6tJvMcsDk.webp'  // categories
      image.src = `${import.meta.env.VITE_OPEN_PRICES_APP_URL}/img/${proof.file_path}`
      image.crossOrigin = 'Anonymous'
      this.image = image

      this.tab = 'LabelsExtraction'
      this.proofWithBoundingBoxesLoading = true
      // Try to load any automatically detected price tags on proof upload
      this.loadPriceTagsWithPredictions(1, priceTags => {
        this.priceTags = priceTags
        this.boundingBoxesFromServer = this.priceTags.map(priceTag => {
          return {boundingBox: priceTag.bounding_box, id: priceTag.id, status: priceTag.status}
        })
        this.proofWithBoundingBoxesLoading = false
      })
    },
    loadPriceTagsWithPredictions(minNumberOfPriceTagWithPredictions, callback) {
      // Call price tag API every 3 seconds until we have at least minNumberOfPriceTagWithPredictions, max 6 times
      // Question: callback vs Promise ? Neither are really used in the rest of the code base
      let tries = 0
      const load = () => {
        tries += 1
        if (tries > 5) {
          callback([])
          return
        }
        api.getPriceTags({proof_id: this.proofObject.id, size: 100}).then(data => {
          const validPriceTags = data.items.filter(priceTag => priceTag.status == 1 || priceTag.status == null)
          const numberOfPriceTagsWithPredictions = validPriceTags.filter(priceTag => priceTag.predictions.length).length
          if (numberOfPriceTagsWithPredictions >= minNumberOfPriceTagWithPredictions) {
            callback(validPriceTags)
          } else {
            setTimeout(load, 3000)
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
      let newLabelsAddedWithCanvas = this.extractedLabels.filter(label => label.boundingSource === this.$t('ContributionAssistant.ManualBoundingBoxSource'))
      if (newLabelsAddedWithCanvas.length) {
        // Send new price tags to server and load them after ml processing
        this.processLabelsLoading = true
        this.labelProcessingErrorMessage = false
        const expectedNumberOfPriceTagsWithPredictions = this.priceTags.length + newLabelsAddedWithCanvas.length
        let newPriceTagIds = []
        newLabelsAddedWithCanvas.forEach(label => {
          api.createPriceTag({
            bounding_box: label.boundingBox,
            proof_id: this.proofObject.id
          }).then(priceTag => {
            newPriceTagIds.push(priceTag.id)
          })
        })
        this.loadPriceTagsWithPredictions(expectedNumberOfPriceTagsWithPredictions, priceTags => {
          this.processLabelsLoading = false
          if (!priceTags.length) {
            this.labelProcessingErrorMessage = true
          } else {
            // Only keep price tags that were selected by the user
            // Note: should we also update ignored price tags to a status of error ?
            this.priceTags = priceTags.filter(priceTag => this.extractedLabels.find(label => label.id === priceTag.id) || newPriceTagIds.includes(priceTag.id))
            this.handlePriceTags()
          }
        })
      } else {
        // No new labels were drawn, we already have all the price tags data loaded

        // Only keep price tags that were selected by the user
        // Note: should we also update ignored price tags to a status of error ?
        this.priceTags = this.priceTags.filter(priceTag => this.extractedLabels.find(label => label.id === priceTag.id))
        this.handlePriceTags()
      }
    },
    handlePriceTags() {
      this.priceTags.forEach(priceTag => {
        const label = priceTag['predictions'][0]['data']
        // remove anything that is not a number from label.barcode
        const barcodeString = label.barcode ? label.barcode.toString().replace(/\D/g, '') : ''
        const productPriceForm = {
          id: priceTag.id,
          type: barcodeString.length > 10 ? constants.PRICE_TYPE_PRODUCT : constants.PRICE_TYPE_CATEGORY,
          category_tag: label.product,
          origins_tags: [label.origin],
          labels_tags: label.organic ? [constants.PRODUCT_CATEGORY_LABEL_ORGANIC] : [],
          price: label.price.toString(),
          price_per: label.unit,
          price_is_discounted: false,
          currency: priceTag['proof'].currency || this.appStore.getUserLastCurrencyUsed,
          proof: priceTag['proof'],
          proofImage: priceTag['proof'].file_path,
          product_code: barcodeString,
          detected_product_code: barcodeString,
          product_name: label.product_name,
          bounding_box: priceTag.bounding_box,
          status: priceTag.status,
          price_id: priceTag.price_id
        }
        this.productPriceForms.push(productPriceForm)
      })
      this.tab = 'Cleanup'
    },
    removePriceTag(status, productPriceForm) {
      // Called when the user deletes a price during the cleanup step
      this.productPriceForms.splice(this.productPriceForms.indexOf(productPriceForm), 1)
      this.updatePriceTag(productPriceForm.id, status)
    },
    updatePriceTag(priceTagId, status, priceId) {
      return api
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
      this.tab = 'Summary'
      
      for (let i = 0; i < this.productPriceFormsWithoutPriceId.length; i++) {
        const productPriceForm = this.productPriceFormsWithoutPriceId[i]
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
        api.createPrice(priceData, this.$route.path).then((price) => {
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
      api.getProofs({ user: this.appStore.user.username, ready_for_price_tag_validation: true, type: constants.PROOF_TYPE_PRICE_TAG }).then(proofs => {
        this.nextProofSuggestions = proofs.items.filter(proof => proof.id != this.proofObject.id)
      })
    },
    nextProof() {
      // Remove the first proof from the list and go back to the initial step with the next one
      const proofIds = this.proofIdsFromQueryParam
      proofIds.shift()
      // This only changes the url, in case of refresh, since the path stays the same, no reload is triggered
      this.$router.push({ path: '/experiments/contribution-assistant', query: { proof_ids: proofIds.join(',') } })
      this.initWithProofIds(proofIds)
    },
    selectProof(proof) {
      this.$router.push({ path: '/experiments/contribution-assistant', query: { proof_ids: proof.id } })
      this.initWithProofIds([proof.id])
    }
  }
}
</script>
