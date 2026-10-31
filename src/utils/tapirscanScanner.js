/** Start the optional retail scanner with the same lifecycle as html5-qrcode. */
export function startTapirscanScanner(elementId, onScanSuccess, onError) {
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
  const started = Promise.all([
    import("tapirscan/browser/medium"),
    import("tapirscan/camera"),
  ])
    .then(([{ Scanner }, { CameraScanner }]) => {
      if (stopped) return;
      const container = document.getElementById(elementId);
      if (!container)
        throw new Error("The scanner preview is no longer available.");
      video = document.createElement("video");
      video.setAttribute("playsinline", "");
      video.muted = true;
      video.style.width = "100%";
      container.appendChild(video);
      scanner = new Scanner({ formats: ["EAN13", "EAN8", "UPCA", "UPCE"] });
      camera = new CameraScanner(video, scanner, {
        scanInterval: 100,
        confirmations: 2,
        onDetect: (barcode) => {
          if (!stopped) onScanSuccess(barcode.text);
        },
        onError: (error) => {
          if (stopped) return;
          stop();
          onError?.(error);
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
