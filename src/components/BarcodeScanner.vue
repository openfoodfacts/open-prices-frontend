<template>
  <v-dialog persistent>
    <v-card>
      <v-card-title>
        Scan a barcode
        <v-btn style="float:right;" variant="text" density="compact" icon="mdi-close" @click="close"></v-btn>
      </v-card-title>

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
import { Html5Qrcode, Html5QrcodeScanType, Html5QrcodeSupportedFormats } from 'html5-qrcode'

const config = {
  fps: 10,
  qrbox: { width: 250, height: 150 },
  rememberLastUsedCamera: false,
  // Only support camera scan type.
  supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
  // formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE, Html5QrcodeSupportedFormats.EAN_13],
}

export default {
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
    onScanSuccess(decodedText, decodedResult) {
      this.$emit('barcode', decodedText)
      this.close()
    },
    onScanFailure(error) {
      // console.warn(`Code scan error = ${error}`)
    },
    close() {
      this.scanner.stop()
      this.$emit('close')
    },
  }
}
</script>
