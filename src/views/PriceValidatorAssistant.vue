<template>
  <v-row>
    <v-col v-for="(productPriceForm, index) in productPriceForms" :key="index" cols="12" md="6" xl="4">
      <ContributionAssistantPriceFormCard :productPriceForm="productPriceForm" @removePrice="removePrice(index)" />
    </v-col>
  </v-row>
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
              type: barcodeString.length > 10 ? constants.PRICE_TYPE_PRODUCT : constants.PRICE_TYPE_CATEGORY,
              category_tag: label.product,
              origins_tags: [label.origin],
              labels_tags: label.organic ? [constants.PRODUCT_CATEGORY_LABEL_ORGANIC] : [],
              price: label.price.toString(),
              price_per: label.unit,
              price_is_discounted: false,
              currency: this.appStore.getUserLastCurrencyUsed || 'EUR',
              proofImage: data.items[i]['proof'].file_path,
              product_code: barcodeString,
              detected_product_code: barcodeString
            }
            this.productPriceForms.push(productPriceForm)
          }
        })
    },
    removePrice(index) {
      this.productPriceForms.splice(index, 1)
    },
    // createPrice(index) {
    //   // TODO
    // }
  }
}
</script>
