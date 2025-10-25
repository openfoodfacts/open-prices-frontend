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
    <v-col cols="12" md="6">
      <v-form @submit.prevent="loadProductInfo">
        <v-card
          class="mb-4"
          :title="$t('Common.BarcodeType')"
          prepend-icon="mdi-tag-plus-outline"
          height="100%"
        >
          <v-divider />
          <v-card-text>
            <div class="text-subtitle-2">
              {{ $t('AddPriceSingle.ProductInfo.ProductBarcode') }}
            </div>
            <v-text-field
              v-model="productForm.product_code"
              density="compact"
              variant="outlined"
              type="text"
              inputmode="decimal"
              persistent-hint
            />
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
                >
                  {{ $t('Common.Select') }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-col>
    <v-col cols="12" md="6">
      <v-card
        class="mb-4"
        :title="$t('CreateOffProduct.ChooseUnknownProductGuide')"
        prepend-icon="mdi-tag-plus-outline"
        height="100%"
      >
        <v-divider />
        <v-card-text>
          <v-row class="mt-0">
            <v-col v-for="missingProduct in missingProductsWithPrices" :key="missingProduct" cols="12" sm="6">
              <ProductCard :product="missingProduct" elevation="1" height="100%" readonly @click="missingProductClicked(missingProduct)" />
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider />
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
            <v-alert v-if="productExists" type="info" variant="outlined" density="compact">
              {{ $t('CreateOffProduct.ProductAlreadyExists') }}
            </v-alert>
            <div class="text-subtitle-2">
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
            <div class="text-subtitle-2">
              {{ $t('CreateOffProduct.Flavor') }}
            </div>
            <v-select
              v-model="productForm.flavor"
              :items="flavors"
              :disabled="productExists"
              density="compact"
              variant="outlined"
              :rules="[fieldRequired]"
              required
            />
            <div class="text-subtitle-2">
              {{ $t('CreateOffProduct.ProductLanguage') }}
            </div>
            <v-autocomplete
              v-model="productForm.product_language"
              :items="Languages"
              item-title="native"
              item-value="code"
              density="compact"
              variant="outlined"
            />

            <div class="text-subtitle-2">
              {{ $t('Common.ProductName') }}
            </div>
            <v-text-field
              v-model="productForm.product_name"
              density="compact"
              variant="outlined"
              type="text"
              inputmode="decimal"
            />
            <div class="text-subtitle-2">
              {{ $t('Common.Quantity') }}
            </div>
            <v-text-field
              v-model="productForm.quantity"
              density="compact"
              variant="outlined"
              type="text"
              inputmode="decimal"
            />
            <div v-if="!productExists">
              <div class="text-subtitle-2">
                {{ $t('CreateOffProduct.CountriesWhereSold') }}
              </div>
              <v-autocomplete
                v-model="productForm.countries"
                density="compact"
                :items="Countries"
                item-title="native"
                item-value="code"
                variant="outlined"
                chips
                clearable
                closable-chips
                multiple
              />
              <div class="text-subtitle-2">
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
            <div class="text-subtitle-2">
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
              <div class="text-subtitle-2">
                {{ $t('Common.Image') }}
              </div>
              <v-img v-if="drawnImageSrc" :src="drawnImageSrc" max-height="200px" />
              <v-alert v-else class="mb-2" type="info" variant="outlined" density="compact">
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
            <v-col>
              <v-btn
                color="primary"
                variant="flat"
                type="submit"
                :disabled="shownProofIndex === 0"
                @click="previousProof()"
              >
                {{ $t('CreateOffProduct.PreviousProof') }}
              </v-btn>
            </v-col>
            <v-col>
              <v-switch
                v-model="imageEditMode"
                density="compact"
                color="success"
                :label="$t('CreateOffProduct.EnableCropMode')"
                :true-value="true"
                hide-details="auto"
              />
            </v-col>
            <v-col>
              <v-btn
                color="primary"
                variant="flat"
                type="submit"
                :disabled="shownProofIndex === priceList.length - 1"
                @click="nextProof()"
              >
                {{ $t('CreateOffProduct.NextProof') }}
              </v-btn>
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
import api from '../services/api'
import constants from '../constants'
import proof_utils from '../utils/proof.js'
import utils from '../utils'
import Languages from '../i18n/data/languages.json'
import Countries from '../i18n/data/countries.json'
import "vue-zoomable/dist/style.css"

export default {
  components: {
    ContributionAssistantDrawCanvas: defineAsyncComponent(() => import('../components/ContributionAssistantDrawCanvas.vue')),
    ProductCard: defineAsyncComponent(() => import('../components/ProductCard.vue')),
    VueZoomable: defineAsyncComponent(() => import('vue-zoomable')),
  },
  data() {
    return {
      step: 1,
      missingProductsWithPrices: [],
      product: null,
      productForm: {},
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
      Languages,
      Countries
    }
  },
  computed: {
    ...mapStores(useAppStore),
    stepItemList() {
      return [
        {
          title: this.$t('CreateOffProduct.ChooseUnknownProduct'),
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
    flavors() {
      return constants.PRODUCT_SOURCE_LIST.map(source => source.value)
    }
  },
  watch: {
    '$route.query.product_code'(newVal) {
      if (!newVal) {
        this.getMissingProductsWithPrices()
        this.step = 1
      }
    }
  },
  mounted() {
    if (this.$route.query.flavor) {
      this.productForm.flavor = constants.PRODUCT_SOURCE_LIST.find(source => source.key === this.$route.query.flavor).value
    }
    if (this.$route.query.product_code) {
      this.productForm.product_code = this.$route.query.product_code
      this.loadProductInfo()
    }
    this.getMissingProductsWithPrices()
  },
  methods: {
    fieldRequired(v) {
      return !!v || this.$t('Common.FieldIsRequired')
    },
    loadProductInfo() {
      this.$router.push({query: {product_code: this.productForm.product_code}})
      this.step = 2
      this.getProduct((product) => {
        if (product.source) {
          this.productExists = true
        } else {
          this.productExists = false
        }
        this.getPrices(product)
      })
      this.getChallenges()
    },
    getProduct(callback) {
      return api.getProductByCode(this.productForm.product_code)
        .then((product) => {
          this.product = product
          if(callback) callback(product)
        })
    },
    getPrices(product) {
      return api.getPrices({product_code: this.productForm.product_code, order_by: constants.PRICE_ORDER_LIST[2].key })
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
              categories: [],
            }
          }
          if (this.productExists) {
            this.productForm.flavor = constants.PRODUCT_SOURCE_LIST.find(source => source.key === product.source).value
            this.productForm.product_name = product.product_name
            this.productForm.quantity = product.product_quantity + product.product_quantity_unit
            this.productForm.categories = product.categories_tags
            this.productForm.stores = null
            this.productForm.countries= null
          }
        })
    },
    getChallenges() {
      return api.getChallenges({ order_by: '-created' })
        .then((data) => {
          const challenges = data.items
          const challengeCategories = challenges.map(challenge => challenge.categories) // Array of arrays
          this.suggestedCategories = Array.from(new Set(challengeCategories.flat())) // unique categories
        })
    },
    getMissingProductsWithPrices() {
      return api.getProducts({ price_count__gte: 1, source__isnull: true, order_by: '-proof_count' })
        .then((data) => {
          this.missingProductsWithPrices = data.items
        })
    },
    missingProductClicked(product) {
      this.productForm.product_code = product.code
      this.loadProductInfo()
    },
    createProduct() {
      if (!this.productForm.flavor) {
        return
      }
      const flavorkey = constants.PRODUCT_SOURCE_LIST.find(source => source.value === this.productForm.flavor).key
      let inputData = {
        update_params: {
          ...this.productForm,
          categories: this.productForm.categories.join(','),
          stores: this.productForm.stores.join(','),
          countries: this.productForm.countries.map(c=>c.toLowerCase()).join(','),
        },
        flavor: flavorkey,
        product_language_code: this.productForm.product_language
      }
      this.step = 3
      this.loading = true
      api
        .updateOffProduct(this.productForm.product_code, inputData)
        .then(() => {
          if (this.drawnImageSrc) {
            const drawnImageBase64 = this.drawnImageSrc.split(';base64,')[1]
            inputData = {
              image_data_base64: drawnImageBase64,
              flavor: flavorkey,
              product_language_code: this.productForm.product_language
            }
            api.updateOffProductImage(this.productForm.product_code, inputData)
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
      api.getPriceTags({price_id: priceId}).then(data => {
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
  }
}
</script>
