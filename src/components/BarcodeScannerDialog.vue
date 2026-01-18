<template>
  <v-dialog scrollable :height="dialogHeight" :width="dialogWidth">
    <v-card :title="$t('Common.ProductFind')">
      <template #append>
        <v-icon icon="mdi-close" @click="close" />
      </template>

      <v-divider />

      <v-card-text>
        <v-img
          v-if="barcodeManualInputCroppedImage"
          :src="getImageFullUrl"
          contain
          max-height="50%"
        />
        <v-tabs v-model="currentDisplay">
          <v-tab v-for="item in displayItems" :key="item.key" :value="item.key">
            <v-icon start>
              {{ item.icon }}
            </v-icon>
            <span v-if="$vuetify.display.smAndUp">{{ $t('Common.' + item.value) }}</span>
            <span v-else>
              <span v-if="item.valueSmallScreen">{{ $t('Common.' + item.valueSmallScreen) }}</span>
            </span>
          </v-tab>
        </v-tabs>

        <v-tabs-window v-model="currentDisplay" disabled>
          <v-tabs-window-item value="scan">
            <div v-if="barcodeScannerLibrary === 'html5-qrcode'" id="reader" width="500px" />
            <barcode-scanner v-else runScanner="true" @barcode-scanner-state="onScanStateChanged" />
          </v-tabs-window-item>

          <v-tabs-window-item value="type">
            <v-form v-model="barcodeManualFormValid" class="mb-2" @submit.prevent="barcodeSearchOrSend">
              <v-text-field
                ref="barcodeManualInput"
                v-model="barcodeManualForm.barcode"
                :label="$t('Common.Barcode')"
                type="text"
                inputmode="numeric"
                :pattern="barcodeManualInputMode === 'search' ? '[0-9*]+' : '[0-9]+'"
                prepend-inner-icon="mdi-barcode"
                :hint="barcodeManualInputLength"
                clearable
                persistent-hint
              >
                <template #append-inner>
                  <v-btn color="primary" :icon="barcodeManualInputMode === 'search' ? 'mdi-magnify' : 'mdi-plus'" :disabled="!barcodeManualFormValid" @click="barcodeSearchOrSend" />
                </template>
              </v-text-field>
            </v-form>
            <ProductCard v-for="product in productSearchResultList" :key="product" :product="product" :hideCategoriesAndLabels="true" :hideActionMenuButton="true" :readonly="true" elevation="1" @click="barcodeSend(product.code)" />
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>

      <v-divider v-if="currentDisplay === 'scan'" />

      <v-card-actions v-if="currentDisplay === 'scan'" class="justify-end">
        <div>
          <i18n-t keypath="BarcodeScanner.Htlm5-qrcode.Text" tag="span">
            <template #url>
              <a v-if="barcodeScannerLibrary === 'html5-qrcode'" :href="HTML5_QRCODE_URL" target="_blank">{{ HTML5_QRCODE_NAME }}</a>
              <a v-else :href="BARCODE_SCANNER_URL" target="_blank">{{ BARCODE_SCANNER_NAME }}</a>
            </template>
          </i18n-t>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import "@webcomponents/webcomponentsjs/webcomponents-loader.js"
import "@openfoodfacts/openfoodfacts-webcomponents"
import { Html5Qrcode, Html5QrcodeScanType } from 'html5-qrcode'
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import openPricesApi from '../services/openPricesApi'
import openFoodFactsApi from '../services/openFoodFactsApi'
import constants from '../constants'
import proof_utils from '../utils/proof.js'

const config = {
  fps: 10,
  qrbox: { width: 250, height: 150 },
  rememberLastUsedCamera: false,
  // Only support camera scan type.
  supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
  // formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE, Html5QrcodeSupportedFormats.EAN_13],
}

export default {
  components: {
    ProductCard: defineAsyncComponent(() => import('../components/ProductCard.vue')),
  },
  props: {
    hideBarcodeScannerTab: {
      type: Boolean,
      default: false
    },
    barcodeManualInputMode: {
      type: String,
      default: 'search'  // 'add'
    },
    barcodeManualInputPrefillValue: {
      type: String,
      default: ''
    },
    barcodeManualInputCroppedImage: {
      type: String,
      default: ''
    },
  },
  emits: ['barcode', 'close'],
  data() {
    return {
      scanner: null,
      barcodeManualForm: {
        barcode: '',
      },
      barcodeManualFormValid: false,
      productSearchResultList: [],
      // config
      currentDisplay: null,  // see mounted
      HTML5_QRCODE_URL: 'https://github.com/mebjas/html5-qrcode',
      HTML5_QRCODE_NAME: 'html5-qrcode',
      BARCODE_SCANNER_URL: 'https://github.com/openfoodfacts/openfoodfacts-webcomponents',
      BARCODE_SCANNER_NAME: 'openfoodfacts-webcomponents',
      barcodeScannerLibrary: window.BarcodeDetector ? 'off-barcode-scanner' : 'html5-qrcode'
    }
  },
  computed: {
    ...mapStores(useAppStore),
    dialogHeight() {
      return this.$vuetify.display.smAndUp ? '80%' : '100%'
    },
    dialogWidth() {
      return this.$vuetify.display.smAndUp ? '80%' : '100%'
    },
    displayItems() {
      if (this.hideBarcodeScannerTab) {
        return constants.PRODUCT_SELECTOR_DISPLAY_LIST.filter(item => item.key !== constants.PRODUCT_SELECTOR_DISPLAY_LIST[0].key)
      }
      return constants.PRODUCT_SELECTOR_DISPLAY_LIST
    },
    getImageFullUrl() {
      return proof_utils.getImageFullUrl(this.barcodeManualInputCroppedImage)
    },
    barcodeManualInputLength() {
      if (!this.barcodeManualForm.barcode) return '0'
      return this.barcodeManualForm.barcode.length.toString()
    },
    barcodeManualInputRules() {
      return [
        (v) => !!v || '',
      ]
    },
  },
  watch: {
    currentDisplay(value) {
      if (value === constants.PRODUCT_SELECTOR_DISPLAY_LIST[0].key) {
        if (this.hideBarcodeScannerTab) {
          this.currentDisplay = constants.PRODUCT_SELECTOR_DISPLAY_LIST[1].key
        } else {
          if (this.barcodeScannerLibrary === 'html5-qrcode') {
            window.setTimeout(() => this.createQrcodeScanner(), 200)
          }
        }
      } else {  // type
        window.setTimeout(() => this.$refs.barcodeManualInput.focus(), 200)
        if (this.scanner && this.scanner.getState() > 1) {
          this.scanner.stop()
        }
      }
    }
  },
  mounted() {
    if (this.barcodeManualInputPrefillValue) {
      this.barcodeManualForm.barcode = this.barcodeManualInputPrefillValue
    }
    // init tab
    this.currentDisplay = this.appStore.user.barcode_scanner_default_mode
    if (this.appStore.user.barcode_scanner_library != 'auto') {
      this.barcodeScannerLibrary = this.appStore.user.barcode_scanner_library
    }
  },
  methods: {
    createQrcodeScanner() {
      this.scanner = new Html5Qrcode('reader')
      this.scanner.start({ facingMode: 'environment' }, config, this.onScanSuccess, this.onScanFailure)
    },
    onScanStateChanged(state) {
      if (state.detail.state === 'detected') {
        this.barcodeSend(state.detail.barcode)
      }
    },
    onScanSuccess(decodedText, decodedResult) {  // eslint-disable-line no-unused-vars
      this.barcodeSend(decodedText)
    },
    onScanFailure(error) {  // eslint-disable-line no-unused-vars
      // console.warn(`Code scan error = ${error}`)
    },
    barcodeSearchOrSend() {
      this.barcodeManualForm.barcode = this.barcodeManualForm.barcode.trim()
      if (!this.barcodeManualFormValid) return
      if (this.barcodeManualInputMode === 'search') {
        this.$refs.barcodeManualInput.blur()
        if (this.barcodeManualForm.barcode.includes('*')) {
          this.searchProduct(this.barcodeManualForm.barcode)
        } else {
          this.getProduct(this.barcodeManualForm.barcode)
        }
      } else {
        this.barcodeSend(this.barcodeManualForm.barcode)
      }
    },
    getProduct(code) {
      this.productSearchResultList = []
      openPricesApi
        .getProductByCode(code)
        .then((data) => {
          const product = data.id ? data : {'code': code, 'price_count': 0}
          this.productSearchResultList.push(product)
        })
        .catch((error) => {
          alert(this.$t('Common.ServerError'))
          console.log(error)
        })
    },
    searchProduct(code) {
      this.productSearchResultList = []
      openFoodFactsApi
        .searchaliciousProductSearch(code)
        .then((data) => {
          for (let product of data['hits']) {
            if (product['code']) {
              product['source'] = 'off'
              product['brands'] = product['brands'].join(',')  // returns an array instead of a string
              // product['product_quantity'] = product['product_quantity'] || product['quantity']  // product_quantity not yet returned
              if (product['quantity']) {
                product['product_name'] += ` (${product["quantity"]})`
              }
              this.productSearchResultList.push(product)
            }
          }
        })
        .catch((error) => {
          alert(this.$t('Common.ServerError'))
          console.log(error)
        })
    },
    barcodeSend(barcode) {
      this.$emit('barcode', barcode)
      this.close()
    },
    close() {
      // https://scanapp.org/html5-qrcode-docs/docs/apis/enums/Html5QrcodeScannerState
      if (this.scanner && this.scanner.getState() > 1) {
        this.scanner.stop()
      }
      this.$emit('close')
    },
  }
}
</script>
