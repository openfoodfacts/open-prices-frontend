<template>
  <v-row>
    <!-- Step 1: proof (image, location, date & currency) -->
    <v-col cols="12" md="6">
      <v-card
        :title="$t('AddPriceMultiple.ProofDetails.Title')"
        prepend-icon="mdi-image"
        height="100%"
        :style="proofFormFilled ? 'border: 1px solid #4CAF50' : 'border: 1px solid transparent'"
      >
        <template v-if="proofFormFilled" #append>
          <v-icon icon="mdi-checkbox-marked-circle" color="success" />
        </template>
        <v-divider />
        <v-card-text>
          <ProofInputRow :proofForm="addPriceMultipleForm" @proof="proofSelected($event)" />
        </v-card-text>
        <v-overlay v-model="disableProofForm" scrim="#E8F5E9" contained persistent />
      </v-card>
    </v-col>

    <v-col v-if="proofFormFilled" cols="12" md="6">
      <!-- Step 2a: product prices already uploaded -->
      <PriceAlreadyUploadedListCard :proof="proofObject" :proofPriceUploadedList="proofPriceUploadedList" />

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
          id="product-price-form"
          class="mb-4"
          :title="$t('AddPriceMultiple.ProductPriceDetails.NewPrice')"
          prepend-icon="mdi-tag-plus-outline"
          height="100%"
          style="border: 1px solid transparent"
        >
          <template #append>
            <v-icon icon="mdi-delete" color="error" @click="clearProductPriceForm" />
          </template>
          <v-divider />
          <v-card-text>
            <ProductInputRow :productForm="productPriceForm" @filled="productFormFilled = $event" />
            <v-row v-if="productFormFilled && existingProductFound" class="mt-0">
              <v-col>
                <v-alert data-name="existing-product-alert" type="warning" variant="outlined" icon="mdi-alert">
                  <p>
                    <i>{{ $t('AddPriceMultiple.ProductPriceDetails.ExistingProductFound') }}</i>
                  </p>
                </v-alert>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-item-group v-if="productPriceForm.type === 'CATEGORY'" v-model="productPriceForm.price_per" class="d-inline" mandatory>
                  <v-item v-for="cpp in categoryPricePerList" :key="cpp.key" v-slot="{ isSelected, toggle }" :value="cpp.key">
                    <v-chip class="mr-1" :style="isSelected ? 'border: 1px solid #9E9E9E' : 'border: 1px solid transparent'" @click="toggle">
                      <v-icon start :icon="isSelected ? 'mdi-checkbox-marked-circle' : 'mdi-circle-outline'" />
                      {{ cpp.value }}
                    </v-chip>
                  </v-item>
                </v-item-group>
              </v-col>
            </v-row>
            <PriceInputRow class="mt-0" :priceForm="productPriceForm" :product="productPriceForm.product" :hideCurrencyChoice="true" @filled="pricePriceFormFilled = $event" />
            <v-row>
              <v-col>
                <v-btn
                  class="float-right"
                  color="success"
                  type="submit"
                  :loading="createPriceLoading"
                  :disabled="!productPriceFormFilled"
                >
                  {{ $t('Common.Upload') }}
                </v-btn>
              </v-col>
            </v-row>
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
        {{ $t('Common.Done') }}
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
 import { useGoTo } from 'vuetify'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import api from '../services/api'
import utils from '../utils.js'

export default {
  components: {
    ProofInputRow: defineAsyncComponent(() => import('../components/ProofInputRow.vue')),
    PriceAlreadyUploadedListCard: defineAsyncComponent(() => import('../components/PriceAlreadyUploadedListCard.vue')),
    ProductInputRow: defineAsyncComponent(() => import('../components/ProductInputRow.vue')),
    PriceInputRow: defineAsyncComponent(() => import('../components/PriceInputRow.vue')),
  },
  data() {
    return {
      goTo: useGoTo(),
      // price form
      addPriceMultipleForm: {
        type: null,
        proof_id: null,
        location_id: null,
        location_osm_id: null,
        location_osm_type: '',
        date: utils.currentDate(),
        currency: null,
        receipt_price_count: null,
        receipt_price_total: null,
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
        type: '',  // see ProductInputRow
        product: null,
        product_code: '',
        category_tag: null,
        origins_tags: '',
        labels_tags: [],
        price: null,
        price_per: null,
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
      let keysOSM = Object.keys(this.addPriceMultipleForm).filter(k => !['location_id', 'receipt_price_count', 'receipt_price_total'].includes(k))
      let keysONLINE = Object.keys(this.addPriceMultipleForm).filter(k => !['location_osm_id', 'location_osm_type', 'receipt_price_count', 'receipt_price_total'].includes(k))
      return Object.keys(this.addPriceMultipleForm).filter(k => keysOSM.includes(k)).every(k => !!this.addPriceMultipleForm[k]) || Object.keys(this.addPriceMultipleForm).filter(k => keysONLINE.includes(k)).every(k => !!this.addPriceMultipleForm[k])
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
    proofPriceUploadedList() {
      return this.proofPriceExistingList.concat(this.proofPriceNewList)
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
       * init form config (currency)
       * (init form done in proofSelected > initNewProductPriceForm)
       */
      this.addPriceMultipleForm.currency = this.appStore.getUserLastCurrencyUsed
    },
    proofSelected(proof) {
      this.proofObject = proof
      this.proofPriceExistingList = []
      if (this.proofObject.price_count) {
        this.getProofPrices()
      }
      // init product price form
      this.initNewProductPriceForm()
    },
    getProofPrices() {
      this.loading = true
      return api.getPrices({ proof_id: this.proofObject.id, size: this.proofObject.price_count, order_by: 'created' })
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
      this.productPriceForm.type = this.appStore.user.last_product_type_used  // can be overriden in ProductInputRow
      this.productPriceForm.price_per = this.categoryPricePerList[0].key // init to 'KILOGRAM' because it's the most common use-case
      this.productPriceForm.currency = this.addPriceMultipleForm.currency || this.appStore.getUserLastCurrencyUsed  // get currency from proof first
      // scroll to the form
      this.goTo('#product-price-form')
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
        .createPrice(Object.assign({}, this.addPriceMultipleForm, this.productPriceForm), this.$route.path)
        .then((data) => {
          if (data['detail']) {
            alert(`Error: with input ${data['detail'][0]['input']}`)
          } else {
            this.proofPriceNewList.push(JSON.parse(JSON.stringify(this.productPriceForm)))  // deep copy
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
      this.$router.push({ path: '/dashboard', query: { multipleSuccess: 'true' } })
    }
  }
}
</script>
