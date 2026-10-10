import {
  Html5Qrcode,
  Html5QrcodeScannerState,
  Html5QrcodeSupportedFormats,
} from "html5-qrcode";

const HTML5_QRCODE_DECODER_CONFIG = {
  // product barcodes only: fewer formats for ZXing to try on each frame
  formatsToSupport: [
    Html5QrcodeSupportedFormats.EAN_13,
    Html5QrcodeSupportedFormats.EAN_8,
    Html5QrcodeSupportedFormats.UPC_A,
    Html5QrcodeSupportedFormats.UPC_E,
  ],
  // in auto mode, html5-qrcode is only used when the native BarcodeDetector isn't usable
  // (see getBarcodeScannerLibrary): don't let it alternate frames with a detector that always fails
  useBarCodeDetectorIfSupported: false,
  verbose: false,
};

const HTML5_QRCODE_CAMERA_CONFIG = {
  fps: 10,
  qrbox: { width: 250, height: 150 },
};

/**
 * Resolve the barcode scanner library to use ("off-barcode-scanner" or "html5-qrcode")
 * from the user setting ("auto", or one of the libraries)
 */
async function getBarcodeScannerLibrary(userSetting) {
  if (userSetting !== "auto") {
    return userSetting;
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
}

/**
 * Start an html5-qrcode camera scanner inside the element with the given id.
 * Returns:
 * - started: a Promise that rejects if the camera can't be started
 * - stop(): releases the camera, can be called at any time (even while the camera is starting)
 */
function startHtml5QrcodeScanner(elementId, onScanSuccess) {
  const scanner = new Html5Qrcode(elementId, HTML5_QRCODE_DECODER_CONFIG);
  let stopRequested = false;
  let stopCalled = false;

  const stopScanner = () => {
    if (stopCalled) return;
    stopCalled = true;
    scanner.stop().catch((error) => console.error(error));
  };

  const started = scanner
    .start(
      { facingMode: "environment" },
      HTML5_QRCODE_CAMERA_CONFIG,
      (decodedText) => onScanSuccess(decodedText),
      () => {}, // called on every frame without a barcode
    )
    .then(() => {
      // stop was requested while the camera was starting
      if (stopRequested) stopScanner();
    });

  return {
    started,
    stop() {
      stopRequested = true;
      // html5-qrcode throws if stop() is called before the camera is started
      if (scanner.getState() !== Html5QrcodeScannerState.NOT_STARTED) {
        stopScanner();
      }
    },
  };
}

export default {
  getBarcodeScannerLibrary,
  startHtml5QrcodeScanner,
};
