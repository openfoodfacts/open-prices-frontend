<template>
  <h1 class="mb-1">{{ $t('AddPriceSingle.Title') }}</h1>

  <v-form @submit.prevent="createPrice">
    <v-row>

      <!-- Step 1: product -->
      <v-col cols="12" md="6" lg="4">
        <v-card
          :title="$t('AddPriceSingle.ProductInfo.Title')"
          :prepend-icon="productFormFilled ? 'mdi-database-check-outline' : 'mdi-database-outline'"
          height="100%"
          :style="productFormFilled ? 'border: 1px solid #4CAF50' : 'border: 1px solid transparent'">
          <v-divider></v-divider>
          <v-card-text>
            <h3 class="mb-2">
              <v-item-group v-model="productMode" class="d-inline" mandatory>
                <v-item v-for="pm in productModeList" :key="pm.key" :value="pm.key" v-slot="{ isSelected, toggle }">
                  <v-chip class="mr-1" @click="toggle" :style="isSelected ? 'border: 1px solid #9E9E9E' : 'border: 1px solid transparent'">
                    <v-icon start :icon="isSelected ? 'mdi-checkbox-marked-circle' : 'mdi-circle-outline'"></v-icon>
                    {{ pm.value }}
                  </v-chip>
                </v-item>
              </v-item-group>
            </h3>
            <v-sheet v-if="productMode === 'barcode'">
              <v-btn class="mb-2" size="small" prepend-icon="mdi-barcode-scan" @click="showBarcodeScanner">{{ $t('AddPriceSingle.ProductInfo.ScanBarcode') }}</v-btn>
              <v-text-field
                v-if="dev"
                :prepend-inner-icon="productBarcodeFormFilled ? 'mdi-barcode' : 'mdi-barcode-scan'"
                v-model="addPriceSingleForm.product_code"
                :label="$t('AddPriceSingle.ProductInfo.ProductCode')"
                type="text"
                hint="EAN"
                hide-details="auto"
                @click:prepend="showBarcodeScanner"
              ></v-text-field>
              <ProductCard v-if="product" class="mb-4" :product="product" :readonly="true" elevation="1"></ProductCard>
            </v-sheet>
            <v-sheet v-if="productMode === 'category'">
              <v-row>
                <v-col cols="6">
                  <v-autocomplete
                    :prepend-inner-icon="productCategoryFormFilled ? 'mdi-basket-check-outline' : 'mdi-basket-outline'"
                    v-model="addPriceSingleForm.category_tag"
                    :label="$t('AddPriceSingle.ProductInfo.CategoryLabel')"
                    :items="categoryTags"
                    :item-title="item => item.name"
                    :item-value="item => item.id"
                    hide-details="auto"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="6">
                  <v-autocomplete
                    v-model="addPriceSingleForm.origins_tags"
                    :label="$t('AddPriceSingle.ProductInfo.OriginLabel')"
                    :items="originsTags"
                    :item-title="item => item.name"
                    :item-value="item => item.id"
                    hide-details="auto"
                  ></v-autocomplete>
                </v-col>
              </v-row>
              <div class="d-inline">
                <v-checkbox v-for="lt in labelsTags" v-model="addPriceSingleForm.labels_tags" :label="lt.name" :value="lt.id" hide-details="auto"></v-checkbox>
              </div>
            </v-sheet>
            <p v-if="(productMode === 'barcode' && !productBarcodeFormFilled) || (productMode === 'category' && !productCategoryFormFilled)" class="text-red mb-2"><i>{{ $t('AddPriceSingle.ProductInfo.SetProduct') }}</i></p>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Step 2: price & proof -->
      <v-col cols="12" md="6" lg="4">
        <v-card
          :title="$t('AddPriceSingle.PriceDetails.Title')"
          :prepend-icon="priceProofFormFilled ? 'mdi-tag-check-outline' : 'mdi-tag-outline'"
          height="100%"
          :style="priceProofFormFilled ? 'border: 1px solid #4CAF50' : 'border: 1px solid transparent'">
          <v-divider></v-divider>
          <v-card-text>
            <h3 class="mb-1">
              <i18n-t keypath="AddPriceSingle.PriceDetails.Text" tag="p">
                <template #perKg>
                  <span v-if="productMode === 'category'">{{ $t('AddPriceSingle.PriceDetails.TextPerKg') }}</span>
                </template>
              </i18n-t>
            </h3>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="addPriceSingleForm.price"
                  :label="$t('AddPriceSingle.PriceDetails.Label')"
                  type="number"
                  hide-details="auto"
                  :suffix="addPriceSingleForm.currency"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn class="mb-2" size="small" prepend-icon="mdi-camera" @click.prevent="$refs.proof.click()" :loading="createProofLoading" :disabled="createProofLoading">{{ $t('AddPriceSingle.PriceDetails.Proof') }}</v-btn>
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
                <p v-if="proofFormFilled && !createProofLoading" class="text-green mb-2"><i>{{ $t('AddPriceSingle.PriceDetails.ProofUploaded') }}</i></p>
                <p v-if="!proofFormFilled && !createProofLoading" class="text-red mb-2"><i>{{ $t('AddPriceSingle.PriceDetails.UploadProof') }}</i></p>
              </v-col>
              <v-col v-if="proofFormFilled">
                <v-img :src="proofImagePreview" style="max-height:200px"></v-img>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Step 3: location & date -->
      <v-col cols="12" md="6" lg="4">
        <v-card
          :title="$t('AddPriceSingle.WhereWhen.Title')"
          :prepend-icon="locationDateFormFilled ? 'mdi-map-marker-check-outline' : 'mdi-map-marker-outline'"
          height="100%"
          :style="locationDateFormFilled ? 'border: 1px solid #4CAF50' : 'border: 1px solid transparent'">
          <v-divider></v-divider>
          <v-card-text>
            <h3 class="mb-1">
              {{ $t('AddPriceSingle.WhereWhen.Location') }} </h3>
            <v-chip
              class="mb-2"
              :style="isSelectedLocation(location) ? 'border: 1px solid #9E9E9E' : 'border: 1px solid transparent'"
              v-for="location in recentLocations"
              @click="setLocationData(location)">
              <v-icon start :icon="isSelectedLocation(location) ? 'mdi-checkbox-marked-circle' : 'mdi-history'"></v-icon>
              {{ getNominatimLocationTitle(location, true, true, true) }}
            </v-chip>
            <br v-if="recentLocations.length" />
            <v-btn class="mb-2" size="small" prepend-icon="mdi-magnify" @click="showLocationSelector">{{ $t('AddPriceSingle.WhereWhen.Find') }}</v-btn>
            <p v-if="!locationFormFilled" class="text-red mb-2"><i>{{ $t('AddPriceSingle.WhereWhen.SelectLocation') }}</i></p>

            <h3 class="mt-4 mb-1">{{ $t('AddPriceSingle.WhereWhen.Date') }}</h3>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="addPriceSingleForm.date"
                  :label="$t('AddPriceSingle.WhereWhen.DateLabel')"
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
        <v-btn type="submit" :color="formFilled ? 'success' : ''" :loading="createPriceLoading" :disabled="!formFilled">{{ $t('AddPriceSingle.Create') }}</v-btn>
      </v-col>
    </v-row>
  </v-form>

  <v-snackbar
    v-model="proofSuccessMessage"
    color="success"
    :timeout="2000"
  >{{ $t('AddPriceSingle.PriceDetails.ProofUploaded') }}</v-snackbar>

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
import api from '../services/api'
import utils from '../utils.js'
import ProductCard from '../components/ProductCard.vue'
import BarcodeScanner from '../components/BarcodeScanner.vue'
import LocationSelector from '../components/LocationSelector.vue'
import CategoryTags from '../data/category-tags.json'
import OriginsTags from '../data/origins-tags.json'
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
    ProductCard,
    BarcodeScanner,
    LocationSelector
  },
  data() {
    return {
      dev: import.meta.env.DEV,
      // price form
      addPriceSingleForm: {
        product_code: '',
        category_tag: null,
        origins_tags: '',
        labels_tags: [],
        price: null,
        currency: null,  // see initPriceSingleForm
        location_osm_id: null,
        location_osm_type: '',
        date: new Date().toISOString().substr(0, 10),
        proof_id: null,
      },
      createPriceLoading: false,
      // product data
      product: null,
      productModeList: [{key: 'barcode', value: this.$t('AddPriceSingle.ProductModeList.Barcode'), icon: 'mdi-barcode-scan'}, {key: 'category', value: this.$t('AddPriceSingle.ProductModeList.Category'), icon: 'mdi-basket-outline'}],
      productMode: null,  // 'barcode' or 'category'  // see initPriceSingleForm
      categoryTags: CategoryTags,  // list of category tags for autocomplete
      originsTags: OriginsTags,  // list of origins tags for autocomplete
      labelsTags: LabelsTags,
      barcodeScanner: false,
      // location data
      locationSelector: false,
      locationSelectedDisplayName: '',
      // proof data
      proofImage: null,
      proofImagePreview: null,
      createProofLoading: false,
      proofSuccessMessage: false,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    productBarcodeFormFilled() {
      let keys = ['product_code']
      return Object.keys(this.addPriceSingleForm).filter(k => keys.includes(k)).every(k => !!this.addPriceSingleForm[k])
    },
    productCategoryFormFilled() {
      let keys = ['category_tag', 'origins_tags']
      return Object.keys(this.addPriceSingleForm).filter(k => keys.includes(k)).every(k => !!this.addPriceSingleForm[k])
    },
    productFormFilled() {
      return this.productBarcodeFormFilled || this.productCategoryFormFilled
    },
    priceProofFormFilled() {
      let keys = ['price', 'currency', 'proof_id']
      return Object.keys(this.addPriceSingleForm).filter(k => keys.includes(k)).every(k => !!this.addPriceSingleForm[k])
    },
    proofFormFilled() {
      let keys = ['proof_id']
      return Object.keys(this.addPriceSingleForm).filter(k => keys.includes(k)).every(k => !!this.addPriceSingleForm[k])
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
    this.initPriceSingleForm()
  },
  methods: {
    fieldRequired(v) {
      return !!v
    },
    initPriceSingleForm() {
      /**
       * init product mode, currency & last location
       */
      this.productMode = this.appStore.user.last_product_mode_used
      this.addPriceSingleForm.currency = this.appStore.user.last_currency_used
      if (this.recentLocations.length) {
        this.setLocationData(this.recentLocations[0])
      }
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
      console.log(this.addPriceSingleForm.origins_tags)
      if ((typeof this.addPriceSingleForm.origins_tags === 'string') && (this.addPriceSingleForm.origins_tags.length)) {
        this.addPriceSingleForm.origins_tags = [this.addPriceSingleForm.origins_tags]
      } else {
        this.addPriceSingleForm.origins_tags = null
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
        .getProductByCode(code)
        .then((data) => {
          this.product = data.id ? data : {'code': code}
        })
        .catch((error) => {
          alert("Error: Open Prices server error")
        })
    },
    showLocationSelector() {
      this.locationSelector = true
    },
    closeLocationSelector(event) {
      this.locationSelector = false
    },
    getNominatimLocationTitle(location, withName=true, withRoad=false, withCity=true) {
      return utils.getLocationTitle(location, withName, withRoad, withCity)
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
      this.addPriceSingleForm.origins_tags = ''
      this.addPriceSingleForm.labels_tags = []
      this.product = null
    }
  }
}
</script>
