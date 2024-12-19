<template>
  <v-row>
    <v-col v-for="(productPriceForm, index) in productPriceForms" :key="index" cols="12" md="6" xl="4">
      <ContributionAssistantPriceFormCard :productPriceForm="productPriceForm" mode="Validation" @removePriceTag="removePriceTag(index, $event)" @validatePriceTag="validatePriceTag(index)" />
    </v-col>
  </v-row>

  <v-snackbar
    v-model="priceRemovedMessage"
    color="warning"
    :timeout="1000"
  >
    {{ $t('Common.Thanks') }}
  </v-snackbar>
  <v-snackbar
    v-model="priceSuccessMessage"
    color="success"
    :timeout="1000"
  >
    {{ $t('AddPriceMultiple.ProductPriceDetails.PriceUploaded') }}
  </v-snackbar>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import api from '../services/api'
import constants from '../constants'

export default {
  components: {
    ContributionAssistantPriceFormCard: defineAsyncComponent(() => import('../components/ContributionAssistantPriceFormCard.vue')),
  },
  data() {
    return {
      priceTagList: [],
      priceTagTotal: null,
      priceTagPage: 0,
      loading: false,
      productPriceForms: [],
      // filter & order
      currentOrder: '-created',
      // feedback
      priceRemovedMessage: false,
      priceSuccessMessage: false
    }
  },
  computed: {
    ...mapStores(useAppStore),
    username() {
      return this.appStore.user.username
    },
    getPriceTagsParams() {
      return { proof__owner: this.username, status__isnull: true, order_by: this.currentOrder, page: this.priceTagPage }
    },
  },
  mounted() {
    this.getPriceTags()
  },
  methods: {
    removePriceTag(index, status) {
      /**
       * - update the price_tag (API)
       * - remove the price_tag
       */
      this.updatePriceTag(this.priceTagList[index].id, status).then((priceTag) => {  // eslint-disable-line no-unused-vars
        this.priceTagList.splice(index, 1)
        this.productPriceForms.splice(index, 1)
        this.priceRemovedMessage = true
      })
    },
    validatePriceTag(index) {
      /**
       * - create the price (API)
       * - update the price_tag (API)
       * - remove the price_tag
       */
      this.createPrice(this.productPriceForms[index]).then((price) => {
        this.updatePriceTag(this.productPriceForms[index].id, 1, price.id)
        this.priceTagList.splice(index, 1)
        this.productPriceForms.splice(index, 1)
        this.priceSuccessMessage = true
      })
    },
    getPriceTags() {
      if (this.priceTagTotal && (this.priceTagList.length >= this.priceTagTotal)) return
      this.loading = true
      this.priceTagPage += 1
      return api.getPriceTags(this.getPriceTagsParams)
        .then((data) => {
          this.priceTagList.push(...data.items)
          this.priceTagTotal = data.total
          this.loading = false
          for (let i = 0; i < data.items.length; i++) {
            const label = data.items[i]['predictions'][0]['data']
            const barcodeString = label.barcode ? label.barcode.toString().replace(/\s/g, '') : ''
            // TODO: some of these will be None if gemini did not give a proper reply, so detection and error handling is needed
            const productPriceForm = {
              id: data.items[i].id,
              type: barcodeString.length > 10 ? constants.PRICE_TYPE_PRODUCT : constants.PRICE_TYPE_CATEGORY,
              category_tag: label.product,
              origins_tags: [label.origin],
              labels_tags: label.organic ? [constants.PRODUCT_CATEGORY_LABEL_ORGANIC] : [],
              price: label.price.toString(),
              price_per: label.unit,
              price_is_discounted: false,
              currency: this.appStore.getUserLastCurrencyUsed || 'EUR',
              proof: data.items[i]['proof'],
              proofImage: data.items[i]['proof'].file_path,
              product_code: barcodeString,
              detected_product_code: barcodeString,
            }
            this.productPriceForms.push(productPriceForm)
          }
        })
    },
    updatePriceTag(priceTagId, status, priceId) {
      return api
        .updatePriceTag(priceTagId, { status: status, price_id: priceId })
        .then((response) => {
          // if response.status == 204
          return response
        })
        .catch((error) => {
          console.log(error)
        })
    },
    createPrice(productPriceData) {
      const priceData = {
        ...productPriceData,
        // origins_tags: origins_tags,
        date: productPriceData.proof.date,
        location_id: productPriceData.proof.location_id,
        location_osm_id: productPriceData.proof.location_osm_id,
        location_osm_type: productPriceData.proof.location_osm_type,
        proof_id: productPriceData.proof.id
      }
      // Cleanup unwanted fields for API
      if (priceData.type == constants.PRICE_TYPE_PRODUCT) {
          delete priceData.price_per
          delete priceData.category_tag
          delete priceData.origins_tags
          delete priceData.labels_tags
        } else if (priceData.type == constants.PRICE_TYPE_CATEGORY) {
          delete priceData.product_code
          delete priceData.product
        }
      return api
        .createPrice(Object.assign({}, priceData), this.$route.path)
        .then((data) => {
          if (data['detail']) {
            alert(`Error: with input ${data['detail'][0]['input']}`)
          } else {
            this.priceSuccessMessage = true
            return data
          }
          this.createPriceLoading = false
        })
        .catch((error) => {
          alert('Error: server error')
          console.log(error)
          this.createPriceLoading = false
        })
    }
  }
}
</script>
