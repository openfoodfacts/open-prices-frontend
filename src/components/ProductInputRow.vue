<template>
  <v-row>
    <v-col>
      <h3 class="mb-2">
        <v-item-group v-model="productForm.mode" class="d-inline" mandatory @update:modelValue="setMode($event)">
          <v-item v-for="pm in productModeList" :key="pm.key" v-slot="{ isSelected, toggle }" :value="pm.key">
            <v-chip class="mr-1" :style="isSelected ? 'border: 1px solid #9E9E9E' : 'border: 1px solid transparent'" @click="toggle">
              <v-icon start :icon="isSelected ? 'mdi-checkbox-marked-circle' : 'mdi-circle-outline'" />
              {{ pm.value }}
            </v-chip>
          </v-item>
        </v-item-group>
      </h3>
      <v-sheet v-if="productForm.mode === 'barcode'">
        <v-btn class="mb-2 mr-2" size="small" prepend-icon="mdi-barcode-scan" @click="showBarcodeScannerDialog">
          <span class="d-sm-none">{{ $t('AddPriceSingle.ProductInfo.Scan') }}</span>
          <span class="d-none d-sm-inline-flex">{{ $t('AddPriceSingle.ProductInfo.ScanBarcode') }}</span>
        </v-btn>
        <v-btn class="mb-2" size="small" prepend-icon="mdi-numeric" @click.prevent="showBarcodeManualInputDialog">
          <span class="d-sm-none">{{ $t('AddPriceSingle.ProductInfo.Type') }}</span>
          <span class="d-none d-sm-inline-flex">{{ $t('AddPriceSingle.ProductInfo.TypeBarcode') }}</span>
        </v-btn>
        <ProductCard v-if="productForm.product" class="mb-2" :product="productForm.product" :hidePriceFooterRow="true" :hideProductActions="true" :readonly="true" elevation="1" />
      </v-sheet>
      <v-sheet v-if="productForm.mode === 'category'">
        <v-row>
          <v-col cols="6">
            <v-autocomplete
              v-model="productForm.category_tag"
              :prepend-inner-icon="productCategoryFormFilled ? 'mdi-basket-check-outline' : 'mdi-basket-outline'"
              :label="$t('AddPriceSingle.ProductInfo.CategoryLabel')"
              :items="categoryTags"
              :item-title="item => item.name"
              :item-value="item => item.id"
              hide-details="auto"
            />
          </v-col>
          <v-col cols="6">
            <v-autocomplete
              v-model="productForm.origins_tags"
              :label="$t('AddPriceSingle.ProductInfo.OriginLabel')"
              :items="originTags"
              :item-title="item => item.name"
              :item-value="item => item.id"
              hide-details="auto"
            />
          </v-col>
        </v-row>
        <div class="d-inline">
          <v-checkbox
            v-for="lt in labelsTags"
            :key="lt.id"
            v-model="productForm.labels_tags"
            :label="lt.name"
            :value="lt.id"
            hide-details="auto"
          />
        </div>
      </v-sheet>
      <p v-if="!productFormFilled" class="text-red mt-2 mb-2">
        <i>{{ $t('AddPriceSingle.ProductInfo.SetProduct') }}</i>
      </p>
    </v-col>
  </v-row>

  <BarcodeScannerDialog
    v-if="barcodeScannerDialog"
    v-model="barcodeScannerDialog"
    @barcode="setProductCode($event)"
    @close="barcodeScannerDialog = false"
  />
  <BarcodeManualInputDialog
    v-if="barcodeManualInputDialog"
    v-model="barcodeManualInputDialog"
    :preFillValue="productForm.product_code"
    @barcode="setProductCode($event)"
    @close="barcodeManualInputDialog = false"
  />
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import api from '../services/api'
import utils from '../utils.js'
import LabelsTags from '../data/labels-tags.json'

export default {
  components: {
    ProductCard: defineAsyncComponent(() => import('../components/ProductCard.vue')),
    BarcodeScannerDialog: defineAsyncComponent(() => import('../components/BarcodeScannerDialog.vue')),
    BarcodeManualInputDialog: defineAsyncComponent(() => import('../components/BarcodeManualInputDialog.vue')),
  },
  props: {
    productForm: {
      type: Object,
      default: () => ({ mode: '', product: null, product_code: '', category_tag: null, origins_tags: '', labels_tags: [] })
    }
  },
  emits: ['filled'],
  data() {
    return {
      productModeList: [
        {key: 'barcode', value: this.$t('AddPriceSingle.ProductModeList.Barcode'), icon: 'mdi-barcode-scan'},
        {key: 'category', value: this.$t('AddPriceSingle.ProductModeList.Category'), icon: 'mdi-basket-outline'}
      ],
      categoryTags: [],  // list of category tags for autocomplete  // see initPriceMultipleForm
      originTags: [],  // list of origins tags for autocomplete  // see initPriceMultipleForm
      labelsTags: LabelsTags,
      barcodeScannerDialog: false,
      barcodeManualInputDialog: false,
    }
  },
  computed: {
    ...mapStores(useAppStore),
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
      if (this.$route.query.code.startsWith('en')) {
        this.productForm.mode = 'category'
        this.productForm.category_tag = this.$route.query.code
      }
      else {
        this.productForm.mode = 'barcode'
        this.productForm.product_code = this.$route.query.code
      }
    }
    utils.getLocaleCategoryTags(this.appStore.getUserLanguage).then((module) => {
      this.categoryTags = module.default
    })
    utils.getLocaleOriginTags(this.appStore.getUserLanguage).then((module) => {
      this.originTags = module.default
    })
    this.productForm.mode = this.productForm.mode ? this.productForm.mode : (this.productForm.product_code ? 'barcode' : this.appStore.user.last_product_mode_used)
    if (this.productForm.product_code) {
      this.getProduct(this.productForm.product_code)
    }
  },
  methods: {
    showBarcodeScannerDialog() {
      this.barcodeScannerDialog = true
    },
    showBarcodeManualInputDialog() {
      this.barcodeManualInputDialog = true
    },
    initProductForm() {
      this.productForm.product = null
      this.productForm.product_code = ''
      this.productForm.category_tag = null
      this.productForm.origins_tags = ''
      this.productForm.labels_tags = []
    },
    setMode(mode) {
      this.productForm.mode = mode
      this.initProductForm()
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
