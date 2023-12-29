<template>
  <h1 class="mb-1">Add a single price</h1>

  <v-form @submit.prevent="createPrice">
    <v-row>

      <!-- Step 1: proof -->
      <v-col cols="12" md="6" lg="4">
        <v-card
          title="Take a picture of the price tag"
          subtitle="We need this for proof"
          :prepend-icon="proofFormFilled ? 'mdi-image-check' : 'mdi-camera'"
          height="100%"
          :style="proofFormFilled ? 'border: 1px solid #4CAF50' : 'border: 1px solid transparent'">
          <v-divider></v-divider>
          <v-card-text>
            <v-row>
              <v-col>
                <v-btn class="mb-2" size="small" prepend-icon="mdi-plus" @click.prevent="$refs.proof.click()" :loading="createProofLoading" :disabled="createProofLoading">Proof</v-btn>
                <v-file-input
                  class="overflow-hidden d-none"
                  ref="proof"
                  :prepend-icon="proofFormFilled ? 'mdi-image-check' : 'mdi-camera'"
                  v-model="proofImage"
                  capture="environment"
                  accept="image/*"
                  @change="uploadProof"
                  @click:clear="clearProof"
                  :loading="createProofLoading">
                </v-file-input>
                <p v-if="proofFormFilled && !createProofLoading" class="text-green mb-2"><i>Proof uploaded!</i></p>
                <p v-if="!proofFormFilled && !createProofLoading" class="text-red mb-2"><i>Upload a proof</i></p>
              </v-col>
              <v-col v-if="proofFormFilled">
                <v-img :src="proofImagePreview" style="max-height:200px"></v-img>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Step 2: product & price -->
      <v-col cols="12" md="6" lg="4">
        <v-card
          title="Product & price details"
          subtitle="The most important :)"
          :prepend-icon="productPriceFormFilled ? 'mdi-tag-check-outline' : 'mdi-tag-outline'"
          height="100%"
          :style="productPriceFormFilled ? 'border: 1px solid #4CAF50' : 'border: 1px solid transparent'">
          <v-divider></v-divider>
          <v-card-text>
            <h3 class="mb-1">
              Product
              <v-item-group v-model="productMode" class="d-inline" mandatory>
                <v-item v-for="pm in productModeList" :key="pm.key" :value="pm.key" v-slot="{ isSelected, toggle }">
                  <v-chip class="mr-1" @click="toggle">
                    <v-icon start :icon="isSelected ? 'mdi-checkbox-marked-circle' : 'mdi-circle-outline'"></v-icon>
                    {{ pm.value }}
                  </v-chip>
                </v-item>
              </v-item-group>
            </h3>
            <v-sheet v-if="productMode === 'barcode'">
              <v-btn class="mb-2" size="small" prepend-icon="mdi-plus" @click="showBarcodeScanner">Scan a barcode</v-btn>
              <v-text-field
                v-if="dev"
                :prepend-inner-icon="productBarcodeFormFilled ? 'mdi-barcode' : 'mdi-barcode-scan'"
                v-model="addPriceSingleForm.product_code"
                label="Product code"
                type="text"
                hint="EAN"
                @click:prepend="showBarcodeScanner"
              ></v-text-field>
              <PriceCard v-if="product" class="mb-4" :product="product" :readonly="true" elevation="1"></PriceCard>
            </v-sheet>
            <v-sheet v-if="productMode === 'category'">
              <v-autocomplete
                :prepend-inner-icon="productCategoryFormFilled ? 'mdi-basket-check-outline' : 'mdi-basket-outline'"
                v-model="addPriceSingleForm.category_tag"
                label="Category"
                :items="categoryTags"
                :item-title="item => item.name"
                :item-value="item => item.id"
                hide-details="auto"
              ></v-autocomplete>
              <div class="d-inline">
                <v-checkbox v-for="lt in labelsTags" v-model="addPriceSingleForm.labels_tags" :label="lt.name" :value="lt.id" hide-details="auto"></v-checkbox>
              </div>
            </v-sheet>
            <p v-if="(productMode === 'barcode' && !productBarcodeFormFilled) || (productMode === 'category' && !productCategoryFormFilled)" class="text-red mb-2"><i>Set a product</i></p>

            <h3 class="mb-1">Price <span v-if="productMode === 'category'">per kg</span></h3>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="addPriceSingleForm.price"
                  label="Price"
                  type="number"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-autocomplete
                  v-model="addPriceSingleForm.currency"
                  label="Currency"
                  :items="currencyList"
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Step 3: location & date -->
      <v-col cols="12" md="6" lg="4">
        <v-card
          title="Where & when?"
          subtitle="Final step!"
          :prepend-icon="locationDateFormFilled ? 'mdi-map-marker-check-outline' : 'mdi-map-marker-outline'"
          height="100%"
          :style="locationDateFormFilled ? 'border: 1px solid #4CAF50' : 'border: 1px solid transparent'">
          <v-divider></v-divider>
          <v-card-text>
            <h3 class="mb-1">
              Location
            </h3>
            <v-btn class="mb-2" size="small" prepend-icon="mdi-plus" @click="showLocationSelector">Find</v-btn>
            <v-chip
              class="mb-2"
              :style="isSelectedLocation(location) ? 'border: 1px solid #4CAF50' : 'border: 1px solid transparent'"
              v-for="location in recentLocations"
              @click="setLocationData(location)">
              <v-icon start :icon="isSelectedLocation(location) ? 'mdi-checkbox-marked-circle' : 'mdi-history'"></v-icon>
              {{ location.display_name }}
            </v-chip>
            <p v-if="!locationFormFilled" class="text-red mb-2"><i>Select your location</i></p>

            <h3 class="mt-4 mb-1">Date</h3>
            <v-row>
              <v-col>
                <v-text-field
                  v-model="addPriceSingleForm.date"
                  label="Date"
                  type="date"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-btn type="submit" :color="formFilled ? 'success' : ''" :loading="createPriceLoading" :disabled="!formFilled">Create</v-btn>
      </v-col>
    </v-row>
  </v-form>

  <v-snackbar
    v-model="proofSuccessMessage"
    color="success"
    :timeout="2000"
  >Proof uploaded!</v-snackbar>

  <BarcodeScanner
    v-if="barcodeScanner"
    v-model="barcodeScanner"
    @barcode="setProductCode($event)"
    @close="barcodeScanner = false"
  ></BarcodeScanner>

  <LocationSelector
    v-if="locationSelector"
    v-model="locationSelector"
    @location="setLocationData($event)"
    @close="closeLocationSelector($event)"
  ></LocationSelector>
</template>

<script>
import Compressor from 'compressorjs'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import constants from '../constants'
import api from '../services/api'
import PriceCard from '../components/PriceCard.vue'
import BarcodeScanner from '../components/BarcodeScanner.vue'
import LocationSelector from '../components/LocationSelector.vue'
import CategoryTags from '../data/category-tags.json'
import LabelsTags from '../data/labels-tags.json'

Compressor.setDefaults({
  checkOrientation: true,  // default
  retainExif: true,
  quality: 0.6,
  mimeType: 'image/webp',
  maxWidth: 3000
})

export default {
  components: {
    PriceCard,
    BarcodeScanner,
    LocationSelector
  },
  data() {
    return {
      dev: import.meta.env.DEV,
      // price form
      addPriceSingleForm: {
        proof_id: null,
        product_code: '',
        category_tag: null,
        labels_tags: [],
        price: null,
        currency: null,  // see initPriceSingleForm
        location_osm_id: null,
        location_osm_type: '',
        date: new Date().toISOString().substr(0, 10)
      },
      createPriceLoading: false,
      // proof data
      proofImage: null,
      proofImagePreview: null,
      createProofLoading: false,
      proofSuccessMessage: false,
      // product data
      product: null,
      productModeList: [{key: 'barcode', value: 'Barcode', icon: 'mdi-barcode-scan'}, {key: 'category', value: 'Category', icon: 'mdi-basket-outline'}],
      productMode: null,  // 'barcode' or 'category'  // see initPriceSingleForm
      categoryTags: CategoryTags,  // list of category tags for autocomplete
      labelsTags: LabelsTags,
      barcodeScanner: false,
      // price data
      currencyList: constants.CURRENCY_LIST,
      // location data
      locationSelector: false,
      locationSelectedDisplayName: '',
    }
  },
  computed: {
    ...mapStores(useAppStore),
    proofFormFilled() {
      let keys = ['proof_id']
      return Object.keys(this.addPriceSingleForm).filter(k => keys.includes(k)).every(k => !!this.addPriceSingleForm[k])
    },
    productBarcodeFormFilled() {
      let keys = ['product_code']
      return Object.keys(this.addPriceSingleForm).filter(k => keys.includes(k)).every(k => !!this.addPriceSingleForm[k])
    },
    productCategoryFormFilled() {
      let keys = ['category_tag']
      return Object.keys(this.addPriceSingleForm).filter(k => keys.includes(k)).every(k => !!this.addPriceSingleForm[k])
    },
    productPriceFormFilled() {
      return (this.productBarcodeFormFilled || this.productCategoryFormFilled) && !!this.addPriceSingleForm.price && !!this.addPriceSingleForm.currency
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
      return this.proofFormFilled && this.productPriceFormFilled && this.locationDateFormFilled
    },
  },
  mounted() {
    this.initPriceSingleForm()
  },
  methods: {
    fieldRequired(v) {
      return !!v
    },
    initPriceSingleForm() {
      this.productMode = this.appStore.user.last_product_mode_used
      this.addPriceSingleForm.currency = this.appStore.user.last_currency_used
    },
    clearProof() {
      this.proofImage = null
      this.proofImagePreview = null
      this.addPriceSingleForm.proof_id = null
      this.proofSuccessMessage = false
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
          .createProof(proofImageCompressed)
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
    createPrice() {
      this.createPriceLoading = true
      // cleanup form
      if (!this.addPriceSingleForm.product_code) {
        this.addPriceSingleForm.product_code = null
      }
      if (this.addPriceSingleForm.labels_tags.length == 0) {
        this.addPriceSingleForm.labels_tags = null
      }
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
    showBarcodeScanner() {
      this.barcodeScanner = true
    },
    setProductCode(code) {
      this.addPriceSingleForm.product_code = code
      this.product = null
      api
        .openfoodfactsProductSearch(code)
        .then((data) => {
          this.product = data['product'] || {'code': code}
        })
        .catch((error) => {
          alert("Error: Open Food Facts server error")
        })
    },
    showLocationSelector() {
      this.locationSelector = true
    },
    closeLocationSelector(event) {
      this.locationSelector = false
    },
    setLocationData(location) {
      this.appStore.addRecentLocation(location)
      this.locationSelectedDisplayName = location.display_name
      this.addPriceSingleForm.location_osm_id = location.osm_id
      this.addPriceSingleForm.location_osm_type = location.osm_type.toUpperCase()
    },
    isSelectedLocation(location) {
      return this.locationSelectedDisplayName && this.locationSelectedDisplayName === location.display_name
    },
  },
  watch: {
    productMode(newProductMode, oldProductMode) {
      // reset product_code and category_tag when switching mode
      this.addPriceSingleForm.product_code = ""
      this.addPriceSingleForm.category_tag = null
      this.addPriceSingleForm.labels_tags = []
      this.product = null
    }
  }
}
</script>
