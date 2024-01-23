<template>
  <h1 class="mb-1">{{ $t('AddPriceMultiple.Title') }}</h1>

  <v-row>
    <!-- Step 1: proof -->
    <v-col cols="12" md="6" lg="4">
      <v-card
        :title="$t('AddPriceMultiple.ProofDetails.Title')"
        :prepend-icon="(proofType === 'RECEIPT') ? 'mdi-receipt-text-outline' : 'mdi-library-shelves'"
        height="100%"
        :style="proofFormFilled ? 'border: 1px solid #4CAF50' : 'border: 1px solid transparent'">
        <template v-slot:append v-if="proofFormFilled">
          <v-icon icon="mdi-checkbox-marked-circle" color="success"></v-icon>
        </template>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col>
              <v-btn class="mb-2 mr-2" size="small" prepend-icon="mdi-camera" @click.prevent="$refs.proofCamera.click()" :loading="createProofLoading" :disabled="createProofLoading">{{ $t('AddPriceSingle.PriceDetails.TakePicture') }}</v-btn>
              <a href="#" @click.prevent="$refs.proofGallery.click()">{{ $t('AddPriceSingle.PriceDetails.SelectFromGallery') }}</a>
              <v-file-input
                class="d-none overflow-hidden"
                ref="proofCamera"
                v-model="proofImage"
                capture="environment"
                accept="image/*"
                @change="uploadProof"
                @click:clear="clearProof"
                :loading="createProofLoading">
              </v-file-input>
              <v-file-input
                class="d-none overflow-hidden"
                ref="proofGallery"
                v-model="proofImage"
                accept="image/*, .heic"
                @change="uploadProof"
                @click:clear="clearProof"
                :loading="createProofLoading">
              </v-file-input>
              <p v-if="proofFormFilled && !createProofLoading" class="text-green mt-2 mb-2">
                <i>{{ $t('AddPriceSingle.PriceDetails.ProofUploaded') }}</i>
              </p>
              <p v-if="!proofFormFilled && !createProofLoading" class="text-red mt-2 mb-2">
                <i>{{ $t('AddPriceSingle.PriceDetails.UploadProof') }}</i>
              </p>
            </v-col>
            <v-col v-if="proofFormFilled">
              <v-img :src="proofImagePreview" style="max-height:200px"></v-img>
            </v-col>
          </v-row>
        </v-card-text>
        <v-overlay v-model="disableProofLocationDateForm" scrim="#E8F5E9" contained persistent></v-overlay>
      </v-card>
    </v-col>

    <!-- Step 2: location & date -->
    <v-col cols="12" md="6" lg="4">
      <v-card
        :title="$t('AddPriceSingle.WhereWhen.Title')"
        prepend-icon="mdi-map-marker-outline"
        height="100%"
        :style="locationDateFormFilled ? 'border: 1px solid #4CAF50' : 'border: 1px solid transparent'">
        <template v-slot:append v-if="locationDateFormFilled">
          <v-icon icon="mdi-checkbox-marked-circle" color="success"></v-icon>
        </template>
        <v-divider></v-divider>
        <v-card-text>
          <h3 class="mb-1">{{ $t('AddPriceSingle.WhereWhen.Location') }}</h3>
          <v-chip
            class="mb-2"
            :style="isSelectedLocation(location) ? 'border: 1px solid #4CAF50' : 'border: 1px solid transparent'"
            v-for="location in recentLocations"
            @click="setLocationData(location)">
            <v-icon start :icon="isSelectedLocation(location) ? 'mdi-check-circle-outline' : 'mdi-history'" :color="isSelectedLocation(location) ? 'green' : ''"></v-icon>
            {{ getNominatimLocationTitle(location, true, true, true) }}
          </v-chip>
          <br v-if="recentLocations.length" />
          <v-btn class="mb-2" size="small" prepend-icon="mdi-magnify" @click="showLocationSelector">{{ $t('AddPriceSingle.WhereWhen.Find') }}</v-btn>
          <p v-if="!locationFormFilled" class="text-red mb-2"><i>{{ $t('AddPriceSingle.WhereWhen.SelectLocation') }}</i></p>

          <h3 class="mt-4 mb-1">{{ $t('AddPriceSingle.WhereWhen.Date') }}</h3>
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="addPriceMultipleForm.date"
                :label="$t('AddPriceSingle.WhereWhen.DateLabel')"
                type="date"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-overlay v-model="disableProofLocationDateForm" scrim="#E8F5E9" contained persistent></v-overlay>
      </v-card>
    </v-col>

    <!-- Step 3a: product prices already uploaded -->
    <v-col v-if="productPriceUploadedList.length" cols="12" md="6" lg="4">
      <v-card
        :title="$t('AddPriceMultiple.ProductPriceDetails.AlreadyUploaded')"
        prepend-icon="mdi-tag-check-outline"
        height="100%"
        style="border: 1px solid #4CAF50">
        <template v-slot:append>
          <v-icon icon="mdi-checkbox-marked-circle" color="success"></v-icon>
        </template>
        <v-divider></v-divider>
        <v-card-text>
          <v-row>
            <v-col v-for="(productPriceUploaded, index) in productPriceUploadedList" cols="12" :key="productPriceUploaded">
              <PriceCard :price="productPriceUploaded" :product="productPriceUploaded.product" :hidePriceDate="true" :hidePriceFooter="true" :readonly="true"></PriceCard>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>

    <!-- Step 3b: new product price form -->
    <v-col v-if="Object.keys(productPriceForm).length" cols="12" md="6" lg="4">
      <v-card
        :title="$t('AddPriceMultiple.ProductPriceDetails.NewPrice')"
        prepend-icon="mdi-tag-outline"
        append-icon="mdi-delete"
        height="100%"
        style="border: 1px solid transparent">
        <template v-slot:append>
          <v-icon icon="mdi-delete" @click="clearProductPriceForm"></v-icon>
        </template>
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
            <v-btn class="mb-2 mr-2" size="small" prepend-icon="mdi-barcode-scan" @click="showBarcodeScanner">{{ $t('AddPriceSingle.ProductInfo.ScanBarcode') }}</v-btn>
            <a href="#" @click.prevent="showBarcodeManualInput">{{ $t('AddPriceSingle.ProductInfo.TypeBarcode') }}</a>
            <v-text-field
              v-if="dev"
              :prepend-inner-icon="productBarcodeFormFilled ? 'mdi-barcode' : 'mdi-barcode-scan'"
              v-model="productPriceForm.product_code"
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
                  v-model="productPriceForm.category_tag"
                  :label="$t('AddPriceSingle.ProductInfo.CategoryLabel')"
                  :items="categoryTags"
                  :item-title="item => item.name"
                  :item-value="item => item.id"
                  hide-details="auto"
                ></v-autocomplete>
              </v-col>
              <v-col cols="6">
                <v-autocomplete
                  v-model="productPriceForm.origins_tags"
                  :label="$t('AddPriceSingle.ProductInfo.OriginLabel')"
                  :items="originsTags"
                  :item-title="item => item.name"
                  :item-value="item => item.id"
                  hide-details="auto"
                ></v-autocomplete>
              </v-col>
            </v-row>
            <div class="d-inline">
              <v-checkbox
                v-for="lt in labelsTags"
                v-model="productPriceForm.labels_tags"
                :label="lt.name"
                :value="lt.id"
                hide-details="auto"
              ></v-checkbox>
            </div>
          </v-sheet>
          <p v-if="!productFormFilled" class="text-red mt-2 mb-2">
            <i>{{ $t('AddPriceSingle.ProductInfo.SetProduct') }}</i>
          </p>
          <h3 class="mb-1">
            <i18n-t keypath="AddPriceSingle.PriceDetails.Text" tag="span">
              <template #perKg>
                <span v-if="productMode === 'category'">{{ $t('AddPriceSingle.PriceDetails.TextPerKg') }}</span>
              </template>
            </i18n-t>
          </h3>
          <v-row>
            <v-col :cols="priceDiscounted ? '6' : '12'" sm="6">
              <v-text-field
                v-model="productPriceForm.price"
                :label="priceDiscounted ? $t('AddPriceSingle.PriceDetails.LabelDiscounted') : $t('AddPriceSingle.PriceDetails.Label')"
                type="number"
                hide-details="auto"
                :suffix="productPriceForm.currency"
              ></v-text-field>
            </v-col>
            <v-col v-if="priceDiscounted" cols="6">
              <v-text-field
                v-model="productPriceForm.price_without_discount"
                :label="$t('AddPriceSingle.PriceDetails.LabelFull')"
                type="number"
                hide-details="auto"
                :suffix="productPriceForm.currency"
              ></v-text-field>
            </v-col>
          </v-row>
          <div class="d-inline">
            <v-checkbox v-model="priceDiscounted" :label="$t('AddPriceSingle.PriceDetails.Discount')" hide-details="auto"></v-checkbox>
          </div>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-text>
          <v-btn
            color="success"
            :loading="createPriceLoading"
            :disabled="!productPriceFormFilled"
            @click="createPrice"
          >{{ $t('AddPriceMultiple.ProductPriceDetails.Upload') }}</v-btn>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <v-btn
        v-if="!Object.keys(productPriceForm).length"
        class="mr-2"
        prepend-icon="mdi-plus"
        color="primary"
        :loading="createPriceLoading"
        :disabled="!proofLocationFormFilled || !productFormFilled"
        @click="initNewProductPriceForm"
      >{{ $t('AddPriceMultiple.ProductPriceDetails.Add') }}</v-btn>
      <v-btn
        class="float-right"
        type="submit"
        :loading="createPriceLoading"
        :disabled="!formFilled"
        @click="done"
      >{{ $t('AddPriceMultiple.Done') }}</v-btn>
    </v-col>
  </v-row>

  <v-snackbar
    v-model="proofSuccessMessage"
    color="success"
    :timeout="2000"
  >{{ $t('AddPriceSingle.PriceDetails.ProofUploaded') }}</v-snackbar>

  <v-snackbar
    v-model="priceSuccessMessage"
    color="success"
    :timeout="2000"
  >{{ $t('AddPriceMultiple.ProductPriceDetails.PriceUploaded') }}</v-snackbar>

  <LocationSelector
    v-if="locationSelector"
    v-model="locationSelector"
    @location="setLocationData($event)"
    @close="closeLocationSelector($event)"
  ></LocationSelector>

  <BarcodeScanner
    v-if="barcodeScanner"
    v-model="barcodeScanner"
    @barcode="setProductCode($event)"
    @close="barcodeScanner = false"
  ></BarcodeScanner>

  <BarcodeManualInput
    v-if="barcodeManualInput"
    v-model="barcodeManualInput"
    @barcode="setProductCode($event)"
    @close="barcodeManualInput = false"
  ></BarcodeManualInput>
</template>

<script>
import Compressor from 'compressorjs'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import api from '../services/api'
import utils from '../utils.js'
import LocationSelector from '../components/LocationSelector.vue'
import PriceCard from '../components/PriceCard.vue'
import ProductCard from '../components/ProductCard.vue'
import BarcodeScanner from '../components/BarcodeScanner.vue'
import BarcodeManualInput from '../components/BarcodeManualInput.vue'
import CategoryTags from '../data/category-tags.json'
import OriginsTags from '../data/origins-tags.json'
import LabelsTags from '../data/labels-tags.json'

Compressor.setDefaults({
  checkOrientation: true,  // default
  retainExif: true,
  mimeType: 'image/webp'
})

export default {
  components: {
    LocationSelector,
    PriceCard,
    ProductCard,
    BarcodeScanner,
    BarcodeManualInput,
  },
  data() {
    return {
      dev: import.meta.env.DEV,
      proofType: null,  // 'PRICE_TAG' or 'RECEIPT'
      // price form
      addPriceMultipleForm: {
        proof_id: null,
        location_osm_id: null,
        location_osm_type: '',
        date: utils.currentDate(),
      },
      productPriceForm: {},
      createPriceLoading: false,
      priceSuccessMessage: false,
      // proof data
      proofImage: null,
      proofImagePreview: null,
      createProofLoading: false,
      proofSuccessMessage: false,
      // location data
      locationSelector: false,
      locationSelectedDisplayName: '',
      // product price data
      productPriceUploadedList: [],
      productPriceNew: {
        product_code: '',
        category_tag: null,
        origins_tags: '',
        labels_tags: [],
        price: null,
        price_without_discount: null,
        currency: null,  // see initPriceMultipleForm
        uploaded: false
      },
      product: null,
      productModeList: [
        {key: 'barcode', value: this.$t('AddPriceSingle.ProductModeList.Barcode'), icon: 'mdi-barcode-scan'},
        {key: 'category', value: this.$t('AddPriceSingle.ProductModeList.Category'), icon: 'mdi-basket-outline'}
      ],
      productMode: null,
      categoryTags: CategoryTags,  // list of category tags for autocomplete
      originsTags: OriginsTags,  // list of origins tags for autocomplete
      labelsTags: LabelsTags,
      barcodeScanner: false,
      barcodeManualInput: false,
      priceDiscounted: false,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    proofFormFilled() {
      let keys = ['proof_id']
      return Object.keys(this.addPriceMultipleForm).filter(k => keys.includes(k)).every(k => !!this.addPriceMultipleForm[k])
    },
    recentLocations() {
      return this.appStore.getRecentLocations(3)
    },
    locationFormFilled() {
      let keys = ['location_osm_id', 'location_osm_type']
      return Object.keys(this.addPriceMultipleForm).filter(k => keys.includes(k)).every(k => !!this.addPriceMultipleForm[k])
    },
    locationDateFormFilled() {
      let keys = ['location_osm_id', 'location_osm_type', 'date']
      return Object.keys(this.addPriceMultipleForm).filter(k => keys.includes(k)).every(k => !!this.addPriceMultipleForm[k])
    },
    proofLocationFormFilled() {
      return this.proofFormFilled && this.locationDateFormFilled
    },
    productBarcodeFormFilled() {
      let keys = ['product_code']
      return Object.keys(this.productPriceForm).filter(k => keys.includes(k)).every(k => !!this.productPriceForm[k])
    },
    productCategoryFormFilled() {
      let keys = ['category_tag', 'origins_tags']
      return Object.keys(this.productPriceForm).filter(k => keys.includes(k)).every(k => !!this.productPriceForm[k])
    },
    productFormFilled() {
      return this.productBarcodeFormFilled || this.productCategoryFormFilled
    },
    priceFormFilled() {
      let keys = ['price', 'currency']
      if (!this.priceDiscounted) {
        return Object.keys(this.productPriceForm).filter(k => keys.includes(k)).every(k => !!this.productPriceForm[k])
      } else {
        keys.push('price_without_discount')
        return Object.keys(this.productPriceForm).filter(k => keys.includes(k)).every(k => !!this.productPriceForm[k])
      }
    },
    productPriceFormFilled() {
      return this.productFormFilled && this.priceFormFilled
    },
    formFilled() {
      return this.proofLocationFormFilled && !!this.productPriceUploadedList.length && !Object.keys(this.productPriceForm).length
    },
    disableProofLocationDateForm() {
      return this.proofLocationFormFilled && !!this.productPriceUploadedList.length
    }
  },
  mounted() {
    this.initPriceMultipleForm()
    this.proofType = this.$route.path.endsWith('/receipt') ? 'RECEIPT' : 'PRICE_TAG'
  },
  methods: {
    initPriceMultipleForm() {
      if (this.recentLocations.length) {
        this.setLocationData(this.recentLocations[0])
      }
    },
    addPriceToUploadedList(price) {
      this.productPriceUploadedList.push(price)
    },
    clearProof() {
      this.proofImage = null
      this.proofImagePreview = null
      this.addPriceMultipleForm.proof_id = null
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
          .createProof(proofImageCompressed, this.proofType)
          .then((data) => {
            this.createProofLoading = false
            if (data['id']) {
              this.addPriceMultipleForm.proof_id = data['id']
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
      this.addPriceMultipleForm.location_osm_id = location.osm_id
      this.addPriceMultipleForm.location_osm_type = location.osm_type.toUpperCase()
    },
    isSelectedLocation(location) {
      return this.locationSelectedDisplayName && this.locationSelectedDisplayName === location.display_name
    },
    showBarcodeScanner() {
      this.barcodeScanner = true
    },
    showBarcodeManualInput() {
      this.barcodeManualInput = true
    },
    setProductCode(code) {
      this.productPriceForm.product_code = code
      this.product = null
      api
        .getProductByCode(code)
        .then((data) => {
          this.product = data.id ? data : {'code': code}
          console.log(this.product)
        })
        .catch((error) => {
          alert("Error: Open Prices server error")
        })
    },
    clearProductPriceForm() {
      this.productPriceForm = {}
      this.product = null
      this.priceDiscounted = false
      this.priceSuccessMessage = false
    },
    initNewProductPriceForm() {
      this.clearProductPriceForm()
      this.productPriceForm = JSON.parse(JSON.stringify(this.productPriceNew))
      this.productPriceForm.currency = this.appStore.user.last_currency_used
      this.productMode = this.appStore.user.last_product_mode_used
    },
    createPrice() {
      this.createPriceLoading = true
      // cleanup form
      if (!this.productPriceForm.product_code) {
        this.productPriceForm.product_code = null
      }
      if ((typeof this.productPriceForm.origins_tags === 'string') && (this.productPriceForm.origins_tags.length)) {
        this.productPriceForm.origins_tags = [this.productPriceForm.origins_tags]
      } else {
        this.productPriceForm.origins_tags = null
      }
      if (this.productPriceForm.labels_tags.length == 0) {
        this.productPriceForm.labels_tags = null
      }
      if (!this.priceDiscounted) {
        this.productPriceForm.price_without_discount = null
      }
      // create price
      api
        .createPrice(Object.assign({}, this.addPriceMultipleForm, this.productPriceForm))
        .then((data) => {
          if (data['detail']) {
            alert(`Error: with input ${data['detail'][0]['input']}`)
          } else {
            this.addPriceToUploadedList(Object.assign({}, this.productPriceForm, {product: this.product}))
            this.priceSuccessMessage = true
            // show new price form immediately
            this.initNewProductPriceForm()
          }
          this.createPriceLoading = false
        })
        .catch((error) => {
          alert('Error: server error')
          console.log(error)
          this.createPriceLoading = false
        })
    },
    done() {
      this.$router.push({ path: '/add', query: { multipleSuccess: 'true' } })
    }
  },
  watch: {
    productMode(newProductMode, oldProductMode) {
      // reset product_code and category_tag when switching mode
      if (oldProductMode) {
        this.productPriceForm.product_code = ""
        this.productPriceForm.category_tag = null
        this.productPriceForm.origins_tags = ''
        this.productPriceForm.labels_tags = []
        this.product = null
      }
    }
  }
}
</script>
