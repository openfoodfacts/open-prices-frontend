<template>
  <v-dialog scrollable max-height="80%" min-width="50%" width="auto">
    <v-card>
      <v-card-title>
        {{ $t('BarcodeScanner.Scan') }} <v-btn style="float:right;" variant="text" density="compact" icon="mdi-close" @click="close" />
      </v-card-title>

      <v-divider />

      <v-card-text>
        <div id="reader" width="500px" />
      </v-card-text>

      <v-divider />

      <v-card-actions class="justify-end">
        <div>
          <i18n-t keypath="BarcodeScanner.Htlm5-qrcode.Text" tag="span">
            <template #url>
              <a href="https://github.com/mebjas/html5-qrcode" target="_blank">html5-qrcode</a>
            </template>
          </i18n-t>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { Html5Qrcode, Html5QrcodeScanType } from 'html5-qrcode'

const config = {
  fps: 10,
  qrbox: { width: 250, height: 150 },
  rememberLastUsedCamera: false,
  // Only support camera scan type.
  supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
  // formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE, Html5QrcodeSupportedFormats.EAN_13],
}

export default {
  emits: ['barcode', 'close'],
  data() {
    return {
      scanner: null,
    }
  },
  mounted() {
    this.createQrcodeScanner()
  },
  methods: {
    createQrcodeScanner() {
      this.scanner = new Html5Qrcode('reader')
      this.scanner.start({ facingMode: 'environment' }, config, this.onScanSuccess, this.onScanFailure)
    },
    onScanSuccess(decodedText, decodedResult) {  // eslint-disable-line no-unused-vars
      this.$emit('barcode', decodedText)
      this.close()
    },
    onScanFailure(error) {  // eslint-disable-line no-unused-vars
      // console.warn(`Code scan error = ${error}`)
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
