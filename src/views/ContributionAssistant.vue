<template>
  <v-container>
    <v-tabs v-model="tab">
      <v-tab value="ProofSelect" :disabled="disableProofSelectTab">
        1. Proof selection
      </v-tab>
      <v-tab value="Crop" :disabled="disableCropTab">
        2. Image crop
      </v-tab>
      <v-tab value="Cleanup" :disabled="disableCleanupTab">
        3. Cleanup
      </v-tab>
      <v-tab value="Summary" :disabled="disableSummaryTab">
        4. Summary
      </v-tab>
    </v-tabs>
    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="ProofSelect">
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <ProofInputRow :proofForm="proofForm" @proof="setProof($event)" />
            </v-col>
          </v-row>
        </v-container>
      </v-tabs-window-item>
      <v-tabs-window-item value="Crop">
        <v-container>
          <v-row>
            <v-col cols="12" lg="6">
              <h3 class="mb-4">
                1. Draw squares around the labels
              </h3>
              <v-progress-circular v-if="!drawCanvasLoaded" indeterminate />
              <ContributionAssistantDrawCanvas ref="ContributionAssistantdrawCanvas" :image="image" @croppedImages="onCroppedImages($event)" @loaded="drawCanvasLoaded = true" />
            </v-col>
            <v-col cols="12" lg="6">
              <h3 class="mb-4">
                2. Check the readability of labels
              </h3>
              <ContributionAssistantCropImageList :croppedImages="croppedImages" @removeCrop="removeCrop($event)" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <h3 class="mb-4">
                3. Send the cropped images for automatic processing
              </h3>
              <v-btn color="success" :disabled="!croppedImages.length" :loading="processCroppedImagesLoading" @click="processCroppedImages">
                Process Cropped Images
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
              <ContributionAssistantPriceFormCard :productPriceForm="productPriceForm" @removePrice="removePrice(index)" />
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
                  {{ productPriceForms.length }} price{{ productPriceForms.length > 1 ? 's' : '' }} will be added to an existing proof on the {{ proofForm.date }} at {{ locationName }}.
                </p>
              </v-alert>
              <v-btn class="mt-4" color="success" :loading="addPricesLoading" @click="addPrices">
                {{ $t('Common.Upload') }}
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
                Please wait for upload
              </h3>
              <v-progress-linear
                v-model="numberOfPricesAdded"
                :max="productPriceForms.length"
                :color="productPriceForms.length == numberOfPricesAdded ? 'success' : 'info'"
                height="25"
                stripped
              >
                <strong>{{ numberOfPricesAdded }} / {{ productPriceForms.length }} prices added</strong>
              </v-progress-linear>
              <v-btn to="/dashboard" class="mt-4" :aria-label="$t('Common.Dashboard')" :disabled="!allDone">
                Go to your dashboard
              </v-btn>
              <v-btn :to="'/proofs/' + proofForm.id" class="mt-4 ml-4" :disabled="!allDone">
                Go to proof
              </v-btn>
              <v-btn class="mt-4 ml-4" :disabled="!allDone" @click="reloadPage">
                Add a new proof
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-container>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import api from '../services/api'
import utils from '../utils.js'
import constants from '../constants'

export default {
  components: {
    ContributionAssistantPriceFormCard: defineAsyncComponent(() => import('../components/ContributionAssistantPriceFormCard.vue')),
    ContributionAssistantDrawCanvas: defineAsyncComponent(() => import('../components/ContributionAssistantDrawCanvas.vue')),
    ContributionAssistantCropImageList: defineAsyncComponent(() => import('../components/ContributionAssistantCropImageList.vue')),
    ProofInputRow: defineAsyncComponent(() => import('../components/ProofInputRow.vue')),
  },
  data() {
    return {
      tab: 'ProofSelect',
      drawCanvasLoaded: false,
      image: new Image(),
      croppedImages: [],
      croppedBlobs: [],
      productPriceForms : [],
      proofForm: {
        type: constants.PROOF_TYPE_PRICE_TAG,
        id: null,
        location_id: null,
        location_osm_id: null,
        location_osm_type: null,
        date: utils.currentDate(),
        currency: null,
        receipt_price_count: null,
        receipt_price_total: null,
      },
      processCroppedImagesLoading: false,
      addPricesLoading: false,
      numberOfPricesAdded: 0
    }
  },
  computed: {
    ...mapStores(useAppStore),
    locationName() {
      const recentLocations = this.appStore.getRecentLocations()
      const location = recentLocations.find((location) => location.properties.osm_id === this.proofForm.location_osm_id)
      if (location) {
        if (location.type === 'ONLINE') return location.website_url
        return utils.getLocationOSMTitle(location, true, true, true)
      }
      return ''
    },
    disableProofSelectTab() {
      // ProofSelect tab should disabled on summary step
      return this.tab == "Summary"
    },
    disableCropTab() {
      // Crop tab should only be enabled after the proof is selected
      // It should also be disabled on summary step
      return !this.proofForm.id || this.tab == "Summary"
    },
    disableCleanupTab() {
      // Cleanup tab should only be enabled after the ai analysis is done
      // It should also be disabled on summary step
      return !this.productPriceForms.length || this.tab == "Summary"
    },
    allDone() {
      return this.numberOfPricesAdded > 0 && this.productPriceForms.length == this.numberOfPricesAdded
    },
    disableSummaryTab() {
      // Summary tab should be enabled when there are product prices to be added and the add prices process is either running or done
      const enableSummaryTab = this.productPriceForms.length && (this.addPricesLoading || this.allDone)
      return !enableSummaryTab
    }
  },
  mounted() {
    this.proofForm.currency = this.appStore.getUserLastCurrencyUsed
  },
  methods: {
    reloadPage(){
      window.location.reload()
    },
    setProof(event) {
      const image = new Image()
      image.src = `${import.meta.env.VITE_OPEN_PRICES_APP_URL}/img/${event.file_path}`
      image.crossOrigin = 'Anonymous'
      this.image = image
      this.proofForm = event

      this.croppedImages = []
      this.croppedBlobs = []
      this.productPriceForms = []
      this.tab = "Crop"
    },
    onCroppedImages(eventData) {
      this.croppedImages = eventData[0]
      this.croppedBlobs = eventData[1]
    },
    removeCrop(index) {
      this.$refs.ContributionAssistantdrawCanvas.removeRectangle(index) // This will trigger onCroppedImages event to update the other lists
    },
    async processCroppedImages() {
      this.processCroppedImagesLoading = true
      const res = await api.processWithGemini(this.croppedBlobs)
      if (res) {
        this.handleGeminiResponse(res)
      } else {
        console.error("TODO: handle error in image processing")
      }
      this.processCroppedImagesLoading = false
    },
    handleGeminiResponse(response) {
      console.log('handleGeminiResponse', response)
      this.productPriceForms = []
      for (let i = 0; i < response.labels.length; i++) {
        const label = response.labels[i]
        const barcodeString = label.barcode ? label.barcode.toString().replace(/\s/g, '') : ''
        // TODO: some of these will be None if gemini did not give a proper reply, so detection and error handling is needed
        const productPriceForm = {
          mode: barcodeString.length > 10 ? 'barcode' : 'category',
          category_tag: label.product,
          origins_tags: [label.origin],
          labels_tags: label.organic ? ["en:organic"] : [],
          price: label.price.toString(),
          price_per: label.unit,
          price_is_discounted: false,
          currency: this.appStore.getUserLastCurrencyUsed || 'EUR',
          proofImage: this.croppedImages[i],
          product_code: barcodeString,
          detected_product_code: barcodeString
        }
        this.productPriceForms.push(productPriceForm)
      }
      this.tab = 'Cleanup'
    },
    removePrice(index) {
      this.productPriceForms.splice(index, 1)
    },
    async addPrices() {
      this.addPricesLoading = true
      this.numberOfPricesAdded = 0
      this.tab = "Summary"
      
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
          date: this.proofForm.date,
          location_id: this.proofForm.location_id,
          location_osm_id: this.proofForm.location_osm_id,
          location_osm_type: this.proofForm.location_osm_type,
          proof_id: this.proofForm.id
        }
        // Cleanup unwanted fields for API
        if (productPriceForm.type == 'PRODUCT') {
          delete priceData.price_per
          delete priceData.category_tag
          delete priceData.origins_tags
          delete priceData.labels_tags
        } else if (productPriceForm.type == 'CATEGORY') {
          delete priceData.product_code
          delete priceData.product
        }
        await api.createPrice(priceData, this.$route.path) // TODO: error handling
        this.productPriceForms[i].processed = true
        this.numberOfPricesAdded += 1
      }
      this.addPricesLoading = false
    }
  }
}
</script>
