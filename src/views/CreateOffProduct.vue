<template>
  <v-row>
    <v-col cols="12">
      <v-stepper v-model="step" hide-actions editable>
        <v-stepper-header>
          <v-stepper-item :title="stepItemList[0].title" :value="stepItemList[0].value" :complete="step > 1" />
          <v-divider />
          <v-stepper-item :title="stepItemList[1].title" :value="stepItemList[1].value" :complete="step > 2" :disabled="step < 2" />
          <v-divider />
          <v-stepper-item :title="stepItemList[2].title" :value="stepItemList[2].value" :complete="step > 3" :disabled="step < 3" />
        </v-stepper-header>
      </v-stepper>
    </v-col>
  </v-row>

  <v-row v-if="step === 1">
    <v-col cols="12">
      <v-form @submit.prevent="onProductCodeSelected">
        <v-card
          :title="$t('Common.BarcodeType')"
          prepend-icon="mdi-tag-plus-outline"
          height="100%"
        >
          <v-divider />
          <v-card-text>
            <v-text-field
              v-model="productForm.product_code"
              :label="$t('AddPriceSingle.ProductInfo.ProductBarcode')"
              type="text"
              inputmode="numeric"
              persistent-hint
              @update:modelValue="newValue => productForm.product_code = numericOnly(newValue)"
            >
              <template #append-inner>
                <v-btn color="primary" icon="mdi-plus" :disabled="!productForm.product_code" @click="onProductCodeSelected" />
              </template>
            </v-text-field>
          </v-card-text>
        </v-card>
      </v-form>
    </v-col>
    <v-col cols="12">
      <v-card
        :title="$t('CreateOffProduct.SelectUnknownProductGuide')"
        prepend-icon="mdi-tag-plus-outline"
        height="100%"
      >
        <v-divider />
        <v-card-text>
          <v-row>
            <v-col class="pt-0 pb-0">
              <v-chip label variant="text" prepend-icon="mdi-database-outline">
                {{ $t('Common.ProductCount', { count: productTotal }) }}
              </v-chip>
              <FilterMenu kind="productCreate" :currentFilterList="currentFilterList" @update:currentFilterList="updateFilterList($event)" />
              <OrderMenu v-if="!currentFilterList.includes('price__owner')" kind="productCreate" :currentOrder="currentOrder" @update:currentOrder="updateOrder($event)" />
            </v-col>
          </v-row>
          <v-row>
            <v-col v-for="missingProduct in missingProductsWithPrices" :key="missingProduct" cols="12" sm="6">
              <ProductCard :product="missingProduct" elevation="1" height="100%" readonly @click="missingProductClicked(missingProduct)" />
            </v-col>
          </v-row>
          <v-row v-if="loading">
            <v-col align="center">
              <v-progress-circular indeterminate :size="30" />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>

  <v-row v-if="step === 2">
    <v-col cols="12" md="6">
      <v-form @submit.prevent="createProduct">
        <v-card
          class="mb-4"
          :title="$t('AddPriceSingle.ProductInfo.Title')"
          prepend-icon="mdi-database-plus-outline"
          height="100%"
        >
          <v-divider />
          <v-card-text>
            <v-alert v-if="productExists" type="warning" variant="outlined" density="compact">
              {{ $t('CreateOffProduct.ProductAlreadyExists') }}
            </v-alert>
            <div class="text-body-2">
              {{ $t('Common.Barcode') }}
            </div>
            <v-text-field
              v-model="productForm.product_code"
              disabled
              density="compact"
              variant="outlined"
              type="text"
              inputmode="decimal"
            />
            <div class="text-body-2">
              {{ $t('CreateOffProduct.Flavor') }}
            </div>
            <v-select
              v-model="productForm.flavor"
              :items="flavorList"
              :item-title="item => item.value"
              :item-value="item => item.key"
              :disabled="productExists"
              density="compact"
              variant="outlined"
              :rules="[fieldRequired]"
              required
            />
            <div class="text-body-2">
              {{ $t('CreateOffProduct.ProductLanguage') }}
            </div>
            <v-autocomplete
              v-model="productForm.product_language"
              :items="languageList"
              item-title="native"
              item-value="code"
              density="compact"
              variant="outlined"
            />

            <div class="text-body-2">
              {{ $t('Common.ProductName') }}
            </div>
            <v-text-field
              v-model="productForm.product_name"
              density="compact"
              variant="outlined"
              type="text"
            />
            <div class="text-body-2">
              {{ $t('Common.Brands') }}
            </div>
            <v-combobox
              v-model="productForm.brands"
              density="compact"
              :items="[]"
              variant="outlined"
              chips
              clearable
              closable-chips
              multiple
            >
              <template #chip="{ props, item }">
                <v-chip v-bind="props">
                  <strong>{{ item.raw }}</strong>
                </v-chip>
              </template>
            </v-combobox>
            <div class="text-body-2">
              {{ $t('Common.Quantity') }}
            </div>
            <v-text-field
              v-model="productForm.quantity"
              density="compact"
              variant="outlined"
              type="text"
            />
            <div v-if="!productExists">
              <div class="text-body-2">
                {{ $t('CreateOffProduct.CountriesWhereSold') }}
              </div>
              <v-autocomplete
                v-model="productForm.countries"
                density="compact"
                :items="countryTags"
                item-title="name"
                item-value="country_code_2"
                variant="outlined"
                chips
                clearable
                closable-chips
                multiple
              />
              <div class="text-body-2">
                {{ $t('CreateOffProduct.StoresWhereSold') }}
              </div>
              <v-combobox
                v-model="productForm.stores"
                density="compact"
                :items="[]"
                variant="outlined"
                chips
                clearable
                closable-chips
                multiple
              >
                <template #chip="{ props, item }">
                  <v-chip v-bind="props">
                    <strong>{{ item.raw }}</strong>
                  </v-chip>
                </template>
              </v-combobox>
            </div>
            <div class="text-body-2">
              {{ $t('Common.Categories') }}
            </div>
            <v-combobox
              v-model="productForm.categories"
              :items="suggestedCategories"
              density="compact"
              variant="outlined"
              chips
              clearable
              closable-chips
              multiple
            >
              <template #chip="{ props, item }">
                <v-chip v-bind="props">
                  <strong>{{ item.raw }}</strong>
                </v-chip>
              </template>
            </v-combobox>

            <div v-if="!productExists">
              <div class="text-body-2">
                {{ $t('Common.Image') }}
              </div>
              <v-img v-if="drawnImageSrc" :src="drawnImageSrc" max-height="200px" />
              <v-alert v-else class="mb-2" color="primary" variant="outlined" density="compact" icon="mdi-information">
                {{ $t('CreateOffProduct.UseCropModeToAddImage') }}
              </v-alert>
            </div>
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-row>
              <v-col>
                <v-btn
                  class="float-right"
                  color="primary"
                  variant="flat"
                  type="submit"
                  :disabled="!productForm.flavor"
                >
                  {{ $t('CreateOffProduct.CreateProduct') }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-col>
    <v-col v-if="priceList.length" cols="12" md="6">
      <v-card
        class="mb-4"
        :title="$t('CreateOffProduct.ProofNumberOfOutProofs', {numberOfOutProofs: shownProofIndex + 1, totalNumberOfProofs: priceList.length})"
        prepend-icon="mdi-image"
        height="100%"
      >
        <v-divider />
        <v-card-text>
          <VueZoomable v-if="proofImageSrc" v-model:zoom="zoomLevel" v-model:pan="panLevel" :maxZoom="10" :panEnabled="!imageEditMode" selector="#content">
            <div id="content" style="width: 100%;">
              <ContributionAssistantDrawCanvas ref="ContributionAssistantDrawCanvas" :imageSrc="proofImageSrc" :boundingBoxesFromServer="boundingBoxesFromServer" :preventDrawing="!imageEditMode" @extractedLabels="onProductImageDraw($event)" />
            </div>
          </VueZoomable>
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-row>
            <v-col cols="6">
              <v-btn
                color="primary"
                variant="flat"
                type="submit"
                :disabled="shownProofIndex === 0"
                block
                @click="previousProof()"
              >
                {{ $t('CreateOffProduct.PreviousProof') }}
              </v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn
                color="primary"
                variant="flat"
                type="submit"
                :disabled="shownProofIndex === priceList.length - 1"
                block
                @click="nextProof()"
              >
                {{ $t('CreateOffProduct.NextProof') }}
              </v-btn>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
              <v-switch
                v-model="imageEditMode"
                density="compact"
                color="success"
                :label="$t('CreateOffProduct.EnableCropMode')"
                :true-value="true"
                hide-details="auto"
              />
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>

  <v-row v-if="step === 3">
    <v-col cols="12" md="12">
      <v-card
        class="mb-4"
        :title="$t('Common.Done')"
        prepend-icon="mdi-check-circle-outline"
        height="100%"
      >
        <v-divider />
        <v-card-text>
          <v-progress-circular
            v-if="loading"
            color="primary"
            size="small"
            indeterminate
          />
          <v-row v-if="!loading">
            <v-col cols="12" sm="6" lg="4">
              <ProductCard :product="product" />
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-row>
            <v-col>
              <v-btn
                color="primary"
                variant="flat"
                @click="reloadPage"
              >
                {{ $t('CreateOffProduct.CreateNewProduct') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import openPricesApi from '../services/openPricesApi'
import languageList from '../i18n/data/languages.json'
import constants from '../constants'
import proof_utils from '../utils/proof.js'
import utils from '../utils'
import data_utils from '../utils/data.js'
import "vue-zoomable/dist/style.css"

export default {
  components: {
    ContributionAssistantDrawCanvas: defineAsyncComponent(() => import('../components/ContributionAssistantDrawCanvas.vue')),
    ProductCard: defineAsyncComponent(() => import('../components/ProductCard.vue')),
    VueZoomable: defineAsyncComponent(() => import('vue-zoomable')),
    FilterMenu: defineAsyncComponent(() => import('../components/FilterMenu.vue')),
    OrderMenu: defineAsyncComponent(() => import('../components/OrderMenu.vue')),
  },
  data() {
    return {
      step: 1,
      // product missing list
      missingProductsWithPrices: [],
      currentFilterList: [],
      currentOrder: constants.PRODUCT_CREATE_ORDER_LIST[0].key,  // -created
      productTotal: 0,
      // product missing form
      product: null,
      productForm: {},
      flavorList: constants.PRODUCT_SOURCE_LIST,
      languageList,
      countryTags: [],  // list of country tags for autocomplete  // see mounted
      priceList: [],
      shownProofIndex: 0,
      shownProof: null,
      boundingBoxesFromServer: null,
      proofImageSrc: null,
      suggestedCategories: [],
      drawnImageSrc: null,
      imageEditMode: false,
      productExists: false,
      zoomLevel: 1,
      loading: false,
      panLevel: {x: 0, y: 0},
    }
  },
  computed: {
    ...mapStores(useAppStore),
    stepItemList() {
      return [
        {
          title: this.$t('CreateOffProduct.SelectUnknownProduct'),
          value: 1
        },
        {
          title: this.$t('AddPriceSingle.ProductInfo.Title'),
          value: 2
        },
        {
          title: this.$t('Common.Done'),
          value: 3
        },
      ]
    },
    getPricesParams() {
      let defaultParams = { product__source__isnull: true, product_id__isnull: false, proof__type: constants.PROOF_TYPE_PRICE_TAG, order_by: '-created' }
      if (this.currentFilterList.includes('price__owner')) {
        defaultParams['owner'] = this.appStore.user.username
      }
      return defaultParams
    },
  },
  watch: {
    $route (newRoute, oldRoute) { // only called when query changes to avoid having an API call when the path changes
      if (oldRoute.path === newRoute.path && JSON.stringify(oldRoute.query) !== JSON.stringify(newRoute.query)) {
        if (this.step === 1) {
          this.getMissingProductsWithPrices()
        }
      }
    }
  },
  mounted() {
    this.currentFilterList = utils.toArray(this.$route.query[constants.FILTER_PARAM]) || this.currentFilterList
    this.currentOrder = this.$route.query[constants.ORDER_PARAM] || this.currentOrder
    if (this.$route.query.product_code) {
      this.productForm.product_code = this.$route.query.product_code
      this.onProductCodeSelected()
    }
    if (this.$route.query.flavor) {
      this.productForm.flavor = this.$route.query.flavor
    }
    this.getMissingProductsWithPrices()
    this.setCountryTags()
    this.getChallenges()
  },
  methods: {
    numericOnly(value) {
      return utils.numericOnly(value)
    },
    fieldRequired(v) {
      return !!v || this.$t('Common.FieldIsRequired')
    },
    getMissingProductsWithPrices() {
      this.missingProductsWithPrices = []
      this.loading = true
      // Use price API in some cases
      if (this.currentFilterList.includes('price__owner') || this.currentOrder === '-created') {
        // Using prices API lets us do finer filtering, typically limiting to price tags proofs
        return openPricesApi.getPrices(this.getPricesParams)
          .then((data) => {
            const productMap = new Map()
            data.items.forEach(price => {
              if (price.product && !productMap.has(price.product.code)) {
                productMap.set(price.product.code, price.product)
              }
            })
            this.missingProductsWithPrices = Array.from(productMap.values())
            this.productTotal = data.total // Only true if products have only one price, but it's good enough ..
            this.loading = false
          })
      }
      // Default to product API, this.currentOrder is '-proof_count', which is only available in the product API
      // this.productTotal is accurate, but it also includes other, less useful, proof types (receipt, gdpr_request, etc.)
      return openPricesApi.getProducts({ price_count__gte: 1, source__isnull: true, order_by: this.currentOrder })
        .then((data) => {
          this.missingProductsWithPrices = data.items
          this.productTotal = data.total
          this.loading = false
        })
    },
    missingProductClicked(product) {
      this.productForm.product_code = product.code
      this.$router.push({ query: { product_code: this.productForm.product_code } })
      this.onProductCodeSelected()
    },
    onProductCodeSelected() {
      // move to step 2
      this.step = 2
      // init
      this.productForm.flavor = null
      this.drawnImageSrc = null
      // check if product already exists
      // load product prices
      this.getProduct((product) => {
        if (product.source) {
          this.productExists = true
        } else {
          this.productExists = false
        }
        this.getProductPrices(product)
      })
    },
    getProduct(callback) {
      return openPricesApi.getProductByCode(this.productForm.product_code)
        .then((product) => {
          this.product = product
          if(callback) callback(product)
        })
    },
    getProductPrices(product) {
      return openPricesApi.getPrices({product_code: this.productForm.product_code, order_by: constants.PRICE_ORDER_LIST[2].key })
        .then((data) => {
          this.priceList = data.items
          if (this.priceList.length) {
            const stores = Array.from(new Set(this.priceList.map(price => price.location.osm_name)))
            const countries = Array.from(new Set(this.priceList.map(price => price.location.osm_address_country_code.toUpperCase()).flat()))
            const lastPrice = this.priceList[0]
            this.productForm = {
              ...this.productForm,
              product_name: lastPrice.product_name ? utils.toTitleCase(lastPrice.product_name) : null,
              stores: stores,
              countries: countries,
              product_language: lastPrice.location.osm_address_country_code.toLowerCase() || "en",
              quantity: "",
              brands: [],
              categories: [],
            }
            this.setShownProof()
          } else {
            this.productForm = {
              ...this.productForm,
              product_name: null,
              stores: [],
              product_language: "en",
              countries: [],
              quantity: "",
              brands: [],
              categories: [],
            }
          }
          if (this.productExists) {
            this.productForm.flavor = product.source
            this.productForm.product_name = product.product_name
            this.productForm.quantity = product.product_quantity + product.product_quantity_unit
            this.productForm.categories = product.categories_tags
            this.productForm.brands = product.brands_tags
            this.productForm.stores = null
            this.productForm.countries= null
          }
        })
    },
    setCountryTags() {
      data_utils.getLocaleCountryTags(this.appStore.getUserLanguage).then((module) => {
        this.countryTags = module.default.sort((a, b) => a.name.localeCompare(b.name))
      })
    },
    getChallenges() {
      return openPricesApi.getChallenges({ order_by: '-created' })
        .then((data) => {
          const challenges = data.items
          const challengeCategories = challenges.map(challenge => challenge.categories) // Array of arrays
          this.suggestedCategories = Array.from(new Set(challengeCategories.flat())) // unique categories
        })
    },
    createProduct() {
      this.step = 3
      this.loading = true
      // create product
      let inputData = {
        flavor: this.productForm.flavor,
        product_language_code: this.productForm.product_language,
        update_params: {
          ...this.productForm,
          categories: this.productForm.categories.join(','),
          stores: this.productForm.stores.join(','),
          countries: this.productForm.countries.map(c=>c.toLowerCase()).join(','),
        },
      }
      openPricesApi
        .updateOffProduct(this.productForm.product_code, inputData)
        .then(() => {
          if (this.drawnImageSrc) {
            const drawnImageBase64 = this.drawnImageSrc.split(';base64,')[1]
            inputData = {
              image_data_base64: drawnImageBase64,
              flavor: this.productForm.flavor,
              product_language_code: this.productForm.product_language
            }
            openPricesApi.updateOffProductImage(this.productForm.product_code, inputData)
              .then(() => {
                this.loading = false
                this.getProduct()
              })
              .catch((error) => {
                console.log(error)
                this.loading = false
              })
          } else {
            this.loading = false
            this.getProduct()
          }
        })
        .catch((error) => {
          console.log(error)
          this.loading = false
        })
    },
    loadPriceTags(priceId) {
      openPricesApi.getPriceTags({price_id: priceId}).then(data => {
        const priceTags = data.items
        if (priceTags.length) {
          this.boundingBoxesFromServer = [
            {
              boundingBox: priceTags[0].bounding_box, 
              id: priceTags[0].id,
              status: priceTags[0].status
            }
          ]
        }
      })
    },
    onProductImageDraw(extractedLabels) {
      if (!extractedLabels.length) {
        return
      }
      const latestDrawnLabel = extractedLabels[extractedLabels.length - 1]
      if (latestDrawnLabel.id === null) {
        // No id means the label box was just drawn
        this.drawnImageSrc = extractedLabels[extractedLabels.length - 1].imageSrc
        // Remove the box straight away, we don't want it to show as a price tag on the picture
        this.$refs.ContributionAssistantDrawCanvas.removeBoundingBox(extractedLabels.length - 1)
      }
    },
    setShownProof() {
      this.shownProof = this.priceList[this.shownProofIndex].proof
      this.boundingBoxesFromServer = []
      this.proofImageSrc = proof_utils.getImageFullUrl(this.shownProof.file_path)
      this.zoomLevel = 1
      this.panLevel = {x: 0, y: 0}
      this.loadPriceTags(this.priceList[this.shownProofIndex].id)
    },
    previousProof() {
      this.shownProofIndex = Math.max(this.shownProofIndex - 1, 0)
      this.setShownProof()
    },
    nextProof() {
      this.shownProofIndex = Math.min(this.shownProofIndex + 1, this.priceList.length - 1)
      this.setShownProof()
    },
    reloadPage() {
      window.location = window.location.pathname
    },
    updateFilterList(newFilterList) {
      this.currentFilterList = newFilterList
      this.$router.push({ query: { ...this.$route.query, [constants.FILTER_PARAM]: this.currentFilterList } })
      // this.getMissingProductsWithPrices() will be called in watch $route
    },
    updateOrder(orderKey) {
      if (this.currentOrder !== orderKey) {
        this.currentOrder = orderKey
        this.$router.push({ query: { ...this.$route.query, [constants.ORDER_PARAM]: this.currentOrder } })
        // this.getMissingProductsWithPrices() will be called in watch $route
      }
    },
  }
}
</script>
