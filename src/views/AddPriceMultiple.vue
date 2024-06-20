<template>
  <h1 class="text-h5 mb-1">
    {{ $t('AddPriceMultiple.Title') }}
  </h1>

  <v-row>
    <!-- Step 1: proof -->
    <v-col cols="12" md="6" lg="4">
      <v-card
        :title="(proofType === 'RECEIPT') ? $t('AddPriceHome.ReceiptMode.Title') : $t('AddPriceMultiple.ProofDetails.Title')"
        :prepend-icon="(proofType === 'RECEIPT') ? 'mdi-receipt-text-outline' : 'mdi-library-shelves'"
        height="100%"
        :style="proofFormFilled ? 'border: 1px solid #4CAF50' : 'border: 1px solid transparent'"
      >
        <template v-if="proofFormFilled" #append>
          <v-icon icon="mdi-checkbox-marked-circle" color="success" />
        </template>
        <v-divider />
        <v-card-text>
          <ProofInputRow :proofType="proofType" :proofForm="addPriceMultipleForm" />
        </v-card-text>
        <v-overlay v-model="disableProofLocationDateForm" scrim="#E8F5E9" contained persistent />
      </v-card>
    </v-col>

    <!-- Step 2: location & date -->
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
                v-model="addPriceMultipleForm.date"
                :label="$t('AddPriceSingle.WhereWhen.DateLabel')"
                type="date"
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-overlay v-model="disableProofLocationDateForm" scrim="#E8F5E9" contained persistent />
      </v-card>
    </v-col>

    <!-- Step 3a: product prices already uploaded -->
    <v-col cols="12" md="6" lg="4">
      <v-card
        prepend-icon="mdi-tag-check-outline"
        height="100%"
        style="border: 1px solid #4CAF50"
      >
        <template #title>
          <i18n-t keypath="AddPriceMultiple.ProductPriceDetails.AlreadyUploaded" :plural="productPriceUploadedList.length" tag="span">
            <template #priceAlreadyUploadedNumber>
              <span>{{ productPriceUploadedList.length }}</span>
            </template>
          </i18n-t>
        </template>
        <template #append>
          <v-icon icon="mdi-checkbox-marked-circle" color="success" />
        </template>
        <v-divider />
        <v-card-text>
          <v-row>
            <v-col v-for="productPriceUploaded in productPriceUploadedList" :key="productPriceUploaded" cols="12">
              <PriceCard :price="productPriceUploaded" :product="productPriceUploaded.product" :hidePriceDate="true" :hidePriceFooterRow="true" :readonly="true" />
            </v-col>
          </v-row>
        </v-card-text>
        <v-overlay v-model="disablePriceAlreadyUploadedCard" scrim="#E8F5E9" contained persistent />
      </v-card>
    </v-col>

    <!-- Step 3b: new product price form -->
    <v-col cols="12" md="6" lg="4">
      <v-btn
        v-if="!Object.keys(productPriceForm).length && !productPriceUploadedList.length"
        class="mr-2"
        prepend-icon="mdi-plus"
        color="primary"
        :loading="createPriceLoading"
        :disabled="!proofLocationFormFilled"
        @click="initNewProductPriceForm"
      >
        {{ $t('AddPriceMultiple.ProductPriceDetails.Add') }}
      </v-btn>
      <v-form v-else @submit.prevent="createPrice">
        <v-card
          :title="$t('AddPriceMultiple.ProductPriceDetails.NewPrice')"
          prepend-icon="mdi-tag-outline"
          append-icon="mdi-delete"
          height="100%"
          style="border: 1px solid transparent"
        >
          <template #append>
            <v-icon icon="mdi-delete" color="error" @click="clearProductPriceForm" />
          </template>
          <v-divider />
          <v-card-text>
            <ProductInputRow :productForm="productPriceForm" @filled="productFormFilled = $event" />
            <h3 class="mb-1">
              <v-item-group v-if="productPriceForm.mode === 'category'" v-model="productPriceForm.price_per" class="d-inline" mandatory>
                <v-item v-for="cpp in categoryPricePerList" :key="cpp.key" v-slot="{ isSelected, toggle }" :value="cpp.key">
                  <v-chip class="mr-1" :style="isSelected ? 'border: 1px solid #9E9E9E' : 'border: 1px solid transparent'" @click="toggle">
                    <v-icon start :icon="isSelected ? 'mdi-checkbox-marked-circle' : 'mdi-circle-outline'" />
                    {{ cpp.value }}
                  </v-chip>
                </v-item>
              </v-item-group>
            </h3>
            <PriceInputRow :priceForm="productPriceForm" @filled="pricePriceFormFilled = $event" />
          </v-card-text>
          <v-divider />
          <v-card-text>
            <v-btn
              color="success"
              type="submit"
              :loading="createPriceLoading"
              :disabled="!productPriceFormFilled"
            >
              {{ $t('AddPriceMultiple.ProductPriceDetails.Upload') }}
            </v-btn>
          </v-card-text>
        </v-card>
      </v-form>
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <v-btn
        type="submit"
        :loading="createPriceLoading"
        :disabled="!proofLocationFormFilled || !productPriceUploadedList.length"
        @click="done"
      >
        {{ $t('AddPriceMultiple.Done') }}
      </v-btn>
    </v-col>
  </v-row>

  <v-snackbar
    v-model="proofDateSuccessMessage"
    color="info"
    :timeout="2000"
  >
    {{ $t('AddPriceSingle.PriceDetails.ProofDateChanged') }}
  </v-snackbar>
  <v-snackbar
    v-model="priceSuccessMessage"
    color="success"
    :timeout="2000"
  >
    {{ $t('AddPriceMultiple.ProductPriceDetails.PriceUploaded') }}
  </v-snackbar>

  <LocationSelectorDialog
    v-if="locationSelectorDialog"
    v-model="locationSelectorDialog"
    @location="setLocationData($event)"
    @close="locationSelectorDialog = false"
  />
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import api from '../services/api'
import utils from '../utils.js'

export default {
  components: {
    LocationSelectorDialog: defineAsyncComponent(() => import('../components/LocationSelectorDialog.vue')),
    ProofInputRow: defineAsyncComponent(() => import('../components/ProofInputRow.vue')),
    ProductInputRow: defineAsyncComponent(() => import('../components/ProductInputRow.vue')),
    PriceInputRow: defineAsyncComponent(() => import('../components/PriceInputRow.vue')),
    PriceCard: defineAsyncComponent(() => import('../components/PriceCard.vue')),
  },
  data() {
    return {
      proofType: null,  // 'PRICE_TAG' or 'RECEIPT'
      // price form
      addPriceMultipleForm: {
        proof_id: null,
        location_osm_id: null,
        location_osm_type: '',
        date: utils.currentDate(),
      },
      productPriceForm: {},
      productFormFilled: false,
      pricePriceFormFilled: false,
      createPriceLoading: false,
      priceSuccessMessage: false,
      // proof data
      proofDateSuccessMessage: false,
      // location data
      locationSelectorDialog: false,
      // product price data
      productPriceUploadedList: [],
      productPriceNew: {
        mode: '',
        product: null,
        product_code: '',
        category_tag: null,
        origins_tags: '',
        labels_tags: [],
        price: null,
        price_per: null, // see PriceInputRow
        price_is_discounted: false,
        price_without_discount: null,
        currency: null,  // see PriceInputRow
      },
      categoryPricePerList: [
        {key: 'KILOGRAM', value: this.$t('AddPriceSingle.CategoryPricePer.PerKg'), icon: 'mdi-weight-kilogram'},
        {key: 'UNIT', value: this.$t('AddPriceSingle.CategoryPricePer.PerUnit'), icon: 'mdi-numeric-1-circle'}
      ],
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
    pricePerFormFilled() {
      let keys = ['price_per']
      return Object.keys(this.addPriceMultipleForm).filter(k => keys.includes(k)).every(k => !!this.addPriceMultipleForm[k])
    },
    priceFormFilled() {
      return this.pricePerFormFilled && this.pricePriceFormFilled
    },
    productPriceFormFilled() {
      return this.productFormFilled && this.priceFormFilled
    },
    formFilled() {
      return this.proofLocationFormFilled && !!this.productPriceUploadedList.length && !Object.keys(this.productPriceForm).length
    },
    disableProofLocationDateForm() {
      return this.proofLocationFormFilled && !!this.productPriceUploadedList.length
    },
    disablePriceAlreadyUploadedCard() {
      // return !!this.productPriceUploadedList.length
      return true
    }
  },
  mounted() {
    this.initPriceMultipleForm()
  },
  methods: {
    initPriceMultipleForm() {
      /**
       * init form config (product mode, last locations)
       * (init form done in initNewProductPriceForm)
       */
      this.proofType = this.$route.path.endsWith('/receipt') ? 'RECEIPT' : 'PRICE_TAG'
      if (this.recentLocations.length) {
        this.setLocationData(this.recentLocations[0])
      }
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
      this.addPriceMultipleForm.location_osm_id = utils.getLocationID(location)
      this.addPriceMultipleForm.location_osm_type = utils.getLocationType(location)
    },
    isSelectedLocation(location) {
      return (this.addPriceMultipleForm.location_osm_id === utils.getLocationID(location)) && (this.addPriceMultipleForm.location_osm_type === utils.getLocationType(location))
    },
    clearProductPriceForm() {
      this.productPriceForm = {}
    },
    initNewProductPriceForm() {
      this.clearProductPriceForm()
      this.productPriceForm = JSON.parse(JSON.stringify(this.productPriceNew))  // deep copy
      this.productPriceForm.mode = this.appStore.user.last_product_mode_used
      this.productPriceForm.currency = this.appStore.getUserLastCurrencyUsed
      this.productPriceForm.price_per = this.categoryPricePerList[0].key // init to 'KILOGRAM' because it's the most common use-case
    },
    createPrice() {
      this.createPriceLoading = true
      this.appStore.setLastCurrencyUsed(this.productPriceForm.currency)
      // cleanup form
      if (!this.productPriceForm.product_code) {
        this.productPriceForm.product_code = null
      } else {
        this.productPriceForm.price_per = null
      }
      if ((typeof this.productPriceForm.origins_tags === 'string') && (this.productPriceForm.origins_tags.length)) {
        this.productPriceForm.origins_tags = [this.productPriceForm.origins_tags]
      } else {
        this.productPriceForm.origins_tags = null
      }
      if (this.productPriceForm.labels_tags.length == 0) {
        this.productPriceForm.labels_tags = null
      }
      if (!this.productPriceForm.price_is_discounted) {
        this.productPriceForm.price_without_discount = null
      }
      // create price
      api
        .createPrice(Object.assign({}, this.addPriceMultipleForm, this.productPriceForm))
        .then((data) => {
          if (data['detail']) {
            alert(`Error: with input ${data['detail'][0]['input']}`)
          } else {
            this.productPriceUploadedList.push(JSON.parse(JSON.stringify(this.productPriceForm)))  // deep copy
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
      this.$router.push({ path: '/prices/add', query: { multipleSuccess: 'true' } })
    }
  }
}
</script>
