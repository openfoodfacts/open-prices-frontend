const image = (label) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="200"><rect width="400" height="200" fill="white"/><text x="20" y="100" font-size="32">${label}</text></svg>`;

function priceTag(id, proofPath = `proof-${id}.webp`) {
  return {
    id,
    status: null,
    price_id: null,
    image_path: `price-tag-${id}.webp`,
    bounding_box: [0, 0, 1, 1],
    proof: {
      id,
      type: "PRICE_TAG",
      file_path: proofPath,
      currency: "EUR",
      date: "2026-01-01",
      owner: "test-user",
      created: "2026-01-01T12:00:00Z",
      price_count: 0,
    },
    predictions: [
      {
        type: "PRICE_TAG_EXTRACTION",
        data: {
          barcode: "3011360030498",
          product_name: `Product ${id}`,
          price: 1.23,
          unit: "UNIT",
        },
      },
      { type: "PRICE_TAG_CLF", data: {} },
    ],
  };
}

function visitValidation(tags) {
  cy.intercept("GET", "**/api/v1/price-tags?*", (request) => {
    const page = Number(new URL(request.url).searchParams.get("page"));
    request.reply({
      items: page === 1 ? tags : [],
      total: tags.length,
      page,
      size: 4,
      pages: 1,
    });
  }).as("priceTags");
  cy.intercept("GET", "**/api/v1/products/code/*", {
    fixture: "product_3011360030498.json",
  });
  cy.intercept("GET", "**/img/*", (request) => {
    request.reply({
      headers: { "content-type": "image/svg+xml" },
      body: image(
        request.url.includes("price-tag") ? "Price tag" : "Full proof",
      ),
    });
  });
  cy.visit("/prices/add/validate", {
    onBeforeLoad(win) {
      win.localStorage.setItem(
        "app",
        JSON.stringify({
          user: {
            username: "test-user",
            token: "test-token",
            language: "en",
            country: "FR",
            favorite_currencies: ["EUR"],
          },
        }),
      );
    },
  });
  cy.wait("@priceTags");
}

describe("Price validation proof images", () => {
  [1280, 390].forEach((width) => {
    it(`switches between the price tag and full proof at ${width}px`, () => {
      cy.viewport(width, 844);
      cy.intercept("POST", "**/api/v1/prices?*", { body: {} }).as(
        "createPrice",
      );
      cy.intercept("PATCH", "**/api/v1/price-tags/*", { body: {} }).as(
        "updatePriceTag",
      );
      visitValidation([priceTag(1), priceTag(2)]);
      cy.get('img[src$="price-tag-1.webp"]').should("be.visible");
      cy.get('img[src$="price-tag-1.webp"]')
        .closest(".v-card")
        .as("firstCard", { type: "static" })
        .find('input[inputmode="decimal"]')
        .clear()
        .type("2.45");
      cy.contains("label", "Show full proof").first().click();
      cy.get('img[src$="proof-1.webp"]').should("be.visible");
      cy.get('img[src$="price-tag-2.webp"]').should("be.visible");
      cy.get("@firstCard")
        .contains("label", "Show full proof")
        .parent()
        .find('input[type="checkbox"]')
        .should("be.checked");
      cy.get('img[src$="proof-1.webp"]').should(
        "have.prop",
        "naturalWidth",
        400,
      );
      cy.screenshot(`full-proof-${width}`, { capture: "viewport" });
      cy.contains("label", "Show full proof").first().click();
      cy.get('img[src$="price-tag-1.webp"]').should("be.visible");
      cy.get('img[src$="proof-1.webp"]').should("not.exist");
      cy.get("@firstCard")
        .find('input[inputmode="decimal"]')
        .should("have.value", "2.45");
      cy.get("@createPrice.all").should("have.length", 0);
      cy.get("@updatePriceTag.all").should("have.length", 0);
    });
  });

  it("resets to the price tag when the next form reuses the card", () => {
    cy.intercept("PATCH", "**/api/v1/price-tags/1?*", {
      body: { ...priceTag(1), status: 2 },
    }).as("markUnreadable");
    visitValidation([priceTag(1), priceTag(2)]);
    cy.contains("label", "Show full proof").first().click();
    cy.get('img[src$="proof-1.webp"]').should("be.visible");
    cy.contains("button", "Error").first().click();
    cy.contains(".v-list-item", "Unreadable").click();
    cy.wait("@markUnreadable");
    cy.get('img[src$="price-tag-2.webp"]').should("be.visible");
    cy.get('img[src$="proof-2.webp"]').should("not.exist");
    cy.get('img[src$="price-tag-2.webp"]')
      .closest(".v-card")
      .contains("label", "Show full proof")
      .parent()
      .find('input[type="checkbox"]')
      .should("not.be.checked");
  });

  it("does not offer the full proof when its image is unavailable", () => {
    visitValidation([priceTag(1, null)]);
    cy.get('img[src$="price-tag-1.webp"]').should("be.visible");
    cy.contains("label", "Show full proof").should("not.exist");
  });
});
