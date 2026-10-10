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
        <v-tabs v-model="currentDisplay" :grow="!$vuetify.display.smAndUp">
          <v-tab v-for="item in displayItems" :key="item.key" :value="item.key">
            <v-icon
              :start="$vuetify.display.smAndUp || !!item.valueSmallScreen"
            >
              {{ item.icon }}
            </v-icon>
            <span v-if="$vuetify.display.smAndUp">{{
              $t("Common." + item.value)
            }}</span>
            <span v-else>
              <span v-if="item.valueSmallScreen">{{
                $t("Common." + item.valueSmallScreen)
              }}</span>
            </span>
          </v-tab>
        </v-tabs>

        <v-tabs-window v-model="currentDisplay" disabled>
          <v-tabs-window-item value="scan">
            <template v-if="barcodeScannerLibrary === 'html5-qrcode'">
              <v-alert
                v-if="scannerError"
                type="error"
                variant="outlined"
                density="compact"
                class="mb-2"
                :text="
                  $t('BarcodeScanner.CameraError', { error: scannerError })
                "
              />
              <div id="reader" width="500px" />
            </template>
            <barcode-scanner
              v-else-if="barcodeScannerLibrary === 'off-barcode-scanner'"
              runScanner="true"
              @barcode-scanner-state="onScanStateChanged"
            />
          </v-tabs-window-item>

          <v-tabs-window-item value="type">
            <v-form class="mb-4" @submit.prevent="barcodeSearchOrSend">
              <v-text-field
                ref="barcodeManualInput"
                v-model="barcodeManualForm.barcode"
                :label="$t('Common.Barcode')"
                type="text"
                inputmode="numeric"
                :pattern="
                  barcodeManualInputMode === 'search' ? '[0-9*]+' : '[0-9]+'
                "
                prepend-inner-icon="mdi-barcode"
                :hint="barcodeManualInputLength"
                clearable
                persistent-hint
                @update:modelValue="
                  (newValue) =>
                    (barcodeManualForm.barcode =
                      numericAndWildcardOnly(newValue))
                "
              >
                <template #append-inner>
                  <v-btn
                    color="primary"
                    :icon="
                      barcodeManualInputMode === 'search'
                        ? 'mdi-magnify'
                        : 'mdi-plus'
                    "
                    :disabled="!barcodeManualForm.barcode"
                    @click="barcodeSearchOrSend"
                  />
                </template>
              </v-text-field>
            </v-form>

            <!-- results -->
            <ProductCard
              v-for="product in productSearchResultList"
              :key="product"
              :product="product"
              :hideCategoriesAndLabels="true"
              :hideActionMenuButton="true"
              :readonly="true"
              elevation="1"
              @click="barcodeSend(product.code)"
            />

            <div v-if="barcodeManualInputSimilarBarcodeList.length">
              <h3 class="mt-4 mb-1">
                {{ $t("BarcodeScanner.SimilarBarcodes") }}
              </h3>
              <p class="mb-2">
                {{ $t("BarcodeScanner.SimilarBarcodesExplanation") }}
              </p>
              <v-row>
                <v-col
                  v-for="similarProduct in productSimilarBarcodeResultList"
                  :key="similarProduct.code"
                  cols="12"
                  sm="6"
                  md="4"
                  xl="3"
                >
                  <ProductCard
                    :product="similarProduct"
                    :hideCategoriesAndLabels="true"
                    :hideActionMenuButton="true"
                    :hideProductBarcode="false"
                    :readonly="true"
                    elevation="1"
                    @click="barcodeSend(similarProduct.code)"
                  />
                </v-col>
              </v-row>
            </div>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>

      <v-divider v-if="currentDisplay === 'scan'" />

      <v-card-actions v-if="currentDisplay === 'scan'" class="justify-end">
        <div>
          <i18n-t keypath="BarcodeScanner.Htlm5-qrcode.Text" tag="span">
            <template #url>
              <a
                v-if="barcodeScannerLibrary === 'html5-qrcode'"
                :href="HTML5_QRCODE_URL"
                target="_blank"
                rel="noopener noreferrer"
                >{{ HTML5_QRCODE_NAME }}</a
              >
              <a
                v-else
                :href="BARCODE_SCANNER_URL"
                target="_blank"
                rel="noopener noreferrer"
                >{{ BARCODE_SCANNER_NAME }}</a
              >
            </template>
          </i18n-t>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import "@webcomponents/webcomponentsjs/webcomponents-loader.js";
import "@openfoodfacts/openfoodfacts-webcomponents";
import { Html5Qrcode } from "html5-qrcode";
import { defineAsyncComponent } from "vue";
import { mapStores } from "pinia";
import { useAppStore } from "../store";
import openPricesApi from "../services/openPricesApi";
import openFoodFactsApi from "../services/openFoodFactsApi";
import constants from "../constants";
import utils from "../utils.js";
import proof_utils from "../utils/proof.js";

const config = {
  fps: 10,
  qrbox: { width: 250, height: 150 },
  // formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE, Html5QrcodeSupportedFormats.EAN_13],
};

export default {
  components: {
    ProductCard: defineAsyncComponent(
      () => import("../components/ProductCard.vue"),
    ),
  },
  props: {
    hideBarcodeScannerTab: {
      type: Boolean,
      default: false,
    },
    barcodeManualInputMode: {
      type: String,
      default: "search", // 'add'
    },
    barcodeManualInputPrefillValue: {
      type: String,
      default: "",
    },
    barcodeManualInputCroppedImage: {
      type: String,
      default: "",
    },
    barcodeManualInputSimilarBarcodeList: {
      // backend sometimes returns similar_barcodes, sorted by increasing Levenshtein distance
      type: Array,
      default: () => [],
      example: [
        { barcode: "123", distance: 1 },
        { barcode: "456", distance: 2 },
      ],
    },
  },
  emits: ["barcode", "close"],
  data() {
    return {
      scanner: null,
      scannerStartTimeout: null,
      scannerError: null,
      isUnmounted: false,
      barcodeManualForm: {
        barcode: "",
      },
      productSearchResultList: [],
      productSimilarBarcodeResultList: [],
      // config
      currentDisplay: null, // see mounted
      HTML5_QRCODE_URL: "https://github.com/mebjas/html5-qrcode",
      HTML5_QRCODE_NAME: "html5-qrcode",
      BARCODE_SCANNER_URL:
        "https://github.com/openfoodfacts/openfoodfacts-webcomponents",
      BARCODE_SCANNER_NAME: "openfoodfacts-webcomponents",
      barcodeScannerLibrary: null, // see mounted
    };
  },
  computed: {
    ...mapStores(useAppStore),
    dialogHeight() {
      return this.$vuetify.display.smAndUp ? "80%" : "100%";
    },
    dialogWidth() {
      return this.$vuetify.display.smAndUp ? "80%" : "100%";
    },
    displayItems() {
      if (this.hideBarcodeScannerTab) {
        return constants.PRODUCT_SELECTOR_DISPLAY_LIST.filter(
          (item) => item.key !== constants.PRODUCT_SELECTOR_DISPLAY_LIST[0].key,
        );
      }
      return constants.PRODUCT_SELECTOR_DISPLAY_LIST;
    },
    getImageFullUrl() {
      return proof_utils.getImageFullUrl(this.barcodeManualInputCroppedImage);
    },
    barcodeManualInputLength() {
      if (!this.barcodeManualForm.barcode) return "0";
      return this.barcodeManualForm.barcode.length.toString();
    },
  },
  watch: {
    currentDisplay(value) {
      if (value === constants.PRODUCT_SELECTOR_DISPLAY_LIST[0].key) {
        if (this.hideBarcodeScannerTab) {
          this.currentDisplay = constants.PRODUCT_SELECTOR_DISPLAY_LIST[1].key;
        } else {
          if (this.barcodeScannerLibrary === "html5-qrcode") {
            this.scannerStartTimeout = window.setTimeout(
              () => this.createQrcodeScanner(),
              200,
            );
          }
        }
      } else {
        // type
        window.setTimeout(() => this.$refs.barcodeManualInput?.focus?.(), 200);
        this.stopQrcodeScanner();
      }
    },
  },
  async mounted() {
    // init search(s)
    if (this.barcodeManualInputPrefillValue) {
      this.barcodeManualForm.barcode = this.barcodeManualInputPrefillValue;
      this.barcodeSearchOrSend();
    }
    if (this.barcodeManualInputSimilarBarcodeList.length) {
      for (let barcode of this.barcodeManualInputSimilarBarcodeList) {
        this.productSimilarBarcodeResultList.push({
          code: barcode.barcode,
          price_count: 0,
        });
        this.getProduct(barcode.barcode, false);
      }
    }
    // init library, then tab (the tab watcher starts the scanner)
    this.barcodeScannerLibrary = await this.getBarcodeScannerLibrary();
    if (this.isUnmounted) return;
    this.currentDisplay = this.appStore.user.barcode_scanner_default_mode;
  },
  beforeUnmount() {
    this.isUnmounted = true;
    // the dialog can be unmounted without calling close() (click outside, back button):
    // release the camera, otherwise it stays busy and the next scanner can't start
    this.stopQrcodeScanner();
  },
  methods: {
    async getBarcodeScannerLibrary() {
      if (this.appStore.user.barcode_scanner_library !== "auto") {
        return this.appStore.user.barcode_scanner_library;
      }
      // BarcodeDetector can exist without a working detection service
      // (e.g. Android without Google Play Services): it then supports no formats
      try {
        const formats = await window.BarcodeDetector?.getSupportedFormats();
        if (formats?.includes("ean_13")) return "off-barcode-scanner";
      } catch (error) {
        console.warn(error);
      }
      return "html5-qrcode";
    },
    createQrcodeScanner() {
      this.scannerStartTimeout = null;
      this.scannerError = null;
      const scanner = new Html5Qrcode("reader");
      this.scanner = scanner;
      scanner
        .start(
          { facingMode: "environment" },
          config,
          this.onScanSuccess,
          this.onScanFailure,
        )
        .then(() => {
          // stop was requested while the camera was starting
          if (this.scanner !== scanner) {
            scanner.stop().catch((error) => console.error(error));
          }
        })
        .catch((error) => {
          this.scannerError = error?.message || String(error);
          console.error(error);
        });
    },
    stopQrcodeScanner() {
      window.clearTimeout(this.scannerStartTimeout);
      this.scannerStartTimeout = null;
      // https://scanapp.org/html5-qrcode-docs/docs/apis/enums/Html5QrcodeScannerState
      if (this.scanner && this.scanner.getState() > 1) {
        this.scanner.stop().catch((error) => console.error(error));
      }
      this.scanner = null;
    },
    onScanStateChanged(state) {
      if (state.detail.state === "detected") {
        this.barcodeSend(state.detail.barcode);
      }
    },
    // eslint-disable-next-line no-unused-vars
    onScanSuccess(decodedText, decodedResult) {
      this.barcodeSend(decodedText);
    },
    // eslint-disable-next-line no-unused-vars
    onScanFailure(error) {
      // console.warn(`Code scan error = ${error}`)
    },
    numericAndWildcardOnly(value) {
      return utils.numericAndWildcardOnly(value);
    },
    barcodeSearchOrSend() {
      this.barcodeManualForm.barcode = this.barcodeManualForm.barcode.trim();
      if (this.barcodeManualInputMode === "search") {
        this.$refs.barcodeManualInput?.blur?.();
        if (this.barcodeManualForm.barcode.includes("*")) {
          this.searchProduct(this.barcodeManualForm.barcode);
        } else {
          this.getProduct(this.barcodeManualForm.barcode, true);
        }
      } else {
        this.barcodeSend(this.barcodeManualForm.barcode);
      }
    },
    getProduct(code, search = true) {
      if (search) {
        this.productSearchResultList = [];
      }
      openPricesApi
        .getProductByCode(code)
        .catch((error) => {
          if (error.status === 404) return { code: code, price_count: 0 }; // product not in Open Prices (yet)
          throw error;
        })
        .then((product) => {
          if (search) {
            this.productSearchResultList.push(product);
          } else {
            const similarBarcodeResultIndex =
              this.barcodeManualInputSimilarBarcodeList.findIndex(
                (item) => item.barcode === code,
              );
            this.productSimilarBarcodeResultList[similarBarcodeResultIndex] =
              product;
          }
        })
        .catch((error) => {
          alert(this.$t("Common.ServerError"));
          console.log(error);
        });
    },
    searchProduct(code) {
      this.productSearchResultList = [];
      openFoodFactsApi
        .searchaliciousProductSearch(code)
        .then((data) => {
          for (let product of data["hits"]) {
            if (product["code"]) {
              product["source"] = "off";
              product["brands"] = product["brands"].join(","); // returns an array instead of a string
              // product['product_quantity'] = product['product_quantity'] || product['quantity']  // product_quantity not yet returned
              if (product["quantity"]) {
                product["product_name"] += ` (${product["quantity"]})`;
              }
              this.productSearchResultList.push(product);
            }
          }
        })
        .catch((error) => {
          alert(this.$t("Common.ServerError"));
          console.log(error);
        });
    },
    barcodeSend(barcode) {
      this.$emit("barcode", barcode);
      this.close();
    },
    close() {
      this.stopQrcodeScanner();
      this.$emit("close");
    },
  },
};
</script>
