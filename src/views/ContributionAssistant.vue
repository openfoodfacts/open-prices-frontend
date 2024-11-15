<template>
  <v-container>
    <v-tabs v-model="tab">
      <v-tab value="LocationDate" :disabled="disableLocationDateTab">
        1. Location & Date
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
      <v-tabs-window-item value="LocationDate">
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <LocationInputRow :locationForm="locationForm" />
              <ProofMetadataInputRow :proofMetadataForm="proofMetadataForm" />
              <br>
              <v-btn class="mt-4" color="success" :disabled="!locationForm.location_osm_id" @click="tab='Crop'">
                Next
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-tabs-window-item>
      <v-tabs-window-item value="Crop">
        <v-container>
          <v-row>
            <v-col cols="12">
              <h3 class="mb-4">
                1. Select an image containing labels
              </h3>
              <ProofImageInputRow :hideProofImagePreview="true" :hideRecentProofChoice="false" @proof="setProof($event)" />
              <p v-if="recentProof" class="mb-2">
                <i>Selecting a recent proof has overwritten location, date and currency.</i>
              </p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" lg="6">
              <h3 class="mb-4">
                2. Draw squares around the labels
              </h3>
              <ContributionAssistantDrawCanvas ref="ContributionAssistantdrawCanvas" :image="image" @croppedImages="onCroppedImages($event)" />
            </v-col>
            <v-col cols="12" lg="6">
              <h3 class="mb-4">
                3. Check the readability of labels
              </h3>
              <ContributionAssistantCropImageList :croppedImages="croppedImages" @removeCrop="removeCrop($event)" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <h3 class="mb-4">
                4. Send the cropped images for automatic processing
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
                <p v-if="recentProof">
                  {{ productPriceForms.length }} price{{ productPriceForms.length > 1 ? 's' : '' }} will be added to an existing proof on the {{ recentProof.date }} at {{ locationName }}.
                </p>
                <p v-if="!recentProof">
                  1 proof and {{ productPriceForms.length }} price{{ productPriceForms.length > 1 ? 's' : '' }} will be added on the {{ proofMetadataForm.date }} at {{ locationName }}.
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
                v-if="addProofLoading"
                color="info"
                height="25"
                stripped
                indeterminate
              >
                <strong>Uploading proof...</strong>
              </v-progress-linear>
              <v-progress-linear
                v-if="!addProofLoading"
                v-model="numberOfPricesAdded"
                :max="productPriceForms.length"
                :color="productPriceForms.length == numberOfPricesAdded ? 'success' : 'info'"
                height="25"
                stripped
              >
                <strong>{{ numberOfPricesAdded }} / {{ productPriceForms.length }} prices added</strong>
              </v-progress-linear>
              <v-btn to="/dashboard" class="mt-4" :aria-label="$t('Common.Dashboard')" :disabled="addPricesLoading">
                Go to your dashboard
              </v-btn>
              <v-btn v-if="recentProof" :to="'/proofs/' + recentProof.id" class="mt-4 ml-4" :disabled="addPricesLoading">
                Go to proof
              </v-btn>
              <v-btn class="mt-4 ml-4" :disabled="addPricesLoading" @click="tab = 'Crop'">
                Add a new image for location
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-container>
</template>

<script>
import Compressor from 'compressorjs'
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import api from '../services/api'
import utils from '../utils.js'

export default {
  components: {
    ContributionAssistantPriceFormCard: defineAsyncComponent(() => import('../components/ContributionAssistantPriceFormCard.vue')),
    LocationInputRow: defineAsyncComponent(() => import('../components/LocationInputRow.vue')),
    ProofImageInputRow: defineAsyncComponent(() => import('../components/ProofImageInputRow.vue')),
    ContributionAssistantDrawCanvas: defineAsyncComponent(() => import('../components/ContributionAssistantDrawCanvas.vue')),
    ContributionAssistantCropImageList: defineAsyncComponent(() => import('../components/ContributionAssistantCropImageList.vue')),
    ProofMetadataInputRow: defineAsyncComponent(() => import('../components/ProofMetadataInputRow.vue')),
  },
  data() {
    return {
      tab: 'LocationDate',
      originalProofImage: null,
      recentProof: null,
      image: new Image(),
      croppedImages: [],
      croppedBlobs: [],
      productPriceForms : [],
      locationForm: {
        location_osm_id: null,
        location_osm_type: null
      },
      proofMetadataForm: {
        date: utils.currentDate(),
        currency: null,
        receipt_price_count: null,
        receipt_price_total: null
      },
      processCroppedImagesLoading: false,
      addPricesLoading: false,
      addProofLoading: false,
      numberOfPricesAdded: 0
    }
  },
  computed: {
    ...mapStores(useAppStore),
    locationName() {
      const recentLocations = this.appStore.getRecentLocations()
      const location = recentLocations.find((location) => location.properties.osm_id === this.locationForm.location_osm_id)
      if (location) {
        if (location.type === 'ONLINE') return location.website_url
        return utils.getLocationOSMTitle(location, true, true, true)
      }
      return ''
    },
    disableLocationDateTab() {
      // LocationDate tab should disabled during api calls to add prices
      return this.addPricesLoading
    },
    disableCropTab() {
      // Crop tab should only be enabled after the location is selected
      // It should also be disabled during api calls to add prices
      return !this.locationForm.location_osm_id || this.addPricesLoading
    },
    disableCleanupTab() {
      // Cleanup tab should only be enabled after the gemini analysis is done
      // It should also be disabled during api calls to add prices
      return !this.productPriceForms.length || this.addPricesLoading
    },
    disableSummaryTab() {
      // Summary tab should be enabled when there are product prices to be added and the add prices process is either running or done
      const enableSummaryTab = this.productPriceForms.length && (this.addPricesLoading || this.productPriceForms.length == this.numberOfPricesAdded)
      return !enableSummaryTab
    }
  },
  mounted() {
    this.proofMetadataForm.currency = this.appStore.getUserLastCurrencyUsed
  },
  methods: {
    setProof(event) {
      if (event instanceof File) {
        // A new file was selected
        this.recentProof = null
        this.originalProofImage = event
        const reader = new FileReader()
        reader.onload = (e) => {
          const image = new Image()
          image.src = e.target.result
          this.image = image
        };
        reader.readAsDataURL(event)
      } else {
        // An existing proof was selected
        this.recentProof = event
        this.originalProofImage = null
        const image = new Image()
        image.src = `${import.meta.env.VITE_OPEN_PRICES_APP_URL}/img/${event.file_path}`
        image.crossOrigin = 'Anonymous'
        this.image = image
        this.proofMetadataForm.date = event.date
        this.proofMetadataForm.currency = event.currency
        this.locationForm.location_osm_id = event.location_osm_id
        this.locationForm.location_osm_type = event.location_osm_type
      }

      this.croppedImages = []
      this.croppedBlobs = []
      this.productPriceForms = []
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
        // TODO: some of these will be None if gemini did not give a proper reply, so detection and error handling is needed
        const productPriceForm = {
          mode: 'category',
          category_tag: label.product,
          origins_tags: [label.origin],
          labels_tags: label.organic ? ["en:organic"] : [],
          price: label.price.toString(),
          price_per: label.unit,
          price_is_discounted: false,
          currency: this.appStore.getUserLastCurrencyUsed || 'EUR',
          proofImage: this.croppedImages[i],
          product_code: label.barcode.toString(),
          detected_product_code: label.barcode.toString()
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
      let proof = this.recentProof // Can be null if new proof
      if (!proof) { // Implies an originalProofImage was set
        this.addProofLoading = true
        const proofImageCompressed = await new Promise((resolve, reject) => {
          new Compressor(this.originalProofImage, {
            success: resolve,
            error: reject
          })
        })
        proof = await api.createProof(proofImageCompressed, Object.assign({type: 'PRICE_TAG'}, this.locationForm, this.proofMetadataForm), this.$route.path)
        this.addProofLoading = false
      }
      this.recentProof = proof
      
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
          date: proof.date,
          location_id: proof.location_id,
          location_osm_id: proof.location_osm_id,
          location_osm_type: proof.location_osm_type,
          proof_id: proof.id
        }
        // Cleanup unwanted fields for API
        if (productPriceForm.mode == 'barcode') {
          delete priceData.price_per
          delete priceData.category_tag
          delete priceData.origins_tags
        } else if (productPriceForm.mode == 'category') {
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
