<template>
  <v-row v-if="!loading">
    <v-col>
      <v-chip label variant="text" prepend-icon="mdi-checkbox-marked-circle-plus-outline">
        {{ $t('Common.PriceToValidateCount', { count: priceTagTotal }) }}
      </v-chip>
      <FilterMenu kind="priceTag" :currentFilter="currentFilter" @update:currentFilter="togglePriceTagFilter($event)" />
    </v-col>
  </v-row>

  <v-row class="mt-0">
    <v-col v-for="(productPriceForm, index) in productPriceForms" :key="index" cols="12" md="6" xl="4">
      <ContributionAssistantPriceFormCard height="100%" :productPriceForm="productPriceForm" :loading="productPriceForm.loading" @removePriceTag="removePriceTag(index, $event)" @validatePriceTag="validatePriceTag(index)" />
    </v-col>
  </v-row>

  <v-row v-if="loading">
    <v-col align="center">
      <v-progress-circular indeterminate :size="30" />
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
import utils from '../utils.js'

export default {
  components: {
    FilterMenu: defineAsyncComponent(() => import('../components/FilterMenu.vue')),
    ContributionAssistantPriceFormCard: defineAsyncComponent(() => import('../components/ContributionAssistantPriceFormCard.vue')),
  },
  data() {
    return {
      currentDateTime: utils.currentDateTime(),  // usefull to avoid fetching duplicates during pagination
      // data
      priceTagList: [],
      priceTagTotal: null,
      priceTagPage: 0,  // issue with pagination once the user starts removing/validating price tags...
      loading: false,
      productPriceForms: [],
      // filter & order
      currentFilter: '',
      currentOrder: '-proof_id',  // order by most recent proof
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
    getApiSize() {
      // reduce size to speed up the loading
      if (!this.$vuetify.display.smAndUp) return 2
      return 4
    },
    getPriceTagsParams() {
      let defaultParams = {
        proof__ready_for_price_tag_validation: true,
        status__isnull: true,
        created__lte: this.currentDateTime,
        order_by: this.currentOrder,
        size: this.getApiSize,
        page: this.priceTagPage
      }
      if (this.currentFilter === 'proof__owner') {
        defaultParams['proof__owner'] = this.username
      }
      return defaultParams
    },
  },
  watch: {
    $route (newRoute, oldRoute) {  // only called when query changes to avoid having an API call when the path changes
      if (oldRoute.path === newRoute.path && JSON.stringify(oldRoute.query) !== JSON.stringify(newRoute.query)) {
        this.initPriceTags()
      }
    }
  },
  mounted() {
    this.currentFilter = this.$route.query[constants.FILTER_PARAM] || this.currentFilter
    this.getPriceTags()
    // load more
    this.handleDebouncedScroll = utils.debounce(this.handleScroll, 100)
    window.addEventListener('scroll', this.handleDebouncedScroll)
  },
  unmounted() {
    window.removeEventListener('scroll', this.handleDebouncedScroll)
  },
  methods: {
    initPriceTags() {
      this.locationId = this.$route.params.id
      this.priceTagList = []
      this.priceTagTotal = null
      this.priceTagPage = 0
      this.getPriceTags()
    },
    removePriceTag(index, status) {
      /**
       * - update the price_tag (API)
       * - remove the price_tag (UI)
       */
       this.productPriceForms[index].loading = true
      this.updatePriceTag(this.priceTagList[index].id, status).then((priceTag) => {  // eslint-disable-line no-unused-vars
        this.productPriceForms.splice(index, 1)
        this.priceTagList.splice(index, 1)
        this.priceTagTotal -= 1
        this.priceRemovedMessage = true
        if (this.priceTagList.length === 1) {
          this.getPriceTags()
        }
      })
    },
    validatePriceTag(index) {
      /**
       * - create the price (API)
       * - update the price_tag (API)
       * - remove the price_tag (UI)
       */
      this.productPriceForms[index].loading = true
      this.createPrice(this.productPriceForms[index]).then((price) => {
        this.updatePriceTag(this.productPriceForms[index].id, 1, price.id)
        this.productPriceForms.splice(index, 1)
        this.priceTagList.splice(index, 1)
        this.priceTagTotal -= 1
        this.priceSuccessMessage = true
        if (this.priceTagList.length === 1) {
          this.getPriceTags()
        }
      })
    },
    getPriceTags() {
      if ((this.priceTagTotal != null) && (this.priceTagList.length >= this.priceTagTotal)) return
      this.loading = true
      this.priceTagPage += 1
      return api.getPriceTags(this.getPriceTagsParams)
        .then((data) => {
          this.priceTagList.push(...data.items)
          this.priceTagTotal = data.total
          this.loading = false
          for (let i = 0; i < data.items.length; i++) {
            // only validate price tags with predictions
            if (data.items[i]['predictions'].length > 0) {
              const label = data.items[i]['predictions'][0]['data']
              const barcodeString = label.barcode ? utils.cleanBarcode(label.barcode.toString()) : ''
              const priceType = barcodeString.length >= 8 ? constants.PRICE_TYPE_PRODUCT : constants.PRICE_TYPE_CATEGORY
              // TODO: some of these will be None if gemini did not give a proper reply, so detection and error handling is needed
              const productPriceForm = {
                id: data.items[i].id,
                type: barcodeString.length >= 8 ? constants.PRICE_TYPE_PRODUCT : constants.PRICE_TYPE_CATEGORY,
                category_tag: priceType === constants.PRICE_TYPE_CATEGORY ? label.product : null,  // also set to null if product is 'other' ?
                origins_tags: [label.origin],
                labels_tags: label.organic ? [constants.PRODUCT_CATEGORY_LABEL_ORGANIC] : [],
                price: label.price.toString(),
                price_per: label.unit,
                price_is_discounted: false,
                currency: data.items[i]['proof'].currency || this.appStore.getUserLastCurrencyUsed,
                proof: data.items[i]['proof'],
                proofImage: data.items[i]['proof'].file_path,
                // proofImage: 'https://prices.openfoodfacts.org/img/0024/2NToLMxOgN.webp',
                croppedImage: null,
                product_code: barcodeString,
                detected_product_code: barcodeString,
                product_name: label.product_name,
                bounding_box: data.items[i].bounding_box,
                loading: false
              }
              this.productPriceForms.push(productPriceForm)
            }
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
      let origins_tags = productPriceData.origins_tags
      if (!Array.isArray(origins_tags)) {
        origins_tags = [origins_tags]
      }
      if (origins_tags[0] == null || origins_tags[0] == 'unknown' || origins_tags[0] == 'other' || origins_tags[0] == '') {
        origins_tags = []
      }
      const priceData = {
        ...productPriceData,
        origins_tags: origins_tags,
        date: productPriceData.proof.date,
        location_id: productPriceData.proof.location_id,
        location_osm_id: productPriceData.proof.location_osm_id,
        location_osm_type: productPriceData.proof.location_osm_type,
        proof_id: productPriceData.proof.id
      }
      return api
        .createPrice(Object.assign({}, priceData), this.$route.path)
        .then((data) => {
          if (data['detail']) {
            alert(`Error: with input ${data['detail'][0]['input']}`)
          } else {
            return data
          }
        })
        .catch((error) => {
          alert('Error: server error')
          console.log(error)
          productPriceData.loading = false
        })
    },
    togglePriceTagFilter(filterKey) {
      this.currentFilter = this.currentFilter ? '' : filterKey
      this.$router.push({ query: { ...this.$route.query, [constants.FILTER_PARAM]: this.currentFilter } })
      // this.initPriceTags() will be called in watch $route
    },
    handleScroll(event) {  // eslint-disable-line no-unused-vars
      if (utils.getDocumentScrollPercentage() > 90) {
        this.getPriceTags()
      }
    },
  }
}
</script>
