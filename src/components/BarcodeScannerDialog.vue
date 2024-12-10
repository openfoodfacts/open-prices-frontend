<template>
  <v-dialog scrollable min-height="50%" max-height="80%" min-width="50%">
    <v-card>
      <v-card-title>
        {{ $t('Common.ProductFind') }} <v-btn style="float:right;" variant="text" density="compact" icon="mdi-close" @click="close" />
      </v-card-title>

      <v-divider />

      <v-card-text>
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
            <div id="reader" width="500px" />
          </v-tabs-window-item>

          <v-tabs-window-item value="type">
            <v-form v-model="barcodeManualFormValid" class="mb-2" @submit.prevent="barcodeSearchOrSend">
              <v-text-field
                ref="barcodeManualInput"
                v-model="barcodeManualForm.barcode"
                :label="$t('Common.Barcode')"
                type="number"
                inputmode="numeric"
                prepend-inner-icon="mdi-barcode"
                :hint="barcodeManualForm.barcode.length.toString()"
                persistent-hint
              >
                <template #append-inner>
                  <v-icon :icon="barcodeManualInputMode === 'search' ? 'mdi-magnify' : 'mdi-plus'" :disabled="!barcodeManualFormValid" @click="barcodeSearchOrSend" />
                </template>
              </v-text-field>
            </v-form>
            <ProductCard v-if="product" :product="product" :hideCategoriesAndLabels="true" :hideProductActions="true" :readonly="true" elevation="1" @click="barcodeSend(product.code)" />
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>

      <v-divider v-if="currentDisplay === 'scan'" />

      <v-card-actions v-if="currentDisplay === 'scan'" class="justify-end">
        <div>
          <i18n-t keypath="BarcodeScanner.Htlm5-qrcode.Text" tag="span">
            <template #url>
              <a :href="HTML5_QRCODE_URL" target="_blank">{{ HTML5_QRCODE_NAME }}</a>
            </template>
          </i18n-t>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { Html5Qrcode, Html5QrcodeScanType } from 'html5-qrcode'
import { defineAsyncComponent } from 'vue'
import { mapStores } from 'pinia'
import { useAppStore } from '../store'
import api from '../services/api'
import constants from '../constants'

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
    barcodeManualInputMode: {
      type: String,
      default: 'search'  // 'add'
    },
    barcodeManualInputPrefillValue: {
      type: String,
      default: ''
    }
  },
  emits: ['barcode', 'close'],
  data() {
    return {
      scanner: null,
      barcodeManualForm: {
        barcode: '',
      },
      barcodeManualFormValid: false,
      product: null,
      // config
      displayItems: constants.PRODUCT_SELECTOR_DISPLAY_LIST,
      currentDisplay: null,  // see mounted
      HTML5_QRCODE_URL: 'https://github.com/mebjas/html5-qrcode',
      HTML5_QRCODE_NAME: 'html5-qrcode'
    }
  },
  computed: {
    ...mapStores(useAppStore),
    barcodeManualInputRules() {
      return [
        (v) => !!v || '',
      ]
    },
  },
  watch: {
    currentDisplay(value) {
      if (value === constants.PRODUCT_SELECTOR_DISPLAY_LIST[0].key) {
        window.setTimeout(() => this.createQrcodeScanner(), 200)
      } else {  // type
        window.setTimeout(() => this.$refs.barcodeManualInput.focus(), 200)
        if (this.scanner) {
          this.scanner.stop()
        }
      }
    }
  },
  mounted() {
    if (this.preFillValue) {
      this.barcodeManualForm.barcode = this.preFillValue
    }
    // init tab
    if (this.appStore.user.barcode_scanner_default_mode === constants.PRODUCT_SELECTOR_DISPLAY_LIST[1].key) {
      this.currentDisplay = constants.PRODUCT_SELECTOR_DISPLAY_LIST[1].key
    } else {
      // default to scan
      this.currentDisplay = constants.PRODUCT_SELECTOR_DISPLAY_LIST[0].key
    }
  },
  methods: {
    createQrcodeScanner() {
      this.scanner = new Html5Qrcode('reader')
      this.scanner.start({ facingMode: 'environment' }, config, this.onScanSuccess, this.onScanFailure)
    },
    onScanSuccess(decodedText, decodedResult) {  // eslint-disable-line no-unused-vars
      this.barcodeSend(decodedText)
    },
    onScanFailure(error) {  // eslint-disable-line no-unused-vars
      // console.warn(`Code scan error = ${error}`)
    },
    barcodeSearchOrSend() {
      if (!this.barcodeManualFormValid) return
      if (this.barcodeManualInputMode === 'search') {
        this.getProduct(this.barcodeManualForm.barcode)
      } else {
        this.barcodeSend(this.barcodeManualForm.barcode)
      }
    },
    getProduct(code) {
      this.product = null
      api
        .getProductByCode(code)
        .then((data) => {
          this.product = data.id ? data : {'code': code, 'price_count': 0}
        })
        .catch((error) => {  // eslint-disable-line no-unused-vars
          alert("Error: Open Prices server error")
        })
    },
    barcodeSend(barcode) {
      this.$emit('barcode', barcode)
      this.close()
    },
    close() {
      // https://scanapp.org/html5-qrcode-docs/docs/apis/enums/Html5QrcodeScannerState
      if (this.scanner.getState() > 1) {
        this.scanner.stop()
      }
      this.$emit('close')
    },
  }
}
</script>
