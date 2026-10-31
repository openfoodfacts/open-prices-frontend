describe("Tapirscan camera lifecycle", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/api/v1/prices*", { fixture: "prices.json" });
    cy.intercept("GET", "**/api/v1/challenges*", {
      body: { items: [], total: 0 },
    });
    cy.visit("/");
  });

  it("does not request a camera when closed during module loading", () => {
    cy.window().then((win) => {
      const getCamera = cy.stub(win.navigator.mediaDevices, "getUserMedia");
      return win
        .eval('import("/src/utils/tapirscanScanner.js")')
        .then((module) => {
          const scanner = module.startTapirscanScanner("reader", () => {});
          scanner.stop();
          return scanner.started.then(
            () => expect(getCamera).not.to.have.been.called,
          );
        });
    });
  });

  it("reports denied camera permission and removes the preview", () => {
    cy.window().then((win) => {
      const reader = win.document.createElement("div");
      reader.id = "reader";
      win.document.body.append(reader);
      cy.stub(win.navigator.mediaDevices, "getUserMedia").rejects(
        new win.DOMException("Camera denied", "NotAllowedError"),
      );
      return win
        .eval('import("/src/utils/tapirscanScanner.js")')
        .then((module) => {
          const scanner = module.startTapirscanScanner("reader", () => {});
          return scanner.started.then(
            () => {
              throw new Error("Expected camera denial");
            },
            (error) => {
              expect(error.name).to.equal("NotAllowedError");
              expect(reader.querySelector("video")).to.equal(null);
              scanner.stop();
            },
          );
        });
    });
  });
});
