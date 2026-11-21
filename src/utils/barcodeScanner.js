import {
  Html5Qrcode,
  Html5QrcodeScannerState,
  Html5QrcodeSupportedFormats,
} from "html5-qrcode";
import { browserSupported } from "tapirscan/support";

const HTML5_QRCODE_DECODER_CONFIG = {
  // product barcodes only: fewer formats for ZXing to try on each frame
  formatsToSupport: [
    Html5QrcodeSupportedFormats.EAN_13,
    Html5QrcodeSupportedFormats.EAN_8,
    Html5QrcodeSupportedFormats.UPC_A,
    Html5QrcodeSupportedFormats.UPC_E,
  ],
  // auto mode picks html5-qrcode only when the native detector can't read EAN-13
  // (see getBarcodeScannerLibrary): don't let it alternate frames with that detector
  useBarCodeDetectorIfSupported: false,
  verbose: false,
};

const HTML5_QRCODE_CAMERA_CONFIG = {
  fps: 10,
  qrbox: { width: 250, height: 150 },
};

const TAPIRSCAN_FORMATS = ["EAN13", "EAN8", "UPCA", "UPCE"];

// the camera scanner also needs requestVideoFrameCallback (Safari 15.4, Firefox 132)
function getFallbackScannerLibrary() {
  return browserSupported() &&
    "requestVideoFrameCallback" in HTMLVideoElement.prototype
    ? "tapirscan"
    : "html5-qrcode";
}

/**
 * Resolve the barcode scanner library to use ("off-barcode-scanner", "tapirscan" or "html5-qrcode")
 * from the user setting ("auto", or one of the libraries).
 * Auto prefers the native BarcodeDetector, and falls back to Tapirscan
 * (or html5-qrcode in browsers too old for Tapirscan).
 */
function getBarcodeScannerLibrary(userSetting) {
  if (userSetting !== "auto") {
    return Promise.resolve(userSetting);
  }
  if (!window.BarcodeDetector) {
    return Promise.resolve(getFallbackScannerLibrary());
  }
  // BarcodeDetector can exist without a working detection service
  // (e.g. Android without Google Play Services): it then supports no formats
  return window.BarcodeDetector.getSupportedFormats()
    .then((formats) =>
      formats.includes("ean_13")
        ? "off-barcode-scanner"
        : getFallbackScannerLibrary(),
    )
    .catch((error) => {
      console.warn(error);
      return getFallbackScannerLibrary();
    });
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

/**
 * Start a Tapirscan camera scanner inside the element with the given id.
 * Same return value as startHtml5QrcodeScanner. onError is called if the camera
 * fails after it has started.
 */
function startTapirscanScanner(elementId, onScanSuccess, onError) {
  let stopped = false;
  let scanner;
  let camera;
  let video;

  const stop = () => {
    stopped = true;
    camera?.stop();
    scanner?.dispose();
    video?.remove();
  };

  // loaded on demand: the decoder ships a WASM file
  const started = Promise.all([
    import("tapirscan/browser/medium"),
    import("tapirscan/camera"),
  ])
    .then(([{ Scanner }, { CameraScanner }]) => {
      // stop was requested while the modules were loading
      if (stopped) return;
      video = document.createElement("video");
      video.setAttribute("playsinline", "");
      video.muted = true;
      video.style.width = "100%";
      document.getElementById(elementId).appendChild(video);
      scanner = new Scanner({ formats: TAPIRSCAN_FORMATS });
      camera = new CameraScanner(video, scanner, {
        scanInterval: 100,
        confirmations: 2,
        onDetect: (barcode) => {
          if (!stopped) onScanSuccess(barcode.text);
        },
        onError: (error) => {
          if (stopped) return;
          stop();
          onError(error);
        },
      });
      return camera.start();
    })
    .catch((error) => {
      stop();
      throw error;
    });

  return { started, stop };
}

export default {
  getBarcodeScannerLibrary,
  startHtml5QrcodeScanner,
  startTapirscanScanner,
};
