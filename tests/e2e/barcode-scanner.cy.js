import { Html5Qrcode } from "html5-qrcode";
import barcode_scanner_utils from "../../src/utils/barcodeScanner";

function deferred() {
  let resolve;
  let reject;
  const promise = new Promise((yes, no) => {
    resolve = yes;
    reject = no;
  });
  return { promise, resolve, reject };
}

describe("Barcode scanner utility", () => {
  beforeEach(() => {
    const reader = document.createElement("div");
    reader.id = "scanner-test";
    document.body.append(reader);
  });

  afterEach(() => document.getElementById("scanner-test").remove());

  it("uses the software decoder when native detection is unavailable", () => {
    cy.stub(window, "BarcodeDetector").value(undefined);
    cy.wrap(barcode_scanner_utils.getBarcodeScannerLibrary("auto")).should(
      "equal",
      "html5-qrcode",
    );
  });

  it("checks supported formats and handles a failed capability query", () => {
    const getSupportedFormats = cy.stub().resolves([]);
    cy.stub(window, "BarcodeDetector").value({ getSupportedFormats });
    cy.wrap(barcode_scanner_utils.getBarcodeScannerLibrary("auto")).should(
      "equal",
      "html5-qrcode",
    );
    cy.then(() => {
      getSupportedFormats.resolves(["qr_code"]);
      return barcode_scanner_utils.getBarcodeScannerLibrary("auto");
    }).should("equal", "html5-qrcode");
    cy.then(() => {
      getSupportedFormats.resolves(["ean_13", "ean_8"]);
      return barcode_scanner_utils.getBarcodeScannerLibrary("auto");
    }).should("equal", "off-barcode-scanner");
    cy.then(() => {
      getSupportedFormats.rejects(new Error("No detection service"));
      return barcode_scanner_utils.getBarcodeScannerLibrary("auto");
    }).should("equal", "html5-qrcode");
  });

  it("preserves an explicit library preference", () => {
    cy.stub(window, "BarcodeDetector").value(undefined);
    for (const library of ["html5-qrcode", "off-barcode-scanner"]) {
      cy.wrap(barcode_scanner_utils.getBarcodeScannerLibrary(library)).should(
        "equal",
        library,
      );
    }
  });

  it("waits for startup and camera release, and ignores late detections", () => {
    const startup = deferred();
    const shutdown = deferred();
    const start = cy
      .stub(Html5Qrcode.prototype, "start")
      .returns(startup.promise);
    const stop = cy
      .stub(Html5Qrcode.prototype, "stop")
      .returns(shutdown.promise);
    const onBarcode = cy.stub();
    const scanner = barcode_scanner_utils.startHtml5QrcodeScanner(
      "scanner-test",
      onBarcode,
    );
    let released = false;
    const stopped = scanner.stop().then(() => (released = true));
    cy.wrap(start).should("have.been.calledOnce");
    cy.then(() => {
      expect(start).to.have.been.calledOnce;
      expect(start.firstCall.args[0]).to.deep.equal({
        facingMode: "environment",
      });
      expect(stop).not.to.have.been.called;
      startup.resolve();
    });
    cy.wrap(stop).should("have.been.calledOnce");
    cy.then(() => {
      start.firstCall.args[2]("3011360030498");
      expect(onBarcode).not.to.have.been.called;
      expect(released).to.equal(false);
      shutdown.resolve();
      return stopped;
    }).then(() => scanner.stop());
    cy.wrap(stop).should("have.been.calledOnce");
  });

  it("delivers a detection and safely stops after camera startup fails", () => {
    const start = cy.stub(Html5Qrcode.prototype, "start").resolves();
    const stop = cy.stub(Html5Qrcode.prototype, "stop").resolves();
    const onBarcode = cy.stub();
    const scanner = barcode_scanner_utils.startHtml5QrcodeScanner(
      "scanner-test",
      onBarcode,
    );
    cy.wrap(scanner.started).then(() => {
      start.firstCall.args[2]("3011360030498");
      expect(onBarcode).to.have.been.calledOnceWith("3011360030498");
      return scanner.stop();
    });
    cy.then(() => {
      start.rejects(new Error("Permission denied"));
      const failed = barcode_scanner_utils.startHtml5QrcodeScanner(
        "scanner-test",
        onBarcode,
      );
      return failed.started.catch((error) => {
        expect(error.message).to.equal("Permission denied");
        return failed.stop();
      });
    });
    cy.wrap(stop).should("have.been.calledOnce");
  });

  it("waits for the previous dialog's camera before reopening", () => {
    const shutdown = deferred();
    const start = cy.stub(Html5Qrcode.prototype, "start").resolves();
    const stop = cy.stub(Html5Qrcode.prototype, "stop");
    stop.onFirstCall().returns(shutdown.promise);
    stop.onSecondCall().resolves();
    const first = barcode_scanner_utils.startHtml5QrcodeScanner(
      "scanner-test",
      () => {},
    );
    cy.wrap(first.started).then(() => {
      const second = barcode_scanner_utils.startHtml5QrcodeScanner(
        "scanner-test",
        () => {},
      );
      return Promise.resolve().then(() => {
        expect(start).to.have.been.calledOnce;
        shutdown.resolve();
        return second.started.then(() => second.stop());
      });
    });
    cy.wrap(start).should("have.been.calledTwice");
    cy.wrap(stop).should("have.been.calledTwice");
  });
});

describe("Barcode scanner manual fallback", () => {
  let sessions;
  let start;

  beforeEach(() => {
    sessions = [];
    cy.intercept("GET", "**/api/v1/products/code/*", {
      fixture: "product_3011360030498.json",
    });
    cy.intercept("GET", "**/api/v1/products?*", {
      fixture: "products_3011360030498.json",
    }).as("products");
    cy.intercept("GET", "**/api/v1/prices?*", {
      fixture: "product_3011360030498_prices.json",
    });
    cy.visit("/search", {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          "app",
          JSON.stringify({
            user: {
              language: "en",
              barcode_scanner_default_mode: "type",
              barcode_scanner_library: "html5-qrcode",
            },
          }),
        );
      },
    });
    stubScanner();
    cy.get(".mdi-barcode-scan").click();
    cy.contains(".v-dialog .v-tab", "Type").should("be.visible");
  });

  function stubScanner() {
    cy.window().then((win) =>
      win
        .eval("import('/src/utils/barcodeScanner.js')")
        .then(({ default: utils }) => {
          start = cy
            .stub(utils, "startHtml5QrcodeScanner")
            .callsFake((id, onBarcode) => {
              const session = {
                startup: deferred(),
                shutdown: deferred(),
                onBarcode,
              };
              session.started = session.startup.promise;
              session.stop = cy.stub().returns(session.shutdown.promise);
              sessions.push(session);
              return session;
            });
        }),
    );
  }

  function scan() {
    cy.contains(".v-dialog .v-tab", "Scan").click();
    cy.get("#reader").should("exist");
  }

  it("offers guidance and stops scanning when switching to manual entry", () => {
    cy.viewport(375, 812);
    scan();
    cy.contains("Keep the barcode horizontal").should("be.visible");
    cy.wrap(null).should(() => expect(start).to.have.been.calledOnce);
    cy.contains(".v-dialog button", "Type a barcode").click();
    cy.get('.v-dialog input[inputmode="numeric"]').should("be.visible");
    cy.then(() => expect(sessions[0].stop).to.have.been.calledOnce);
    scan();
    cy.then(() => {
      sessions[0].startup.resolve();
      sessions[0].shutdown.resolve();
    });
    cy.wrap(null).should(() => expect(start).to.have.been.calledTwice);
    cy.then(() => sessions[1].onBarcode("3011360030498"));
    cy.get(".v-dialog").should("not.exist");
    cy.location("search").should("equal", "?q=3011360030498");
    cy.then(() => {
      expect(sessions[1].stop).to.have.been.calledOnce;
      sessions[1].startup.resolve();
      sessions[1].shutdown.resolve();
    });
  });

  it("shows a camera error and keeps manual submission working", () => {
    scan();
    cy.wrap(null).should(() => expect(start).to.have.been.calledOnce);
    cy.then(() => sessions[0].startup.reject(new Error("Permission denied")));
    cy.contains("The camera could not be started: Permission denied").should(
      "be.visible",
    );
    cy.contains(".v-dialog button", "Type a barcode").click();
    cy.get('.v-dialog input[inputmode="numeric"]').type("3011360030498{enter}");
    cy.get(".v-dialog").should("not.exist");
    cy.location("search").should("equal", "?q=3011360030498");
    cy.then(() => sessions[0].shutdown.resolve());
  });

  it("fills a submitted receipt product through the manual fallback", () => {
    cy.intercept("GET", "**/api/v1/proofs/42?*", {
      id: 42,
      type: "RECEIPT",
      owner: "scanner-test",
      currency: "EUR",
      date: "2026-01-01",
      created: "2026-01-01T12:00:00Z",
      receipt_price_count: 1,
      receipt_price_total: 2,
    });
    cy.intercept("GET", "**/api/v1/receipt-items?*", {
      items: [
        {
          id: 1,
          schema_version: "2.0",
          predicted_data: {
            type: "PRODUCT",
            product_name: "Receipt product",
            price: 2,
            quantity: 1,
          },
        },
      ],
      total: 1,
    });
    cy.visit("/experiments/receipt-assistant?proof_ids=42", {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          "app",
          JSON.stringify({
            user: {
              language: "en",
              token: "scanner-test",
              username: "scanner-test",
              barcode_scanner_default_mode: "type",
              barcode_scanner_library: "html5-qrcode",
            },
          }),
        );
      },
    });
    stubScanner();
    cy.contains("Receipt product").should("be.visible");
    cy.contains("button", "Find the product").click();
    scan();
    cy.wrap(null).should(() => expect(start).to.have.been.calledOnce);
    cy.contains(".v-dialog button", "Type a barcode").click();
    cy.get('.v-dialog input[inputmode="numeric"]').type("3011360030498{enter}");
    cy.contains(
      '.v-dialog [data-name="product-card"]',
      "Mayonnaise Classique",
    ).click();
    cy.get(".v-dialog").should("not.exist");
    cy.contains(".v-data-table", "Mayonnaise Classique").should("be.visible");
    cy.then(() => {
      expect(sessions[0].stop).to.have.been.calledOnce;
      sessions[0].startup.resolve();
      sessions[0].shutdown.resolve();
    });
  });

  it("ignores a dismissed session's error and reopens without starting on the manual tab", () => {
    scan();
    cy.wrap(null).should(() => expect(start).to.have.been.calledOnce);
    cy.get(".v-dialog .mdi-close").click();
    cy.get(".v-dialog").should("not.exist");
    cy.then(() => {
      expect(sessions[0].stop).to.have.been.calledOnce;
      sessions[0].startup.reject(new Error("Dismissed camera"));
      sessions[0].shutdown.resolve();
    });
    cy.get(".mdi-barcode-scan").click();
    cy.get('.v-dialog input[inputmode="numeric"]').should("be.visible");
    cy.contains("Dismissed camera").should("not.exist");
    cy.then(() => expect(start).to.have.been.calledOnce);
    scan();
    cy.wrap(null).should(() => expect(start).to.have.been.calledTwice);
    cy.then(() => sessions[1].startup.resolve());
    cy.get(".v-overlay__scrim").last().click({ force: true });
    cy.get(".v-dialog").should("not.exist");
    cy.then(() => {
      expect(sessions[1].stop).to.have.been.calledOnce;
      sessions[1].shutdown.resolve();
    });
  });
});
