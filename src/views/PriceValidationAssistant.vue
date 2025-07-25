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
      <ContributionAssistantPriceFormCard
        height="100%"
        :productPriceForm="productPriceForm"
        :hideProductBarcodeScannerTab="true"
        :loading="productPriceForm.loading"
        @updatePriceTagStatus="updatePriceTagStatus(index, $event)"
        @validatePriceTag="validatePriceTag(index)"
      />
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
import { mapStores } from 'pinia'
import { defineAsyncComponent } from 'vue'
import constants from '../constants'
import api from '../services/api'
import { useAppStore } from '../store'
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
        prediction_count__gte: 1,
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
      this.priceTagList = []
      this.priceTagTotal = null
      this.priceTagPage = 0
      this.productPriceForms = []
      this.getPriceTags()
    },
    updatePriceTagStatus(index, status) {
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
              const priceTagPrediction = data.items[i]['predictions'][0]
              const label = priceTagPrediction['data']
              const barcodeString = label.barcode ? utils.cleanBarcode(label.barcode.toString()) : ''

              // The first schema was not versioned, so if the field is missing,
              // we assume it's schema version 1.0
              const schemaVersion = priceTagPrediction.schema_version || '1.0'

              // fields that are common to all schema versions are initialized here
              let productPriceForm = {
                id: data.items[i].id,
                origins_tags: ![null, '', 'unknown', 'other'].includes(label.origin) ? [label.origin] : [],
                currency: data.items[i]['proof'].currency || this.appStore.getUserLastCurrencyUsed,
                proof: data.items[i]['proof'],
                proofImage: data.items[i]['proof'].file_path,
                croppedImage: null,
                product_code: barcodeString,
                detected_product_code: barcodeString,
                product_name: label.product_name,
                bounding_box: data.items[i].bounding_box,
                loading: false
              }

              if (schemaVersion === '1.0') {
                // For schema version 1.0
                const priceType = barcodeString.length >= 8 ? constants.PRICE_TYPE_PRODUCT : constants.PRICE_TYPE_CATEGORY
                productPriceForm.type = priceType
                productPriceForm.category_tag = (priceType === constants.PRICE_TYPE_CATEGORY && ![null, '', 'unknown', 'other'].includes(label.product)) ? label.product : null
                productPriceForm.labels_tags = (priceType === constants.PRICE_TYPE_CATEGORY && label.organic) ? [constants.PRODUCT_CATEGORY_LABEL_ORGANIC] : []
                productPriceForm.price = label.price.toString()
                productPriceForm.price_per = label.unit
                // price_is_discounted is not supported in schema version 1.0
                productPriceForm.price_is_discounted = false
              } else {
                // version 2.0 and above
                const priceType = label.type
                // The selected price is a price constructed by all price information available in the label,
                // including the discount price if available.
                const selectedPrice = label.selected_price || {}
                productPriceForm.type = selectedPrice.type
                // we only populate category_tag and labels_tags if the price type is category
                productPriceForm.category_tag = (priceType === constants.PRICE_TYPE_CATEGORY && ![null, '', 'unknown', 'other'].includes(label.category)) ? label.category : null
                productPriceForm.labels_tags = (priceType === constants.PRICE_TYPE_CATEGORY && label.organic) ? [constants.PRODUCT_CATEGORY_LABEL_ORGANIC] : []
                productPriceForm.price = selectedPrice.price ? selectedPrice.price.toString() : ""
                productPriceForm.price_per = selectedPrice.price_per || null
                // in schema 2.0, we detect discount information (price, type)
                productPriceForm.price_is_discounted = selectedPrice ? selectedPrice.price_is_discounted : false
                productPriceForm.price_without_discount = selectedPrice.price_without_discount ? selectedPrice.price_without_discount.toString() : ""
                productPriceForm.discount_type = selectedPrice.discount_type || ""
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
      const priceData = {
        ...productPriceData,
        origins_tags: productPriceData.origins_tags,
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
