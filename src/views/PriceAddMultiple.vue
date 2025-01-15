<template>
  <v-row>
    <v-col cols="12">
      <v-stepper v-model="step" hide-actions disabled>
        <v-stepper-header>
          <v-stepper-item :title="stepItemList[0].title" :value="stepItemList[0].value" :complete="step > 1" />
          <v-divider />
          <v-stepper-item :title="stepItemList[1].title" :value="stepItemList[1].value" :complete="step > 2" />
          <v-divider />
          <v-stepper-item :title="stepItemList[2].title" :value="stepItemList[2].value" :complete="step === 3" />
        </v-stepper-header>
      </v-stepper>
    </v-col>
  </v-row>

  <v-row v-if="step === 1">
    <!-- Step 1: proof (image, location, date & currency) -->
    <v-col cols="12" md="6">
      <ProofUploadCard @proof="onProofUploaded($event)" />
    </v-col>
  </v-row>

  <v-row v-if="step === 2">
    <v-col cols="12" md="6">
      <ProofCard mode="Uploaded" :proof="proofObject" :hideProofActions="true" :readonly="true" />
    </v-col>
    <v-col cols="12" md="6">
      <!-- Step 2a: product prices already uploaded -->
      <PriceAlreadyUploadedListCard :proof="proofObject" :proofPriceUploadedList="proofPriceUploadedList" />

      <!-- Step 2b: new product price form -->
      <v-btn
        v-if="!Object.keys(productPriceForm).length"
        class="mr-2"
        color="primary"
        :loading="loading"
        @click="initNewProductPriceForm"
      >
        {{ $t('AddPriceMultiple.ProductPriceDetails.Add') }}
      </v-btn>
      <v-form v-else @submit.prevent="createPrice">
        <v-card
          id="product-price-form"
          class="border-transparent mb-4"
          :title="$t('AddPriceMultiple.ProductPriceDetails.NewPrice')"
          prepend-icon="mdi-tag-plus-outline"
          height="100%"
        >
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
            <PriceInputRow class="mt-0" :priceForm="productPriceForm" :product="productPriceForm.product" :hideCurrencyChoice="true" :proofType="proofObject.type" @filled="pricePriceFormFilled = $event" />
          </v-card-text>
          <v-divider />
          <v-card-actions>
            <v-row>
              <v-col>
                <v-btn
                  density="comfortable"
                  color="error"
                  icon="mdi-delete"
                  @click="clearProductPriceForm"
                />
              </v-col>
              <v-spacer />
              <v-col>
                <v-btn
                  class="float-right"
                  color="primary"
                  variant="flat"
                  type="submit"
                  :loading="loading"
                  :disabled="!productPriceFormFilled"
                >
                  {{ $t('Common.Upload') }}
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-form>

      <v-btn
        class="float-right"
        type="submit"
        :loading="loading"
        :disabled="productPriceFormFilled"
        @click="done"
      >
        {{ $t('Common.Done') }}
      </v-btn>
    </v-col>
  </v-row>

  <v-row v-if="step === 3">
    <v-col>
      <v-card
        class="border-success"
        :title="$t('Common.PriceAddedCount', { count: proofPriceNewList.length })"
        prepend-icon="mdi-tag-check-outline"
      >
        <template #append>
          <v-icon icon="mdi-checkbox-marked-circle" color="success" />
        </template>
        <v-divider />
        <v-card-text class="text-center">
          <v-row>
            <v-col cols="12" sm="6">
              <v-btn
                color="primary"
                :block="!$vuetify.display.smAndUp"
                prepend-icon="mdi-tag-plus-outline"
                @click="reloadPage"
              >
                {{ $t('Common.AddNewPrices') }}
              </v-btn>
            </v-col>
            <v-col cols="12" sm="6">
              <v-btn
                color="primary"
                :block="!$vuetify.display.smAndUp"
                prepend-icon="mdi-account-circle"
                @click="goToUserDashboard"
              >
                {{ $t('Common.MyDashboard') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
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
import constants from '../constants'
import utils from '../utils.js'

export default {
  components: {
    ProofUploadCard: defineAsyncComponent(() => import('../components/ProofUploadCard.vue')),
    ProofCard: defineAsyncComponent(() => import('../components/ProofCard.vue')),
    PriceAlreadyUploadedListCard: defineAsyncComponent(() => import('../components/PriceAlreadyUploadedListCard.vue')),
    ProductInputRow: defineAsyncComponent(() => import('../components/ProductInputRow.vue')),
    PriceInputRow: defineAsyncComponent(() => import('../components/PriceInputRow.vue')),
  },
  data() {
    return {
      goTo: useGoTo(),
      step: 1,
      stepItemList: [
        {
          title: this.$t('Common.Proof'),
          value: 1
        },
        {
          title: this.$t('Common.Prices'),
          value: 2
        },
        {
          title: this.$t('Common.Done'),
          value: 3
        }
      ],
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
      loading: false,
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
        currency: null,  // see initNewProductPriceForm
        receipt_quantity: null,
      },
     }
  },
  computed: {
    ...mapStores(useAppStore),
    proofFormFilled() {
      let keys = ['proof_id']
      return Object.keys(this.addPriceMultipleForm).filter(k => keys.includes(k)).every(k => !!this.addPriceMultipleForm[k])
    },
    productPriceFormFilled() {
      return this.productFormFilled && this.pricePriceFormFilled
    },
    formFilled() {
      return this.proofFormFilled && !!this.proofPriceUploadedList.length && !Object.keys(this.productPriceForm).length
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
  methods: {
    onProofUploaded(proof) {
      // store the proof
      this.proofObject = proof
      // fill the price form with the proof data
      this.addPriceMultipleForm.proof_id = proof.id
      this.addPriceMultipleForm.location_id = proof.location_id
      this.addPriceMultipleForm.location_osm_id = proof.location_osm_id
      this.addPriceMultipleForm.location_osm_type = proof.location_osm_type
      this.addPriceMultipleForm.date = proof.date
      this.addPriceMultipleForm.currency = proof.currency
      // load existing proof prices
      this.proofPriceExistingList = []
      if (this.proofObject.price_count) {
        this.getProofPrices()
      }
      // get ready to add prices: init product price form
      this.initNewProductPriceForm()
      // move to step 2
      this.step = 2
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
      this.productPriceForm.currency = this.addPriceMultipleForm.currency || this.appStore.getUserLastCurrencyUsed  // get currency from proof first
      if (this.proofObject.type === constants.PROOF_TYPE_RECEIPT) {
        this.productPriceForm.receipt_quantity = 1
      }
      // scroll to the form
      this.goTo('#product-price-form')
    },
    createPrice() {
      this.loading = true
      api
        .createPrice(Object.assign({}, this.addPriceMultipleForm, this.productPriceForm), this.$route.path)
        .then((data) => {
          if (!data['id']) {
            alert(`Form error: ${JSON.stringify(data)}`)
          } else {
            this.proofPriceNewList.push(JSON.parse(JSON.stringify(data)))  // deep copy
            this.priceSuccessMessage = true
            // show new price form immediately
            this.initNewProductPriceForm()
          }
          this.loading = false
        })
        .catch((error) => {
          alert('Error: server error')
          console.log(error)
          this.loading = false
        })
    },
    done() {
      this.step = 3
    },
    reloadPage() {
      window.location.reload()
    },
    goToUserDashboard() {
      this.$router.push({ path: '/dashboard', query: { multipleSuccess: 'true' } })
    }
  }
}
</script>
