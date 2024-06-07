<template>
  <h1 class="text-h5 mb-1">
    {{ $t('AddPriceSingle.Title') }}
  </h1>

  <v-form @submit.prevent="createPrice">
    <v-row>
      <!-- Step 1: product -->
      <v-col cols="12" md="6" lg="4">
        <v-card
          :title="$t('AddPriceSingle.ProductInfo.Title')"
          prepend-icon="mdi-database-outline"
          height="100%"
          :style="productFormFilled ? 'border: 1px solid #4CAF50' : 'border: 1px solid transparent'"
        >
          <template v-if="productFormFilled" #append>
            <v-icon icon="mdi-checkbox-marked-circle" color="success" />
          </template>
          <v-divider />
          <v-card-text>
            <ProductInputRow :productForm="addPriceSingleForm" @filled="productFormFilled = $event" />
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Step 2: price & proof -->
      <v-col cols="12" md="6" lg="4">
        <v-card
          :title="$t('AddPriceSingle.PriceDetails.Title')"
          prepend-icon="mdi-tag-outline"
          height="100%"
          :style="priceProofFormFilled ? 'border: 1px solid #4CAF50' : 'border: 1px solid transparent'"
        >
          <template v-if="priceProofFormFilled" #append>
            <v-icon icon="mdi-checkbox-marked-circle" color="success" />
          </template>
          <v-divider />
          <v-card-text>
            <h3 class="mb-1">
              <v-item-group v-if="addPriceSingleForm.mode === 'category'" v-model="addPriceSingleForm.price_per" class="d-inline" mandatory>
                <v-item v-for="cpp in categoryPricePerList" :key="cpp.key" v-slot="{ isSelected, toggle }" :value="cpp.key">
                  <v-chip class="mr-1" :style="isSelected ? 'border: 1px solid #9E9E9E' : 'border: 1px solid transparent'" @click="toggle">
                    <v-icon start :icon="isSelected ? 'mdi-checkbox-marked-circle' : 'mdi-circle-outline'" />
                    {{ cpp.value }}
                  </v-chip>
                </v-item>
              </v-item-group>
            </h3>
            <PriceInputRow :priceForm="addPriceSingleForm" @filled="pricePriceFormFilled = $event" />
            <h3 class="mt-4 mb-1">
              {{ $t('AddPriceSingle.PriceDetails.Proof') }}
            </h3>
            <v-row>
              <v-col>
                <v-btn class="mb-2 mr-2" size="small" prepend-icon="mdi-camera" :loading="createProofLoading" :disabled="createProofLoading" @click.prevent="$refs.proofCamera.click()">
                  <span class="d-sm-none">{{ $t('AddPriceSingle.PriceDetails.Picture') }}</span>
                  <span class="d-none d-sm-inline-flex">{{ $t('AddPriceSingle.PriceDetails.TakePicture') }}</span>
                </v-btn>
                <v-btn class="mb-2 mr-2" size="small" prepend-icon="mdi-image-plus" :loading="createProofLoading" :disabled="createProofLoading" @click.prevent="$refs.proofGallery.click()">
                  <span class="d-sm-none">{{ $t('AddPriceSingle.PriceDetails.Gallery') }}</span>
                  <span class="d-none d-sm-inline-flex">{{ $t('AddPriceSingle.PriceDetails.SelectFromGallery') }}</span>
                </v-btn>
                <v-btn class="mb-2" size="small" prepend-icon="mdi-receipt-text-clock" @click="showUserRecentProofs">
                  <span class="d-sm-none">{{ $t('AddPriceSingle.PriceDetails.RecentProof') }}</span>
                  <span class="d-none d-sm-inline-flex">{{ $t('AddPriceSingle.PriceDetails.SelectRecentProof') }}</span>
                </v-btn>
                <v-file-input
                  ref="proofCamera"
                  v-model="proofImage"
                  class="d-none overflow-hidden"
                  capture="environment"
                  accept="image/*"
                  :loading="createProofLoading"
                  @change="newProof('camera')"
                  @click:clear="clearProof"
                />
                <v-file-input
                  ref="proofGallery"
                  v-model="proofImage"
                  class="d-none overflow-hidden"
                  accept="image/*, .heic"
                  :loading="createProofLoading"
                  @change="newProof('gallery')"
                  @click:clear="clearProof"
                />
                <p v-if="proofFormFilled && !createProofLoading" class="text-green mt-2 mb-2">
                  <i v-if="!proofSelectedMessage">{{ $t('AddPriceSingle.PriceDetails.ProofUploaded') }}</i>
                  <i v-if="proofSelectedMessage">{{ $t('AddPriceSingle.PriceDetails.ProofSelected') }}</i>
                </p>
                <p v-if="!proofFormFilled && !createProofLoading" class="text-red mt-2 mb-2">
                  <i>{{ $t('AddPriceSingle.PriceDetails.UploadProof') }}</i>
                </p>
              </v-col>
              <v-col v-if="proofFormFilled">
                <v-img :src="proofImagePreview" style="max-height:200px" />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Step 3: location & date -->
      <v-col cols="12" md="6" lg="4">
        <v-card
          :title="$t('AddPriceSingle.WhereWhen.Title')"
          prepend-icon="mdi-map-marker-outline"
          height="100%"
          :style="locationDateFormFilled ? 'border: 1px solid #4CAF50' : 'border: 1px solid transparent'"
        >
          <template v-if="locationDateFormFilled" #append>
            <v-icon icon="mdi-checkbox-marked-circle" color="success" />
          </template>
          <v-divider />
          <v-card-text>
            <h3 class="mb-1">
              {{ $t('AddPriceSingle.WhereWhen.Location') }}
            </h3>
            <v-chip
              v-for="location in recentLocations"
              :key="getLocationUniqueID(location)"
              class="mb-2"
              :style="isSelectedLocation(location) ? 'border: 1px solid #4CAF50' : 'border: 1px solid transparent'"
              @click="setLocationData(location)"
            >
              <v-icon start :icon="isSelectedLocation(location) ? 'mdi-check-circle-outline' : 'mdi-history'" :color="isSelectedLocation(location) ? 'green' : ''" />
              {{ getLocationTitle(location, true, true, true) }}
            </v-chip>
            <br v-if="recentLocations.length">
            <v-btn class="mb-2" size="small" prepend-icon="mdi-magnify" @click="showLocationSelectorDialog">
              {{ $t('AddPriceSingle.WhereWhen.Find') }}
            </v-btn>
            <p v-if="!locationFormFilled" class="text-red mb-2">
              <i>{{ $t('AddPriceSingle.WhereWhen.SelectLocation') }}</i>
            </p>

            <h3 class="mt-4 mb-1">
              {{ $t('AddPriceSingle.WhereWhen.Date') }}
            </h3>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="addPriceSingleForm.date"
                  :label="$t('AddPriceSingle.WhereWhen.DateLabel')"
                  type="date"
                />
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-btn
          type="submit"
          :color="formFilled ? 'success' : ''"
          :loading="createPriceLoading"
          :disabled="!formFilled"
        >
          {{ $t('AddPriceSingle.Create') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-form>

  <v-snackbar
    v-model="proofDateSuccessMessage"
    color="info"
    :timeout="2000"
  >
    {{ $t('AddPriceSingle.PriceDetails.ProofDateChanged') }}
  </v-snackbar>
  <v-snackbar
    v-model="proofSuccessMessage"
    color="success"
    :timeout="2000"
  >
    {{ $t('AddPriceSingle.PriceDetails.ProofUploaded') }}
  </v-snackbar>
  <v-snackbar
    v-model="proofSelectedSuccessMessage"
    color="success"
    :timeout="2000"
  >
    {{ $t('AddPriceSingle.PriceDetails.ProofSelected') }}
  </v-snackbar>

  <LocationSelectorDialog
    v-if="locationSelectorDialog"
    v-model="locationSelectorDialog"
    @location="setLocationData($event)"
    @close="locationSelectorDialog = false"
  />
  <UserRecentProofsDialog
    v-if="userRecentProofsDialog"
    v-model="userRecentProofsDialog"
    @recentProofSelected="handleRecentProofSelected($event)"
    @close="userRecentProofsDialog = false"
  />
</template>

<script>
import Compressor from 'compressorjs'
import ExifReader from 'exifreader'
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import api from '../services/api'
import utils from '../utils.js'

Compressor.setDefaults({
  checkOrientation: true,  // default
  retainExif: true,
  quality: 0.6,
  mimeType: 'image/webp',
  maxWidth: 3000
})

export default {
  components: {
    ProductInputRow: defineAsyncComponent(() => import('../components/ProductInputRow.vue')),
    PriceInputRow: defineAsyncComponent(() => import('../components/PriceInputRow.vue')),
    LocationSelectorDialog: defineAsyncComponent(() => import('../components/LocationSelectorDialog.vue')),
    UserRecentProofsDialog: defineAsyncComponent(() => import('../components/UserRecentProofsDialog.vue')),
  },
  data() {
    return {
      dev: import.meta.env.DEV,
      // price form
      addPriceSingleForm: {
        mode: '',
        product: null,
        product_code: '',
        category_tag: null,
        origins_tags: '',
        labels_tags: [],
        price: null,
        price_per: null, // see initPriceSingleForm
        price_is_discounted: false,
        price_without_discount: null,
        currency: null,  // see initPriceSingleForm
        location_osm_id: null,
        location_osm_type: '',
        date: utils.currentDate(),
        proof_id: null,
      },
      pricePriceFormFilled: false,
      productFormFilled: false,
      createPriceLoading: false,
      // location data
      locationSelectorDialog: false,
      // proof data
      userRecentProofsDialog: false,
      proofImage: null,
      proofImagePreview: null,
      createProofLoading: false,
      proofDateSuccessMessage: false,
      proofSuccessMessage: false,
      proofSelectedSuccessMessage: false,
      proofSelectedMessage: false,
      categoryPricePerList: [
        {key: 'KILOGRAM', value: this.$t('AddPriceSingle.CategoryPricePer.PerKg'), icon: 'mdi-weight-kilogram'},
        {key: 'UNIT', value: this.$t('AddPriceSingle.CategoryPricePer.PerUnit'), icon: 'mdi-numeric-1-circle'}
      ],
    }
  },
  computed: {
    ...mapStores(useAppStore),
    pricePerFormFilled() {
      let keys = ['price_per']
      return Object.keys(this.addPriceSingleForm).filter(k => keys.includes(k)).every(k => !!this.addPriceSingleForm[k])
    },
    priceFormFilled() {
      return this.pricePerFormFilled && this.pricePriceFormFilled
    },
    proofFormFilled() {
      let keys = ['proof_id']
      return Object.keys(this.addPriceSingleForm).filter(k => keys.includes(k)).every(k => !!this.addPriceSingleForm[k])
    },
    priceProofFormFilled() {
      return this.priceFormFilled && this.proofFormFilled
    },
    recentLocations() {
      return this.appStore.getRecentLocations(3)
    },
    locationFormFilled() {
      let keys = ['location_osm_id', 'location_osm_type']
      return Object.keys(this.addPriceSingleForm).filter(k => keys.includes(k)).every(k => !!this.addPriceSingleForm[k])
    },
    locationDateFormFilled() {
      let keys = ['location_osm_id', 'location_osm_type', 'date']
      return Object.keys(this.addPriceSingleForm).filter(k => keys.includes(k)).every(k => !!this.addPriceSingleForm[k])
    },
    formFilled() {
      return this.productFormFilled && this.priceProofFormFilled && this.locationDateFormFilled
    },
  },
  mounted() {
    if (this.$route.query.code) {
      if (this.$route.query.code.startsWith('en')) {
        this.addPriceSingleForm.mode = 'category'
        this.addPriceSingleForm.category_tag = this.$route.query.code
      }
      else {
        this.setProductCode(this.$route.query.code)
      }
    } else if (this.$route.query.proof_id) {
      this.getProofById(this.$route.query.proof_id)
    }
    this.initPriceSingleForm()
  },
  methods: {
    fieldRequired(v) {
      return !!v
    },
    initPriceSingleForm() {
      /**
       * init form config (product mode, categories, origins, last locations)
       * init form
       */
      this.addPriceSingleForm.mode = this.addPriceSingleForm.mode ? this.addPriceSingleForm.mode : (this.addPriceSingleForm.product_code ? 'barcode' : this.appStore.user.last_product_mode_used)
      utils.getLocaleCategoryTags(this.appStore.getUserLanguage).then((module) => {
        this.categoryTags = module.default
      })
      utils.getLocaleOriginTags(this.appStore.getUserLanguage).then((module) => {
        this.originTags = module.default
      })
      if (this.recentLocations.length) {
        this.setLocationData(this.recentLocations[0])
      }
      this.addPriceSingleForm.price_per = this.categoryPricePerList[0].key // init to 'KILOGRAM' because it's the most common use-case
      this.addPriceSingleForm.currency = this.appStore.getUserLastCurrencyUsed
    },
    showUserRecentProofs() {
      this.userRecentProofsDialog = true
    },
    handleProofSelected(proof) {
      this.addPriceSingleForm.proof_id = proof.id
      this.addPriceSingleForm.date = new Date(proof.created).toISOString().split('T')[0]
      // this.proofDateSuccessMessage = true
      this.proofImagePreview = this.getProofUrl(proof)
      this.proofSelectedSuccessMessage = true
      this.proofSelectedMessage = true
    },
    handleRecentProofSelected(selectedProof) {
      this.handleProofSelected(selectedProof)
      this.proofImagePreview = this.getProofUrl(selectedProof)
    },
    getProofUrl(proof) {
      return `${import.meta.env.VITE_OPEN_PRICES_APP_URL}/img/${proof.file_path}`
    },
    getProofById(proofId) {
      this.loading = true
      api.getProofById(proofId)
        .then(proof => {
          this.handleProofSelected(proof)
          this.loading = false
        })
    },
    newProof(source) {
      if (source === 'gallery') {
        ExifReader.load(this.proofImage[0]).then((tags) => {
          if (tags['DateTimeOriginal'] && tags['DateTimeOriginal'].description) {
            // exif DateTimeOriginal format: '2024:01:31 20:23:52'
            const imageDateString = tags['DateTimeOriginal'].description.substring(0, 10).replaceAll(':', '-')
            if (imageDateString !== this.addPriceSingleForm.date) {
              this.addPriceSingleForm.date = imageDateString
              this.proofDateSuccessMessage = true
            }
          }
        })
      }
      this.uploadProof()
    },
    uploadProof() {
      this.createProofLoading = true
      new Promise((resolve, reject) => {
        new Compressor(this.proofImage[0], {
          success: resolve,
          error: reject
        })
      })
      .then((proofImageCompressed) => {
        api
          .createProof(proofImageCompressed, 'PRICE_TAG')
          .then((data) => {
            this.createProofLoading = false
            if (data['id']) {
              this.addPriceSingleForm.proof_id = data['id']
              this.proofImagePreview = URL.createObjectURL(proofImageCompressed)
              this.proofSuccessMessage = true
            } else {
              alert('Error: server error')
              console.log(data)
            }
          })
          .catch((error) => {
            alert('Error: server error')
            console.log(error)
            this.createProofLoading = false
          })
      })
      .catch((error) => {
        alert('Error: compression')
        console.log(error)
      })
      // .finally(() => {
      //   console.log('Compress complete')
      // })
    },
    clearProof() {
      this.proofImage = null
      this.proofImagePreview = null
      this.addPriceSingleForm.proof_id = null
    },
    showBarcodeScannerDialog() {
      this.barcodeScannerDialog = true
    },
    showBarcodeManualInputDialog() {
      this.barcodeManualInputDialog = true
    },
    setProductCode(code) {
      this.addPriceSingleForm.product_code = code
      this.product = null
      api
        .getProductByCode(code)
        .then((data) => {
          this.product = data.id ? data : {'code': code, 'price_count': 0}
          console.log(this.product)
        })
        .catch((error) => {  // eslint-disable-line no-unused-vars
          alert('Error: Open Prices server error')
        })
    },
    showLocationSelectorDialog() {
      this.locationSelectorDialog = true
    },
    getLocationTitle(location, withName=true, withRoad=false, withCity=true) {
      return utils.getLocationTitle(location, withName, withRoad, withCity)
    },
    getLocationUniqueID(location) {
      return utils.getLocationUniqueID(location)
    },
    setLocationData(location) {
      this.appStore.addRecentLocation(location)
      this.addPriceSingleForm.location_osm_id = utils.getLocationID(location)
      this.addPriceSingleForm.location_osm_type = utils.getLocationType(location)
    },
    isSelectedLocation(location) {
      return (this.addPriceSingleForm.location_osm_id === utils.getLocationID(location)) && (this.addPriceSingleForm.location_osm_type === utils.getLocationType(location))
    },
    createPrice() {
      this.createPriceLoading = true
      this.appStore.setLastCurrencyUsed(this.addPriceSingleForm.currency)
      // cleanup form
      if (!this.addPriceSingleForm.product_code) {
        this.addPriceSingleForm.product_code = null
      } else {
        this.addPriceSingleForm.price_per = null
      }
      if ((typeof this.addPriceSingleForm.origins_tags === 'string') && (this.addPriceSingleForm.origins_tags.length)) {
        this.addPriceSingleForm.origins_tags = [this.addPriceSingleForm.origins_tags]
      } else {
        this.addPriceSingleForm.origins_tags = null
      }
      if (this.addPriceSingleForm.labels_tags.length == 0) {
        this.addPriceSingleForm.labels_tags = null
      }
      if (!this.addPriceSingleForm.price_is_discounted) {
        this.addPriceSingleForm.price_without_discount = null
      }
      // create price
      api
        .createPrice(this.addPriceSingleForm)
        .then((data) => {
          if (data['detail']) {
            alert(`Error: with input ${data['detail'][0]['input']}`)
          } else {
            this.$router.push({ path: '/add', query: { singleSuccess: 'true' } })
          }
          this.createPriceLoading = false
        })
        .catch((error) => {
          alert('Error: server error')
          console.log(error)
          this.createPriceLoading = false
        })
    },
  }
}
</script>
