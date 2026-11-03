const code = "3011360030498";
const emptyPage = { items: [], total: 0, page: 1, size: 25, pages: 0 };

function visitProduct(language, country, hasPrices = true) {
  cy.fixture("product_3011360030498_prices.json").then((data) => {
    const price = data.items[0];
    price.location.osm_address_country_code = country;
    cy.intercept("GET", "**/api/v1/prices?*", (request) => {
      request.reply(
        request.query.product_code && hasPrices
          ? { ...data, items: [price] }
          : emptyPage,
      );
    }).as("prices");
  });
  cy.intercept("GET", "**/api/v1/products/code/*", {
    body: { code, source: null, price_count: hasPrices ? 1 : 0 },
  });
  cy.intercept("GET", "**/api/v1/challenges?*", { body: emptyPage });
  cy.intercept("GET", "**/api/v1/price-tags?*", { body: emptyPage });
  cy.intercept("GET", "**/img/**", {
    headers: {
      "content-type": "image/svg+xml",
      "access-control-allow-origin": "*",
    },
    body: '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="400" height="400" fill="white"/></svg>',
  });
  cy.intercept("PATCH", "**/api/v1/products/code/*/off-upload-image?*", {
    body: {},
  }).as("uploadImage");
  cy.intercept("PATCH", "**/api/v1/products/code/*/off-update?*", {
    body: {},
  }).as("updateProduct");
  cy.visit(`/experiments/create-off-product?product_code=${code}&flavor=off`, {
    onBeforeLoad(win) {
      win.localStorage.setItem(
        "app",
        JSON.stringify({
          user: { language, token: "test-token", username: "test-user" },
        }),
      );
    },
  });
}

function languageField() {
  return cy.get(".v-autocomplete").first();
}

function expectSubmittedLanguage(language) {
  cy.get('button[type="submit"]').first().click();
  cy.wait("@updateProduct").its("request.body").should("include", {
    product_language_code: language,
  });
}

describe("Product creation language", () => {
  [
    { language: "en", country: "us", title: "English" },
    { language: "fr", country: "be", title: "Français" },
    { language: "nl_BE", country: "be", title: "Nederlands (België)" },
    { language: "en", country: "fr", title: "English" },
  ].forEach(({ language, country, title }) => {
    it(`uses ${language} rather than the ${country} location code`, () => {
      visitProduct(language, country);
      languageField().should("contain", title);
      expectSubmittedLanguage(language.split(/[_-]/)[0]);
    });
  });

  it("also uses the preferred language for a product without prices", () => {
    visitProduct("fr", "us", false);
    languageField().should("contain", "Français");
    expectSubmittedLanguage("fr");
  });

  it("allows changing the suggested language before submitting", () => {
    visitProduct("en", "us");
    languageField().find("input").clear().type("Français");
    cy.contains(".v-list-item-title", /^Français$/).click();
    expectSubmittedLanguage("fr");
  });
  it("suggests English when the preferred language is unsupported by image uploads", () => {
    visitProduct("ach", "us");
    languageField().should("contain", "English");
    languageField().find("input").click().type("Lwo");
    cy.contains(".v-list-item-title", /^Lwo$/).should("not.exist");
    languageField().find("input").type("{esc}");
    expectSubmittedLanguage("en");
  });

  it("requires a language after clearing the suggestion", () => {
    visitProduct("en", "us");
    languageField().find("input").click().type("{selectall}{backspace}");
    cy.get('button[type="submit"]').first().should("be.disabled");
    languageField().find("input").type("{esc}{enter}");
    cy.get("@updateProduct.all").should("have.length", 0);
  });

  it("uses the regional language's two-letter code for metadata and cropped images", () => {
    visitProduct("nl_BE", "be");
    languageField().should("contain", "Nederlands (België)");
    cy.get(".v-switch input").check();
    cy.get("#canvas")
      .should((canvas) => expect(canvas[0].width).to.equal(400))
      .scrollIntoView()
      .then((canvas) => {
        const rect = canvas[0].getBoundingClientRect();
        cy.wrap(canvas)
          .trigger("mousedown", {
            eventConstructor: "MouseEvent",
            clientX: rect.left + 20,
            clientY: rect.top + 20,
          })
          .trigger("mousemove", {
            eventConstructor: "MouseEvent",
            clientX: rect.left + 80,
            clientY: rect.top + 80,
          })
          .trigger("mouseup", {
            eventConstructor: "MouseEvent",
            clientX: rect.left + 80,
            clientY: rect.top + 80,
          });
      });
    expectSubmittedLanguage("nl");
    cy.wait("@uploadImage")
      .its("request.body")
      .should("include", {
        product_language_code: "nl",
      })
      .and("have.property", "image_data_base64")
      .and("not.be.empty");
  });
});
