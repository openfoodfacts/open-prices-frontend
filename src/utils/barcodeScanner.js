import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";

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

let currentScanner;

/**
 * Resolve the barcode scanner library to use ("off-barcode-scanner" or "html5-qrcode")
 * from the user setting ("auto", or one of the libraries)
 */
function getBarcodeScannerLibrary(userSetting) {
  if (userSetting !== "auto") {
    return Promise.resolve(userSetting);
  }
  if (!window.BarcodeDetector) {
    return Promise.resolve("html5-qrcode");
  }
  // BarcodeDetector can exist without a working detection service
  // (e.g. Android without Google Play Services): it then supports no formats
  return window.BarcodeDetector.getSupportedFormats()
    .then((formats) =>
      formats.includes("ean_13") ? "off-barcode-scanner" : "html5-qrcode",
    )
    .catch((error) => {
      console.warn(error);
      return "html5-qrcode";
    });
}

/**
 * Start an html5-qrcode camera scanner inside the element with the given id.
 * Returns:
 * - started: a Promise that rejects if the camera can't be started
 * - stop(): resolves once the camera is released, even if it is still starting
 */
function startHtml5QrcodeScanner(elementId, onScanSuccess) {
  const previousScannerStopped = currentScanner?.stop() || Promise.resolve();
  const scanner = new Html5Qrcode(elementId, HTML5_QRCODE_DECODER_CONFIG);
  let stopRequested = false;
  let stopPromise;

  const stopScanner = () => {
    if (!stopPromise) {
      stopPromise = scanner.stop().catch((error) => console.error(error));
    }
    return stopPromise;
  };

  const started = previousScannerStopped
    .then(() =>
      scanner.start(
        { facingMode: "environment" },
        HTML5_QRCODE_CAMERA_CONFIG,
        (decodedText) => {
          if (!stopRequested) onScanSuccess(decodedText);
        },
        () => {}, // called on every frame without a barcode
      ),
    )
    .then(() => {
      // stop was requested while the camera was starting
      if (stopRequested) return stopScanner();
    });

  const session = {
    started,
    stop() {
      stopRequested = true;
      // Wait for startup before stopping: html5-qrcode throws while it is starting.
      return started
        .then(stopScanner, () => {})
        .then(() => {
          if (currentScanner === session) currentScanner = null;
        });
    },
  };
  currentScanner = session;
  return session;
}

export default {
  getBarcodeScannerLibrary,
  startHtml5QrcodeScanner,
};
