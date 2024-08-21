<template>
  <h1 class="text-h5 mb-1">
    {{ $t('AddPriceMultiple.Title') }}
  </h1>

  <v-row>
    <!-- Step 1: proof (image, location, date & currency) -->
    <v-col cols="12" md="6">
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
          <ProofInputRow :proofType="proofType" :proofForm="addPriceMultipleForm" @proof="proofSelected($event)" />
        </v-card-text>
        <v-overlay v-model="disableProofForm" scrim="#E8F5E9" contained persistent />
      </v-card>
    </v-col>

    <v-col v-if="proofFormFilled" cols="12" md="6">
      <!-- Step 2a: product prices already uploaded -->
      <v-card
        class="mb-4"
        prepend-icon="mdi-tag-check-outline"
        style="border: 1px solid #4CAF50"
      >
        <template #title>
          <i18n-t keypath="AddPriceMultiple.ProductPriceDetails.AlreadyUploaded" :plural="productPriceUploadedCount" tag="span">
            <template #priceAlreadyUploadedNumber>
              <span>{{ productPriceUploadedCount }}</span>
            </template>
          </i18n-t>
        </template>
        <template #append>
          <v-icon icon="mdi-checkbox-marked-circle" color="success" />
        </template>
        <v-divider />
        <v-card-text>
          <v-row>
            <v-col v-for="productPriceUploaded in proofPriceUploadedList" :key="productPriceUploaded" cols="12">
              <PriceCard :price="productPriceUploaded" :product="productPriceUploaded.product" :hidePriceFooterRow="true" :readonly="true" />
            </v-col>
          </v-row>
        </v-card-text>
        <v-overlay v-model="disablePriceAlreadyUploadedCard" scrim="#E8F5E9" contained persistent />
      </v-card>

      <!-- Step 2b: new product price form -->
      <v-btn
        v-if="!Object.keys(productPriceForm).length"
        class="mr-2"
        color="primary"
        :loading="createPriceLoading"
        :disabled="!proofFormFilled"
        @click="initNewProductPriceForm"
      >
        {{ $t('AddPriceMultiple.ProductPriceDetails.Add') }}
      </v-btn>
      <v-form v-else @submit.prevent="createPrice">
        <v-card
          class="mb-4"
          :title="$t('AddPriceMultiple.ProductPriceDetails.NewPrice')"
          prepend-icon="mdi-tag-outline"
          height="100%"
          style="border: 1px solid transparent"
        >
          <template #append>
            <v-icon icon="mdi-delete" color="error" @click="clearProductPriceForm" />
          </template>
          <v-divider />
          <v-card-text>
            <ProductInputRow :productForm="productPriceForm" @filled="productFormFilled = $event" />
            <v-row v-if="productFormFilled && existingProductFound" class="mt-0 pb-2">
              <v-col>
                <v-alert data-name="existing-product-alert" type="warning" variant="outlined" icon="mdi-alert">
                  <p>
                    <i>{{ $t('AddPriceMultiple.ProductPriceDetails.ExistingProductFound') }}</i>
                  </p>
                </v-alert>
              </v-col>
            </v-row>
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
            <PriceInputRow :priceForm="productPriceForm" :product="productPriceForm.product" :hideCurrencyChoice="true" @filled="pricePriceFormFilled = $event" />
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

      <v-btn
        class="float-right"
        type="submit"
        :loading="createPriceLoading"
        :disabled="productPriceFormFilled"
        @click="done"
      >
        {{ $t('AddPriceMultiple.Done') }}
      </v-btn>
    </v-col>
  </v-row>

  <v-snackbar
    v-model="priceSuccessMessage"
    color="success"
    :timeout="2000"
  >
    {{ $t('AddPriceMultiple.ProductPriceDetails.PriceUploaded') }}
  </v-snackbar>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import api from '../services/api'
import utils from '../utils.js'

export default {
  components: {
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
        currency: null  // see initPriceMultipleForm
      },
      productPriceForm: {},
      productFormFilled: false,
      pricePriceFormFilled: false,
      createPriceLoading: false,
      priceSuccessMessage: false,
      // proof data
      proofObject: null,
      proofPriceExistingList: [],
      // product price data
      proofPriceNewList: [],
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
        currency: null  // see initNewProductPriceForm
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
      let keys = ['proof_id', 'location_osm_id', 'location_osm_type', 'date', 'currency']
      return Object.keys(this.addPriceMultipleForm).filter(k => keys.includes(k)).every(k => !!this.addPriceMultipleForm[k])
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
      return this.proofFormFilled && !!this.proofPriceUploadedList.length && !Object.keys(this.productPriceForm).length
    },
    disableProofForm() {
      return this.proofFormFilled
    },
    disablePriceAlreadyUploadedCard() {
      // return !!this.proofPriceUploadedList.length
      return true
    },
    proofPriceUploadedList() {
      return this.proofPriceExistingList.concat(this.proofPriceNewList)
    },
    productPriceUploadedCount() {
      return this.proofPriceUploadedList.length
    },
    existingProductFound() {
      if (this.productPriceForm.product_code) {
        return this.proofPriceUploadedList.findIndex(price => price.product_code === this.productPriceForm.product_code) >= 0
      } else if (this.productPriceForm.category_tag) {
        return this.proofPriceUploadedList.findIndex(price => price.category_tag === this.productPriceForm.category_tag) >= 0
      }
      return false
    }
  },
  mounted() {
    this.initPriceMultipleForm()
  },
  methods: {
    initPriceMultipleForm() {
      /**
       * init form config (product mode, currency)
       * (init form done in initNewProductPriceForm)
       */
      this.proofType = this.$route.path.endsWith('/receipt') ? 'RECEIPT' : 'PRICE_TAG'
      this.addPriceMultipleForm.currency = this.appStore.getUserLastCurrencyUsed
    },
    proofSelected(proof) {
      this.proofObject = proof
      this.proofPriceExistingList = []
      if (this.proofObject.price_count) {
        this.getProofPrices()
      }
    },
    getProofPrices() {
      this.loading = true
      return api.getPrices({ proof_id: this.proofObject.id, size: this.proofObject.price_count })
        .then((data) => {
          this.proofPriceExistingList.push(...data.items)
          this.loading = false
        })
    },
    clearProductPriceForm() {
      this.productPriceForm = {}
    },
    initNewProductPriceForm() {
      this.clearProductPriceForm()
      this.productPriceForm = JSON.parse(JSON.stringify(this.productPriceNew))  // deep copy
      this.productPriceForm.mode = this.appStore.user.last_product_mode_used
      this.productPriceForm.price_per = this.categoryPricePerList[0].key // init to 'KILOGRAM' because it's the most common use-case
      this.productPriceForm.currency = this.appStore.getUserLastCurrencyUsed
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
            this.proofPriceUploadedList.push(JSON.parse(JSON.stringify(this.productPriceForm)))  // deep copy
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
      this.$router.push({ path: '/prices', query: { multipleSuccess: 'true' } })
    }
  }
}
</script>
