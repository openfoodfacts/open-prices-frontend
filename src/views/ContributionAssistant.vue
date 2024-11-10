<template>
  <v-container>
    <v-tabs
      v-model="tab"
    >
      <v-tab value="LocationDate">
        1. Location & Date
      </v-tab>
      <v-tab value="Crop" :disabled="!locationForm.location_osm_id">
        2. Image crop
      </v-tab>
      <v-tab value="Cleanup" :disabled="!productPriceForms.length">
        3. Cleanup
      </v-tab>
    </v-tabs>
    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="LocationDate">
        <v-container>
          <v-col cols="12" md="6">
            <LocationInputRow :locationForm="locationForm" />
            <ContributionAssistantDateForm :initialDate="date" @date="setDate($event)" />
            <v-btn class="mt-4" :disabled="!locationForm.location_osm_id" @click="() => tab = 'Crop'">
              Next
            </v-btn>
          </v-col>
        </v-container>
      </v-tabs-window-item>
      <v-tabs-window-item value="Crop">
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <h3 class="mb-4">
                1. Select an image containing labels
              </h3>
              <ProofImageInputRow :hideProofImagePreview="true" :hideRecentProofChoice="false" @proof="setProof($event)" />
              <p v-if="recentProof" class="mb-2">
                <i>Selecting a recent proof has overwritten location and date.</i>
              </p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <h3 class="mb-4">
                2. Draw squares around the labels
              </h3>
              <ContributionAssistantDrawCanvas ref="ContributionAssistantdrawCanvas" :image="image" @croppedImages="onCroppedImages($event)" />
            </v-col>
            <v-col cols="12" md="6">
              <h3 class="mb-4">
                3. Check the readability of labels
              </h3>
              <ContributionAssistantCropImageList :croppedImages="croppedImages" @removeCrop="removeCrop($event)" />
            </v-col>
          </v-row>
          
          <h3 class="mb-4">
            4. Send the cropped images for automatic processing
          </h3>
          <v-btn :disabled="!croppedImages.length" :loading="processCroppedImagesLoading" @click="processCroppedImages">
            Process Cropped Images
          </v-btn>
        </v-container>
      </v-tabs-window-item>
      <v-tabs-window-item value="Cleanup">
        <v-container>
          <v-row>
            <v-col
              v-for="(productPriceForm, index) in productPriceForms"
              :key="index"
              cols="12"
              md="3"
            >
              <ContributionAssistantPriceFormCard :productPriceForm="productPriceForm" />
            </v-col>
          </v-row>
          <p v-if="recentProof" class="mt-2">
            <i>{{ productPriceForms.length }} price{{ productPriceForms.length > 1 ? 's' : '' }} will be added to existing proof on the {{ recentProof.date }} at {{ locationName }}.</i>
          </p>
          <p v-if="!recentProof" class="mt-2">
            <i>1 proof and {{ productPriceForms.length }} price{{ productPriceForms.length > 1 ? 's' : '' }} will be added on the {{ date }} at {{ locationName }}.</i>
          </p>
          <v-btn class="mt-4" :loading="addPricesLoading" @click="addPrices">
            Add prices to open prices
          </v-btn>
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
  name: "IndexPage",
  components: {
    ContributionAssistantPriceFormCard: defineAsyncComponent(() => import('../components/ContributionAssistantPriceFormCard.vue')),
    LocationInputRow: defineAsyncComponent(() => import('../components/LocationInputRow.vue')),
    ProofImageInputRow: defineAsyncComponent(() => import('../components/ProofImageInputRow.vue')),
    ContributionAssistantDrawCanvas: defineAsyncComponent(() => import('../components/ContributionAssistantDrawCanvas.vue')),
    ContributionAssistantCropImageList: defineAsyncComponent(() => import('../components/ContributionAssistantCropImageList.vue')),
    ContributionAssistantDateForm: defineAsyncComponent(() => import('../components/ContributionAssistantDateForm.vue')),
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
      date: utils.currentDate(),
      processCroppedImagesLoading: false,
      addPricesLoading: false
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
      return ""
    }
  },
  methods: {
    setDate(date) {
      this.date = date
    },
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
        this.date = event.date
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
      console.log(response)
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
          currency: this.appStore.getUserLastCurrencyUsed || "EUR",
          proofImage: this.croppedImages[i],
          product_code: label.barcode.toString()
        }
        this.productPriceForms.push(productPriceForm)
      }
      this.tab = "Cleanup"
    },
    async addPrices() {
      this.addPricesLoading = true
      let proof = this.recentProof // Can be null if new proof
      if (!proof) { // Implies an originalProofImage was set
        const proofImageCompressed = await new Promise((resolve, reject) => {
          new Compressor(this.originalProofImage, {
            success: resolve,
            error: reject
          })
        })
        proof = await api.createProof(proofImageCompressed, 'PRICE_TAG', null, this.locationForm.location_osm_id, this.locationForm.location_osm_type, this.date, this.appStore.getUserLastCurrencyUsed || "EUR")
      }
      
      for (let i = 0; i < this.productPriceForms.length; i++) {
        const productPriceForm = this.productPriceForms[i]
        let origins_tags = productPriceForm.origins_tags
        if (!Array.isArray(origins_tags)) {
          origins_tags = [origins_tags]
        }
        if (origins_tags[0] == null || origins_tags[0] == "unknown" || origins_tags[0] == "other" || origins_tags[0] == "") {
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
        if (productPriceForm.mode == "barcode"){
          delete priceData.price_per
          delete priceData.category_tag
          delete priceData.origins_tags
        } else if (productPriceForm.mode == "category"){
          delete priceData.product_code
          delete priceData.product
        }
        await api.createPrice(priceData) // TODO: error handling
        this.productPriceForms[i].processed = true
      }
      this.addPricesLoading = false
    }
  }
}
</script>

