<template>
  <v-dialog>
    <v-card>
      <v-card-title>Scan a barcode</v-card-title>

      <v-divider></v-divider>

      <v-card-text>
        <div id="reader" width="500px"></div>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text>
        <div class="float-right">powered by <a href="https://github.com/mebjas/html5-qrcode" target="_blank">html5-qrcode</a></div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { Html5QrcodeScanner, Html5QrcodeScanType, Html5QrcodeSupportedFormats } from 'html5-qrcode'

const config = {
  fps: 10,
  qrbox: { width: 250, height: 150 },
  rememberLastUsedCamera: true,
  // Only support camera scan type.
  supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
}

const formatsToSupport = [
  Html5QrcodeSupportedFormats.QR_CODE,
  Html5QrcodeSupportedFormats.EAN_13,
]

export default {
  mounted() {
    this.createQrcodeScanner()
  },
  methods: {
    createQrcodeScanner() {
      const html5QrcodeScanner = new Html5QrcodeScanner('reader', config, formatsToSupport, false)
      html5QrcodeScanner.render(this.onScanSuccess, this.onScanFailure)
    },
    onScanSuccess(decodedText, decodedResult) {
      this.$emit('barcode', decodedText)
      this.close()
    },
    onScanFailure(error) {
      // console.warn(`Code scan error = ${error}`)
    },
    close() {
      this.$emit('close')
    },
  }
}
</script>
