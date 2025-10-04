<template>
  <v-row v-if="mode === 'edit'">
    <v-col>
      <v-item-group v-model="productForm.type" class="d-inline" mandatory @update:modelValue="setType($event)">
        <v-item v-for="pt in productTypeDisplayList" :key="pt.key" v-slot="{ isSelected, toggle }" :value="pt.key">
          <v-chip class="mr-1" :class="isSelected ? 'border-success' : ''" variant="outlined" density="comfortable" @click="toggle">
            <v-icon start :icon="pt.icon" />
            {{ $t('Common.' + pt.value) }}
            <v-icon end :icon="isSelected ? 'mdi-checkbox-marked-circle' : 'mdi-circle-outline'" :color="isSelected ? 'green' : ''" />
          </v-chip>
        </v-item>
      </v-item-group>
    </v-col>
  </v-row>
  <v-row v-if="mode === 'edit' && !hideBarcodeMode && productIsTypeProduct" class="mt-0">
    <v-col>
      <v-btn class="mb-2" size="small" prepend-icon="mdi-barcode-scan" :class="productForm.product ? 'border-success' : 'border-error'" @click="showBarcodeScannerDialog">
        {{ $t('Common.ProductFind') }}
      </v-btn>
      <ProductCard v-if="productForm.product" :product="productForm.product" :hideCategoriesAndLabels="true" :hideProductBarcode="hideProductBarcode" :hideActionMenuButton="true" :readonly="true" elevation="1" />
    </v-col>
  </v-row>
  <v-row v-else-if="mode === 'edit' && productIsTypeCategory" class="mt-0">
    <v-col cols="6">
      <div class="text-subtitle-2 required">
        {{ $t('AddPriceSingle.ProductInfo.CategoryLabel') }}
      </div>
      <v-autocomplete
        v-model="productForm.category_tag"
        :class="productForm.category_tag ? 'outline-border-success' : 'outline-border-error'"
        density="compact"
        variant="outlined"
        :items="categoryTags"
        :item-title="item => item.name"
        :item-value="item => item.id"
        hide-details="auto"
      />
    </v-col>
    <v-col cols="6">
      <div class="text-subtitle-2">
        {{ $t('AddPriceSingle.ProductInfo.OriginLabel') }}
      </div>
      <v-autocomplete
        v-model="productForm.origins_tags"
        density="compact"
        variant="outlined"
        :items="originTags"
        :item-title="item => item.name"
        :item-value="item => item.id"
        hide-details="auto"
      />
    </v-col>
    <v-col class="pt-0" cols="6">
      <v-switch
        v-for="lt in labelTags"
        :key="lt.id"
        v-model="productForm.labels_tags"
        density="compact"
        color="success"
        :label="lt.name"
        :value="lt.id"
        hide-details="auto"
      />
    </v-col>
  </v-row>

  <v-row v-else-if="mode === 'display'">
    <v-col v-if="productIsTypeProduct" cols="12">
      <v-alert
        class="mb-2"
        icon="mdi-barcode"
        density="compact"
      >
        {{ productForm.product_code }}
      </v-alert>
      <ProductCard v-if="productForm.product" :product="productForm.product" :hideCategoriesAndLabels="true" :hideProductBarcode="true" :hideActionMenuButton="true" :readonly="true" elevation="1" />
    </v-col>
    <v-col v-else-if="productIsTypeCategory" cols="12">
      <v-alert
        icon="mdi-basket-outline"
        density="compact"
      >
        <PriceCategoryChip :priceCategory="productForm.category_tag" />
        <PriceCategoryDetails :price="productForm" />
      </v-alert>
    </v-col>
  </v-row>

  <BarcodeScannerDialog
    v-if="barcodeScannerDialog"
    v-model="barcodeScannerDialog"
    :hideBarcodeScannerTab="hideBarcodeScannerTab"
    :barcodeManualInputPrefillValue="productForm.product_code"
    :barcodeManualInputCroppedImage="productForm.croppedImage"
    :barcodeManualInputSimilarBarcodes="productForm.similar_barcodes"
    @barcode="setProductCode($event)"
    @close="barcodeScannerDialog = false"
  />
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
    ProductCard: defineAsyncComponent(() => import('../components/ProductCard.vue')),
    PriceCategoryChip: defineAsyncComponent(() => import('../components/PriceCategoryChip.vue')),
    PriceCategoryDetails: defineAsyncComponent(() => import('../components/PriceCategoryDetails.vue')),
    BarcodeScannerDialog: defineAsyncComponent(() => import('../components/BarcodeScannerDialog.vue')),
  },
  props: {
    productForm: {
      type: Object,
      default: () => ({
        type: null,
        product: null,
        product_code: '',
        category_tag: null,
        origins_tags: '',
        labels_tags: []
      })
    },
    mode: {
      type: String,
      default: constants.PRICE_FORM_DISPLAY_LIST[1].key,  // 'edit'
    },
    disableInitWhenSwitchingType: {
      type: Boolean,
      default: () => false
    },
    hideBarcodeMode: {
      type: Boolean,
      default: false
    },
    hideProductBarcode: {
      type: Boolean,
      default: true
    },
    hideBarcodeScannerTab: {
      type: Boolean,
      default: false
    }
  },
  emits: ['filled'],
  data() {
    return {
      categoryTags: [],  // list of category tags for autocomplete  // see initPriceMultipleForm
      originTags: [],  // list of origins tags for autocomplete  // see initPriceMultipleForm
      labelTags: [],  // list of labels tags for checkboxes  // see initPriceMultipleForm
      barcodeScannerDialog: false,
    }
  },
  computed: {
    ...mapStores(useAppStore),
    productIsTypeProduct() {
      return this.productForm && this.productForm.type === constants.PRICE_TYPE_PRODUCT
    },
    productIsTypeCategory() {
      return this.productForm && this.productForm.type === constants.PRICE_TYPE_CATEGORY
    },
    productTypeDisplayList() {
      if (this.hideBarcodeMode) {
        return constants.PRICE_TYPE_LIST.filter(pt => pt.key !== constants.PRICE_TYPE_PRODUCT)
      }
      return constants.PRICE_TYPE_LIST
    },
    productBarcodeFormFilled() {
      let keys = ['product_code']
      return Object.keys(this.productForm).filter(k => keys.includes(k)).every(k => !!this.productForm[k])
    },
    productCategoryFormFilled() {
      let keys = ['category_tag']  // 'origins_tags'
      return Object.keys(this.productForm).filter(k => keys.includes(k)).every(k => !!this.productForm[k])
    },
    productFormFilled() {
      return this.productBarcodeFormFilled || this.productCategoryFormFilled
    },
  },
  watch: {
    productFormFilled: {
      handler(newProductFormFilled, oldProductFormFilled) {  // eslint-disable-line no-unused-vars
        this.$emit('filled', newProductFormFilled)
      },
      immediate: true
    }
  },
  mounted() {
    if (this.$route.query.code) {
      if (this.$route.query.code.includes(':')) {
        this.productForm.type = constants.PRICE_TYPE_CATEGORY
        this.productForm.category_tag = this.$route.query.code
      }
      else {
        this.productForm.type = constants.PRICE_TYPE_PRODUCT
        this.productForm.product_code = this.$route.query.code
      }
    }
    utils.getLocaleCategoryTags(this.appStore.getUserLanguage).then((module) => {
      this.categoryTags = module.default
    })
    utils.getLocaleOriginTags(this.appStore.getUserLanguage).then((module) => {
      this.originTags = module.default
    })
    utils.getLocaleLabelTags(this.appStore.getUserLanguage).then((module) => {
      this.labelTags = module.default
    })
    this.productForm.type = this.productForm.type ? this.productForm.type : (this.productForm.product_code ? constants.PRICE_TYPE_PRODUCT : this.appStore.user.last_product_product_used)
    if (this.productForm.product_code) {
      this.getProduct(this.productForm.product_code)
    }
  },
  methods: {
    showBarcodeScannerDialog() {
      this.barcodeScannerDialog = true
    },
    initProductForm() {
      this.productForm.product = null
      this.productForm.product_code = ''
      this.productForm.category_tag = null
      this.productForm.origins_tags = ''
      this.productForm.labels_tags = []
    },
    setType(type) {
      this.productForm.type = type
      if (!this.disableInitWhenSwitchingType) {
        this.initProductForm()
      }
    },
    setProductCode(code) {
      this.productForm.product_code = code
      this.getProduct(code)
    },
    getProduct(code) {
      this.productForm.product = null
      api
        .getProductByCode(code)
        .then((data) => {
          this.productForm.product = data.id ? data : {'code': code, 'price_count': 0}
        })
        .catch((error) => {  // eslint-disable-line no-unused-vars
          alert("Error: Open Prices server error")
        })
    },
  }
}
</script>
